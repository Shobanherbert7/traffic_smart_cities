import React from 'react';
import './KPICard.css';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delayClass?: string;
}

export function KPICard({ title, value, icon, trend, delayClass = '' }: KPICardProps) {
  return (
    <div className={`kpi-card glass-panel animate-fade-in ${delayClass}`}>
      <div className="kpi-header">
        <h3 className="kpi-title">{title}</h3>
        <div className="kpi-icon">{icon}</div>
      </div>
      <div className="kpi-body">
        <h2 className="kpi-value">{value}</h2>
        {trend && (
          <div className={`kpi-trend ${trend.isPositive ? 'trend-up' : 'trend-down'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            <span className="trend-text">vs last hour</span>
          </div>
        )}
      </div>
    </div>
  );
}
