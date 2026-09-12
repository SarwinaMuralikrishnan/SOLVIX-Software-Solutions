import React from 'react';
import { ExternalLink, Github, Eye, Sparkles, Code2, UserCheck } from 'lucide-react';

export default function Projects({ onOpenDemo }) {
  const actualProjects = [
    {
      id: 'simpill',
      title: 'SimPill',
      description: 'An AI-assisted medicine reminder application developed to help patients manage medications efficiently.',
      tech: ['Python', 'Flask', 'OpenCV', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
      gradient: 'linear-gradient(135deg, #2563EB, #38BDF8)',
    },
    {
      id: 'zenmed',
      title: 'ZenMed',
      description: 'An intelligent diabetes management platform with patient monitoring, reminders, and healthcare support features.',
      tech: ['Python', 'Flask', 'Machine Learning', 'HTML', 'CSS', 'JavaScript'],
      gradient: 'linear-gradient(135deg, #7C3AED, #2563EB)',
    },
    {
      id: 'petition-engine',
      title: 'Petition Response Engine',
      description: 'An AI-powered web application designed to automate petition classification and response generation.',
      tech: ['Python', 'Flask', 'Machine Learning', 'NLP'],
      gradient: 'linear-gradient(135deg, #0284C7, #10B981)',
    },
    {
      id: 'telemedicine-platform',
      title: 'Telemedicine Platform',
      description: 'A healthcare platform enabling online consultation, appointment booking, and digital patient management.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    },
  ];

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative', background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>FEATURED PROJECTS</span>
          </div>
          <h2>
            Authentic Digital Solutions <span className="text-gradient">Engineered by SOLVIX</span>
          </h2>
          <p>
            Explore actual applications developed by our engineering team across healthcare, artificial intelligence, and digital management systems.
          </p>
        </div>

        {/* 4 Featured Actual Project Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))', gap: '32px', marginBottom: '60px' }} className="projects-2col-grid">
          {actualProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
              }}
            >
              <div>
                {/* Visual Banner */}
                <div
                  style={{
                    height: '180px',
                    background: project.gradient,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      opacity: 0.4,
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span
                      style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}
                    >
                      SOLVIX Software Project
                    </span>
                  </div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 800 }}>
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description & Tech Badges */}
                <div style={{ padding: '28px' }}>
                  <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'rgba(37, 99, 235, 0.08)',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                          color: '#2563EB',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Details Action */}
              <div
                style={{
                  padding: '16px 28px',
                  background: '#F8FAFC',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  onClick={() => onOpenDemo(project.title)}
                  className="btn-primary btn-sm"
                  style={{ width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)' }}
                >
                  <Eye size={16} />
                  <span>View Project Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Founders GitHub Showcase Box */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(124, 58, 237, 0.04) 100%)',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
          }}
        >
          <div className="badge-pill" style={{ marginBottom: '12px' }}>
            <Github size={14} />
            <span>OPEN SOURCE & ENGINEERING REPOSITORIES</span>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
            Connect with SOLVIX Founders on GitHub
          </h3>
          <p style={{ color: '#475569', maxWidth: '640px', margin: '0 auto 28px auto', fontSize: '0.96rem' }}>
            We believe in transparent engineering, continuous learning, and sharing code with the developer community. Explore our GitHub profiles below.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Founder GitHub */}
            <a
              href="https://github.com/SarwinaMuralikrishnan"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px' }}
            >
              <Github size={20} />
              <span>Founder: Sarwina Muralikrishnan</span>
            </a>

            {/* Co-Founder GitHub */}
            <a
              href="https://github.com/SUBETHA212006"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px' }}
            >
              <Github size={20} />
              <span>Co-Founder: Subetha</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-2col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
