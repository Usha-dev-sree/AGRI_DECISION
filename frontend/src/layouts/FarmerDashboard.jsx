import React from 'react';
import { useTranslation } from 'react-i18next';
import YieldPredictionForm from '../features/ml/YieldPredictionForm';
import CropRecommendationForm from '../features/ml/CropRecommendationForm';
import FertilizerRecommendationForm from '../features/ml/FertilizerRecommendationForm';
import MarketPriceWidget from '../features/market/MarketPriceWidget';
import Navbar from '../components/Navbar/Navbar';
import WeatherWidget from '../components/WeatherWidget/WeatherWidget';
import ProfitCalculator from '../components/ProfitCalculator/ProfitCalculator';
import DiseaseScanner from '../components/DiseaseScanner/DiseaseScanner';
import AdvancedCharts from '../components/AdvancedCharts/AdvancedCharts';
import VoiceAssistant from '../components/VoiceAssistant/VoiceAssistant';
import MobileQuickActions from '../components/MobileQuickActions/MobileQuickActions';
import './FarmerDashboard.css';

const FarmerDashboard = () => {

  return (
    <div className="dashboard-layout" style={{ paddingBottom: '80px' }}>
      <Navbar />

      <main className="dashboard-content">
        {/* Live Weather & Advisory */}
        <div id="weather-widget">
          <WeatherWidget />
        </div>

        {/* Advanced Multi-tab Analytics Charts */}
        <AdvancedCharts />

        {/* AI Crop Leaf Disease Scanner */}
        <div id="disease-scanner">
          <DiseaseScanner />
        </div>

        {/* Farm Profit & ROI Margin Calculator */}
        <div id="profit-calculator">
          <ProfitCalculator />
        </div>

        {/* APMC Live Market Prices */}
        <div className="ml-section mt-4" id="market-widget">
          <MarketPriceWidget />

          <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
            AI Insights & Predictions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)' }}>
            <YieldPredictionForm />
            <CropRecommendationForm />
            <FertilizerRecommendationForm />
          </div>
        </div>
      </main>

      {/* Multilingual Voice Farm Assistant (fixed bottom-right) */}
      <VoiceAssistant />

      {/* Mobile Bottom Quick-Action Bar (visible on <900px) */}
      <MobileQuickActions />
    </div>
  );
};

export default FarmerDashboard;
