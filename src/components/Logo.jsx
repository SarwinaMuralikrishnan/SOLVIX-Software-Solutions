import React from 'react';

export default function Logo({ size = 'medium', showTagline = false, className = '' }) {
  // Height sizing mapping
  const logoHeight = size === 'small' ? 38 : size === 'large' ? 64 : 48;

  return (
    <div className={`solvix-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      {/* Brand Icon SVG matching exact logo geometry */}
      <svg
        height={logoHeight}
        viewBox="0 0 300 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.4))' }}
      >
        <defs>
          {/* Top Curve Gradient: Purple to Deep Violet */}
          <linearGradient id="solvixPurpleGrad" x1="20" y1="0" x2="280" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          {/* Bottom Curve Gradient: Electric Blue to Cyan */}
          <linearGradient id="solvixCyanGrad" x1="20" y1="120" x2="280" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* Top 'S' Ribbon */}
        <path
          d="M 190 20 C 120 20 60 60 60 110 C 60 140 85 160 130 160 L 220 160 C 240 160 255 145 255 125 C 255 90 210 20 190 20 Z"
          fill="url(#solvixPurpleGrad)"
        />

        {/* Bottom 'S' Ribbon */}
        <path
          d="M 110 220 C 180 220 240 180 240 130 C 240 100 215 80 170 80 L 80 80 C 60 80 45 95 45 115 C 45 150 90 220 110 220 Z"
          fill="url(#solvixCyanGrad)"
        />

        {/* Coding Symbol </ > in Center */}
        <g fill="none" stroke="#080c14" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          {/* < */}
          <path d="M 120 105 L 105 120 L 120 135" />
          {/* / */}
          <line x1="145" y1="102" x2="135" y2="138" />
          {/* > */}
          <path d="M 160 105 L 175 120 L 160 135" />
        </g>

        {/* Pixel/Digital Squares top right */}
        <rect x="250" y="20" width="16" height="16" rx="3" fill="#a855f7" />
        <rect x="270" y="32" width="12" height="12" rx="2" fill="#8b5cf6" />
        <rect x="255" y="42" width="10" height="10" rx="2" fill="#60a5fa" />

        {/* Pixel/Digital Squares bottom left */}
        <rect x="30" y="200" width="16" height="16" rx="3" fill="#06b6d4" />
        <rect x="15" y="190" width="12" height="12" rx="2" fill="#3b82f6" />
        <rect x="40" y="180" width="10" height="10" rx="2" fill="#22d3ee" />
      </svg>

      {/* Typography side */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', letterSpacing: '0.08em', fontWeight: 900, fontSize: size === 'small' ? '1.35rem' : size === 'large' ? '2.2rem' : '1.75rem', lineHeight: 1 }}>
          <span style={{ color: '#0F172A' }}>SOLV</span>
          <span style={{ color: '#2563EB' }}>I</span>
          <span style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>X</span>
        </div>
        {showTagline && (
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#64748B', marginTop: '4px', fontWeight: 600 }}>
            WE BUILD WHAT YOU IMAGINE
          </span>
        )}
      </div>
    </div>
  );
}
