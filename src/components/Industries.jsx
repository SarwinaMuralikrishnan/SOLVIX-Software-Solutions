import React from 'react';
import { Stethoscope, GraduationCap, ShoppingBag, Factory, Utensils, Building, Landmark, Truck, ShoppingCart, Building2, Rocket, Store, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Industries({ onOpenQuote }) {
  const industries = [
    {
      title: 'Healthcare',
      desc: 'Electronic Health Records (EHR), OPD queue billing, patient telemetry portals, and clinic software.',
      icon: Stethoscope,
      color: '#EC4899',
    },
    {
      title: 'Education',
      desc: 'University ERPs, online examination portals, student fee engines, and automated attendance tools.',
      icon: GraduationCap,
      color: '#7C3AED',
    },
    {
      title: 'Retail & POS',
      desc: 'Fast headless storefronts, inventory POS billing, multi-store stock sync, and GST invoice engines.',
      icon: ShoppingBag,
      color: '#2563EB',
    },
    {
      title: 'Manufacturing',
      desc: 'Factory inventory tracking, purchase order workflows, machine downtime monitoring, and reporting.',
      icon: Factory,
      color: '#0284C7',
    },
    {
      title: 'Restaurants',
      desc: 'Table POS ordering, kitchen display systems (KDS), online food delivery integrations, and digital menus.',
      icon: Utensils,
      color: '#F59E0B',
    },
    {
      title: 'Real Estate',
      desc: 'Property listings management, tenant lease tracking, virtual tour showcases, and rent collection portals.',
      icon: Building,
      color: '#06B6D4',
    },
    {
      title: 'Finance & FinTech',
      desc: 'Invoicing platforms, billing management software, payment gateway orchestration, and accounting systems.',
      icon: Landmark,
      color: '#10B981',
    },
    {
      title: 'Logistics & Supply Chain',
      desc: 'Fleet GPS tracking engines, route optimization tools, cargo manifest management, and dispatch portals.',
      icon: Truck,
      color: '#6366F1',
    },
    {
      title: 'E-Commerce Platforms',
      desc: 'Custom multi-vendor marketplaces, shopping cart engines, automated inventory sync, and order management.',
      icon: ShoppingCart,
      color: '#3B82F6',
    },
    {
      title: 'Government & Public',
      desc: 'Citizen service portals, public grievance registration tools, digital document verification, and dashboards.',
      icon: Building2,
      color: '#8B5CF6',
    },
    {
      title: 'Startups & SaaS',
      desc: 'Scalable MVP software engineering, multi-tenant SaaS platforms, custom AI integration, and cloud architecture.',
      icon: Rocket,
      color: '#EA580C',
    },
    {
      title: 'Small Businesses',
      desc: 'Custom business websites, billing POS apps, customer relationship management tools, and workflow automation.',
      icon: Store,
      color: '#059669',
    },
  ];

  return (
    <section id="industries" className="section-padding" style={{ position: 'relative', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>INDUSTRIES WE SERVE</span>
          </div>
          <h2>
            Tailored Industry Solutions <span className="text-gradient">Engineered For Scale</span>
          </h2>
          <p>
            We build domain-specific software engineered with deep industry knowledge, compliance, and user-centric workflows.
          </p>
        </div>

        {/* Symmetric 12 Industry Cards Grid (3x4 or 4x3) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -6, boxShadow: '0 16px 30px rgba(15, 23, 42, 0.08)' }}
                className="glass-card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  height: '100%',
                  borderRadius: 'var(--radius-lg)',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                }}
                onClick={() => onOpenQuote(`${ind.title} Industry Solution`)}
              >
                <div>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: `${ind.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <IconComp size={24} style={{ color: ind.color }} />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    {ind.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    {ind.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: ind.color, paddingTop: '8px' }}>
                  <span>Request Industry Quote</span>
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
