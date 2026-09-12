import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function LegalModal({ title, content, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20000,
        background: 'rgba(3, 5, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
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
          maxWidth: '640px',
          background: 'rgba(10, 15, 28, 0.98)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--cyan-400)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{title}</h3>
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
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '28px', color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7 }}>
          <p>{content}</p>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn-primary btn-sm">
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
