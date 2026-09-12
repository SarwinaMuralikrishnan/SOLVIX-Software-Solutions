import React from 'react';
import { MessageSquare, Map, Palette, Code, CheckCircle, Rocket, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    { num: '01', title: 'Requirement Discussion', desc: 'In-depth discovery session to analyze project goals, scope, business rules, and technical requirements.', icon: MessageSquare, color: '#2563EB' },
    { num: '02', title: 'Planning', desc: 'Designing system architecture, database schemas, API specifications, and milestone delivery roadmaps.', icon: Map, color: '#7C3AED' },
    { num: '03', title: 'UI/UX Design', desc: 'Creating intuitive wireframing, high-fidelity Figma design tokens, and user experience component systems.', icon: Palette, color: '#0284C7' },
    { num: '04', title: 'Development', desc: 'Engineering modular frontend and backend code with clean architecture, high performance, and security.', icon: Code, color: '#38BDF8' },
    { num: '05', title: 'Testing', desc: 'Conducting thorough automated unit testing, integration tests, security audits, and performance profiling.', icon: CheckCircle, color: '#10B981' },
    { num: '06', title: 'Deployment', desc: 'Configuring production cloud servers (AWS/Vercel/DigitalOcean) with SSL certificates, CDN, and monitoring.', icon: Rocket, color: '#F59E0B' },
    { num: '07', title: 'Maintenance', desc: 'Providing ongoing post-launch SLA maintenance, server uptime monitoring, security updates, and enhancements.', icon: Wrench, color: '#EC4899' },
  ];

  return (
    <section id="process" className="section-padding" style={{ position: 'relative', background: '#F8FAFC', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>DEVELOPMENT LIFECYCLE</span>
          </div>
          <h2>
            Our Proven 7-Step <span className="text-gradient">Engineering Process</span>
          </h2>
          <p>
            A disciplined agile software development process engineered for quality, transparency, and on-time delivery.
          </p>
        </div>

        {/* Vertical Timeline Container with Central Connecting Line */}
        <div style={{ position: 'relative', maxWidth: '940px', margin: '0 auto' }}>
          {/* Subtle Vertical Connecting Center Line (Desktop) */}
          <div
            className="process-center-line"
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '50%',
              width: '3px',
              background: 'linear-gradient(180deg, #2563EB, #7C3AED, #10B981, #EC4899)',
              transform: 'translateX(-50%)',
              borderRadius: '2px',
              opacity: 0.35,
              zIndex: 0,
            }}
          />

          {/* Alternating Vertically Stacked Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative', zIndex: 1 }}>
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  style={{
                    display: 'flex',
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                    width: '100%',
                  }}
                  className="process-row"
                >
                  <div
                    className="glass-card"
                    style={{
                      width: '46%',
                      padding: '32px',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: 'var(--radius-xl)',
                      borderLeft: `5px solid ${step.color}`,
                      boxShadow: 'var(--shadow-md)',
                      transition: 'var(--transition-fast)',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          background: `rgba(${parseInt(step.color.slice(1, 3), 16)}, ${parseInt(step.color.slice(3, 5), 16)}, ${parseInt(step.color.slice(5, 7), 16)}, 0.12)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComp size={22} style={{ color: step.color }} />
                      </div>

                      <span
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          color: step.color,
                          fontFamily: 'var(--font-mono)',
                          opacity: 0.85,
                        }}
                      >
                        {step.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .process-center-line {
            left: '20px' !important;
          }
          .process-row {
            justify-content: flex-start !important;
          }
          .process-row > div {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
