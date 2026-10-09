import React, { useState, useEffect, useCallback } from 'react';
import { govtApi } from '../services/api';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Button/Button';
import {
  Users, Landmark, Sprout, BarChart3, ShoppingBag, Store,
  RefreshCw, TrendingUp, Leaf, Database, AlertCircle, Globe
} from 'lucide-react';
import './FarmerDashboard.css';

const StatCard = ({ icon: Icon, label, value, color, subtext }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: `4px solid ${color}` }}>
    <div style={{ padding: '14px', borderRadius: '12px', background: `${color}18`, color, flexShrink: 0 }}>
      <Icon size={30} />
    </div>
    <div>
      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>{label}</p>
      <p style={{ margin: '4px 0 0', fontSize: '2rem', fontWeight: '800', lineHeight: 1 }}>{value ?? '—'}</p>
      {subtext && <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{subtext}</p>}
    </div>
  </div>
);

const GovtOfficerDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await govtApi.getDashboard();
      setStats(res.data.data);
    } catch (err) {
      setError('Failed to load dashboard statistics. ' + (err.response?.data?.message || ''));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const navTabs = [
    { id: 'overview', label: 'Platform Overview' },
    { id: 'agriculture', label: 'Agricultural Data' },
    { id: 'market', label: 'Market Intelligence' },
  ];

  const cropsBySeasonEntries = stats?.cropsBySeason ? Object.entries(stats.cropsBySeason) : [];
  const totalCropsBySeason = cropsBySeasonEntries.reduce((acc, [, v]) => acc + v, 0) || 1;

  const SEASON_COLORS = {
    KHARIF: '#22c55e',
    RABI: '#3b82f6',
    ZAID: '#f59e0b',
    PERENNIAL: '#a855f7',
    UNKNOWN: '#94a3b8',
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '8px', padding: '20px 2rem 0' }}>
        {navTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer',
              background: activeTab === tab.id ? 'var(--color-primary)' : 'rgba(0,0,0,0.05)',
              color: activeTab === tab.id ? '#fff' : 'var(--color-text)',
              transition: 'all 0.2s',
            }}>
            {tab.label}
          </button>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <Button variant="outline" onClick={fetchStats} disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} className={loading ? 'spin-animation' : ''} /> Refresh
          </Button>
        </div>
      </div>

      <main className="dashboard-content">
        {error && (
          <div className="error-message" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Welcome Banner */}
        {activeTab === 'overview' && (
          <div className="glass-panel" style={{
            padding: '1.5rem 2rem',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, rgba(22,163,74,0.12), rgba(37,99,235,0.08))',
            borderLeft: '4px solid var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <Globe size={36} color="var(--color-primary)" />
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>
                Welcome, {user?.fullName} — Government Officer Dashboard
              </h2>
              <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                Real-time agricultural platform statistics for policy analysis, subsidy planning, and farmer welfare monitoring.
              </p>
            </div>
          </div>
        )}

        {/* ---- OVERVIEW TAB ---- */}
        {activeTab === 'overview' && (
          <>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}>Loading platform statistics...</div>
            ) : stats ? (
              <>
                {/* KPI Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  <StatCard icon={Users} label="Registered Farmers" value={stats.totalFarmers?.toLocaleString()} color="#22c55e" subtext="Active farming households" />
                  <StatCard icon={Landmark} label="Land Parcels" value={stats.totalLands?.toLocaleString()} color="#3b82f6" subtext="Registered farm lands" />
                  <StatCard icon={Sprout} label="Crop Entries" value={stats.totalCrops?.toLocaleString()} color="#f59e0b" subtext="All seasons combined" />
                  <StatCard icon={Store} label="Registered Dealers" value={stats.totalDealers?.toLocaleString()} color="#a855f7" subtext="Input supply network" />
                  <StatCard icon={ShoppingBag} label="Consumers" value={stats.totalConsumers?.toLocaleString()} color="#0ea5e9" subtext="Farm-to-consumer users" />
                  <StatCard icon={Database} label="Market Price Records" value={stats.totalMarketPriceRecords?.toLocaleString()} color="#f97316" subtext="APMC mandi data points" />
                </div>

                {/* Secondary Panels */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
                  {/* Stakeholder Distribution */}
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BarChart3 size={18} color="var(--color-primary)" /> Stakeholder Distribution
                    </h3>
                    {[
                      { label: 'Farmers', value: stats.totalFarmers, total: stats.totalFarmers + stats.totalDealers + stats.totalConsumers, color: '#22c55e' },
                      { label: 'Dealers', value: stats.totalDealers, total: stats.totalFarmers + stats.totalDealers + stats.totalConsumers, color: '#a855f7' },
                      { label: 'Consumers', value: stats.totalConsumers, total: stats.totalFarmers + stats.totalDealers + stats.totalConsumers, color: '#0ea5e9' },
                    ].map(row => {
                      const pct = row.total > 0 ? Math.round((row.value / row.total) * 100) : 0;
                      return (
                        <div key={row.label} style={{ marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.88rem' }}>
                            <span>{row.label}</span>
                            <strong>{row.value?.toLocaleString()} <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>({pct}%)</span></strong>
                          </div>
                          <div style={{ height: '8px', background: 'rgba(0,0,0,0.07)', borderRadius: '4px' }}>
                            <div style={{ height: '100%', background: row.color, borderRadius: '4px', width: `${pct}%`, transition: 'width 0.8s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* System Health */}
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.25rem' }}>🏥 Platform Health Monitor</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {[
                        { label: 'Database Connection', status: 'Operational', color: '#22c55e', dot: '●' },
                        { label: 'FastAPI ML Service', status: 'Operational', color: '#22c55e', dot: '●' },
                        { label: 'Ollama LLM Assistant', status: 'Standby', color: '#f59e0b', dot: '▲' },
                        { label: 'OpenWeather API', status: 'Live', color: '#22c55e', dot: '●' },
                        { label: 'APMC Data Feed', status: `${stats.totalMarketPriceRecords} records`, color: '#3b82f6', dot: '●' },
                      ].map(item => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                          <span style={{ color: item.color, fontWeight: '700', fontSize: '0.88rem' }}>{item.dot} {item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}

        {/* ---- AGRICULTURAL DATA TAB ---- */}
        {activeTab === 'agriculture' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}>Loading agricultural data...</div>
            ) : stats ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
                {/* Crop Distribution by Season */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Leaf size={18} color="#22c55e" /> Crop Distribution by Season
                  </h3>
                  {cropsBySeasonEntries.length > 0 ? (
                    cropsBySeasonEntries.map(([season, count]) => {
                      const pct = Math.round((count / totalCropsBySeason) * 100);
                      const color = SEASON_COLORS[season] || '#94a3b8';
                      return (
                        <div key={season} style={{ marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.88rem' }}>
                            <span style={{ fontWeight: '600' }}>{season}</span>
                            <strong>{count?.toLocaleString()} crops <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>({pct}%)</span></strong>
                          </div>
                          <div style={{ height: '8px', background: 'rgba(0,0,0,0.07)', borderRadius: '4px' }}>
                            <div style={{ height: '100%', background: color, borderRadius: '4px', width: `${pct}%`, transition: 'width 0.8s ease' }} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem' }}>No crop data available yet.</p>
                  )}
                </div>

                {/* Key Agricultural Metrics */}
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={18} color="var(--color-primary)" /> Key Agricultural Metrics
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                      { label: 'Average Lands per Farmer', value: stats.totalFarmers > 0 ? (stats.totalLands / stats.totalFarmers).toFixed(1) : '0', unit: 'plots/farmer' },
                      { label: 'Average Crops per Farmer', value: stats.totalFarmers > 0 ? (stats.totalCrops / stats.totalFarmers).toFixed(1) : '0', unit: 'crops/farmer' },
                      { label: 'Total Registered Mandis', value: stats.totalMandis?.toLocaleString(), unit: 'APMC markets' },
                      { label: 'Market Price Data Points', value: stats.totalMarketPriceRecords?.toLocaleString(), unit: 'price records' },
                      { label: 'Dealer Network Size', value: stats.totalDealers?.toLocaleString(), unit: 'agri-input dealers' },
                    ].map(metric => (
                      <div key={metric.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>{metric.label}</span>
                        <div style={{ textAlign: 'right' }}>
                          <strong style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>{metric.value}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{metric.unit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ---- MARKET INTELLIGENCE TAB ---- */}
        {activeTab === 'market' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}>Loading market data...</div>
            ) : stats ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Database size={18} color="#f97316" /> APMC & Mandi Network
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}>
                      <span>Total Registered Mandis</span>
                      <strong style={{ color: 'var(--color-primary)', fontSize: '1.3rem' }}>{stats.totalMandis?.toLocaleString()}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}>
                      <span>Total Market Price Records</span>
                      <strong style={{ color: '#f97316', fontSize: '1.3rem' }}>{stats.totalMarketPriceRecords?.toLocaleString()}</strong>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(22,163,74,0.06)', borderRadius: '10px', borderLeft: '3px solid #22c55e' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      📊 Market price data is collected daily from APMC mandis across all Indian states.
                      Use the Farmer Dashboard to view live crop price trends by state and district.
                    </p>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={18} color="#3b82f6" /> Dealer Marketplace Overview
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      Agricultural input dealers registered on the platform provide seeds, fertilizers, pesticides, and equipment to farmers.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.875rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}>
                      <span>Dealer Network</span>
                      <strong style={{ color: '#a855f7', fontSize: '1.3rem' }}>{stats.totalDealers?.toLocaleString()}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.875rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}>
                      <span>Consumer Users</span>
                      <strong style={{ color: '#0ea5e9', fontSize: '1.3rem' }}>{stats.totalConsumers?.toLocaleString()}</strong>
                    </div>
                    <div style={{ padding: '0.875rem', background: 'rgba(59,130,246,0.06)', borderRadius: '10px', borderLeft: '3px solid #3b82f6', marginTop: '0.5rem' }}>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                        💡 Policy Insight: Growing dealer-to-farmer direct market reduces middlemen dependency and improves farm income.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
};

export default GovtOfficerDashboard;
