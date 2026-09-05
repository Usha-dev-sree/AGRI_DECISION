import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles } from 'lucide-react';
import { aiApi } from '../../services/api';
import './VoiceAssistant.css';

const LANGUAGES = [
  { code: 'en-IN', label: 'English', voiceLang: 'en-IN', name: 'English (India)' },
  { code: 'hi-IN', label: 'हिंदी',   voiceLang: 'hi-IN', name: 'Hindi' },
  { code: 'pa-IN', label: 'ਪੰਜਾਬੀ', voiceLang: 'pa-IN', name: 'Punjabi' },
  { code: 'mr-IN', label: 'मराठी',   voiceLang: 'mr-IN', name: 'Marathi' },
  { code: 'te-IN', label: 'తెలుగు',  voiceLang: 'te-IN', name: 'Telugu' },
  { code: 'ta-IN', label: 'தமிழ்',   voiceLang: 'ta-IN', name: 'Tamil' },
];

const FALLBACK_ANSWERS = {
  'en-IN': 'For optimal crop yield, ensure balanced NPK fertilization, proper irrigation at critical growth stages, and timely pest management with integrated pest control.',
  'hi-IN': 'फसल की अच्छी पैदावार के लिए NPK उर्वरक का संतुलित उपयोग करें, सही सिंचाई और कीट नियंत्रण समय पर करें।',
  'pa-IN': 'ਫ਼ਸਲ ਦੀ ਵਧੀਆ ਪੈਦਾਵਾਰ ਲਈ NPK ਖਾਦ ਦਾ ਸੰਤੁਲਿਤ ਉਪਯੋਗ ਕਰੋ ਅਤੇ ਸਹੀ ਸਿੰਚਾਈ ਕਰੋ।',
  'mr-IN': 'चांगल्या पीक उत्पादनासाठी NPK खते योग्य प्रमाणात वापरा आणि वेळेवर सिंचन करा।',
  'te-IN': 'మంచి పంట దిగుబడికి NPK ఎరువులు సమతుల్యంగా వినియోగించండి మరియు సకాలంలో నీరు పెట్టండి.',
  'ta-IN': 'நல்ல விளைச்சலுக்கு NPK உரங்களை சமன் செய்யுங்கள், சரியான நேரத்தில் நீர்ப்பாசனம் செய்யுங்கள்.',
};

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechSupported] = useState(() => 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const recognitionRef = useRef(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const speakResponse = useCallback((text, langCode) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleVoiceQuery = useCallback(async (spokenText) => {
    if (!spokenText.trim()) return;
    setIsProcessing(true);
    try {
      const res = await aiApi.chat(spokenText);
      const answer = res.data?.data || FALLBACK_ANSWERS[selectedLang.code] || FALLBACK_ANSWERS['en-IN'];
      setResponse(answer);
      speakResponse(answer, selectedLang.voiceLang);
    } catch {
      const fallback = FALLBACK_ANSWERS[selectedLang.code] || FALLBACK_ANSWERS['en-IN'];
      setResponse(fallback);
      speakResponse(fallback, selectedLang.voiceLang);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedLang, speakResponse]);

  const startListening = useCallback(() => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang.code;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const interim = Array.from(event.results)
        .map(r => r[0].transcript)
        .join('');
      setTranscript(interim);

      if (event.results[event.results.length - 1].isFinal) {
        const finalText = event.results[event.results.length - 1][0].transcript;
        handleVoiceQuery(finalText);
        stopListening();
      }
    };

    recognition.onerror = () => stopListening();
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript('');
    setResponse('');
  }, [speechSupported, selectedLang, handleVoiceQuery, stopListening]);

  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const handleSpeakAgain = () => {
    if (response) speakResponse(response, selectedLang.voiceLang);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      stopListening();
      window.speechSynthesis?.cancel();
    };
  }, [stopListening]);

  return (
    <div className="voice-widget">
      {isOpen && (
        <div className="voice-panel">
          <div className="voice-panel-header">
            <h4><Sparkles size={16} color="#16a34a" /> Voice Farm Assistant</h4>
            <button className="close-voice-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          {/* Language selector */}
          <div className="lang-pills">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                className={`lang-pill ${selectedLang.code === lang.code ? 'active' : ''}`}
                onClick={() => setSelectedLang(lang)}
                title={lang.name}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Waveform when listening */}
          {isListening && (
            <div className="wave-bars">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="wave-bar" style={{ height: `${Math.random() * 22 + 6}px` }} />
              ))}
            </div>
          )}

          {/* Transcript */}
          <div className="transcript-box">
            {transcript
              ? <span>{transcript}</span>
              : isListening
                ? <span style={{ color: '#16a34a', fontWeight: 600 }}>Listening in {selectedLang.name}…</span>
                : <span style={{ color: '#94a3b8' }}>Press the mic and speak in {selectedLang.name}…</span>
            }
          </div>

          {/* AI Response */}
          {(isProcessing || response) && (
            <div className="response-box">
              {isProcessing
                ? '🤔 Processing your query…'
                : response
              }
            </div>
          )}

          {/* Speak again / stop */}
          {response && (
            <button className="speak-btn" onClick={isSpeaking ? stopSpeaking : handleSpeakAgain}>
              {isSpeaking
                ? <><VolumeX size={15} /> Stop Speaking</>
                : <><Volume2 size={15} /> Speak Response Again</>
              }
            </button>
          )}
        </div>
      )}

      {/* Mic FAB */}
      <button
        className={`voice-fab ${isListening ? 'listening' : ''}`}
        onClick={isOpen ? toggleListening : () => setIsOpen(true)}
        title={isListening ? 'Stop Listening' : 'Voice Farm Assistant'}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
    </div>
  );
};

export default VoiceAssistant;
