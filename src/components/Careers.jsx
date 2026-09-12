import React, { useState } from 'react';
import { Briefcase, GraduationCap, Send, CheckCircle2, FileText, Code, Sparkles, User, Mail, Phone, Link, Github } from 'lucide-react';
import { dbService } from '../services/db';

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Full-Stack Software Developer Intern',
    resumeUrl: '',
    githubUrl: '',
    coverLetter: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const openPositions = [
    {
      title: 'Full-Stack Software Developer Intern',
      type: 'Internship / Full-Time Track',
      location: 'Coimbatore, Tamil Nadu / Hybrid',
      description: 'Hands-on development with React, Node.js, Python, and SQL/MongoDB databases. Mentored directly by software founders.',
    },
    {
      title: 'Flutter Mobile App Developer Intern',
      type: 'Internship / Full-Time Track',
      location: 'Coimbatore, Tamil Nadu / Remote',
      description: 'Engineering cross-platform Flutter applications for iOS and Android with RESTful API integration.',
    },
    {
      title: 'UI/UX Design Intern',
      type: 'Internship',
      location: 'Coimbatore, Tamil Nadu / Remote',
      description: 'Creating wireframes, interactive Figma design tokens, and user experience components for web & mobile apps.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dbService.addCareerApplication(formData);
    setSubmitted(true);
  };

  return (
    <section id="careers" className="section-padding" style={{ position: 'relative', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>CAREERS & OPPORTUNITIES</span>
          </div>
          <h2>
            Join Our Engineering Team <span className="text-gradient">Grow With SOLVIX</span>
          </h2>
          <p>
            At SOLVIX, we believe in nurturing talent and providing hands-on software development experience for ambitious developers, designers, and students.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }} className="careers-grid">
          {/* Left Column — Open Roles */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '18px' }}>
              Open Developer Positions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {openPositions.map((role, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '24px',
                    borderRadius: 'var(--radius-lg)',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{role.title}</h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB' }}>
                      {role.type}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#7C3AED', fontWeight: 700, marginBottom: '10px' }}>
                    📍 {role.location}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
                    {role.description}
                  </p>

                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, position: role.title }))}
                    className="btn-secondary btn-sm"
                  >
                    <span>Apply for this position</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Interactive Application Form */}
          <div className="glass-card" style={{ padding: '36px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <CheckCircle2 size={34} style={{ color: '#10B981' }} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>Application Submitted!</h3>
                <p style={{ color: '#475569', marginBottom: '24px', fontSize: '0.94rem' }}>
                  Thank you for applying to SOLVIX. Our founders will review your application and contact you via email at <strong>{formData.email}</strong>.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>Apply Online</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '8px' }}>
                  Fill out your details below to submit your resume for review.
                </p>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }}
                  />
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>Applying Position *</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }}
                  >
                    {openPositions.map((p) => (
                      <option key={p.title} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resume Link & GitHub */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>Resume URL (Drive/PDF) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/..."
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>GitHub / Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', color: '#0F172A' }}>Why do you want to join SOLVIX?</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your programming skills, projects built, or goals..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '13px', justifyContent: 'center' }}>
                  <Send size={18} />
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .careers-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
