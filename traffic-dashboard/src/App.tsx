import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { KPICard } from './components/KPICard';
import { TrafficVolumeChart, SpeedPredictionChart } from './components/AnalyticsCharts';
import { Car, Clock, Zap, AlertCircle } from 'lucide-react';
import './App.css';

// Custom Hook to simulate incoming traffic data
function useTrafficData() {
  const [data, setData] = useState({
    volumeData: Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      volume: Math.floor(Math.random() * 500) + 100,
    })),
    speedData: Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      actualSpeed: Math.floor(Math.random() * 30) + 20,
      predictedSpeed: Math.floor(Math.random() * 30) + 20,
    })),
    kpis: {
      totalVolume: 4250,
      avgSpeed: 32,
      activeHotspots: 3,
      congestionLevel: 'High'
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        // Simulate shifting data for charts
        const newVol = [...prev.volumeData.slice(1), { 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}), 
          volume: Math.floor(Math.random() * 500) + 100 
        }];
        
        const newSpeed = [...prev.speedData.slice(1), {
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
          actualSpeed: Math.floor(Math.random() * 30) + 20,
          predictedSpeed: Math.floor(Math.random() * 30) + 20,
        }];

        return {
          ...prev,
          volumeData: newVol,
          speedData: newSpeed,
          kpis: {
            totalVolume: prev.kpis.totalVolume + Math.floor(Math.random() * 10),
            avgSpeed: Math.floor(Math.random() * 40) + 10,
            activeHotspots: Math.random() > 0.8 ? 4 : 3,
            congestionLevel: Math.random() > 0.7 ? 'High' : 'Medium'
          }
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
}

function App() {
  const trafficData = useTrafficData();
  const [activeTab, setActiveTab] = useState('Analytics');

  const renderContent = () => {
    switch (activeTab) {
      case 'Live Map':
        return (
          <div className="bottom-panel glass-panel animate-fade-in delay-1" style={{ height: 'calc(100vh - 150px)' }}>
            <h3 className="kpi-title mb-4">City Map - Live View</h3>
            <div className="map-mockup" style={{ height: '100%' }}>
              <div className="map-node hotspot-high" style={{ top: '30%', left: '40%' }}>
                <span className="node-pulse"></span>
              </div>
              <div className="map-node hotspot-medium" style={{ top: '60%', left: '20%' }}></div>
              <div className="map-node hotspot-low" style={{ top: '20%', left: '70%' }}></div>
              <div className="map-node hotspot-high" style={{ top: '75%', left: '80%' }}>
                <span className="node-pulse"></span>
              </div>
              <div className="map-node hotspot-medium" style={{ top: '50%', left: '60%' }}></div>
            </div>
          </div>
        );
      case 'Incidents':
        return (
          <div className="bottom-panel glass-panel animate-fade-in delay-1">
            <h3 className="kpi-title mb-4">Recent Incidents</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '12px' }}>
                <AlertCircle color="var(--danger)" size={32} />
                <div>
                  <h4 style={{ color: 'var(--text-highlight)', marginBottom: '4px' }}>Major Collision</h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Highway 1 Southbound - All lanes blocked. Heavy congestion expected for the next 2 hours.</p>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-main)', fontSize: '0.85rem' }}>2 mins ago</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', borderRadius: '12px' }}>
                <AlertCircle color="var(--warning)" size={32} />
                <div>
                  <h4 style={{ color: 'var(--text-highlight)', marginBottom: '4px' }}>Roadwork</h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Intersection B - Right lane closed. Average speed dropped to 15 km/h.</p>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--text-main)', fontSize: '0.85rem' }}>15 mins ago</span>
              </div>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="bottom-panel glass-panel animate-fade-in delay-1">
            <h3 className="kpi-title mb-4">System Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div>
                  <h4 style={{ color: 'var(--text-highlight)', marginBottom: '4px' }}>Live Data Stream</h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>Enable real-time data ingestion from traffic sensors</p>
                </div>
                <div style={{ width: '40px', height: '24px', background: 'var(--primary)', borderRadius: '12px', position: 'relative', cursor: 'pointer', boxShadow: '0 0 8px var(--primary-glow)' }}>
                  <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div>
                  <h4 style={{ color: 'var(--text-highlight)', marginBottom: '4px' }}>Incident Alerts</h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>Send notifications for high-priority traffic incidents</p>
                </div>
                <div style={{ width: '40px', height: '24px', background: 'var(--primary)', borderRadius: '12px', position: 'relative', cursor: 'pointer', boxShadow: '0 0 8px var(--primary-glow)' }}>
                  <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <h4 style={{ color: 'var(--text-highlight)', marginBottom: '4px' }}>ML Hotspot Sensitivity</h4>
                <p style={{ color: 'var(--text-main)', fontSize: '0.85rem', marginBottom: '1rem' }}>Adjust anomaly detection threshold for K-Means clustering</p>
                <input type="range" min="1" max="100" defaultValue="75" style={{ width: '100%', accentColor: 'var(--primary)' }} />
              </div>

            </div>
          </div>
        );
      default:
        // Analytics view
        return (
          <>
            <div className="kpi-grid">
              <KPICard 
                title="Total Vehicles (Live)" 
                value={trafficData.kpis.totalVolume.toLocaleString()} 
                icon={<Car size={24} />} 
                trend={{ value: 12.5, isPositive: true }}
                delayClass="delay-1"
              />
              <KPICard 
                title="Average Speed" 
                value={`${trafficData.kpis.avgSpeed} km/h`} 
                icon={<Zap size={24} />} 
                trend={{ value: 4.2, isPositive: false }}
                delayClass="delay-2"
              />
              <KPICard 
                title="Active Hotspots" 
                value={trafficData.kpis.activeHotspots} 
                icon={<AlertCircle size={24} />} 
                delayClass="delay-3"
              />
              <KPICard 
                title="Congestion Level" 
                value={trafficData.kpis.congestionLevel} 
                icon={<Clock size={24} />} 
                delayClass="delay-4"
              />
            </div>

            <div className="charts-grid">
              <TrafficVolumeChart data={trafficData.volumeData} delayClass="delay-2" />
              <SpeedPredictionChart data={trafficData.speedData} delayClass="delay-3" />
            </div>
            
            <div className="bottom-panel glass-panel animate-fade-in delay-4">
              <h3 className="kpi-title mb-4">Live Traffic Hotspots (K-Means Clustering)</h3>
              <div className="map-mockup">
                <div className="map-node hotspot-high" style={{ top: '30%', left: '40%' }}>
                  <span className="node-pulse"></span>
                </div>
                <div className="map-node hotspot-medium" style={{ top: '60%', left: '20%' }}></div>
                <div className="map-node hotspot-low" style={{ top: '20%', left: '70%' }}></div>
                <div className="map-node hotspot-high" style={{ top: '75%', left: '80%' }}>
                  <span className="node-pulse"></span>
                </div>
                <div className="map-path"></div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;
