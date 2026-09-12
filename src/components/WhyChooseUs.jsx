import React from 'react';
import { Sliders, Cpu, MessageSquare, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const pillars = [
    {
      title: 'Custom Solutions',
      desc: 'We build around your requirements instead of forcing your idea into a fixed template.',
      icon: Sliders,
      color: '#2563EB',
    },
    {
      title: 'Modern Technology',
      desc: 'We select appropriate technologies to create maintainable, secure, and scalable solutions.',
      icon: Cpu,
      color: '#7C3AED',
    },
    {
      title: 'Clear Communication',
      desc: 'We keep the development process transparent from initial idea to final production delivery.',
      icon: MessageSquare,
      color: '#059669',
    },
    {
      title: 'Long-Term Thinking',
      desc: 'We design software architecture that can evolve seamlessly as your business grows.',
      icon: Compass,
      color: '#D97706',
    },
  ];

  return (
    <section id="why-choose-us" style={{ padding: '80px 0', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="badge-pill" style={{ marginBottom: '12px' }}>
            <span>WHY SOLVIX</span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', lineHeight: 1.2 }}>
            Why Choose <span className="text-gradient">SOLVIX?</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Our core principles ensure your software is engineered with quality, transparency, and strategic alignment.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(15, 23, 42, 0.08)' }}
                style={{
                  padding: '32px 28px',
                  borderRadius: 'var(--radius-lg)',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.25s ease',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComp size={24} style={{ color: item.color }} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
