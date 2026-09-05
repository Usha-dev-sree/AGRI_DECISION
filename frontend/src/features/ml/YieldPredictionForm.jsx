import React, { useState } from 'react';
import { mlApi } from '../../services/api';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import './MlForms.css';

const YieldPredictionForm = () => {
  const [formData, setFormData] = useState({
    state: 'Karnataka',
    district: 'Mysuru',
    crop: 'Rice',
    season: 'Kharif',
    area: '',
    annual_rainfall: '',
    fertilizer_used: '',
    pesticide_used: ''
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
        ...formData,
        area: parseFloat(formData.area),
        annual_rainfall: parseFloat(formData.annual_rainfall),
        fertilizer_used: parseFloat(formData.fertilizer_used || 0),
        pesticide_used: parseFloat(formData.pesticide_used || 0),
      };
      const response = await mlApi.predictYield(payload);
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-form-container glass-panel">
      <h3>Crop Yield Predictor</h3>
      <p>Estimate your crop yield based on farm parameters using AI.</p>
      
      <form onSubmit={handleSubmit} className="ml-form">
        <div className="form-row">
          <FormInput label="State" name="state" value={formData.state} onChange={handleChange} required />
          <FormInput label="District" name="district" value={formData.district} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Crop" name="crop" value={formData.crop} onChange={handleChange} required />
          <FormInput label="Season" name="season" value={formData.season} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Area Sown (Hectares)" name="area" type="number" step="0.1" value={formData.area} onChange={handleChange} required />
          <FormInput label="Annual Rainfall (mm)" name="annual_rainfall" type="number" value={formData.annual_rainfall} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <FormInput label="Fertilizer (kg/ha)" name="fertilizer_used" type="number" value={formData.fertilizer_used} onChange={handleChange} />
          <FormInput label="Pesticide (kg/ha)" name="pesticide_used" type="number" value={formData.pesticide_used} onChange={handleChange} />
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <Button type="submit" isLoading={loading} className="mt-4">
          Predict Yield
        </Button>
      </form>

      {result && (
        <div className="ml-result">
          <h4>Prediction Results</h4>
          <div className="result-stats">
            <div className="stat">
              <span className="label">Total Expected Yield</span>
              <span className="value">{result.predicted_yield} Tonnes</span>
            </div>
            <div className="stat">
              <span className="label">Yield per Hectare</span>
              <span className="value">{result.yield_per_hectare} Tonnes/Ha</span>
            </div>
            <div className="stat">
              <span className="label">AI Confidence</span>
              <span className="value">{(result.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YieldPredictionForm;
