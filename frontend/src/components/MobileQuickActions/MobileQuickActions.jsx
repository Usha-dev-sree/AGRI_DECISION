import React from 'react';
import { CloudSun, Camera, ShoppingBag, Calculator, Bot } from 'lucide-react';
import './MobileQuickActions.css';

const MobileQuickActions = ({ onSelectAction }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id) || document.querySelector(`.${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mobile-quick-bar">
      <button className="quick-action-item" onClick={() => scrollToSection('weather-widget')}>
        <CloudSun size={20} />
        <span>Weather</span>
      </button>

      <button className="quick-action-item" onClick={() => scrollToSection('disease-scanner')}>
        <Camera size={20} />
        <span>AI Scan</span>
      </button>

      <button className="quick-action-item" onClick={() => scrollToSection('profit-calculator')}>
        <Calculator size={20} />
        <span>Profit</span>
      </button>

      <button className="quick-action-item" onClick={() => scrollToSection('market-widget')}>
        <ShoppingBag size={20} />
        <span>Prices</span>
      </button>
    </div>
  );
};

export default MobileQuickActions;
