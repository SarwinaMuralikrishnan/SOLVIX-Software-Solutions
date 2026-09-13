import React, { useState } from 'react';
import { X, Activity, Users, Database, Server, Shield, CheckCircle, RefreshCw, BarChart2, LayoutDashboard, Settings } from 'lucide-react';

export default function LiveDemoModal({ productName, onClose, onBuyNow }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20000,
        background: 'rgba(3, 5, 10, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-card-static"
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          background: 'rgba(10, 15, 28, 0.98)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.2)',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '18px 24px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              Interactive Live Demo — <span className="text-gradient">{productName || 'SOLVIX Software System'}</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Demo Software Layout */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <div
            style={{
              width: '220px',
              background: 'rgba(6, 9, 17, 0.8)',
              borderRight: '1px solid var(--border-color)',
              padding: '20px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
            className="demo-sidebar"
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '6px', fontWeight: 700 }}>
              Control Panel
            </div>
            {[
              { label: 'Overview', icon: LayoutDashboard },
              { label: 'Analytics', icon: BarChart2 },
              { label: 'Users & Staff', icon: Users },
              { label: 'Database Logs', icon: Database },
              { label: 'Security & SLA', icon: Shield },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isSelected ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.25))' : 'transparent',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.88rem',
                    fontWeight: isSelected ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <TabIcon size={16} style={{ color: isSelected ? 'var(--cyan-400)' : 'var(--text-muted)' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Dashboard Canvas */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: 'rgba(6, 9, 17, 0.5)' }}>
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>LIVE SIMULATED ENVIRONMENT</div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activeTab} Dashboard</h4>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleRefresh}
                  className="btn-secondary btn-sm"
                  style={{ padding: '8px 12px' }}
                >
                  <RefreshCw size={14} className={refreshing ? 'spin' : ''} />
                  <span>Refresh Metrics</span>
                </button>
              </div>
            </div>

            {/* Simulated Key Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div className="glass-card-static" style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Active Session Users</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginTop: '4px' }}>
                  {refreshing ? '...' : '1,482'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#22c55e', marginTop: '2px' }}>↑ 18.4% this week</div>
              </div>

              <div className="glass-card-static" style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>System Latency</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--cyan-400)', marginTop: '4px' }}>
                  {refreshing ? '...' : '14 ms'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Ultra Low Latency</div>
              </div>

              <div className="glass-card-static" style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Database Health</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#22c55e', marginTop: '4px' }}>
                  99.99%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>AWS Auto-Scaled</div>
              </div>

              <div className="glass-card-static" style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Source Code Status</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--purple-500)', marginTop: '4px' }}>
                  VERIFIED
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>100% IP Included</div>
              </div>
            </div>

            {/* Simulated Visual Graph / Activity Log */}
            <div
              className="glass-card-static"
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Real-Time Event Stream</span>
                <span style={{ color: 'var(--cyan-400)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>WS_CONNECTED</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', gap: '12px', color: '#22c55e' }}>
                  <span>[10:07:04]</span>
                  <span>System event: Automated database backup complete (0.4s)</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', color: 'var(--cyan-400)' }}>
                  <span>[10:07:01]</span>
                  <span>User auth: Master Admin token authenticated via OAuth2</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)' }}>
                  <span>[10:06:55]</span>
                  <span>Data Sync: {productName || 'System'} real-time stream synchronized [Status OK]</span>
                </div>
              </div>
            </div>

            {/* Feature Callout Banner inside Demo */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>Want this ready-made software for your business?</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Get instant full source code, deployment setup, and support.</div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBuyNow({ title: productName || 'Ready-Made Software' });
                }}
                className="btn-primary btn-sm"
              >
                Buy Now / Inquire
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 650px) {
          .demo-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
