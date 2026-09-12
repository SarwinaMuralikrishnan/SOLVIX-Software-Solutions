import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function EstimateFlow({ estimate, onRequestQuote }) {
  if (!estimate) return null;

  return (
    <div className="solvix-estimate-card">
      <div className="solvix-estimate-header">Project Summary</div>

      <div>
        <div className="solvix-estimate-title">{estimate.projectType}</div>
        <div className="solvix-estimate-category">{estimate.category}</div>
      </div>

      {estimate.summary && (
        <div style={{ fontSize: '0.80rem', color: '#475569', lineHeight: 1.4 }}>
          {estimate.summary}
        </div>
      )}

      {/* Features checklist */}
      {estimate.features && estimate.features.length > 0 && (
        <div>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
            Included Features:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {estimate.features.map((feat) => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', color: '#334155' }}>
                <Check size={12} style={{ color: '#10B981', flexShrink: 0 }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Indicative Range */}
      <div>
        <div style={{ fontSize: '0.70rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
          Indicative Range
        </div>
        <div className="solvix-estimate-price">{estimate.estimatedStartingPrice}</div>
      </div>

      <button
        onClick={() => onRequestQuote(estimate.projectType)}
        className="solvix-estimate-btn"
      >
        <span>Request Official Quote</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
