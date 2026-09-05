import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import Button from '../components/Button/Button';
import FormInput from '../components/FormInput/FormInput';
import './FarmerDashboard.css'; // Reusing the layout and grid styling

import Navbar from '../components/Navbar/Navbar';

const DealerDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Mock initial products
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Urea Fertilizer', category: 'FERTILIZER', price: 450, stock: 120, unit: 'bag' },
    { id: 2, name: 'Hybrid Bt Cotton Seeds', category: 'SEED', price: 850, stock: 45, unit: 'packet' },
    { id: 3, name: 'Organic Neem Pesticide', category: 'PESTICIDE', price: 320, stock: 80, unit: 'bottle' },
    { id: 4, name: 'Handheld Crop Sprayer', category: 'EQUIPMENT', price: 1500, stock: 15, unit: 'piece' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'FERTILIZER',
    price: '',
    stock: '',
    unit: 'bag'
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseFloat(newProduct.stock),
      unit: newProduct.unit
    };
    setProducts([product, ...products]);
    setNewProduct({ name: '', category: 'FERTILIZER', price: '', stock: '', unit: 'bag' });
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #4caf50' }}>
            <h3>Total Inventory Value</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: 'var(--color-primary)' }}>
              ₹{products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0).toLocaleString('en-IN')}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Based on current stock levels</p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #2196f3' }}>
            <h3>Active Listings</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#2196f3' }}>
              {products.length} Products
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Seeds, Fertilizers, & Equipment</p>
          </div>

          <div className="dashboard-card glass-panel" style={{ borderLeft: '4px solid #ff9800' }}>
            <h3>Low Stock Alerts</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#ff9800' }}>
              {products.filter(p => p.stock < 20).length} Items
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Items with less than 20 units remaining</p>
          </div>
        </div>

        <div className="glass-panel mt-6" style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ color: 'var(--color-primary-dark)', margin: 0 }}>Product Catalog Management</h2>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : 'Add New Product'}
            </Button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddProduct} className="glass-panel" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)', background: 'rgba(255, 255, 255, 0.03)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Add Product to Catalog</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <FormInput
                  label="Product Name"
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. NPK 19-19-19"
                  required
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-text)',
                      outline: 'none',
                    }}
                  >
                    <option value="SEED">Seeds</option>
                    <option value="FERTILIZER">Fertilizers</option>
                    <option value="PESTICIDE">Pesticides</option>
                    <option value="EQUIPMENT">Equipment</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <FormInput
                  label="Price (₹)"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="Price per unit"
                  required
                />
                <FormInput
                  label="Stock Quantity"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="Available stock"
                  required
                />
                <FormInput
                  label="Unit"
                  type="text"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  placeholder="e.g. bag, kg, piece"
                  required
                />
              </div>
              <Button type="submit">Submit Listing</Button>
            </form>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ padding: '1rem' }}>Product Name</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Price</th>
                  <th style={{ padding: '1rem' }}>Stock</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{product.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge badge-${product.category.toLowerCase()}`} style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: product.category === 'FERTILIZER' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(33, 150, 243, 0.15)',
                        color: product.category === 'FERTILIZER' ? '#4caf50' : '#2196f3'
                      }}>
                        {product.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>₹{product.price} / {product.unit}</td>
                    <td style={{ padding: '1rem' }}>{product.stock} {product.unit}s</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        color: product.stock < 20 ? '#ff9800' : '#4caf50',
                        fontWeight: '500'
                      }}>
                        {product.stock < 20 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DealerDashboard;
