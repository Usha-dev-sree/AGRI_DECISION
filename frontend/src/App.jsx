import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import FarmerDashboard from './layouts/FarmerDashboard';
import AdminDashboard from './layouts/AdminDashboard';
import DealerDashboard from './layouts/DealerDashboard';
import ConsumerDashboard from './layouts/ConsumerDashboard';
import GovtOfficerDashboard from './layouts/GovtOfficerDashboard';
import AiAssistant from './components/AiAssistant/AiAssistant';
import Button from './components/Button/Button';
import LandsPage from './pages/farmer/LandsPage';
import CropsPage from './pages/farmer/CropsPage';
import MarketPage from './pages/farmer/MarketPage';
import { useAuthStore } from './store/authStore';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './i18n/i18n';

// Dummy components for other routes to prevent errors
const DashboardPlaceholder = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Dashboard</h1>
    <p>Welcome to AgroSmart! We are building out the features.</p>
  </div>
);

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '500px' }}>
        <h1 style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>Access Denied</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
          You do not have permission to access this page. Please log in with an authorized account.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          <Button variant="secondary" onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
    </div>
  );
};

const normalizeRole = (role) => {
  if (!role) return '';
  return String(role).toUpperCase().replace(/^ROLE_/, '').trim();
};

const DashboardRedirect = () => {
  const { user } = useAuthStore();
  const role = normalizeRole(user?.role);
  if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  if (role === 'GOVT_OFFICER') return <Navigate to="/govt/dashboard" replace />;
  if (role === 'FARMER') return <Navigate to="/farmer/dashboard" replace />;
  if (role === 'DEALER') return <Navigate to="/dealer/dashboard" replace />;
  if (role === 'CONSUMER') return <Navigate to="/consumer/dashboard" replace />;
  return <Navigate to="/farmer/dashboard" replace />;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = normalizeRole(user?.role);
    const normalizedAllowed = allowedRoles.map(normalizeRole);
    if (!normalizedAllowed.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/farmer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
              <FarmerDashboard />
              <AiAssistant />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/farmer/lands" 
          element={
            <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
              <div style={{ minHeight: '100vh', width: '100%' }}>
                <header className="dashboard-header glass-panel">
                  <div className="brand">AgroSmart</div>
                  <a href="/farmer/dashboard" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>&larr; Back to Dashboard</a>
                </header>
                <LandsPage />
              </div>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/farmer/crops" 
          element={
            <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
              <div style={{ minHeight: '100vh', width: '100%' }}>
                <header className="dashboard-header glass-panel">
                  <div className="brand">AgroSmart</div>
                  <a href="/farmer/dashboard" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>&larr; Back to Dashboard</a>
                </header>
                <CropsPage />
              </div>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/farmer/market" 
          element={
            <ProtectedRoute allowedRoles={['FARMER', 'ADMIN']}>
              <div style={{ minHeight: '100vh', width: '100%' }}>
                <header className="dashboard-header glass-panel">
                  <div className="brand">AgroSmart</div>
                  <a href="/farmer/dashboard" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>&larr; Back to Dashboard</a>
                </header>
                <MarketPage />
              </div>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dealer" 
          element={
            <ProtectedRoute allowedRoles={['DEALER', 'ADMIN']}>
              <Navigate to="/dealer/dashboard" replace />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dealer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['DEALER', 'ADMIN']}>
              <DealerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/consumer" 
          element={
            <ProtectedRoute allowedRoles={['CONSUMER', 'ADMIN']}>
              <Navigate to="/consumer/dashboard" replace />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/consumer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['CONSUMER', 'ADMIN']}>
              <ConsumerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/govt/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['GOVT_OFFICER', 'ADMIN']}>
              <GovtOfficerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/govt" 
          element={
            <ProtectedRoute allowedRoles={['GOVT_OFFICER', 'ADMIN']}>
              <Navigate to="/govt/dashboard" replace />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          } 
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        <Route path="*" element={<div style={{textAlign: 'center', padding: '2rem'}}>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
  );
}

export default App;
