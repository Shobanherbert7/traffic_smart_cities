import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import './AnalyticsCharts.css';

interface ChartProps {
  data: any[];
  delayClass?: string;
}

export function TrafficVolumeChart({ data, delayClass = '' }: ChartProps) {
  return (
    <div className={`chart-container glass-panel animate-fade-in ${delayClass}`}>
      <div className="chart-header">
        <h3 className="kpi-title">Traffic Volume Forecast (ARIMA)</h3>
        <span className="live-indicator">Live</span>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(19, 27, 47, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Area type="monotone" dataKey="volume" stroke="#00d2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorVol)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SpeedPredictionChart({ data, delayClass = '' }: ChartProps) {
  return (
    <div className={`chart-container glass-panel animate-fade-in ${delayClass}`}>
      <div className="chart-header">
        <h3 className="kpi-title">Speed Sequence Prediction (LSTM)</h3>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(19, 27, 47, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
            <Line type="monotone" dataKey="actualSpeed" name="Actual Speed" stroke="#3a7bd5" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="predictedSpeed" name="LSTM Predicted" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
