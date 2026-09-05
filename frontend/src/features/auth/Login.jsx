import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login(username, password);
      if (response.success) {
        const { user, accessToken, refreshToken } = response.data;
        login(user, accessToken, refreshToken);
        
        const role = user?.role ? String(user.role).toUpperCase().replace(/^ROLE_/, '').trim() : '';
        
        // Redirect based on role
        if (role === 'ADMIN' || role === 'GOVT_OFFICER') {
          navigate('/admin/dashboard');
        } else if (role === 'DEALER') {
          navigate('/dealer/dashboard');
        } else if (role === 'CONSUMER') {
          navigate('/consumer/dashboard');
        } else {
          // Default to farmer dashboard
          navigate('/farmer/dashboard');
        }
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="login-header">
          <h1>AgroSmart</h1>
          <p>Sign in to your account</p>
        </div>
        
        {error && <div className="alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <FormInput
            label="Email or Phone Number"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email or phone"
            required
          />
          
          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>
        
        <div className="login-footer">
          Don't have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
