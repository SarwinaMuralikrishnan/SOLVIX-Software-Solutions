import React from 'react';
import { Calendar, Sliders, DollarSign, Cpu, MessageSquare, Headphones, Layers, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyWorkWithUs({ onOpenConsultation }) {
  const reasons = [
    {
      title: 'Professional Consultation',
      desc: '1-on-1 architecture guidance and deep technical discovery sessions with our engineering leads.',
      icon: Calendar,
      color: '#7C3AED',
    },
    {
      title: 'Customized Solutions',
      desc: 'Bespoke software engineered specifically around your unique operational rules and business goals.',
      icon: Sliders,
      color: '#2563EB',
    },
    {
      title: 'Affordable Pricing',
      desc: 'Fair, transparent milestone-based project quotes tailored for startups and growing enterprises.',
      icon: DollarSign,
      color: '#F59E0B',
    },
    {
      title: 'Modern Technologies',
      desc: 'Architected with modern stacks like React, TypeScript, Node.js, Python, Flutter, Docker, and AWS Cloud.',
      icon: Cpu,
      color: '#0284C7',
    },
    {
      title: 'Transparent Communication',
      desc: 'Weekly milestone demos, clear scope agreements, live staging previews, and zero hidden costs.',
      icon: MessageSquare,
      color: '#06B6D4',
    },
    {
      title: 'Full Source Code Ownership',
      desc: '100% complete source code ownership, intellectual property rights, and documentation transferred upon completion.',
      icon: Key,
      color: '#059669',
    },
    {
      title: 'Dedicated Support',
      desc: 'Ongoing post-launch SLA maintenance, server uptime monitoring, and continuous technical updates.',
      icon: Headphones,
      color: '#EC4899',
    },
    {
      title: 'Future-Ready Architecture',
      desc: 'Scalable cloud-native microservices and modular codebase designed to evolve as your business expands.',
      icon: Layers,
      color: '#10B981',
    },
  ];

  return (
    <section id="why-work-with-us" className="section-padding" style={{ position: 'relative', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>WHY WORK WITH SOLVIX</span>
          </div>
          <h2>
            Your Dedicated Software Partner <span className="text-gradient">From Concept to Launch</span>
          </h2>
          <p>
            We combine software craftsmanship, modern engineering, and transparent partnership to build long-term success.
          </p>
        </div>

        {/* Symmetric 8 Pillars Grid (4x2 / 2x4) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {reasons.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -6, boxShadow: '0 16px 30px rgba(15, 23, 42, 0.08)' }}
                className="glass-card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  height: '100%',
                  borderRadius: 'var(--radius-lg)',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${item.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComp size={24} style={{ color: item.color }} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
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
