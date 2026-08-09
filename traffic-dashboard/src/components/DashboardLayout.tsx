import React from 'react';
import { Activity, Map, BarChart3, Settings, AlertTriangle } from 'lucide-react';
import './DashboardLayout.css';

export function DashboardLayout({ children, activeTab, onTabChange }: { children: React.ReactNode, activeTab: string, onTabChange: (tab: string) => void }) {
  return (
    <div className="dashboard-container">
      <nav className="sidebar glass-panel">
        <div className="logo-container">
          <Activity className="logo-icon" size={32} />
          <h2 className="logo-text gradient-text">SmartCity AI</h2>
        </div>
        
        <ul className="nav-links">
          <li className={`nav-item ${activeTab === 'Analytics' ? 'active' : ''}`} onClick={() => onTabChange('Analytics')}>
            <BarChart3 size={20} />
            <span>Analytics</span>
          </li>
          <li className={`nav-item ${activeTab === 'Live Map' ? 'active' : ''}`} onClick={() => onTabChange('Live Map')}>
            <Map size={20} />
            <span>Live Map</span>
          </li>
          <li className={`nav-item ${activeTab === 'Incidents' ? 'active' : ''}`} onClick={() => onTabChange('Incidents')}>
            <AlertTriangle size={20} />
            <span>Incidents</span>
          </li>
          <li className={`nav-item settings-link ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => onTabChange('Settings')}>
            <Settings size={20} />
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      
      <main className="main-content">
        <header className="top-header animate-fade-in delay-1">
          <div>
            <h1 className="gradient-text">Traffic Pattern Analysis</h1>
            <p className="subtitle">Real-time prediction and monitoring dashboard</p>
          </div>
          <div className="status-badge">
            <span className="status-dot pulse"></span>
            System Live
          </div>
        </header>
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
}
