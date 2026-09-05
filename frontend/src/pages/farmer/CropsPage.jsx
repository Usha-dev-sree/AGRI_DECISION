import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { farmerApi, cropApi } from '../../services/api';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';

const CropsPage = () => {
  const [farmerCrops, setFarmerCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [availableLands, setAvailableLands] = useState([]);
  const [availableCrops, setAvailableCrops] = useState([]);
  
  const [formData, setFormData] = useState({
    landId: '',
    cropId: '',
    season: 'KHARIF',
    seasonYear: new Date().getFullYear(),
    areaSown: '',
    expectedYield: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cropsRes, landsRes, allCropsRes] = await Promise.all([
        farmerApi.getCrops(),
        farmerApi.getLands(),
        cropApi.getCrops({ size: 100 }) // fetch a large list for dropdown
      ]);
      setFarmerCrops(cropsRes.data.data);
      setAvailableLands(landsRes.data.data);
      if (allCropsRes.data.data && allCropsRes.data.data.content) {
          setAvailableCrops(allCropsRes.data.data.content);
      }
    } catch (err) {
      setError('Failed to load data.');
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
        landId: formData.landId ? parseInt(formData.landId) : null,
        cropId: parseInt(formData.cropId),
        seasonYear: parseInt(formData.seasonYear),
        areaSown: formData.areaSown ? parseFloat(formData.areaSown) : null,
        expectedYield: formData.expectedYield ? parseFloat(formData.expectedYield) : null
      };
      await farmerApi.addCrop(payload);
      setShowAddForm(false);
      setFormData({
        landId: '', cropId: '', season: 'KHARIF', 
        seasonYear: new Date().getFullYear(), areaSown: '', expectedYield: ''
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add crop.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>My Crops</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add New Crop'}
        </Button>
      </div>

      {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {showAddForm && (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3>Add New Crop</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ zIndex: 50, position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Select Crop</label>
              <Select 
                options={availableCrops.map(crop => ({ value: crop.id, label: crop.name }))}
                value={availableCrops.filter(c => c.id == formData.cropId).map(c => ({ value: c.id, label: c.name }))[0] || null}
                onChange={(selected) => handleInputChange({ target: { name: 'cropId', value: selected ? selected.value : '' } })}
                placeholder="-- Select Crop (Type to search) --"
                isClearable
                isSearchable
                required
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                menuPosition="fixed"
                styles={{
                  control: (base) => ({ ...base, padding: '0.2rem', borderRadius: '4px', borderColor: '#ddd' }),
                  menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                  menu: (base) => ({ ...base, zIndex: 99999 })
                }}
              />
            </div>

            <div style={{ zIndex: 40, position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Select Land</label>
              <Select 
                options={[{ value: '', label: '-- No Land / Default --' }, ...availableLands.map(land => ({ value: land.id, label: land.landName || `Land (${land.area} ${land.unit})` }))]}
                value={
                  formData.landId === '' 
                    ? { value: '', label: '-- No Land / Default --' }
                    : availableLands.filter(l => l.id == formData.landId).map(l => ({ value: l.id, label: l.landName || `Land (${l.area} ${l.unit})` }))[0] || null
                }
                onChange={(selected) => handleInputChange({ target: { name: 'landId', value: selected ? selected.value : '' } })}
                placeholder="-- Select Land (Type to search) --"
                isClearable
                isSearchable
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                menuPosition="fixed"
                styles={{
                  control: (base) => ({ ...base, padding: '0.2rem', borderRadius: '4px', borderColor: '#ddd' }),
                  menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                  menu: (base) => ({ ...base, zIndex: 99999 })
                }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Season</label>
                  <select name="season" value={formData.season} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <option value="KHARIF">Kharif</option>
                    <option value="RABI">Rabi</option>
                    <option value="ZAID">Zaid</option>
                  </select>
                </div>
                <FormInput label="Season Year" name="seasonYear" type="number" value={formData.seasonYear} onChange={handleInputChange} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormInput label="Area Sown" name="areaSown" type="number" step="0.01" value={formData.areaSown} onChange={handleInputChange} />
                <FormInput label="Expected Yield (quintals)" name="expectedYield" type="number" step="0.01" value={formData.expectedYield} onChange={handleInputChange} />
            </div>
            
            <Button type="submit" isLoading={submitLoading} className="mt-2">Save Crop</Button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading crops...</p>
      ) : farmerCrops.length === 0 ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p>You have not added any crops yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {farmerCrops.map(crop => (
            <div key={crop.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginTop: 0, color: 'var(--color-primary-dark)' }}>{crop.cropName}</h3>
              <p><strong>Season:</strong> {crop.season} {crop.seasonYear}</p>
              {crop.landName && <p><strong>Land:</strong> {crop.landName}</p>}
              <p><strong>Status:</strong> {crop.status}</p>
              {crop.areaSown && <p><strong>Area Sown:</strong> {crop.areaSown} {crop.areaUnit}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropsPage;
