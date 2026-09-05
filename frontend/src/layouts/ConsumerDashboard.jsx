import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import MarketPriceWidget from '../features/market/MarketPriceWidget';
import './FarmerDashboard.css'; // Reusing layout css

import Navbar from '../components/Navbar/Navbar';

const ConsumerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Mock agricultural produce available for purchase
  const [listings] = useState([
    { id: 1, seller: 'Rajesh Kumar (Farmer)', crop: 'Premium Basmati Rice', location: 'Karnal, Haryana', price: 65, unit: 'kg', type: 'ORGANIC' },
    { id: 2, seller: 'Amit Patel (Farmer)', crop: 'Fresh Organic Potatoes', location: 'Anand, Gujarat', price: 25, unit: 'kg', type: 'ORGANIC' },
    { id: 3, seller: 'Sukhdev Singh (Farmer)', crop: 'Sarbati Sharbati Wheat', location: 'Ludhiana, Punjab', price: 42, unit: 'kg', type: 'CONVENTIONAL' },
    { id: 4, seller: 'Agro Seeds Store (Dealer)', crop: 'High Yield Tomato Seeds', location: 'Nashik, Maharashtra', price: 180, unit: 'packet', type: 'SEED' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [orderLogs, setOrderLogs] = useState([]);

  const handleInquire = (listing) => {
    alert(`Inquiry sent successfully to ${listing.seller} for ${listing.crop}! They will contact you shortly.`);
    setOrderLogs([
      { id: Date.now(), crop: listing.crop, seller: listing.seller, price: listing.price, status: 'Inquiry Sent' },
      ...orderLogs
    ]);
  };

  const filteredListings = listings.filter(item =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #4caf50' }}>
            <h3>Direct Farm Deals</h3>
            <p>Buy fresh crops directly from local farmers at fair prices.</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Supporting local agriculture directly</p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #ff9800' }}>
            <h3>Verified Quality</h3>
            <p>Every listing goes through verified checks before displaying here.</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>100% Transparency guaranteed</p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #2196f3' }}>
            <h3>Active Inquiries</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#2196f3' }}>
              {orderLogs.length} Pending
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Fulfillment & direct chat updates</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
          <div className="glass-panel" style={{ padding: 'var(--space-6)' }}>
            <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: 'var(--space-4)' }}>Marketplace Produce Explorer</h2>
            <FormInput
              label="Search crops, farmers or locations"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Rice, Punjab, Farmer..."
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              {filteredListings.map(item => (
                <div key={item.id} className="glass-panel" style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{item.crop}</h3>
                    <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>₹{item.price} / {item.unit}</p>
                    <p style={{ margin: '0.1rem 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Sold by: {item.seller}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>📍 {item.location}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge" style={{
                      display: 'inline-block',
                      marginBottom: '0.5rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: item.type === 'ORGANIC' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(33, 150, 243, 0.15)',
                      color: item.type === 'ORGANIC' ? '#4caf50' : '#2196f3'
                    }}>
                      {item.type}
                    </span>
                    <br />
                    <Button size="sm" onClick={() => handleInquire(item)}>Inquire / Buy</Button>
                  </div>
                </div>
              ))}
              {filteredListings.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>No matches found</p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <MarketPriceWidget />

            {orderLogs.length > 0 && (
              <div className="glass-panel" style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: 'var(--space-4)' }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {orderLogs.map(log => (
                    <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                      <div>
                        <strong>{log.crop}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{log.seller}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#4caf50', fontSize: '0.85rem', fontWeight: 'bold' }}>{log.status}</span>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>₹{log.price}/kg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
