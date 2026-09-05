import React, { useState } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import Button from '../Button/Button';
import './DiseaseScanner.css';

const SAMPLE_DISEASES = [
  {
    id: 'tomato-blight',
    name: 'Tomato Early Blight (Alternaria solani)',
    crop: 'Tomato',
    severity: 'Moderate (68%)',
    pathogen: 'Fungal Pathogen',
    symptoms: 'Concentric dark brown rings on leaf surfaces with yellow halos.',
    organicTreatment: 'Spray diluted Neem seed kernel extract (5%) or Copper Oxychloride twice weekly.',
    chemicalTreatment: 'Apply Mancozeb 75% WP @ 2g/liter or Azoxystrobin @ 1ml/liter.',
    previewImg: '🍅 Leaf Spots'
  },
  {
    id: 'rice-blast',
    name: 'Rice Leaf Blast (Magnaporthe oryzae)',
    crop: 'Rice / Paddy',
    severity: 'High (84%)',
    pathogen: 'Fungal Blast Spores',
    symptoms: 'Spindle-shaped lesions with reddish-brown borders and grey centers on leaves.',
    organicTreatment: 'Apply Pseudomonas fluorescens bio-fungicide @ 10g/liter.',
    chemicalTreatment: 'Spray Tricyclazole 75% WP @ 0.6g/liter at onset of tillering.',
    previewImg: '🌾 Rice Spindles'
  },
  {
    id: 'potato-blight',
    name: 'Potato Late Blight (Phytophthora infestans)',
    crop: 'Potato',
    severity: 'Critical (91%)',
    pathogen: 'Oomycete Water Mold',
    symptoms: 'Water-soaked dark lesions spreading rapidly across leaves with white mold under humid conditions.',
    organicTreatment: 'Destroy infected haulms immediately and dust with wood ash/sulfur.',
    chemicalTreatment: 'Spray Cymoxanil + Mancozeb @ 2g/liter immediately.',
    previewImg: '🥔 Dark Lesions'
  },
  {
    id: 'cotton-curl',
    name: 'Cotton Leaf Curl Virus (CLCuV)',
    crop: 'Cotton',
    severity: 'Moderate (72%)',
    pathogen: 'Whitefly Vector Virus',
    symptoms: 'Upward curling of leaf margins with thickened veins and enations underneath.',
    organicTreatment: 'Set up yellow sticky traps (20/acre) to control Whitefly vectors.',
    chemicalTreatment: 'Spray Imidacloprid 17.8% SL @ 0.5ml/liter to eradicate whiteflies.',
    previewImg: '☁️ Leaf Margins'
  }
];

const DiseaseScanner = () => {
  const [selectedDisease, setSelectedDisease] = useState(SAMPLE_DISEASES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleSelectSample = (sample) => {
    setIsScanning(true);
    setSelectedDisease(sample);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
      }, 1500);
    }
  };

  return (
    <div className="disease-scanner">
      <div className="scanner-header">
        <h2>
          <Camera size={26} color="#dc2626" /> AI Crop Leaf Disease Scanner
        </h2>
        <p>Snap or upload crop leaf photos for instant neural-network disease diagnosis and treatment plans.</p>
      </div>

      <div className="scanner-main-grid">
        {/* Left Upload & Preset Box */}
        <div>
          <label htmlFor="file-upload" className="upload-zone" style={{ display: 'block' }}>
            {isScanning && <div className="scan-beam"></div>}
            <Upload size={38} color="#16a34a" style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ margin: '0 0 6px 0', color: '#0f5229' }}>
              {uploadedFile ? `Selected: ${uploadedFile}` : 'Upload Crop Leaf Photo'}
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
              Drag & drop image file or click to browse camera rolls
            </p>
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
          </label>

          <div style={{ marginTop: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>
              Or Select Demo Leaf Sample:
            </span>
            <div className="preset-pills">
              {SAMPLE_DISEASES.map(item => (
                <button
                  key={item.id}
                  className={`preset-pill ${selectedDisease.id === item.id ? 'active' : ''}`}
                  onClick={() => handleSelectSample(item)}
                >
                  {item.previewImg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Diagnosis Card */}
        <div className="diagnosis-result-card">
          {isScanning ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '260px' }}>
              <RefreshCw size={36} className="spin-animation" color="#16a34a" />
              <p style={{ marginTop: '16px', fontWeight: '600', color: '#0f5229' }}>
                Analyzing leaf cell patterns & pathogen vectors...
              </p>
            </div>
          ) : (
            <div>
              <div className="diagnosis-header">
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>
                    AI Diagnosis Outcome
                  </div>
                  <div className="disease-name">{selectedDisease.name}</div>
                </div>
                <span className="severity-badge">{selectedDisease.severity}</span>
              </div>

              <div style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '12px' }}>
                <strong>Pathogen Type:</strong> {selectedDisease.pathogen}
              </div>

              <div style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '16px' }}>
                <strong>Identified Symptoms:</strong> {selectedDisease.symptoms}
              </div>

              <div className="treatment-section">
                <h4>🌱 Recommended Organic Remedy</h4>
                <p>{selectedDisease.organicTreatment}</p>
              </div>

              <div className="treatment-section" style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', marginTop: '12px' }}>
                <h4 style={{ color: '#dc2626' }}>🧪 Chemical Spraying Protocol</h4>
                <p>{selectedDisease.chemicalTreatment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseScanner;
