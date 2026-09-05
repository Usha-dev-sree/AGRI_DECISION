import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useAuthStore } from '../store/authStore';
import { adminApi } from '../services/api';
import Button from '../components/Button/Button';
import UserManagement from '../features/admin/UserManagement';
import { Users, Landmark, Sprout, Activity, RefreshCw } from 'lucide-react';
import './FarmerDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await adminApi.getStats();
      setStats(response.data.data);
    } catch (err) {
      setError('Failed to fetch dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <div className="admin-nav" style={{ display: 'flex', gap: '10px', padding: '20px 2rem 0 2rem' }}>
        <button 
          onClick={() => setActiveTab('overview')} 
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            background: activeTab === 'overview' ? 'var(--color-primary)' : 'rgba(0,0,0,0.05)',
            color: activeTab === 'overview' ? '#fff' : 'var(--color-text)'
          }}
        >
          System Overview
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            background: activeTab === 'users' ? 'var(--color-primary)' : 'rgba(0,0,0,0.05)',
            color: activeTab === 'users' ? '#fff' : 'var(--color-text)'
          }}
        >
          User Management
        </button>
      </div>

      <main className="dashboard-content" style={{ padding: '20px 2rem' }}>
        {activeTab === 'overview' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>System Dashboard Analytics</h3>
              <Button variant="outline" onClick={fetchStats} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={16} className={loading ? 'spin-animation' : ''} /> Refresh Stats
              </Button>
            </div>

            {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

            {stats ? (
              <div>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                  <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '12px', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '8px', color: 'var(--color-primary)' }}>
                      <Users size={32} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Total Users</h4>
                      <p style={{ margin: '5px 0 0 0', fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.totalUsers}</p>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '12px', background: 'rgba(33, 150, 243, 0.1)', borderRadius: '8px', color: '#2196f3' }}>
                      <Landmark size={32} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Registered Lands</h4>
                      <p style={{ margin: '5px 0 0 0', fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.totalLands}</p>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '12px', background: 'rgba(255, 152, 0, 0.1)', borderRadius: '8px', color: '#ff9800' }}>
                      <Sprout size={32} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Crops Sown</h4>
                      <p style={{ margin: '5px 0 0 0', fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.totalCropsSown}</p>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '12px', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '8px', color: 'var(--color-primary-dark)' }}>
                      <Activity size={32} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Active Accounts</h4>
                      <p style={{ margin: '5px 0 0 0', fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.activeUsers}</p>
                    </div>
                  </div>
                </div>

                {/* Sub-sections */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
                  <div className="glass-panel" style={{ padding: '20px' }}>
                    <h4>User Distribution by Role</h4>
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                          <span>Farmers</span>
                          <strong>{stats.totalFarmers}</strong>
                        </div>
                        <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px' }}>
                          <div style={{ height: '100%', background: 'var(--color-primary)', borderRadius: '4px', width: `${(stats.totalFarmers / (stats.totalUsers || 1)) * 100}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                          <span>Dealers</span>
                          <strong>{stats.totalDealers}</strong>
                        </div>
                        <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px' }}>
                          <div style={{ height: '100%', background: '#2196f3', borderRadius: '4px', width: `${(stats.totalDealers / (stats.totalUsers || 1)) * 100}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                          <span>Consumers</span>
                          <strong>{stats.totalConsumers}</strong>
                        </div>
                        <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px' }}>
                          <div style={{ height: '100%', background: '#ff9800', borderRadius: '4px', width: `${(stats.totalConsumers / (stats.totalUsers || 1)) * 100}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                          <span>Government Officers</span>
                          <strong>{stats.totalGovtOfficers}</strong>
                        </div>
                        <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px' }}>
                          <div style={{ height: '100%', background: '#9c27b0', borderRadius: '4px', width: `${(stats.totalGovtOfficers / (stats.totalUsers || 1)) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px' }}>
                    <h4>System Health Monitor</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
                        <span>Database Status</span>
                        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>● Operational</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
                        <span>FastAPI ML Service</span>
                        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>● Operational</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
                        <span>Ollama Local LLM</span>
                        <span style={{ color: '#ff9800', fontWeight: 'bold' }}>▲ Standby</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center" style={{ padding: '3rem' }}>Loading system metrics...</div>
            )}
          </div>
        ) : (
          <UserManagement />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
