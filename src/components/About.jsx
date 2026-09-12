import React from 'react';
import { Target, Eye, Shield, Award, Globe2, Users, Lightbulb, Heart, Rocket, CheckCircle, GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const coreValues = [
    { title: 'Innovation', desc: 'Exploring modern frameworks and fresh approaches to build original software solutions.', icon: Lightbulb, color: '#7C3AED' },
    { title: 'Quality', desc: 'Uncompromised focus on clean code, performance, security, and user experience.', icon: Award, color: '#2563EB' },
    { title: 'Integrity', desc: 'Ethical, honest practices and transparent operations in every single partnership.', icon: Shield, color: '#0284C7' },
    { title: 'Transparency', desc: 'Clear communication, realistic project scopes, and upfront technical clarity.', icon: Eye, color: '#06B6D4' },
    { title: 'Professionalism', desc: 'Maintaining enterprise standards, confidentiality, and reliability at all times.', icon: Globe2, color: '#0F172A' },
    { title: 'Continuous Learning', desc: 'Constantly advancing our technology stack to master modern tools and best practices.', icon: Rocket, color: '#F59E0B' },
    { title: 'Customer First', desc: 'Prioritizing our client requirements, goals, and long-term satisfaction.', icon: Heart, color: '#EC4899' },
    { title: 'Commitment', desc: 'Dedicated to completing every project with quality and post-launch support.', icon: CheckCircle, color: '#10B981' },
  ];

  return (
    <section id="about" className="section-padding" style={{ position: 'relative', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>ABOUT SOLVIX</span>
          </div>
          <h2>
            Authentic Software Engineering <span className="text-gradient">Founded in 2026</span>
          </h2>
          <p>
            SOLVIX is a software development startup founded in 2026 in Coimbatore, Tamil Nadu, India, with a vision of building meaningful digital solutions.
          </p>
        </div>

        {/* Who We Are & Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            padding: '40px',
            marginBottom: '50px',
            background: '#FFFFFF',
            borderLeft: '5px solid #7C3AED',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', alignItems: 'center' }} className="story-grid">
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7C3AED', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Who We Are & Philosophy
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', lineHeight: 1.3, color: '#0F172A' }}>
                "Built to deliver customized, practical, and scalable software solutions."
              </h3>
              <p style={{ color: '#475569', marginBottom: '14px', lineHeight: 1.65 }}>
                SOLVIX was founded in 2026 by passionate software developers in Coimbatore, Tamil Nadu, India. Instead of offering generic template websites or mass-market software, we specialize in developing customized software tailored to each client’s specific requirements.
              </p>
              <p style={{ color: '#475569', marginBottom: '20px', lineHeight: 1.65 }}>
                Our goal is to build reliable, scalable, secure, and user-friendly software that helps businesses, educational institutions, healthcare organizations, startups, and entrepreneurs grow through technology.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(37, 99, 235, 0.06)', padding: '10px 16px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                  <MapPin size={18} style={{ color: '#2563EB' }} />
                  <span>HQ: Coimbatore, Tamil Nadu, India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(124, 58, 237, 0.06)', padding: '10px 16px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                  <GraduationCap size={18} style={{ color: '#7C3AED' }} />
                  <span>Founded in 2026</span>
                </div>
              </div>
            </div>

            {/* Mission & Vision Subcards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '28px', borderLeft: '4px solid #2563EB', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Target size={22} style={{ color: '#2563EB' }} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Our Mission</h4>
                </div>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6 }}>
                  To transform innovative ideas into practical digital solutions by delivering customized software with quality, innovation, and transparency while building long-term relationships with our clients.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '28px', borderLeft: '4px solid #7C3AED', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Eye size={22} style={{ color: '#7C3AED' }} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Our Vision</h4>
                </div>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6 }}>
                  To become a trusted software development company recognized for delivering customized digital solutions, empowering businesses through technology, and creating opportunities for aspiring software professionals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Values Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0F172A' }}>Our Core Values</h3>
          <p style={{ color: '#475569', fontSize: '0.96rem' }}>The authentic principles guiding every project we deliver at SOLVIX.</p>
        </div>

        {/* Symmetric 8 Core Values Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {coreValues.map((v, idx) => {
            const IconComp = v.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  height: '100%',
                  borderRadius: 'var(--radius-md)',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: `${v.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComp size={20} style={{ color: v.color }} />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>{v.title}</h4>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
