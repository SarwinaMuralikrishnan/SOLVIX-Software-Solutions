import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Github, Send, MessageCircle, Lock } from 'lucide-react';
import { api } from '../services/api';
import { dbService } from '../services/db';

export default function Footer({ onOpenModal, onOpenAdmin }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newsletterEmail) return;

    setLoading(true);
    try {
      await api.subscribeNewsletter(newsletterEmail);
      dbService.addSubscriber(newsletterEmail); // local sync fallback
      setSubscribed(true);
      setNewsletterEmail('');
    } catch (err) {
      setErrorMsg(err.message || 'Subscription failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', paddingTop: '70px', paddingBottom: '36px', position: 'relative' }}>
      <div className="container">
        {/* Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 1.2fr', gap: '40px', marginBottom: '50px' }} className="footer-grid">
          {/* Brand Column */}
          <div>
            <a href="#home" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/solvix-logo.png" alt="SOLVIX Logo" style={{ height: '40px', width: 'auto' }} />
            </a>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '18px', lineHeight: 1.6, maxWidth: '340px' }}>
              SOLVIX is an authentic software development startup founded in 2026 in Coimbatore, Tamil Nadu, India. We specialize in building customized digital solutions tailored to client goals.
            </p>
            <div style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6 }}>
              <strong>Headquarters:</strong> Coimbatore, Tamil Nadu, India<br />
              <strong>Hours:</strong> Mon – Sat | 9:00 AM – 6:00 PM IST
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '18px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, margin: 0 }}>
              {[
                { name: 'Services', href: '#services' },
                { name: 'Technologies', href: '#technologies' },
                { name: 'Process', href: '#process' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'Industries', href: '#industries' },
                { name: 'FAQ', href: '#faq' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{ color: '#475569', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition-fast)' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub & Social Media Column */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '18px' }}>GitHub & Social</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <a
                href="https://github.com/Manjith717"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
              >
                <Github size={16} />
                <span>Manjith's GitHub (CEO)</span>
              </a>
              <a
                href="https://github.com/SUBETHA212006"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
              >
                <Github size={16} />
                <span>Subetha's GitHub (Founder)</span>
              </a>
              <a
                href="https://github.com/SarwinaMuralikrishnan"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
              >
                <Github size={16} />
                <span>Sarwina's GitHub (Co-Founder)</span>
              </a>
              <a
                href="https://wa.me/917639410944"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#10B981', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Business</span>
              </a>
            </div>
          </div>

          {/* Official Contact Info & Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '18px' }}>Official Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#475569', marginBottom: '20px' }}>
              <div>
                <strong style={{ color: '#0F172A' }}>Email:</strong><br />
                <a href="mailto:sarwinamuralikrishnan@gmail.com" style={{ color: '#2563EB', textDecoration: 'none' }}>
                  sarwinamuralikrishnan@gmail.com
                </a><br />
                <a href="mailto:subetha076@gmail.com" style={{ color: '#2563EB', textDecoration: 'none' }}>
                  subetha076@gmail.com
                </a>
              </div>

              <div>
                <strong style={{ color: '#0F172A' }}>Phone / WhatsApp:</strong><br />
                <a href="tel:+917639410944" style={{ color: '#0F172A', textDecoration: 'none' }}>
                  +91 7639410944
                </a><br />
                <a href="tel:+919894088401" style={{ color: '#0F172A', textDecoration: 'none' }}>
                  +91 9894088401
                </a>
              </div>
            </div>

            {/* Newsletter Subscription Form */}
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Subscribe to Updates</div>
              {subscribed ? (
                <div style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 700 }}>✓ Subscribed successfully!</div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.82rem', outline: 'none' }}
                    />
                    <button type="submit" disabled={loading} className="btn-primary btn-sm" style={{ padding: '8px 12px' }}>
                      <Send size={14} />
                    </button>
                  </div>
                  {errorMsg && (
                    <div style={{ fontSize: '0.75rem', color: '#DC2626' }}>{errorMsg}</div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Admin Access */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#64748B',
          }}
        >
          <div>
            Copyright © 2026 SOLVIX Software Solutions (www.solvixsoftwaresolutions.com). All Rights Reserved. Coimbatore, Tamil Nadu, India.
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button
              onClick={() => onOpenModal('Privacy Policy', `Privacy Policy for SOLVIX Software Solutions\nLast Updated: September 2026 | Coimbatore, Tamil Nadu, India\n\n1. Introduction & Commitment\nAt SOLVIX Software Solutions, we take data privacy, source code protection, and client confidentiality with the utmost priority. This Privacy Policy outlines how we collect, handle, and safeguard your personal and enterprise information across our services and web platforms.\n\n2. Information We Collect\n• Contact & Business Details: Name, business email, phone number, company name, and project requirements submitted via contact forms, quote calculators, or consultation bookings.\n• Technical & Usage Data: IP address, browser type, operating system, and telemetry necessary to maintain site security and optimal user experience.\n\n3. How We Use Your Data\n• Software Delivery: Processing quote requests, scheduling technical consultations, and delivering customized digital software solutions.\n• Communication: Providing project updates, technical proposals, security alerts, and transactional messages.\n• Strict Confidentiality: We do NOT sell, rent, trade, or expose client data or proprietary source code to third-party advertisers.\n\n4. Intellectual Property & Source Code Security\n• Private Repositories: All client project code repositories are strictly private and encrypted.\n• Non-Disclosure Agreements (NDAs): Standard NDAs protect all client software logic, database schemas, and proprietary workflows.\n\n5. Data Security Measures\nWe implement enterprise-grade security measures including 256-bit SSL encryption, JWT authentication, and secure database access controls.\n\n6. Contact & Data Controller\nFor any privacy inquiries or data requests, contact our engineering team:\n• Email: sarwinamuralikrishnan@gmail.com / subetha076@gmail.com\n• Headquarters: SOLVIX Software Solutions, Coimbatore, Tamil Nadu, India.`)}
              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenModal('Terms & Conditions', `Terms & Conditions for SOLVIX Software Solutions\nLast Updated: September 2026 | Coimbatore, Tamil Nadu, India\n\n1. Overview & Agreement\nThese Terms & Conditions govern all software development, web applications, mobile apps, AI solutions, and consulting services provided by SOLVIX Software Solutions.\n\n2. Custom Deliverables & 100% Full Source Code Ownership\n• Upon complete payment of agreed milestone fees, the client gains 100% full intellectual property and source code ownership for custom software deliverables.\n• SOLVIX provides production-ready source code, database scripts, deployment manifests, and documentation upon project handover.\n\n3. Project Milestones & Execution\n• All custom software builds follow structured milestones (Requirement Analysis, UI/UX Design, Core Development, QA Testing, and Cloud Deployment).\n• Any significant changes to project scope following milestone approval will be processed through transparent change order protocols.\n\n4. Client Responsibilities\nClients agree to provide timely feedback, necessary credentials, content assets, and access approvals required for scheduled milestone execution.\n\n5. Maintenance & Post-Launch Support\n• All software deliverables include standard post-launch bug fix support as specified in your project proposal.\n• Extended Annual Maintenance Contracts (AMC) and 24/7 SLA monitoring packages are available separately.\n\n6. Limitation of Liability & Governing Law\n• SOLVIX Software Solutions shall not be liable for indirect or consequential damages resulting from third-party server downtimes or external API modifications beyond our control.\n• These Terms shall be governed by and construed in accordance with the laws of India, under the jurisdiction of courts in Coimbatore, Tamil Nadu.`)}
              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Terms & Conditions
            </button>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Lock size={13} />
                <span>Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
