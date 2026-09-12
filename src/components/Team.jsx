import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Team() {
  const teamMembers = [
    {
      name: 'Subetha Thandiyappan',
      role: 'Founder',
      title: 'Software Developer & Product Lead',
      initials: 'ST',
      image: '/subetha.jpg',
      avatarBg: 'rgba(124, 58, 237, 0.12)',
      avatarColor: '#7C3AED',
      badgeBg: '#EDE9FE',
      badgeColor: '#5B21B6',
      borderAccent: '#7C3AED',
      description:
        'Focused on architecting cross-platform mobile applications, robust backend microservices, and customized software solutions tailored to enterprise goals.',
      skills: ['Mobile Apps', 'Backend APIs', 'UI/UX Design', 'Database Systems'],
      github: 'https://github.com/SUBETHA212006',
      linkedin: 'https://linkedin.com/',
      email: 'subetha076@gmail.com',
    },
    {
      name: 'Sarwina Muralikrishnan',
      role: 'Co-Founder',
      title: 'Software Developer & Tech Lead',
      initials: 'SM',
      image: '/sarwina.jpg',
      avatarBg: 'rgba(37, 99, 235, 0.12)',
      avatarColor: '#2563EB',
      badgeBg: '#DBEAFE',
      badgeColor: '#1E40AF',
      borderAccent: '#2563EB',
      description:
        'Passionate about engineering scalable software solutions, AI-powered applications, and high-performance modern web platforms with a focus on quality.',
      skills: ['Full-Stack Web', 'AI Systems', 'System Architecture', 'Cloud Engineering'],
      github: 'https://github.com/SarwinaMuralikrishnan',
      linkedin: 'https://linkedin.com/',
      email: 'sarwinamuralikrishnan07feb@gmail.com',
    },
    {
      name: 'Manjith Mohan Kumar B',
      role: 'CEO',
      title: 'Chief Executive Officer',
      initials: 'MM',
      image: '/manjith.jpg',
      avatarBg: 'rgba(16, 185, 129, 0.12)',
      avatarColor: '#059669',
      badgeBg: '#D1FAE5',
      badgeColor: '#047857',
      borderAccent: '#10B981',
      description:
        'Spearheading strategic vision, enterprise client partnerships, operational excellence, and organizational growth at SOLVIX Software Solutions.',
      skills: ['Strategic Vision', 'Enterprise Growth', 'Client Relations', 'Operations'],
      github: 'https://github.com/Manjith717',
      linkedin: 'https://linkedin.com/',
      email: 'contact@solvixsoftwaresolutions.com',
    },
  ];

  return (
    <section id="team" className="section-padding" style={{ position: 'relative', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>EXECUTIVE LEADERSHIP & CORE TEAM</span>
          </div>
          <h2>
            Meet the Team Behind <span className="text-gradient">SOLVIX</span>
          </h2>
          <p>
            The dedicated software leaders and engineers driving technical excellence, client satisfaction, and digital innovation from Coimbatore.
          </p>
        </div>

        {/* 3 Equal Executive Team Profile Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            maxWidth: '1140px',
            margin: '0 auto',
          }}
        >
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.1)' }}
              className="glass-card"
              style={{
                padding: '36px 28px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '24px',
                position: 'relative',
              }}
            >
              <div>
                {/* Header Profile Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '22px',
                      background: member.avatarBg,
                      border: `2px solid ${member.borderAccent}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.75rem',
                      fontWeight: '900',
                      color: member.avatarColor,
                      boxShadow: `0 8px 24px ${member.avatarColor}20`,
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                        }}
                      />
                    ) : (
                      member.initials
                    )}
                  </div>

                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.74rem',
                        fontWeight: '800',
                        background: member.badgeBg,
                        color: member.badgeColor,
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {member.role}
                    </span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.25 }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 700, marginTop: '2px' }}>
                      {member.title}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, marginBottom: '20px' }}>
                  {member.description}
                </p>

                {/* Skill Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: '#475569',
                        padding: '3px 9px',
                        borderRadius: '6px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: GitHub, LinkedIn, Email */}
              <div style={{ display: 'flex', gap: '8px', paddingTop: '18px', borderTop: '1px solid #E2E8F0', flexWrap: 'wrap' }}>
                {member.github !== '#' && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 13px',
                      borderRadius: 'var(--radius-full)',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      color: '#0F172A',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    title={`${member.name}'s GitHub`}
                  >
                    <Github size={14} style={{ color: member.avatarColor }} />
                    <span>GitHub</span>
                  </a>
                )}

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 13px',
                    borderRadius: 'var(--radius-full)',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  title={`${member.name}'s LinkedIn`}
                >
                  <Linkedin size={14} style={{ color: member.avatarColor }} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${member.email}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 13px',
                    borderRadius: 'var(--radius-full)',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  title={`Email ${member.name}`}
                >
                  <Mail size={14} style={{ color: member.avatarColor }} />
                  <span>Email</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
