import React, { useState } from 'react';
import { mlApi } from '../../services/api';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import './MlForms.css';

const CropRecommendationForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
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
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      };
      const response = await mlApi.recommendCrop(payload);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Recommendation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-form-container glass-panel">
      <h3>Crop Recommendation</h3>
      <p>Discover the best crops to grow based on your soil health and weather data.</p>
      
      <form onSubmit={handleSubmit} className="ml-form">
        <div className="form-row">
          <FormInput label="Nitrogen Content (N)" name="nitrogen" type="number" step="0.1" value={formData.nitrogen} onChange={handleChange} required />
          <FormInput label="Phosphorus Content (P)" name="phosphorus" type="number" step="0.1" value={formData.phosphorus} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Potassium Content (K)" name="potassium" type="number" step="0.1" value={formData.potassium} onChange={handleChange} required />
          <FormInput label="Soil pH" name="ph" type="number" step="0.1" value={formData.ph} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Temperature (°C)" name="temperature" type="number" step="0.1" value={formData.temperature} onChange={handleChange} required />
          <FormInput label="Humidity (%)" name="humidity" type="number" step="0.1" value={formData.humidity} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Rainfall (mm)" name="rainfall" type="number" step="0.1" value={formData.rainfall} onChange={handleChange} required />
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <Button type="submit" isLoading={loading} className="mt-4">
          Get Recommendation
        </Button>
      </form>

      {result && result.recommended_crops && (
        <div className="ml-result">
          <h4>Top Recommended Crops</h4>
          <div className="result-stats" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {result.recommended_crops.map((crop, index) => (
              <div key={index} className="stat" style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                <span className="value" style={{ fontSize: '1.1rem' }}>{crop}</span>
                <span className="label">Confidence: {(result.confidence_scores[index] * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropRecommendationForm;
