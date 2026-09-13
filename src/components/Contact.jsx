import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, MessageCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { validateName, validateEmail, validatePhone, validateDescription, generateSecurityToken } from '../services/security';
import { api } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [securityToken] = useState(generateSecurityToken());
  const [userTokenInput, setUserTokenInput] = useState('SOLVIX');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Strict Name Validation
    const nameCheck = validateName(formData.name);
    if (!nameCheck.valid) {
      setErrorMsg(nameCheck.message);
      return;
    }

    // 2. Strict Email Validation
    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) {
      setErrorMsg(emailCheck.message);
      return;
    }

    // 3. Indian Phone Validation (10 digits)
    const phoneCheck = validatePhone(formData.phone);
    if (!phoneCheck.valid) {
      setErrorMsg(phoneCheck.message);
      return;
    }

    // 4. Message Validation (min 20 chars)
    const msgCheck = validateDescription(formData.message);
    if (!msgCheck.valid) {
      setErrorMsg(msgCheck.message);
      return;
    }

    // 5. Anti-Spam Code Check
    if (userTokenInput.trim().toUpperCase() !== 'SOLVIX') {
      setErrorMsg('Anti-spam verification failed. Please type "SOLVIX" in the security code field.');
      return;
    }

    setLoading(true);

    try {
      // Execute REAL HTTP fetch() request to Express Backend (POST http://localhost:5000/api/contact)
      const result = await api.submitContact({
        ...formData,
        securityToken,
      });

      setSuccessMsg(result.message || 'Enquiry submitted successfully');
      setSubmittedEmail(formData.email);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Unable to send message at this time. Please try again or contact us directly.');
    }
  };

  const whatsappUrl = `https://wa.me/917639410944?text=${encodeURIComponent('Hello SOLVIX Team, I am interested in your software development services.')}`;

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>GET IN TOUCH</span>
          </div>
          <h2>
            Let's Discuss Your <span className="text-gradient">Software Project</span>
          </h2>
          <p>
            Have a technical question or project requirement? Reach out to the SOLVIX team in Coimbatore today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '40px' }} className="contact-grid">
          {/* Left Column — Official Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '32px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '20px' }}>
                Company Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Location & HQ */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} style={{ color: '#2563EB' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Location & HQ</div>
                    <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A' }}>Coimbatore, Tamil Nadu, India</div>
                    <div style={{ fontSize: '0.84rem', color: '#7C3AED', fontWeight: 700, marginTop: '2px' }}>
                      🌐 Serving clients remotely across India and worldwide.
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} style={{ color: '#7C3AED' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Business Hours</div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0F172A' }}>Monday – Saturday</div>
                    <div style={{ fontSize: '0.84rem', color: '#475569' }}>9:00 AM – 6:00 PM IST</div>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} style={{ color: '#10B981' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Phone & WhatsApp (Clickable)</div>
                    <a href="tel:+917639410944" style={{ fontSize: '0.94rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'block' }}>
                      +91 76394 10944
                    </a>
                    <a href="tel:+919894088401" style={{ fontSize: '0.94rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'block' }}>
                      +91 98940 88401
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        background: '#25D366',
                        color: '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <MessageCircle size={14} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Emails */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} style={{ color: '#0284C7' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Official Emails (Clickable)</div>
                    <a href="mailto:sarwinamuralikrishnan@gmail.com" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'block' }}>
                      sarwinamuralikrishnan@gmail.com
                    </a>
                    <a href="mailto:subetha076@gmail.com" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'block' }}>
                      subetha076@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — API Form */}
          <div className="glass-card" style={{ padding: '36px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-xl)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10B981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <CheckCircle2 size={34} style={{ color: '#10B981' }} />
                </div>
                <h4 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                  {successMsg}
                </h4>
                <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '24px' }}>
                  Notification alerts were dispatched to the SOLVIX team. An auto-reply confirmation email has been sent to <strong>{submittedEmail || 'your email address'}</strong>.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>Send Us an Enquiry</h3>
                <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '4px' }}>
                  Fill out the details below and our team will get back to you within 24 hours.
                </p>

                {errorMsg && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#DC2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name & Company */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name (3–60 chars)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Company Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="Company (Max 100 chars)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Phone Number (10 Digits) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Project Description / Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project requirements (Min 20 characters)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                {/* Anti-Spam Security Code */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#475569', fontWeight: 700 }}>
                    <ShieldCheck size={16} style={{ color: '#10B981' }} />
                    <span>Anti-Spam Code: Type "<strong>SOLVIX</strong>"</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="SOLVIX"
                    value={userTokenInput}
                    onChange={(e) => setUserTokenInput(e.target.value)}
                    style={{ width: '90px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem', fontWeight: 800, textAlign: 'center', textTransform: 'uppercase' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
                >
                  <Send size={18} />
                  <span>{loading ? 'Sending Request...' : 'Send Request'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
