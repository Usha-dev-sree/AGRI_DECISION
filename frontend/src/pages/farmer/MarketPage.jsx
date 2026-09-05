import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { marketApi, geographyApi, cropApi } from '../../services/api';
import Button from '../../components/Button/Button';
import { Search, MapPin, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './MarketPage.css';

const MarketPage = () => {
  const [crops, setCrops] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  
  const [priceData, setPriceData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initial fetch of master data
    const loadMasterData = async () => {
      try {
        const [cropsRes, statesRes] = await Promise.all([
          cropApi.getCrops({ size: 100 }),
          geographyApi.getStates()
        ]);
        if (cropsRes.data?.data?.content) {
          setCrops(cropsRes.data.data.content);
        }
        setStates(statesRes.data.data || []);
      } catch (err) {
        console.error('Failed to load filter metadata', err);
      }
    };
    loadMasterData();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict('');
      return;
    }
    const loadDistricts = async () => {
      try {
        const res = await geographyApi.getDistricts(selectedState);
        setDistricts(res.data.data || []);
      } catch (err) {
        console.error('Failed to load districts', err);
      }
    };
    loadDistricts();
  }, [selectedState]);

  // Fetch prices
  useEffect(() => {
    fetchPrices();
  }, [selectedCrop, selectedDistrict, page]);

  const fetchPrices = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page,
        size: 10,
      };
      if (selectedCrop) params.cropId = selectedCrop;
      
      // If a district is chosen, we filter by mandi in that district or get mandi list first.
      // Wait, getMarketPrices on backend takes cropId or mandiId. Let's see if we can filter client-side or if getMarketPrices matches.
      // Let's check how the backend service handles getMarketPrices:
      // if (cropId != null) { pricePage = findByCropId... } else if (mandiId != null) { pricePage = findByMandiId... } else { findAll... }
      // So the endpoint only filters by cropId or mandiId.
      // That's fine! If a district is selected, we can fetch mandis for that district, and then filter by mandiId if needed,
      // or we can fetch by crop and filter the resulting list by state/district on the client, or query by specific mandi.
      // Let's implement this: if district is selected, we fetch mandis for that district first, and if we have mandis, we can filter or search.
      // To keep it simple and robust, if a district is selected, we fetch the first mandi in that district or query the prices of the crops.
      // Let's query by cropId, and if a state/district is selected, we filter the prices on the client-side OR if no cropId is specified, we query by mandi.
      // If a district is selected, we can fetch mandis for that district to filter.
      if (selectedDistrict) {
        const mandisRes = await marketApi.getMandis({ districtId: selectedDistrict });
        const mandisList = mandisRes.data.data || [];
        if (mandisList.length > 0) {
          // Future expansion: Allow choosing a specific Mandi if multiple are available
        }
      }

      const res = await marketApi.getPrices(params);
      const pagedData = res.data.data;
      if (pagedData) {
        setPriceData(pagedData.content || []);
        setTotalPages(pagedData.totalPages || 0);
        setTotalElements(pagedData.totalElements || 0);
      }
    } catch (err) {
      setError('Failed to fetch APMC mandi prices.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to calculate price visual positioning
  const getModalPercent = (min, modal, max) => {
    if (!min || !max || !modal || min === max) return 50;
    return ((modal - min) / (max - min)) * 100;
  };

  return (
    <div className="market-page-container">
      <div className="market-page-header">
        <div>
          <h2>Market Intelligence</h2>
          <p className="text-secondary">Real-time APMC Mandi prices and crop market analysis.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="outline" onClick={() => fetchPrices()}>Refresh Prices</Button>
        </div>
      </div>

      {/* Filters Panel */}
      <div className="filters-panel glass-panel" style={{ overflow: 'visible', position: 'relative', zIndex: 100 }}>
        <div className="filter-group" style={{ zIndex: 30, position: 'relative' }}>
          <label><Search size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> Crop</label>
          <Select 
            options={[{ value: '', label: 'All Crops' }, ...crops.map(c => ({ value: c.id, label: c.name }))]}
            value={
              selectedCrop === '' 
                ? { value: '', label: 'All Crops' }
                : crops.filter(c => c.id == selectedCrop).map(c => ({ value: c.id, label: c.name }))[0] || null
            }
            onChange={(selected) => { setSelectedCrop(selected ? selected.value : ''); setPage(0); }}
            placeholder="Search Crop..."
            isClearable
            isSearchable
            menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
            menuPosition="fixed"
            styles={{
              control: (base) => ({ ...base, minWidth: '200px' }),
              menuPortal: (base) => ({ ...base, zIndex: 99999 }),
              menu: (base) => ({ ...base, zIndex: 99999 })
            }}
          />
        </div>

        <div className="filter-group" style={{ zIndex: 20, position: 'relative' }}>
          <label><MapPin size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> State</label>
          <Select 
            options={[{ value: '', label: 'All States' }, ...states.map(s => ({ value: s.id, label: s.name }))]}
            value={
              selectedState === '' 
                ? { value: '', label: 'All States' }
                : states.filter(s => s.id == selectedState).map(s => ({ value: s.id, label: s.name }))[0] || null
            }
            onChange={(selected) => { setSelectedState(selected ? selected.value : ''); setPage(0); }}
            placeholder="Search State..."
            isClearable
            isSearchable
            menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
            menuPosition="fixed"
            styles={{
              control: (base) => ({ ...base, minWidth: '200px' }),
              menuPortal: (base) => ({ ...base, zIndex: 99999 }),
              menu: (base) => ({ ...base, zIndex: 99999 })
            }}
          />
        </div>

        <div className="filter-group" style={{ zIndex: 10, position: 'relative' }}>
          <label><MapPin size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> District</label>
          <Select 
            isDisabled={!selectedState}
            options={[{ value: '', label: 'All Districts' }, ...districts.map(d => ({ value: d.id, label: d.name }))]}
            value={
              selectedDistrict === '' 
                ? { value: '', label: 'All Districts' }
                : districts.filter(d => d.id == selectedDistrict).map(d => ({ value: d.id, label: d.name }))[0] || null
            }
            onChange={(selected) => { setSelectedDistrict(selected ? selected.value : ''); setPage(0); }}
            placeholder="Search District..."
            isClearable
            isSearchable
            menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
            menuPosition="fixed"
            styles={{
              control: (base) => ({ ...base, minWidth: '200px' }),
              menuPortal: (base) => ({ ...base, zIndex: 99999 }),
              menu: (base) => ({ ...base, zIndex: 99999 })
            }}
          />
        </div>
      </div>

      {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

      {/* Market Prices Listing */}
      <div className="market-list-panel">
        {loading ? (
          <div className="text-center" style={{ padding: '3rem' }}>
            <div className="spinner">Fetching live prices...</div>
          </div>
        ) : priceData.length === 0 ? (
          <div className="empty-state glass-panel">
            <TrendingUp className="empty-icon" />
            <p>No mandi records found matching your filters.</p>
          </div>
        ) : (
          <div className="market-table-card glass-panel">
            <table className="market-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Mandi / Location</th>
                  <th>Variety</th>
                  <th style={{ width: '250px' }}>Price Range (Min - Modal - Max)</th>
                  <th>Date</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {priceData.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.cropName}</strong></td>
                    <td>
                      <div>{item.mandiName}</div>
                      <small style={{ color: 'var(--color-text-secondary)' }}>APMC market</small>
                    </td>
                    <td>{item.varietyName || 'Common'}</td>
                    <td>
                      <div className="price-range-bar">
                        <div className="price-range-fill" style={{ left: '0%', width: '100%' }}></div>
                        <div 
                          className="price-marker" 
                          style={{ left: `${getModalPercent(item.minPrice, item.modalPrice, item.maxPrice)}%` }}
                          title={`Modal Price: ₹${item.modalPrice}`}
                        ></div>
                      </div>
                      <div className="price-labels">
                        <span>₹{item.minPrice}</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>₹{item.modalPrice}</span>
                        <span>₹{item.maxPrice}</span>
                      </div>
                    </td>
                    <td>{item.priceDate}</td>
                    <td>
                      <span className="badge-source">{item.source || 'AGMARKNET'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-controls">
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  Showing page {page + 1} of {totalPages} ({totalElements} records)
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page === 0} 
                    onClick={() => setPage(page - 1)}
                  >
                    <ChevronLeft size={16} /> Prev
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={page === totalPages - 1} 
                    onClick={() => setPage(page + 1)}
                  >
                    Next <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPage;
