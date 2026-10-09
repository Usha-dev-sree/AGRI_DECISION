import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { dealerApi } from '../services/api';
import FormInput from '../components/FormInput/FormInput';
import Button from '../components/Button/Button';
import Navbar from '../components/Navbar/Navbar';
import { PackagePlus, Trash2, Edit2, Package, TrendingUp, AlertTriangle, RefreshCw, X, Check } from 'lucide-react';
import './FarmerDashboard.css';

const CATEGORIES = ['SEED', 'FERTILIZER', 'PESTICIDE', 'EQUIPMENT', 'IRRIGATION', 'ORGANIC', 'OTHER'];

const CATEGORY_COLORS = {
  SEED: { bg: 'rgba(34,197,94,0.12)', color: '#16a34a' },
  FERTILIZER: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb' },
  PESTICIDE: { bg: 'rgba(239,68,68,0.12)', color: '#dc2626' },
  EQUIPMENT: { bg: 'rgba(234,179,8,0.12)', color: '#ca8a04' },
  IRRIGATION: { bg: 'rgba(14,165,233,0.12)', color: '#0284c7' },
  ORGANIC: { bg: 'rgba(168,85,247,0.12)', color: '#9333ea' },
  OTHER: { bg: 'rgba(100,116,139,0.12)', color: '#475569' },
};

const emptyForm = {
  name: '',
  category: 'FERTILIZER',
  description: '',
  pricePerUnit: '',
  stockQuantity: '',
  unit: 'bag',
  brandName: '',
};

const DealerDashboard = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await dealerApi.getMyProducts();
      setProducts(res.data.data || []);
    } catch (err) {
      setError('Failed to load products. ' + (err.response?.data?.message || ''));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description || undefined,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        stockQuantity: parseFloat(formData.stockQuantity),
        unit: formData.unit,
        brandName: formData.brandName || undefined,
      };

      if (editingProduct) {
        await dealerApi.updateProduct(editingProduct.id, payload);
      } else {
        await dealerApi.createProduct(payload);
      }

      setShowAddForm(false);
      setEditingProduct(null);
      setFormData(emptyForm);
      await fetchProducts();
    } catch (err) {
      setError('Failed to save product: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description || '',
      pricePerUnit: product.pricePerUnit?.toString() || '',
      stockQuantity: product.stockQuantity?.toString() || '',
      unit: product.unit,
      brandName: product.brandName || '',
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this product from your listing?')) return;
    try {
      await dealerApi.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError('Failed to remove product.');
    }
  };

  const totalInventoryValue = products.reduce(
    (acc, p) => acc + (parseFloat(p.pricePerUnit) * parseFloat(p.stockQuantity) || 0), 0
  );
  const lowStockCount = products.filter(p => parseFloat(p.stockQuantity) < 20).length;

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        {/* Stats Cards */}
        <div className="dashboard-grid">
          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #22c55e' }}>
            <h3>Total Inventory Value</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: 'var(--color-primary)' }}>
              ₹{totalInventoryValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Based on current stock levels</p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #2196f3' }}>
            <h3>Active Listings</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#2196f3' }}>
              {products.length} Products
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Seeds, Fertilizers & Equipment</p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #ff9800' }}>
            <h3>Low Stock Alerts</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#ff9800' }}>
              {lowStockCount} Items
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Items with less than 20 units</p>
          </div>
        </div>

        {error && (
          <div className="error-message" style={{ marginBottom: '1rem' }}>{error}</div>
        )}

        {/* Product Catalog Panel */}
        <div className="glass-panel mt-6" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ color: 'var(--color-primary-dark)', margin: 0 }}>
              <Package size={22} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Product Catalog Management
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline" onClick={fetchProducts} disabled={loading}>
                <RefreshCw size={14} className={loading ? 'spin-animation' : ''} />
              </Button>
              <Button onClick={() => { setShowAddForm(!showAddForm); setEditingProduct(null); setFormData(emptyForm); }}>
                {showAddForm && !editingProduct ? <X size={16} /> : <PackagePlus size={16} />}
                {showAddForm && !editingProduct ? ' Cancel' : ' Add Product'}
              </Button>
            </div>
          </div>

          {/* Add / Edit Form */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="glass-panel"
              style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
                {editingProduct ? '✏️ Update Product' : '➕ New Product Listing'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <FormInput label="Product Name" type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. NPK 19-19-19" required />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                  <select value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <FormInput label="Price per Unit (₹)" type="number" value={formData.pricePerUnit}
                  onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                  placeholder="e.g. 450.00" required />

                <FormInput label="Stock Quantity" type="number" value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  placeholder="Available stock" required />

                <FormInput label="Unit" type="text" value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g. bag, kg, bottle" required />

                <FormInput label="Brand Name (optional)" type="text" value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="e.g. Syngenta, Coromandel" />
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>Description (optional)</label>
                <textarea value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the product features, usage, composition..."
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button type="submit" disabled={submitting}>
                  <Check size={14} /> {submitting ? 'Saving...' : editingProduct ? 'Update Listing' : 'Submit Listing'}
                </Button>
                <Button type="button" variant="outline"
                  onClick={() => { setShowAddForm(false); setEditingProduct(null); setFormData(emptyForm); }}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Products Table */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
              <Package size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No products listed yet. Click "Add Product" to create your first listing.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    {['Product Name', 'Category', 'Price', 'Stock', 'Brand', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.875rem 1rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const cat = CATEGORY_COLORS[product.category] || CATEGORY_COLORS.OTHER;
                    const stock = parseFloat(product.stockQuantity);
                    return (
                      <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '0.875rem 1rem', fontWeight: '600' }}>{product.name}</td>
                        <td style={{ padding: '0.875rem 1rem' }}>
                          <span style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', background: cat.bg, color: cat.color }}>
                            {product.category}
                          </span>
                        </td>
                        <td style={{ padding: '0.875rem 1rem', fontWeight: '600' }}>₹{parseFloat(product.pricePerUnit).toLocaleString('en-IN')} / {product.unit}</td>
                        <td style={{ padding: '0.875rem 1rem' }}>
                          <span style={{ color: stock < 20 ? '#f97316' : 'var(--color-text)' }}>
                            {stock.toLocaleString('en-IN')} {product.unit}s
                          </span>
                        </td>
                        <td style={{ padding: '0.875rem 1rem', color: 'var(--color-text-secondary)' }}>{product.brandName || '—'}</td>
                        <td style={{ padding: '0.875rem 1rem' }}>
                          {stock < 20 ? (
                            <span style={{ color: '#f97316', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <AlertTriangle size={14} /> Low Stock
                            </span>
                          ) : (
                            <span style={{ color: '#22c55e', fontWeight: '600' }}>✓ In Stock</span>
                          )}
                        </td>
                        <td style={{ padding: '0.875rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button title="Edit" onClick={() => handleEdit(product)}
                              style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer', color: 'var(--color-primary)' }}>
                              <Edit2 size={14} />
                            </button>
                            <button title="Remove" onClick={() => handleDelete(product.id)}
                              style={{ padding: '6px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', cursor: 'pointer', color: '#ef4444' }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DealerDashboard;
