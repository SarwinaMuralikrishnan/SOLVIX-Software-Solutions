import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'CTO at NexaCloud Solutions',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'SOLVIX delivered our enterprise ERP platform 3 weeks ahead of schedule. Their attention to security, micro-animations, and clean React architecture blew us away!',
      rating: 5,
      project: 'Custom ERP & Cloud Architecture',
    },
    {
      name: 'Sophia Martinez',
      role: 'Founder at QuickBites Mobile',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      text: 'We bought the SOLVIX ready-made Food Delivery App package. It came with full source code, Flutter apps, and AWS scripts. We launched in 4 days and hit 10,000 orders in month 1.',
      rating: 5,
      project: 'Ready-Made Food Delivery App',
    },
    {
      name: 'David Chen',
      role: 'Head of Operations at CarePlus Health',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'The Hospital Management System from SOLVIX streamlined our patient intake and billing entirely. Outstanding 24/7 technical support and seamless database migration.',
      rating: 5,
      project: 'Hospital Management System',
    },
  ];

  return (
    <section className="section-padding" style={{ position: 'relative', background: 'rgba(3, 5, 10, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>CLIENT TESTIMONIALS</span>
          </div>
          <h2>
            Loved by Founders & <span className="text-gradient">Engineering Leaders</span>
          </h2>
          <p>
            See what CTOs, business owners, and startup founders say about working with SOLVIX.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header Rating & Quote */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#fcd34d" style={{ color: '#fcd34d' }} />
                    ))}
                  </div>
                  <Quote size={28} style={{ color: 'rgba(139, 92, 246, 0.3)' }} />
                </div>

                <p style={{ color: 'var(--text-primary)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '24px', italic: 'true' }}>
                  "{t.text}"
                </p>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--cyan-400)', fontWeight: 600, marginBottom: '12px' }}>
                  Project: {t.project}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--purple-500)',
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{t.name}</h4>
                      <CheckCircle2 size={14} style={{ color: 'var(--cyan-400)' }} />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
