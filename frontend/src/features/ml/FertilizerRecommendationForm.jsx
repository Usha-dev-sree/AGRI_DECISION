import React, { useState } from 'react';
import { mlApi } from '../../services/api';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import './MlForms.css';

const FertilizerRecommendationForm = () => {
  const [formData, setFormData] = useState({
    crop: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        crop: formData.crop,
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        ph: parseFloat(formData.ph),
      };
      const response = await mlApi.recommendFertilizer(payload);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Recommendation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-form-container glass-panel">
      <h3>Fertilizer Recommendation</h3>
      <p>Get precise fertilizer dosages tailored to your soil health and crop.</p>
      
      <form onSubmit={handleSubmit} className="ml-form">
        <div className="form-row">
          <FormInput label="Target Crop" name="crop" value={formData.crop} onChange={handleChange} required />
          <FormInput label="Soil pH" name="ph" type="number" step="0.1" value={formData.ph} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Nitrogen Content (N)" name="nitrogen" type="number" step="0.1" value={formData.nitrogen} onChange={handleChange} required />
          <FormInput label="Phosphorus Content (P)" name="phosphorus" type="number" step="0.1" value={formData.phosphorus} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Potassium Content (K)" name="potassium" type="number" step="0.1" value={formData.potassium} onChange={handleChange} required />
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <Button type="submit" isLoading={loading} className="mt-4">
          Get Recommendation
        </Button>
      </form>

      {result && (
        <div className="ml-result">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }}></span>
            Soil Diagnostic Report & Recommendation
          </h4>
          
          {/* N-P-K Bar Graph */}
          <div className="soil-chart" style={{ margin: '20px 0', background: 'rgba(0, 0, 0, 0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h5 style={{ margin: '0 0 15px 0', color: 'var(--color-text-secondary)' }}>Nutrient Analysis</h5>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>Nitrogen (N): <strong>{formData.nitrogen} ppm</strong></span>
                  <span style={{ color: parseFloat(formData.nitrogen) < 30 ? '#e57373' : '#81c784' }}>
                    {parseFloat(formData.nitrogen) < 30 ? 'Deficient' : 'Optimal'}
                  </span>
                </div>
                <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min((parseFloat(formData.nitrogen) / 100) * 100, 100)}%`, background: parseFloat(formData.nitrogen) < 30 ? '#e57373' : '#4caf50', borderRadius: '4px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>Phosphorus (P): <strong>{formData.phosphorus} ppm</strong></span>
                  <span style={{ color: parseFloat(formData.phosphorus) < 20 ? '#e57373' : '#81c784' }}>
                    {parseFloat(formData.phosphorus) < 20 ? 'Deficient' : 'Optimal'}
                  </span>
                </div>
                <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min((parseFloat(formData.phosphorus) / 100) * 100, 100)}%`, background: parseFloat(formData.phosphorus) < 20 ? '#e57373' : '#4caf50', borderRadius: '4px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>Potassium (K): <strong>{formData.potassium} ppm</strong></span>
                  <span style={{ color: parseFloat(formData.potassium) < 20 ? '#e57373' : '#81c784' }}>
                    {parseFloat(formData.potassium) < 20 ? 'Deficient' : 'Optimal'}
                  </span>
                </div>
                <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min((parseFloat(formData.potassium) / 100) * 100, 100)}%`, background: parseFloat(formData.potassium) < 20 ? '#e57373' : '#4caf50', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="result-stats" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="stat" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
              <span className="label" style={{ fontWeight: '600' }}>Recommended Treatment</span>
              <span className="value" style={{ color: 'var(--color-primary-dark)', fontSize: '1.2rem', fontWeight: 'bold' }}>{result.recommended_fertilizer}</span>
            </div>
            
            <div className="stat" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
              <span className="label">Dosage Recommendation</span>
              <span className="value" style={{ fontWeight: 'bold' }}>{result.dosage_kg_per_hectare} kg / hectare</span>
            </div>

            <div className="stat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
              <span className="label" style={{ fontWeight: '600' }}>Application Instructions</span>
              <span style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.6', background: 'rgba(76, 175, 80, 0.05)', padding: '10px', borderRadius: '6px', width: '100%' }}>
                {result.application_instructions}
              </span>
            </div>

            {(parseFloat(formData.ph) < 6.0 || parseFloat(formData.ph) > 7.5) && (
              <div style={{ marginTop: '10px', padding: '10px', background: '#fff9c4', borderRadius: '6px', borderLeft: '4px solid #fbc02d', fontSize: '0.85rem', color: '#5d4037' }}>
                <strong>pH Warning:</strong> Optimal soil pH for crop nutrient uptake is between 6.0 and 7.5. Your current soil pH is {formData.ph}. Consider treating with lime (if acidic) or sulfur (if alkaline) to balance the pH.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendationForm;
