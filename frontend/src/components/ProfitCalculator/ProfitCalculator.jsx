import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sprout, ArrowUpRight, Scale } from 'lucide-react';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import './ProfitCalculator.css';

const ProfitCalculator = () => {
  const [cropName, setCropName] = useState('Basmati Rice');
  const [area, setArea] = useState(2); // 2 hectares
  const [yieldPerHa, setYieldPerHa] = useState(45); // 45 quintals per hectare
  const [marketPrice, setMarketPrice] = useState(3800); // ₹3800 per quintal
  
  // Costs
  const [seedCost, setSeedCost] = useState(8000);
  const [fertilizerCost, setFertilizerCost] = useState(14000);
  const [laborCost, setLaborCost] = useState(18000);
  const [irrigationCost, setIrrigationCost] = useState(6000);

  // Calculations
  const totalYield = (parseFloat(area) || 0) * (parseFloat(yieldPerHa) || 0); // total quintals
  const grossRevenue = totalYield * (parseFloat(marketPrice) || 0); // total revenue in ₹
  
  const totalCost = (
    (parseFloat(seedCost) || 0) + 
    (parseFloat(fertilizerCost) || 0) + 
    (parseFloat(laborCost) || 0) + 
    (parseFloat(irrigationCost) || 0)
  );

  const netProfit = grossRevenue - totalCost;
  const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : 0;

  return (
    <div className="profit-calculator">
      <div className="calc-title-group">
        <h2>
          <Calculator size={26} color="#16a34a" /> Farm Profit & ROI Margin Calculator
        </h2>
        <p>Estimate season operational expenses, gross revenue, net profit margin, and return on investment.</p>
      </div>

      <div className="calc-grid">
        {/* Left Inputs */}
        <div className="calc-inputs-panel">
          <FormInput
            label="Crop Name"
            type="text"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            placeholder="e.g. Wheat, Basmati Rice, Cotton"
          />

          <div className="input-row">
            <FormInput
              label="Land Area (Hectares)"
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            <FormInput
              label="Expected Yield (Quintal/Ha)"
              type="number"
              value={yieldPerHa}
              onChange={(e) => setYieldPerHa(e.target.value)}
            />
          </div>

          <FormInput
            label="Expected APMC Selling Price (₹ / Quintal)"
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
          />

          <h4 style={{ color: '#0f5229', marginTop: '8px', marginBottom: '0px' }}>Input Costs Breakup (₹)</h4>
          <div className="input-row">
            <FormInput
              label="Seeds & Soil Prep (₹)"
              type="number"
              value={seedCost}
              onChange={(e) => setSeedCost(e.target.value)}
            />
            <FormInput
              label="Fertilizers & Pesticides (₹)"
              type="number"
              value={fertilizerCost}
              onChange={(e) => setFertilizerCost(e.target.value)}
            />
          </div>

          <div className="input-row">
            <FormInput
              label="Labor & Harvesting (₹)"
              type="number"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
            />
            <FormInput
              label="Irrigation & Machinery (₹)"
              type="number"
              value={irrigationCost}
              onChange={(e) => setIrrigationCost(e.target.value)}
            />
          </div>
        </div>

        {/* Right Dynamic Live Result Card */}
        <div className="calc-result-panel">
          <div className="result-stat-hero">
            <div className="stat-label">Estimated Net Seasonal Profit</div>
            <div className="profit-number">
              ₹{netProfit.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.95, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={18} color="#fbbf24" /> Estimated ROI: <strong>+{roi}%</strong>
            </div>
          </div>

          <div className="result-breakdown-grid">
            <div className="breakdown-item">
              <div className="b-label">Total Production Output</div>
              <div className="b-value">{totalYield.toLocaleString('en-IN')} Quintals</div>
            </div>
            <div className="breakdown-item">
              <div className="b-label">Gross APMC Revenue</div>
              <div className="b-value">₹{grossRevenue.toLocaleString('en-IN')}</div>
            </div>
            <div className="breakdown-item">
              <div className="b-label">Total Input Cost</div>
              <div className="b-value">₹{totalCost.toLocaleString('en-IN')}</div>
            </div>
            <div className="breakdown-item">
              <div className="b-label">Cost per Quintal</div>
              <div className="b-value">₹{totalYield > 0 ? Math.round(totalCost / totalYield) : 0}</div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Revenue vs Expense Ratio</span>
              <span><strong>{roi}% Profit Margin</strong></span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${Math.min(Math.max(roi, 5), 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
