import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'FARMER'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.register(formData);
      if (response.success) {
        const { user, accessToken, refreshToken } = response.data;
        login(user, accessToken, refreshToken);
        
        const role = user?.role ? String(user.role).toUpperCase().replace(/^ROLE_/, '').trim() : '';
        if (role === 'ADMIN') navigate('/admin/dashboard');
        else if (role === 'GOVT_OFFICER') navigate('/govt/dashboard');
        else if (role === 'DEALER') navigate('/dealer/dashboard');
        else if (role === 'CONSUMER') navigate('/consumer/dashboard');
        else navigate('/farmer/dashboard');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel" style={{ maxWidth: '500px' }}>
        <div className="login-header">
          <h1>AgroSmart</h1>
          <p>Create your new account</p>
        </div>
        
        {error && <div className="alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
          
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            pattern="[0-9]{10}"
            title="Phone number should be 10 digits"
            required
          />
          
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            minLength="6"
            required
          />
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-text)' }}>
              Account Type
            </label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                outline: 'none',
              }}
            >
              <option value="FARMER">Farmer</option>
              <option value="GOVT_OFFICER">Government Officer</option>
              <option value="DEALER">Dealer</option>
              <option value="CONSUMER">Consumer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          
          <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '1rem' }}>
            Create Account
          </Button>
        </form>
        
        <div className="login-footer">
          Already have an account? <a href="/login">Sign In here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
