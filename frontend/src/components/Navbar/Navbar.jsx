import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import NotificationCenter from '../NotificationCenter/NotificationCenter';
import Button from '../Button/Button';
import { 
  Sprout, Sun, Moon, LogOut, Menu, X, LayoutDashboard, 
  Landmark, ShoppingBag, ShieldCheck, User
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = user?.role || 'FARMER';

  const getRoleBadgeClass = () => {
    if (role === 'ADMIN') return 'role-badge admin';
    if (role === 'DEALER') return 'role-badge dealer';
    if (role === 'CONSUMER') return 'role-badge consumer';
    return 'role-badge farmer';
  };

  const getNavLinks = () => {
    if (role === 'FARMER') {
      return [
        { label: 'Dashboard', path: '/farmer/dashboard', icon: LayoutDashboard },
        { label: 'My Lands', path: '/farmer/lands', icon: Landmark },
        { label: 'My Crops', path: '/farmer/crops', icon: Sprout },
        { label: 'Mandi Market', path: '/farmer/market', icon: ShoppingBag },
      ];
    }
    if (role === 'ADMIN') {
      return [
        { label: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
      ];
    }
    if (role === 'DEALER') {
      return [
        { label: 'Dealer Portal', path: '/dealer/dashboard', icon: LayoutDashboard },
      ];
    }
    return [
      { label: 'Consumer Hub', path: '/consumer/dashboard', icon: LayoutDashboard },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="app-navbar">
      {/* Brand & Role */}
      <div className="nav-brand-group" onClick={() => navigate('/dashboard')}>
        <div className="brand-icon-wrap">
          <Sprout size={24} />
        </div>
        <div>
          <span className="brand-text">AgroSmart</span>
          <span className={getRoleBadgeClass()} style={{ marginLeft: '8px' }}>
            {role}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-menu-links ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((item, idx) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <li key={idx}>
              <a 
                href={item.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                <IconComponent size={18} />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Controls & Actions */}
      <div className="nav-right-actions">
        {/* Dark Mode Toggle */}
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#6366f1" />}
        </button>

        {/* Notification Bell */}
        <NotificationCenter />

        {/* Language Selector */}
        <LanguageSelector />

        {/* User Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
            {user?.fullName}
          </span>
          <Button variant="secondary" size="sm" onClick={logout} title="Logout">
            <LogOut size={16} />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
