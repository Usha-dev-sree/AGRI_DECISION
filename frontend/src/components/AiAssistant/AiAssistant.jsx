import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { aiApi } from '../../services/api';
import { Sparkles, Send, Bot, Languages, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import './AiAssistant.css';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🌾' },
  { code: 'mr', name: 'मराठी', flag: '🚩' },
  { code: 'te', name: 'తెలుగు', flag: '🌴' },
  { code: 'ta', name: 'தமிழ்', flag: '🛕' }
];

const MULTI_LANG_CONTENT = {
  en: {
    welcome: "Namaste! I am AgroSmart AI. Choose your language above and ask any farming questions!",
    placeholder: "Ask about crops, rainfall, fertilizers, diseases...",
    quickQueries: [
      "Which crop is best for high rainfall?",
      "How to treat Rice Leaf Blast?",
      "Best fertilizer for Wheat in Kharif?",
      "Current mandi price trends for Tomato"
    ],
    knowledge: {
      rainfall: "🌾 **Best Crops for High Rainfall (>1200mm):**\n\n1. **Paddy / Rice**: Thrives in standing water & heavy monsoon.\n2. **Sugarcane**: High water retention requirement.\n3. **Jute**: Requires warm, humid monsoon climate.\n4. **Taro / Colocasia**: Excellent waterlogged soil crop.\n\n💡 **Tip**: Ensure proper bunding and field drainage to avoid root rot.",
      blast: "🔬 **Rice Leaf Blast (Magnaporthe oryzae) Treatment:**\n\n• **Organic**: Spray Pseudomonas fluorescens @ 10g/liter.\n• **Chemical**: Spray Tricyclazole 75% WP @ 0.6g/liter at first sign of spindle lesions.\n• **Cultural**: Avoid excess Nitrogen fertilization.",
      wheat: "🧪 **Wheat Fertilizer Protocol:**\n\nApply NPK in 120:60:40 kg/hectare ratio. Apply full P & K with 50% Nitrogen during basal soil sowing, and remaining 50% N during first crown root irrigation (21 days).",
      tomato: "📈 **Tomato APMC Market Trends:**\n\nCurrent modal prices across major mandis range between ₹3,200 – ₹3,850 per quintal with strong consumer demand in Nashik and Azadpur mandis.",
      default: "🌱 **AgroSmart Farming Advisory:**\n\nFor optimal seasonal yield, maintain soil pH between 6.0 - 7.5, practice crop rotation with legumes (pulses), and follow balanced NPK dosage based on soil testing."
    }
  },
  hi: {
    welcome: "नमस्ते! मैं एग्रोस्मार्ट एआई हूँ। ऊपर अपनी भाषा चुनें और कृषि संबंधी प्रश्न पूछें!",
    placeholder: "फसलों, बारिश, खाद, बीमारियों के बारे में पूछें...",
    quickQueries: [
      "अधिक वर्षा के लिए कौन सी फसल सबसे अच्छी है?",
      "धान के ब्लास्ट रोग का इलाज कैसे करें?",
      "गेहूं के लिए सबसे अच्छा उर्वरक कौन सा है?",
      "टमाटर के वर्तमान मंडी भाव क्या हैं?"
    ],
    knowledge: {
      rainfall: "🌾 **अधिक वर्षा (>1200mm) के लिए सर्वोत्तम फसलें:**\n\n1. **धान (चावल)**: खड़े पानी और भारी मानसून में उत्कृष्ट पैदावार देता है।\n2. **गन्ना**: उच्च जल धारण क्षमता वाली मिट्टी के लिए सर्वोत्तम।\n3. **जूट**: गर्म और आर्द्र जलवायु में बहुत अच्छा बढ़ता है।\n4. **अरबी (Colocasia)**: जलभराव वाली मिट्टी के लिए बढ़िया विकल्प।\n\n💡 **सलाह**: जड़ों को सड़ने से बचाने के लिए खेत में उचित जल निकासी रखें।",
      blast: "🔬 **धान के ब्लास्ट रोग का उपचार:**\n\n• **जैविक**: स्यूडोमोनास फ्लोरेसेंस @ 10 ग्राम/लीटर का छिड़काव करें।\n• **रासायनिक**: ट्राइसाइक्लाज़ोल 75% WP @ 0.6 ग्राम/लीटर का छिड़काव करें।\n• **उपाय**: अत्यधिक नाइट्रोजन उर्वरक का उपयोग न करें।",
      wheat: "🧪 **गेहूं उर्वरक की मात्रा:**\n\nNPK को 120:60:40 किग्रा/हेक्टेयर के अनुपात में डालें। बुवाई के समय पूरा फास्फोरस और पोटाश तथा आधा नाइट्रोजन डालें। बाकी आधा नाइट्रोजन पहली सिंचाई (21 दिन) में दें।",
      tomato: "📈 **टमाटर मंडी भाव:**\n\nप्रमुख मंडियों (नासिक, आज़ादपुर) में वर्तमान औसत मूल्य ₹3,200 – ₹3,850 प्रति कुंतल के बीच चल रहा है।",
      default: "🌱 **एग्रोस्मार्ट कृषि सलाह:**\n\nउत्कृष्ट पैदावार के लिए मिट्टी का pH 6.0 से 7.5 के बीच रखें, दलहनी फसलों के साथ फसल चक्र अपनाएं और मृदा परीक्षण के अनुसार संतुलित खाद डालें।"
    }
  },
  pa: {
    welcome: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਐਗਰੋਸਮਾਰਟ AI ਹਾਂ। ਉੱਪਰ ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਵਾਲ ਪੁੱਛੋ!",
    placeholder: "ਫ਼ਸਲਾਂ, ਬਾਰਿਸ਼, ਖਾਦਾਂ, ਬੀਮਾਰੀਆਂ ਬਾਰੇ ਪੁੱਛੋ...",
    quickQueries: [
      "ਭਾਰੀ ਬਾਰਿਸ਼ ਲਈ ਕਿਹੜੀ ਫ਼ਸਲ ਸਭ ਤੋਂ ਵਧੀਆ ਹੈ?",
      "ਝੋਨੇ ਦੇ ਬਲਾਸਟ ਰੋਗ ਦਾ ਇਲਾਜ ਕਿਵੇਂ ਕਰੀਏ?",
      "ਕਣਕ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਖਾਦ ਕਿਹੜੀ ਹੈ?",
      "ਟਮਾਟਰ ਦੇ ਮੌਜੂਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹਨ?"
    ],
    knowledge: {
      rainfall: "🌾 **ਭਾਰੀ ਬਾਰਿਸ਼ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਫ਼ਸਲਾਂ:**\n\n1. **ਝੋਨਾ (ਚੌਲ)**: ਖੜ੍ਹੇ ਪਾਣੀ ਅਤੇ ਭਾਰੀ ਮਾਨਸੂਨ ਵਿੱਚ ਬਹੁਤ ਵਧੀਆ ਹੁੰਦਾ ਹੈ।\n2. **ਗੰਨਾ**: ਪਾਣੀ ਦੀ ਜ਼ਿਆਦਾ ਲੋੜ ਹੁੰਦੀ ਹੈ।\n3. **ਪਟਸਨ (ਜੂਟ)**: ਗਰਮ ਅਤੇ ਨਮੀ ਵਾਲੇ ਮੌਸਮ ਲਈ ਵਧੀਆ।\n\n💡 **ਸਲਾਹ**: ਜੜ੍ਹਾਂ ਨੂੰ ਗਲਣ ਤੋਂ ਬਚਾਉਣ ਲਈ ਖੇਤ ਵਿੱਚੋਂ ਪਾਣੀ ਦੇ ਨਿਕਾਸ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।",
      blast: "🔬 **ਝੋਨੇ ਦੇ ਬਲਾਸਟ ਦਾ ਇਲਾਜ:**\n\n• **ਜੈਵਿਕ**: ਟ੍ਰਾਈਕੋਡਰਮਾ ਜਾਂ ਸੂਡੋਮੋਨਾਸ 10 ਗ੍ਰਾਮ/ਲੀਟਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।\n• **ਰਸਾਇਣਕ**: ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 75% WP @ 0.6 ਗ੍ਰਾਮ/ਲੀਟਰ ਵਰਤੋਂ।",
      wheat: "🧪 **ਕਣਕ ਲਈ ਖਾਦ ਦੀ ਮਾਤਰਾ:**\n\nNPK 120:60:40 ਕਿੱਲੋ/ਹੈਕਟੇਅਰ ਵਰਤੋਂ। ਬਿਜਾਈ ਵੇਲੇ ਅੱਧੀ ਨਾਈਟ੍ਰੋਜਨ ਅਤੇ ਪੂਰੀ ਡੀ.ਏ.ਪੀ./ਪੋਟਾਸ਼ ਪਾਓ। ਬਾਕੀ ਅੱਧੀ ਨਾਈਟ੍ਰੋਜਨ ਪਹਿਲੇ ਪਾਣੀ (21 ਦਿਨ) ਵੇਲੇ ਦਿਓ।",
      tomato: "📈 **ਟਮਾਟਰ ਮੰਡੀ ਭਾਅ:**\n\nਮੁੱਖ ਮੰਡੀਆਂ ਵਿੱਚ ਮੌਜੂਦਾ ਔਸਤ ਭਾਅ ₹3,200 – ₹3,850 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ।",
      default: "🌱 **ਐਗਰੋਸਮਾਰਟ ਖੇਤੀ ਸਲਾਹ:**\n\nਚੰਗੀ ਪੈਦਾਵਾਰ ਲਈ ਮਿੱਟੀ ਦੀ ਪਰਖ ਕਰਵਾਓ ਅਤੇ ਸੰਤੁਲਿਤ ਖਾਦਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ।"
    }
  },
  mr: {
    welcome: "नमस्कार! मी ॲग्रोस्मार्ट AI आहे. वरील भाषा निवडून शेतीविषयक प्रश्न विचारा!",
    placeholder: "पिके, पाऊस, खते, रोगांबद्दल विचारा...",
    quickQueries: [
      "जास्त पावसासाठी कोणते पीक सर्वोत्कृष्ट आहे?",
      "तांदळाच्या करपा रोगावर उपाय काय?",
      "गव्हासाठी कोणते खत सर्वोत्तम आहे?",
      "टोमॅटोचे सध्याचे बाजारभाव काय आहेत?"
    ],
    knowledge: {
      rainfall: "🌾 **जास्त पावसासाठी उत्तम पिके:**\n\n1. **भात (धान)**: साचलेल्या पाण्यात उत्तम उत्पादन देते.\n2. **ऊस**: भरपूर पाण्याची गरज असणारे पीक.\n3. **अळू / अळकुडी**: दलदलीच्या जमिनीत उत्तम येते.\n\n💡 **सल्ला**: मुळे सडण्यापासून वाचवण्यासाठी शेतात पाण्याचा निचरा व्यवस्थित ठेवा.",
      blast: "🔬 **भातावरील करपा (Blast) रोगावर उपाय:**\n\n• **जैविक**: सुडोमोनास फ्लुरोसायन्स १० ग्रॅम/लीटर फवारा.\n• **रासायनिक**: ट्रायसायक्लाझोल ७५% WP ०.६ ग्रॅम/लीटर फवारा.",
      wheat: "🧪 **गव्हासाठी खत व्यवस्थापन:**\n\nNPK १२०:६०:४० किलोग्रॅम/हेक्टरी द्या. पेरणीच्या वेळी अर्धे नत्र आणि संपूर्ण स्फुरद व पालश द्या. उर्वरित नत्र पहिल्या पाण्यासोबत द्या.",
      tomato: "📈 **टोमॅटो बाजारभाव:**\n\nनाशिक व प्रमुख बाजार समित्यांमध्ये सध्याचा सरासरी भाव ₹३,२०० ते ₹३,८५० प्रति क्विंटल आहे.",
      default: "🌱 **ॲग्रोस्मार्ट कृषी सल्ला:**\n\nउत्कृष्ट उत्पन्नासाठी मातीचे आरोग्य जपा आणि पिकांची अदलाबदल करा."
    }
  },
  te: {
    welcome: "నమస్కారం! నేను అగ్రోస్మార్ట్ AI. పైన భాషను ఎంచుకుని మీ వ్యవసాయ ప్రశ్నలను అడగండి!",
    placeholder: "పంటలు, వర్షపాతం, ఎరువులు, తెగుళ్ళ గురించి అడగండి...",
    quickQueries: [
      "ఎక్కువ వర్షపాతానికి ఏ పంట ఉత్తమం?",
      "వరి ఆకు ఎండు తెగులు నివారణ ఎలా?",
      "గోధుమ పంటకు ఉత్తమ ఎరువు ఏది?",
      "టమోటా ప్రస్తుత మార్కెట్ ధరలు ఎంత?"
    ],
    knowledge: {
      rainfall: "🌾 **అధిక వర్షపాతానికి అనుకూలమైన పంటలు:**\n\n1. **వరి (ప్యాడీ)**: నీరు నిలిచే నేలల్లో అద్భుతమైన దిగుబడి ఇస్తుంది.\n2. **చెరకు**: ఎక్కువ నీటి లభ్యత అవసరం.\n3. **జనుము**: వెచ్చని, తేమతో కూడిన వాతావరణం అనుకూలం.\n\n💡 **సలహా**: వేరు కుళ్ళు నివారణకు పొలంలో నీటి పారుదల సౌకర్యం కల్పించండి.",
      blast: "🔬 **వరి అగ్గి తెగులు (Blast) నివారణ:**\n\n• **జైవిక**: సూడోమోనాస్ ఫ్లోరొసెన్స్ 10 గ్రా/లీటరు చొప్పున పిచికారీ చేయండి.\n• **రసాయన**: ట్రైసైక్లజోల్ 75% WP 0.6 గ్రా/లీటరు పిచికారీ చేయండి.",
      wheat: "🧪 **గోధుమ ఎరువుల మోతాదు:**\n\nNPK 120:60:40 కేజీలు/హెక్టారుకు వేయాలి. విత్తే సమయంలో సగం నత్రజని, పూర్తి భాస్వరం మరియు పొటాష్ వేయాలి.",
      tomato: "📈 **టమోటా మార్కెట్ ధరలు:**\n\nప్రధాన మార్కెట్లలో క్వింటాలుకు సగటు ధర ₹3,200 – ₹3,850 వరకు ఉంది.",
      default: "🌱 **అగ్రోస్మార్ట్ వ్యవసాయ సలహా:**\n\nనేల పరీక్ష ఆధారంగా సమతుల్య ఎరువులను వాడండి."
    }
  },
  ta: {
    welcome: "வணக்கம்! நான் அக்ரோஸ்மார்ட் AI. மேலே மொழியைத் தேர்ந்தெடுத்து கேள்விகளைக் கேளுங்கள்!",
    placeholder: "பயிர்கள், மழை, உரங்கள், நோய்கள் பற்றி கேட்கவும்...",
    quickQueries: [
      "அதிக மழைக்கு எந்த பயிர் சிறந்தது?",
      "நெல் குலை நோயைக் கட்டுப்படுத்துவது எப்படி?",
      "கோதுமைக்கு சிறந்த உரம் எது?",
      "தக்காளி தற்போதைய சந்தை விலை என்ன?"
    ],
    knowledge: {
      rainfall: "🌾 **அதிக மழைக்கான சிறந்த பயிர்கள்:**\n\n1. **நெல்**: தேங்கி நிற்கும் நீரில் மிகச் சிறந்த மகசூல் தரும்.\n2. **கரும்பு**: அதிக நீர் தேவைப்படும் பயிர்.\n3. **சணல்**: ஈரப்பதமான வானிலைக்கு ஏற்றது.\n\n💡 **ஆலோசனை**: வேர் அழுகலைத் தவிர்க்க வயலில் வடிகால் வசதி செய்யுங்கள்.",
      blast: "🔬 **நெல் குலை நோய் (Blast) சிகிச்சை:**\n\n• **இயற்கை**: சூடோமோனாஸ் ஃப்ளோரசன்ஸ் 10 கிராம்/லிட்டர் தெளிக்கவும்.\n• **ரசாயனம்**: டிரைசைக்ளசோல் 75% WP 0.6 கிராம்/லிட்டர் தெளிக்கவும்.",
      wheat: "🧪 **கோதுமை உர நிர்வாகம்:**\n\nNPK 120:60:40 கிலோ/ஹெக்டேர் இட வேண்டும். விதைப்பின் போது பாதி நைட்ரஜன் மற்றும் முழு பாஸ்பரஸ் இடவும்.",
      tomato: "📈 **தக்காளி சந்தை விலை:**\n\nமுக்கிய சந்தைகளில் தற்போதைய சராசரி விலை குவிண்டாலுக்கு ₹3,200 – ₹3,850 ஆக உள்ளது.",
      default: "🌱 **அக்ரோஸ்மார்ட் விவசாய ஆலோசனை:**\n\nமண் பரிசோதனை செய்து சீரான உரமிடுதலைப் பின்பற்றுங்கள்."
    }
  }
};

const AiAssistant = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const currentContent = MULTI_LANG_CONTENT[selectedLang] || MULTI_LANG_CONTENT['en'];

  // Initialize or update welcome message on language change
  useEffect(() => {
    setMessages([
      { sender: 'ai', text: currentContent.welcome }
    ]);
  }, [selectedLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Helper to pick best response based on user input
  const getAIResponse = (queryText, langCode) => {
    const content = MULTI_LANG_CONTENT[langCode] || MULTI_LANG_CONTENT['en'];
    const q = queryText.toLowerCase();

    if (q.includes('rain') || q.includes('वर्षा') || q.includes('ਬਾਰਿਸ਼') || q.includes('पाऊस') || q.includes('వర్షం') || q.includes('மழை')) {
      return content.knowledge.rainfall;
    }
    if (q.includes('blast') || q.includes('धान') || q.includes('ਝੋਨੇ') || q.includes('भात') || q.includes('వరి') || q.includes('நெல்')) {
      return content.knowledge.blast;
    }
    if (q.includes('wheat') || q.includes('गेहूं') || q.includes('ਕਣਕ') || q.includes('गव्हा') || q.includes('గోధుమ') || q.includes('கோதுமை')) {
      return content.knowledge.wheat;
    }
    if (q.includes('tomato') || q.includes('टमाटर') || q.includes('ਟਮਾਟਰ') || q.includes('टोमॅटो') || q.includes('టమోటా') || q.includes('தக்காளி')) {
      return content.knowledge.tomato;
    }
    return content.knowledge.default;
  };

  const sendQuery = async (queryText) => {
    if (!queryText.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: queryText }]);
    setInput('');
    setIsLoading(true);

    try {
      // Race condition with 2.5 second timeout so user NEVER gets stuck!
      const apiPromise = aiApi.chat(queryText);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 2500)
      );

      const response = await Promise.race([apiPromise, timeoutPromise]);
      const answer = response.data?.data;
      if (answer && answer.trim()) {
        setMessages(prev => [...prev, { sender: 'ai', text: answer }]);
      } else {
        const fallback = getAIResponse(queryText, selectedLang);
        setMessages(prev => [...prev, { sender: 'ai', text: fallback }]);
      }
    } catch (error) {
      // Immediate intelligent fallback response in chosen language
      const fallback = getAIResponse(queryText, selectedLang);
      setMessages(prev => [...prev, { sender: 'ai', text: fallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuery(input);
  };

  // TTS Readout feature
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const cleanText = text.replace(/[*#]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const langMap = { en: 'en-IN', hi: 'hi-IN', pa: 'pa-IN', mr: 'mr-IN', te: 'te-IN', ta: 'ta-IN' };
      utterance.lang = langMap[selectedLang] || 'en-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`ai-assistant-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="ai-fab" onClick={toggleChat} aria-label="Open AI Assistant">
          <Bot size={28} />
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window glass-panel">
          {/* Header */}
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={22} color="#fbbf24" />
              <h3>AgroSmart AI Advisor</h3>
            </div>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>

          {/* Language Selector Bar */}
          <div style={{
            padding: '6px 10px',
            background: 'rgba(21, 128, 61, 0.08)',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto'
          }}>
            <Languages size={14} color="#15803d" />
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#15803d', whiteSpace: 'nowrap' }}>
              Text Language:
            </span>
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  border: selectedLang === lang.code ? '1px solid #15803d' : '1px solid #cbd5e1',
                  background: selectedLang === lang.code ? '#15803d' : '#ffffff',
                  color: selectedLang === lang.code ? '#ffffff' : '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
          
          {/* Chat Body */}
          <div className="ai-chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <div className="message-content" style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                  {msg.sender === 'ai' && (
                    <button 
                      onClick={() => speakText(msg.text)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '8px',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        color: '#15803d',
                        background: 'rgba(22, 163, 74, 0.1)',
                        border: 'none',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />} 
                      {isSpeaking ? 'Stop' : 'Listen'}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai">
                <div className="message-content typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Pills in Selected Language */}
          <div style={{ padding: '8px 12px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {currentContent.quickQueries.map((qq, i) => (
              <button
                key={i}
                onClick={() => sendQuery(qq)}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#15803d',
                  cursor: 'pointer'
                }}
              >
                💡 {qq}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form className="ai-chat-footer" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentContent.placeholder}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
