import React from 'react';
import { Globe, Smartphone, Bot, Briefcase, Server, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatWeBuild({ onOpenQuote }) {
  const cards = [
    {
      title: 'Web Development',
      desc: 'Modern responsive websites and web applications engineered for speed, SEO, and user conversion.',
      icon: Globe,
      color: '#2563EB',
    },
    {
      title: 'Mobile Development',
      desc: 'Android, iOS, and cross-platform Flutter mobile applications built for native-feel performance.',
      icon: Smartphone,
      color: '#7C3AED',
    },
    {
      title: 'AI & ML Solutions',
      desc: 'AI-powered applications, predictive models, automated chatbots, and intelligent business workflows.',
      icon: Bot,
      color: '#059669',
    },
    {
      title: 'Business Software',
      desc: 'Custom software systems for enterprise business operations, CRM, ERP, and operational scaling.',
      icon: Briefcase,
      color: '#D97706',
    },
    {
      title: 'Backend & API Development',
      desc: 'Secure microservices, high-concurrency databases, and robust RESTful / GraphQL API architectures.',
      icon: Server,
      color: '#0284C7',
    },
    {
      title: 'UI/UX & Product Design',
      desc: 'Simple, intuitive, and user-focused digital product design, wireframing, and Figma prototypes.',
      icon: Palette,
      color: '#EC4899',
    },
  ];

  return (
    <section id="what-we-build" style={{ padding: '80px 0', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="badge-pill" style={{ marginBottom: '12px' }}>
            <span>WHAT WE BUILD</span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', lineHeight: 1.2 }}>
            Technology Solutions Designed Around <span className="text-gradient">Real Business Needs</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6 }}>
            We engineer customized digital products tailored strictly to client goals, clean code standards, and long-term scalability.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(15, 23, 42, 0.08)' }}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onClick={() => onOpenQuote(card.title)}
              >
                <div>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: `${card.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <IconComp size={24} style={{ color: card.color }} />
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                    {card.title}
                  </h3>

                  <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: 700, color: card.color }}>
                  <span>Request Solution Quote</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
