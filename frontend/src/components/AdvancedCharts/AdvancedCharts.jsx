import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, Brush
} from 'recharts';
import { BarChart2, Activity, Target, TrendingUp } from 'lucide-react';
import './AdvancedCharts.css';

/* ── Static demo data ── */
const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

const yieldTrendData = MONTHS.map((m, i) => ({
  month: m,
  Wheat:   Math.round(28 + Math.sin(i * 0.5) * 6 + Math.random() * 3),
  Rice:    Math.round(35 + Math.cos(i * 0.45) * 8 + Math.random() * 4),
  Cotton:  Math.round(18 + Math.sin(i * 0.7) * 5 + Math.random() * 2),
  avgLine: Math.round(27 + i * 0.5),
}));

const priceCompareData = [
  { crop: 'Wheat',   Karnal: 2240, Ludhiana: 2310, Nashik: 2180, MSP: 2275 },
  { crop: 'Rice',    Karnal: 3800, Ludhiana: 3650, Nashik: 3720, MSP: 3600 },
  { crop: 'Cotton',  Karnal: 6200, Ludhiana: 6100, Nashik: 6450, MSP: 6080 },
  { crop: 'Mustard', Karnal: 5450, Ludhiana: 5380, Nashik: 5510, MSP: 5450 },
  { crop: 'Maize',   Karnal: 2010, Ludhiana: 1980, Nashik: 2040, MSP: 1962 },
];

const soilNutrientData = [
  { nutrient: 'Nitrogen', optimal: 100, actual: 72 },
  { nutrient: 'Phosphorus', optimal: 100, actual: 88 },
  { nutrient: 'Potassium', optimal: 100, actual: 61 },
  { nutrient: 'pH Balance', optimal: 100, actual: 84 },
  { nutrient: 'Organic C', optimal: 100, actual: 53 },
  { nutrient: 'Moisture', optimal: 100, actual: 78 },
];

const profitMarginData = MONTHS.slice(0, 6).map((m, i) => ({
  month: m,
  Revenue: Math.round(85000 + i * 8000 + Math.random() * 15000),
  Expense: Math.round(55000 + i * 2000 + Math.random() * 8000),
  Profit:  Math.round(30000 + i * 6000 + Math.random() * 8000),
}));

const KPI_DATA = [
  { val: '₹3,840', lbl: 'Avg APMC Price / Qtl', change: '↑ 14.2%', from: '#15803d', to: '#16a34a' },
  { val: '47.2 q', lbl: 'Avg Yield / Hectare',  change: '↑ 8.5%',  from: '#0369a1', to: '#0ea5e9' },
  { val: '₹1.04L', lbl: 'Seasonal Net Profit',  change: '↑ 22.1%', from: '#7c3aed', to: '#a78bfa' },
  { val: '68%',    lbl: 'ROI on Input Costs',    change: '↑ 5.3%',  from: '#b45309', to: '#f59e0b' },
];

const TABS = [
  { id: 'yield',   label: 'Crop Yield Trends',   icon: TrendingUp },
  { id: 'price',   label: 'APMC Price Compare',   icon: BarChart2 },
  { id: 'radar',   label: 'Soil Nutrient Radar',  icon: Target },
  { id: 'profit',  label: 'Profit vs Expense',    icon: Activity },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.97)',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      fontSize: '0.82rem'
    }}>
      <p style={{ margin: '0 0 6px', fontWeight: 800, color: '#0f5229' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600, marginBottom: 2 }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? `₹${p.value.toLocaleString('en-IN')}` : p.value}
          {p.name?.includes('Yield') || p.name?.includes('yield') ? ' q/ha' : ''}
        </div>
      ))}
    </div>
  );
};

const COLORS = ['#15803d', '#0369a1', '#dc2626', '#7c3aed', '#f59e0b'];

const AdvancedCharts = () => {
  const [activeTab, setActiveTab] = useState('yield');

  return (
    <div className="adv-charts-wrap" id="advanced-charts">
      <h2 className="adv-charts-title"><BarChart2 size={26} color="#16a34a" /> Advanced Farm Analytics</h2>
      <p className="adv-charts-subtitle">
        Seasonal yield trends, multi-mandi APMC price comparisons, soil nutrient radar, and profitability breakdown.
      </p>

      {/* KPI Strip */}
      <div className="kpi-strip">
        {KPI_DATA.map((k, i) => (
          <div
            key={i}
            className="kpi-card"
            style={{ '--kpi-from': k.from, '--kpi-to': k.to }}
          >
            <div className="kpi-val">{k.val}</div>
            <div className="kpi-lbl">{k.lbl}</div>
            <div className="kpi-change">{k.change} this season</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="chart-tab-bar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`chart-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Charts */}
      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'yield' ? (
            <AreaChart data={yieldTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {['Wheat','Rice','Cotton'].map((c, i) => (
                  <linearGradient key={c} id={`grad${c}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={COLORS[i]} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0.03} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} unit=" q" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 16 }} />
              <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Target', fill: '#f59e0b', fontSize: 11 }} />
              {['Wheat','Rice','Cotton'].map((c, i) => (
                <Area
                  key={c}
                  type="monotone"
                  dataKey={c}
                  stroke={COLORS[i]}
                  strokeWidth={2.5}
                  fill={`url(#grad${c})`}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
              <Brush dataKey="month" height={22} stroke="#16a34a" fill="rgba(22,163,74,0.06)" />
            </AreaChart>

          ) : activeTab === 'price' ? (
            <ComposedChart data={priceCompareData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="crop" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(1)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 16 }} />
              {['Karnal', 'Ludhiana', 'Nashik'].map((m, i) => (
                <Bar key={m} dataKey={m} fill={COLORS[i]} radius={[4,4,0,0]} barSize={22} />
              ))}
              <Line type="monotone" dataKey="MSP" stroke="#dc2626" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 5 }} name="MSP Floor" />
            </ComposedChart>

          ) : activeTab === 'radar' ? (
            <RadarChart data={soilNutrientData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="nutrient" tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar name="Optimal Level" dataKey="optimal" stroke="#94a3b8" fill="#e2e8f0" fillOpacity={0.4} />
              <Radar name="Your Soil (%)" dataKey="actual"  stroke="#16a34a" fill="#16a34a"  fillOpacity={0.45} strokeWidth={2.5} />
              <Legend wrapperStyle={{ paddingTop: 16 }} />
              <Tooltip />
            </RadarChart>

          ) : (
            <ComposedChart data={profitMarginData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 16 }} />
              <Bar dataKey="Revenue" fill="#0369a1" radius={[4,4,0,0]} barSize={20} opacity={0.85} />
              <Bar dataKey="Expense" fill="#ef4444"  radius={[4,4,0,0]} barSize={20} opacity={0.85} />
              <Area type="monotone" dataKey="Profit" stroke="#16a34a" strokeWidth={2.5} fill="url(#profitGrad)" dot={{ r: 5 }} />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedCharts;
