import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, RefreshCw, FileText, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectEstimator({ onOpenQuote }) {
  const [projectType, setProjectType] = useState('Web Application');
  const [platform, setPlatform] = useState('Responsive Web');
  const [selectedFeatures, setSelectedFeatures] = useState(['User Authentication', 'Payment Gateway Integration']);
  const [authType, setAuthType] = useState('Email & Password + OAuth');
  const [paymentType, setPaymentType] = useState('Razorpay / Stripe Gateway');
  const [adminType, setAdminType] = useState('Executive Admin Dashboard');
  const [aiType, setAiType] = useState('None');
  const [timeline, setTimeline] = useState('2 – 4 Weeks');

  // Base pricing calculations in INR
  const basePrices = {
    'Business Website': 25000,
    'Web Application': 45000,
    'Mobile Application': 80000,
    'AI Solution': 90000,
    'Custom Software / ERP': 180000,
  };

  const featureAddons = {
    'User Authentication': 8000,
    'Payment Gateway Integration': 15000,
    'Admin Panel & Control': 20000,
    'Realtime Database Sync': 18000,
    'AI Automation Chatbot': 35000,
    'Analytics & PDF Reports': 12000,
  };

  const aiAddons = {
    'None': 0,
    'AI Support Chatbot': 35000,
    'AI Document Processing': 60000,
    'Predictive AI Model': 90000,
  };

  const calculateEstimate = () => {
    let base = basePrices[projectType] || 45000;
    selectedFeatures.forEach((feat) => {
      base += featureAddons[feat] || 10000;
    });
    base += aiAddons[aiType] || 0;

    const minEstimate = Math.round(base * 0.95);
    const maxEstimate = Math.round(base * 1.25);
    return { minEstimate, maxEstimate };
  };

  const { minEstimate, maxEstimate } = calculateEstimate();

  const toggleFeature = (feat) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calculator size={22} style={{ color: '#2563EB' }} />
        </div>
        <div>
          <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>Interactive Project Cost Estimator</h4>
          <p style={{ fontSize: '0.86rem', color: '#64748B' }}>Configure your project requirements for an instant estimated cost range.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }} className="estimator-grid">
        {/* Left Column — Configurator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 1. Project Type */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              1. Select Project Type
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Business Website', 'Web Application', 'Mobile Application', 'AI Solution', 'Custom Software / ERP'].map((type) => (
                <button
                  key={type}
                  onClick={() => setProjectType(type)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: projectType === type ? '1px solid #2563EB' : '1px solid #E2E8F0',
                    background: projectType === type ? '#2563EB' : '#F8FAFC',
                    color: projectType === type ? '#FFFFFF' : '#475569',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Platform */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              2. Target Platform
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Responsive Web', 'Android App', 'iOS App', 'Flutter Cross-Platform'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setPlatform(plat)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: platform === plat ? '1px solid #7C3AED' : '1px solid #E2E8F0',
                    background: platform === plat ? '#7C3AED' : '#F8FAFC',
                    color: platform === plat ? '#FFFFFF' : '#475569',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Features Needed Checklist */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              3. Select Core Features Needed
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {Object.keys(featureAddons).map((feat) => {
                const isSelected = selectedFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    onClick={() => toggleFeature(feat)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: isSelected ? '1px solid #2563EB' : '1px solid #E2E8F0',
                      background: isSelected ? 'rgba(37, 99, 235, 0.06)' : '#F8FAFC',
                      color: isSelected ? '#2563EB' : '#475569',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: isSelected ? '1px solid #2563EB' : '1px solid #CBD5E1', background: isSelected ? '#2563EB' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isSelected && <Check size={12} style={{ color: '#FFFFFF' }} />}
                    </div>
                    <span>{feat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. AI Capabilities */}
          <div>
            <label style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              4. AI Features & Automation
            </label>
            <select
              value={aiType}
              onChange={(e) => setAiType(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.88rem', fontWeight: 600 }}
            >
              {Object.keys(aiAddons).map((ai) => (
                <option key={ai} value={ai}>
                  {ai}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column — Summary Calculation Result */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05))',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: '6px' }}>
              Estimated Project Investment
            </div>

            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#2563EB', marginBottom: '8px' }}>
              ₹{minEstimate.toLocaleString()} – ₹{maxEstimate.toLocaleString()}
            </div>

            <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '20px' }}>
              Estimated Timeline: <strong>{timeline}</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#475569', marginBottom: '20px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <div><strong>Project:</strong> {projectType}</div>
              <div><strong>Platform:</strong> {platform}</div>
              <div><strong>Selected Features:</strong> {selectedFeatures.length} Included</div>
              <div><strong>AI Addon:</strong> {aiType}</div>
            </div>
          </div>

          <div>
            <button
              onClick={() => onOpenQuote(`${projectType} (${platform}) — Est: ₹${minEstimate.toLocaleString()}–₹${maxEstimate.toLocaleString()}`)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
            >
              <FileText size={16} />
              <span>Request Quote with this Spec</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#64748B', marginTop: '12px' }}>
              <Info size={14} style={{ flexShrink: 0 }} />
              <span>Note: This estimation is non-binding. A formal quotation will be issued after technical discussion.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .estimator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
