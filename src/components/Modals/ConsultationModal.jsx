import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Send, Video, Phone, MessageSquare, AlertCircle, ShieldCheck, Mail } from 'lucide-react';
import { validateName, validateEmail, validatePhone, validateDescription, validateDateTime, generateSecurityToken } from '../../services/security';
import { api } from '../../services/api';

export default function ConsultationModal({ title = 'Book a Free Technical Consultation', initialTopic = '', onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    meetingType: 'Google Meet',
    preferredDate: '',
    preferredTime: '10:00 AM IST',
    description: initialTopic ? `Technical Topic: ${initialTopic}` : '',
  });

  const meetingMethodsList = [
    { name: 'Google Meet', icon: Video },
    { name: 'Zoom', icon: Video },
    { name: 'Phone Call', icon: Phone },
    { name: 'WhatsApp', icon: MessageSquare },
    { name: 'Email', icon: Mail },
  ];

  const businessHoursTimes = [
    '09:00 AM IST',
    '10:00 AM IST',
    '11:00 AM IST',
    '12:00 PM IST',
    '02:00 PM IST',
    '03:00 PM IST',
    '04:00 PM IST',
    '05:00 PM IST',
    '06:00 PM IST',
  ];

  const [securityToken] = useState(generateSecurityToken());
  const [userTokenInput, setUserTokenInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Name check
    const nameCheck = validateName(formData.name);
    if (!nameCheck.valid) {
      setErrorMsg(nameCheck.message);
      return;
    }

    // 2. Email check
    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) {
      setErrorMsg(emailCheck.message);
      return;
    }

    // 3. Indian Phone check (10 digits)
    const phoneCheck = validatePhone(formData.phone);
    if (!phoneCheck.valid) {
      setErrorMsg(phoneCheck.message);
      return;
    }

    // 4. Meeting Date & Time check (Mon-Sat business hours, no past dates)
    const dateTimeCheck = validateDateTime(formData.preferredDate, formData.preferredTime);
    if (!dateTimeCheck.valid) {
      setErrorMsg(dateTimeCheck.message);
      return;
    }

    // 5. Description check (20-2000 chars)
    const descCheck = validateDescription(formData.description);
    if (!descCheck.valid) {
      setErrorMsg(descCheck.message);
      return;
    }

    // 6. Anti-Spam Code check
    if (userTokenInput.trim().toUpperCase() !== 'SOLVIX') {
      setErrorMsg('Anti-spam verification failed. Please type "SOLVIX" in the security code field.');
      return;
    }

    setLoading(true);

    try {
      // Execute REAL HTTP fetch() request to Express Backend (POST /api/consultation)
      const result = await api.submitConsultation({
        ...formData,
        securityToken,
      });

      setBookingId(result.data?.id || 'CNS-LIVE');
      setSuccessMsg(result.message || 'Your enquiry has been submitted successfully. A confirmation email has been sent to you. Our team will contact you within one business day.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        meetingType: 'Google Meet',
        preferredDate: '',
        preferredTime: '10:00 AM IST',
        description: '',
      });
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Unable to book consultation at this time. Please try again or contact us directly.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20000,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.25)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(37, 99, 235, 0.06))',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={22} style={{ color: '#7C3AED' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>{title}</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748B' }}>Schedule a 1-on-1 session with SOLVIX engineering leads</p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              color: '#0F172A',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10B981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={36} style={{ color: '#10B981' }} />
              </div>
              <h4 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                {successMsg}
              </h4>
              <div style={{ display: 'inline-block', background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.2)', color: '#7C3AED', padding: '6px 16px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '18px' }}>
                Booking Reference ID: {bookingId}
              </div>
              <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '24px' }}>
                A confirmation email has been sent to <strong>{formData.email}</strong> detailing your <strong>{formData.meetingType}</strong> meeting on <strong>{formData.preferredDate}</strong> at <strong>{formData.preferredTime}</strong>. Both founders (sarwinamuralikrishnan@gmail.com & subetha076@gmail.com) have been notified immediately.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ width: '100%', maxWidth: '280px', justifyContent: 'center' }}>
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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

              {/* Meeting Method Selector */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                  Select Preferred Meeting Method *
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {meetingMethodsList.map((m) => {
                    const IconComp = m.icon;
                    const isSelected = formData.meetingType === m.name;
                    return (
                      <button
                        type="button"
                        key={m.name}
                        onClick={() => setFormData({ ...formData, meetingType: m.name })}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: 'var(--radius-full)',
                          border: isSelected ? '1px solid #7C3AED' : '1px solid #E2E8F0',
                          background: isSelected ? '#7C3AED' : '#F8FAFC',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        <IconComp size={14} />
                        <span>{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Preferred Date (Mon–Sat) *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none', fontWeight: 600 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Business Hours Time (9 AM – 6 PM) *</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none', fontWeight: 600 }}
                  >
                    {businessHoursTimes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>Project Description / Technical Requirements (Min 20 chars) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your project requirements or specific technical questions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* Anti-Spam Verification */}
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
                <span>{loading ? 'Submitting Request...' : 'Submit Request'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
