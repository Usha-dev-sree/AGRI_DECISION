import React, { useState, useEffect, useCallback } from 'react';
import { consumerApi } from '../services/api';
import MarketPriceWidget from '../features/market/MarketPriceWidget';
import Navbar from '../components/Navbar/Navbar';
import FormInput from '../components/FormInput/FormInput';
import Button from '../components/Button/Button';
import { ShoppingBag, Search, Leaf, RefreshCw, MessageSquare } from 'lucide-react';
import './FarmerDashboard.css';

const CATEGORY_COLORS = {
  SEED: { bg: 'rgba(34,197,94,0.12)', color: '#16a34a', label: 'Seeds' },
  FERTILIZER: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb', label: 'Fertilizer' },
  PESTICIDE: { bg: 'rgba(239,68,68,0.12)', color: '#dc2626', label: 'Pesticide' },
  EQUIPMENT: { bg: 'rgba(234,179,8,0.12)', color: '#ca8a04', label: 'Equipment' },
  IRRIGATION: { bg: 'rgba(14,165,233,0.12)', color: '#0284c7', label: 'Irrigation' },
  ORGANIC: { bg: 'rgba(168,85,247,0.12)', color: '#9333ea', label: 'Organic' },
  OTHER: { bg: 'rgba(100,116,139,0.12)', color: '#475569', label: 'Other' },
  DEALER_PRODUCT: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb', label: 'Dealer' },
};

const ConsumerDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const fetchListings = useCallback(async (keyword) => {
    setLoading(true);
    setError('');
    try {
      const res = await consumerApi.getMarketplace(keyword || undefined);
      setListings(res.data.data || []);
    } catch (err) {
      setError('Unable to load marketplace. ' + (err.response?.data?.message || ''));
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    fetchListings(searchInput);
  };

  const handleInquire = (listing) => {
    const alreadyInquired = inquiries.find(i => i.id === listing.id);
    if (alreadyInquired) {
      alert(`Already sent an inquiry for "${listing.name}"!`);
      return;
    }
    setInquiries([{ id: listing.id, name: listing.name, seller: listing.sellerName, price: listing.price, unit: listing.unit, sentAt: new Date().toLocaleTimeString() }, ...inquiries]);
    alert(`✅ Inquiry sent to ${listing.sellerName} for "${listing.name}" at ₹${listing.price}/${listing.unit}. They'll contact you shortly.`);
  };

  const totalInquiries = inquiries.length;

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        {/* Stats Row */}
        <div className="dashboard-grid">
          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #22c55e' }}>
            <h3>Direct Farm Deals</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              Buy fresh produce & agri-inputs directly from verified dealers at fair prices.
            </p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #ff9800' }}>
            <h3>Verified Listings</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#ff9800' }}>
              {listings.length}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Active marketplace listings</p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #2196f3' }}>
            <h3>My Inquiries</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#2196f3' }}>
              {totalInquiries}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Active product inquiries sent</p>
          </div>
        </div>

        {error && <div className="error-message" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
          {/* Marketplace Explorer */}
          <div className="glass-panel" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h2 style={{ color: 'var(--color-primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={22} /> Marketplace
              </h2>
              <button onClick={() => fetchListings(searchQuery)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer', color: 'var(--color-text)' }}>
                <RefreshCw size={14} className={loading ? 'spin-animation' : ''} />
              </button>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
              <div style={{ flex: 1 }}>
                <FormInput
                  label=""
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by product or brand name..."
                />
              </div>
              <Button type="submit" style={{ alignSelf: 'flex-end' }}>
                <Search size={14} />
              </Button>
            </form>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>Loading marketplace...</div>
            ) : listings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p>No listings found. {searchQuery && <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => { setSearchInput(''); fetchListings(); }}>Clear search</button>}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
                {listings.map(item => {
                  const catStyle = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.OTHER;
                  const alreadyInquired = inquiries.some(i => i.id === item.id);
                  return (
                    <div key={item.id} className="glass-panel"
                      style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1rem' }}>{item.name}</h3>
                          <span style={{ padding: '0.15rem 0.5rem', borderRadius: '5px', fontSize: '0.72rem', fontWeight: '700', background: catStyle.bg, color: catStyle.color }}>
                            {item.category}
                          </span>
                          {item.isOrganic && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.72rem', fontWeight: '700', color: '#16a34a' }}>
                              <Leaf size={10} /> Organic
                            </span>
                          )}
                        </div>
                        <p style={{ margin: '0.2rem 0', fontSize: '1rem', fontWeight: '700' }}>₹{parseFloat(item.price).toLocaleString('en-IN')} / {item.unit}</p>
                        <p style={{ margin: '0.1rem 0', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                          Sold by: <strong>{item.sellerName}</strong>
                        </p>
                        {item.description && (
                          <p style={{ margin: '0.1rem 0', fontSize: '0.78rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '260px' }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        <Button size="sm" onClick={() => handleInquire(item)} disabled={alreadyInquired}
                          variant={alreadyInquired ? 'outline' : 'primary'}>
                          <MessageSquare size={13} />
                          {alreadyInquired ? ' Inquired' : ' Inquire'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column: Market Prices + Inquiry Log */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <MarketPriceWidget />

            {inquiries.length > 0 && (
              <div className="glass-panel" style={{ padding: 'var(--space-5)' }}>
                <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} /> Recent Inquiries
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {inquiries.slice(0, 5).map(log => (
                    <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem' }}>{log.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>{log.seller}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#22c55e', fontSize: '0.82rem', fontWeight: '700' }}>✓ Sent</span>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>₹{log.price}/{log.unit}</div>
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
