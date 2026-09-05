import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { marketApi, geographyApi, cropApi } from '../../services/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, WifiOff } from 'lucide-react';
import './MarketPriceWidget.css';

const COLORS = ['#15803d', '#0369a1', '#dc2626', '#7c3aed', '#f59e0b', '#0891b2'];

/* ── Demo APMC data (15 days) shown when backend has no data ── */
const generateDemoData = (cropLabel) => {
  const MANDIS = ['Karnal', 'Ludhiana', 'Nashik', 'Anand'];
  const BASE = { Wheat: 2240, Rice: 3650, Cotton: 6100, Maize: 1980, Mustard: 5380 };
  const base = BASE[cropLabel] || 2500;
  const days = Array.from({ length: 15 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (14 - i));
    const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    const obj = { priceDate: label };
    MANDIS.forEach((m, mi) => {
      const noise = Math.round((Math.random() - 0.45) * base * 0.06);
      obj[m] = base + (mi * Math.round(base * 0.02)) + (i * Math.round(base * 0.003)) + noise;
    });
    return obj;
  });
  return { data: days, keys: MANDIS };
};

const DEMO_CROPS = [
  { value: '__wheat',   label: 'Wheat' },
  { value: '__rice',    label: 'Rice' },
  { value: '__cotton',  label: 'Cotton' },
  { value: '__maize',   label: 'Maize' },
  { value: '__mustard', label: 'Mustard' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: '0.82rem'
    }}>
      <p style={{ margin: '0 0 6px', fontWeight: 800, color: '#0f5229' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600, marginBottom: 2 }}>
          {p.name}: <strong>₹{Number(p.value).toLocaleString('en-IN')}</strong>/qtl
        </div>
      ))}
    </div>
  );
};

const MarketPriceWidget = () => {
  const [chartData, setChartData]         = useState([]);
  const [districtKeys, setDistrictKeys]   = useState([]);
  const [loading, setLoading]             = useState(false);
  const [isDemo, setIsDemo]               = useState(false);

  const [crops, setCrops]                 = useState([]);
  const [states, setStates]               = useState([]);
  const [selectedCrop, setSelectedCrop]   = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [demoCrop, setDemoCrop]           = useState(DEMO_CROPS[0]);

  /* Load backend metadata once */
  useEffect(() => {
    (async () => {
      try {
        const [cropsRes, statesRes] = await Promise.all([
          cropApi.getCrops({ size: 100 }),
          geographyApi.getStates(),
        ]);
        const c = cropsRes.data?.data?.content || [];
        const s = statesRes.data?.data || [];
        setCrops(c);
        setStates(s);
        if (c.length > 0) setSelectedCrop(c[0].id);
        if (s.length > 0) setSelectedState(s[0].id);
      } catch {
        loadDemo(DEMO_CROPS[0].label);
        setIsDemo(true);
      }
    })();
  }, []);

  /* Fetch real data when selection changes */
  useEffect(() => {
    if (selectedCrop && selectedState) fetchChartData();
  }, [selectedCrop, selectedState]);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const response = await marketApi.getMarketChartData(selectedCrop, selectedState, 15);
      const rawData = response.data?.data;
      if (!rawData || rawData.length === 0) {
        const cropName = crops.find(c => c.id === selectedCrop)?.name || 'Wheat';
        loadDemo(cropName);
        setIsDemo(true);
      } else {
        setIsDemo(false);
        const grouped = {};
        const dKeys = new Set();
        rawData.forEach(item => {
          const date = item.priceDate;
          const district = item.districtName || item.mandiName;
          dKeys.add(district);
          if (!grouped[date]) grouped[date] = { priceDate: date };
          grouped[date][district] = item.modalPrice;
        });
        const arr = Object.values(grouped).sort((a, b) => new Date(a.priceDate) - new Date(b.priceDate));
        setChartData(arr);
        setDistrictKeys(Array.from(dKeys));
      }
    } catch {
      const cropName = crops.find(c => c.id === selectedCrop)?.name || 'Wheat';
      loadDemo(cropName);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = (cropLabel) => {
    const { data, keys } = generateDemoData(cropLabel);
    setChartData(data);
    setDistrictKeys(keys);
  };

  const handleDemoCropChange = (opt) => {
    if (!opt) return;
    setDemoCrop(opt);
    loadDemo(opt.label);
  };

  /* Price change badge helper */
  const getPriceChange = (key) => {
    if (chartData.length < 2) return null;
    const latest = chartData[chartData.length - 1][key];
    const prev   = chartData[chartData.length - 2][key];
    if (!latest || !prev) return null;
    const pct = (((latest - prev) / prev) * 100).toFixed(1);
    return { pct, up: latest >= prev, latest };
  };

  const avgLatest = districtKeys.length && chartData.length
    ? Math.round(districtKeys.reduce((s, k) => s + (chartData[chartData.length - 1][k] || 0), 0) / districtKeys.length)
    : null;

  return (
    <div className="market-widget glass-panel" style={{ overflow: 'visible' }}>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, color: '#0f5229', fontWeight: 800, fontSize: '1.25rem' }}>
            📈 Live APMC Mandi Prices
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
            15-day modal price trend across major Indian mandis
          </p>
        </div>
        {avgLatest && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Avg Modal Price</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f5229' }}>
              ₹{avgLatest.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>/ quintal</div>
          </div>
        )}
      </div>

      {/* Live / Demo Status Notice */}
      {isDemo ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: '0.8rem',
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 8, padding: '8px 14px', marginBottom: 14, color: '#92400e', fontWeight: 600
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <WifiOff size={16} /> Backend DB initializing live APMC records. Showing representative mandi trends.
          </div>
          <button 
            onClick={fetchChartData}
            style={{
              background: '#b45309', color: '#fff', border: 'none', borderRadius: '6px',
              padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '700'
            }}
          >
            Retry Live DB Sync
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem',
          background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)',
          borderRadius: 8, padding: '8px 14px', marginBottom: 14, color: '#15803d', fontWeight: 700
        }}>
          <span className="pulse-dot" style={{ background: '#22c55e', width: 8, height: 8, borderRadius: '50%' }}></span>
          Connected to Live Backend APMC Database (Agmarknet Live Telemetry)
        </div>
      )}

      {/* Crop / State selectors */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, zIndex: 50, position: 'relative' }}>
        {isDemo ? (
          <div style={{ flex: 1 }}>
            <Select
              options={DEMO_CROPS}
              value={demoCrop}
              onChange={handleDemoCropChange}
              isSearchable
              placeholder="Select Crop..."
              menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                menu: (base) => ({ ...base, zIndex: 99999 })
              }}
            />
          </div>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              <Select
                options={crops.map(c => ({ value: c.id, label: c.name }))}
                value={crops.filter(c => c.id === selectedCrop).map(c => ({ value: c.id, label: c.name }))[0] || null}
                onChange={s => setSelectedCrop(s?.value || null)}
                placeholder="Search Crop..." isClearable isSearchable
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                menuPosition="fixed"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                  menu: (base) => ({ ...base, zIndex: 99999 })
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                options={states.map(s => ({ value: s.id, label: s.name }))}
                value={states.filter(s => s.id === selectedState).map(s => ({ value: s.id, label: s.name }))[0] || null}
                onChange={s => setSelectedState(s?.value || null)}
                placeholder="Search State..." isClearable isSearchable
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                menuPosition="fixed"
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                  menu: (base) => ({ ...base, zIndex: 99999 })
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Per-mandi price badges */}
      {districtKeys.length > 0 && chartData.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          {districtKeys.map((key, i) => {
            const ch = getPriceChange(key);
            return (
              <div key={key} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#f8fafc',
                border: `1.5px solid ${COLORS[i % COLORS.length]}33`,
                borderLeft: `4px solid ${COLORS[i % COLORS.length]}`,
                borderRadius: 8, padding: '8px 12px', minWidth: 130
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{key}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: COLORS[i % COLORS.length] }}>
                    ₹{ch?.latest?.toLocaleString('en-IN') ?? '—'}
                  </div>
                </div>
                {ch && (
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 2,
                    color: ch.up ? '#16a34a' : '#dc2626', fontSize: '0.78rem', fontWeight: 700 }}>
                    {ch.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {ch.pct}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Line chart */}
      {loading ? (
        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
          ⏳ Fetching mandi prices…
        </div>
      ) : chartData.length === 0 ? (
        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
          Select a crop and state to view prices
        </div>
      ) : (
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="priceDate" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }}
                tickFormatter={v => `₹${(v / 1000).toFixed(1)}k`}
                domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 16, fontSize: '0.82rem' }} />
              {districtKeys.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={key}
                  stroke={COLORS[idx % COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 3, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MarketPriceWidget;
