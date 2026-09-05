import React, { useState, useEffect } from 'react';
import { farmerApi } from '../../services/api';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';

const LandsPage = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    landName: '',
    area: '',
    unit: 'ACRE',
    soilType: 'OTHER',
    irrigationType: 'RAINFED'
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      setLoading(true);
      const response = await farmerApi.getLands();
      setLands(response.data.data);
    } catch (err) {
      setError('Failed to load lands.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const payload = {
        ...formData,
        area: parseFloat(formData.area)
      };
      await farmerApi.addLand(payload);
      setShowAddForm(false);
      setFormData({ landName: '', area: '', unit: 'ACRE', soilType: 'OTHER', irrigationType: 'RAINFED' });
      fetchLands();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add land.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>My Lands</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Land'}
        </Button>
      </div>

      {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {showAddForm && (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3>Add New Land</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormInput label="Land Name" name="landName" value={formData.landName} onChange={handleInputChange} required />
            <FormInput label="Area" name="area" type="number" step="0.01" value={formData.area} onChange={handleInputChange} required />
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Unit</label>
              <select name="unit" value={formData.unit} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="ACRE">Acre</option>
                <option value="HECTARE">Hectare</option>
                <option value="BIGHA">Bigha</option>
                <option value="GUNTA">Gunta</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Soil Type</label>
              <select name="soilType" value={formData.soilType} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="ALLUVIAL">Alluvial</option>
                <option value="BLACK">Black</option>
                <option value="RED">Red</option>
                <option value="LATERITE">Laterite</option>
                <option value="CLAY">Clay</option>
                <option value="SANDY">Sandy</option>
                <option value="LOAMY">Loamy</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Irrigation Type</label>
              <select name="irrigationType" value={formData.irrigationType} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                <option value="RAINFED">Rainfed</option>
                <option value="CANAL">Canal</option>
                <option value="BOREWELL">Borewell</option>
                <option value="DRIP">Drip</option>
                <option value="SPRINKLER">Sprinkler</option>
                <option value="TANK">Tank</option>
                <option value="RIVER">River</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <Button type="submit" isLoading={submitLoading}>Save Land</Button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading lands...</p>
      ) : lands.length === 0 ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p>You have not added any lands yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {lands.map(land => (
            <div key={land.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginTop: 0 }}>{land.landName || 'Unnamed Land'}</h3>
              <p><strong>Area:</strong> {land.area} {land.unit}</p>
              <p><strong>Soil Type:</strong> {land.soilType}</p>
              <p><strong>Irrigation:</strong> {land.irrigationType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandsPage;
