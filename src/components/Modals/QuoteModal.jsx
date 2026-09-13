import React, { useState, useEffect } from 'react';
import { X, FileText, CheckCircle2, Send, Info, Lock, Video, Phone, Mail, MessageSquare, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { validateName, validateEmail, validatePhone, validateDescription, validateFileUpload, generateSecurityToken } from '../../services/security';
import { api } from '../../services/api';

export default function QuoteModal({ prefilledType = 'Business Website', onClose }) {
  const categoryServicesMap = {
    'Web Development': [
      { name: 'Landing Page', price: '₹12,000' },
      { name: 'Portfolio Website', price: '₹18,000' },
      { name: 'Business Website', price: '₹25,000' },
      { name: 'Corporate Website', price: '₹45,000' },
      { name: 'E-Commerce Website', price: '₹80,000' },
      { name: 'Multi-Vendor Marketplace', price: '₹2,50,000' },
    ],
    'Mobile App Development': [
      { name: 'Android App', price: '₹80,000' },
      { name: 'iOS App', price: '₹1,00,000' },
      { name: 'Flutter App (Android + iOS)', price: '₹1,50,000' },
    ],
    'AI Solutions': [
      { name: 'AI Chatbot', price: '₹75,000' },
      { name: 'AI Customer Support', price: '₹1,50,000' },
      { name: 'AI Automation', price: '₹2,00,000' },
      { name: 'AI Document Processing', price: '₹2,50,000' },
    ],
    'Business Software': [
      { name: 'CRM Software', price: '₹1,80,000' },
      { name: 'ERP Platform', price: '₹4,50,000' },
      { name: 'Inventory Management', price: '₹1,20,000' },
      { name: 'HR & Payroll System', price: '₹1,75,000' },
    ],
    'Healthcare': [
      { name: 'Hospital Management System', price: '₹2,50,000' },
      { name: 'Clinic Management', price: '₹1,40,000' },
      { name: 'Appointment Booking System', price: '₹75,000' },
    ],
    'Education': [
      { name: 'Learning Management System (LMS)', price: '₹2,00,000' },
      { name: 'School ERP', price: '₹2,75,000' },
      { name: 'Online Examination Portal', price: '₹1,50,000' },
    ],
    'Cloud & DevOps': [
      { name: 'Cloud Deployment', price: '₹50,000' },
      { name: 'DevOps Setup', price: '₹1,00,000' },
    ],
    'Security': [
      { name: 'Authentication System', price: '₹35,000' },
      { name: 'Security Audit', price: '₹75,000' },
    ],
    'Custom Software': [
      { name: 'Enterprise Software', price: 'Starting from ₹3,00,000' },
      { name: 'SaaS Platform', price: 'Starting from ₹4,50,000' },
      { name: 'API Development', price: 'Starting from ₹30,000' },
    ],
  };

  const categories = Object.keys(categoryServicesMap);

  const [category, setCategory] = useState('Web Development');
  const [projectType, setProjectType] = useState('Business Website');
  const [estimatedPrice, setEstimatedPrice] = useState('₹25,000');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budgetRange: '₹25,000 – ₹50,000',
    expectedTimeline: '2–4 Weeks',
    meetingMethod: 'Google Meet',
    description: '',
    fileName: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [requiredFeatures, setRequiredFeatures] = useState([
    'Login / User Auth',
    'Mobile Responsive Design',
  ]);

  const [securityToken] = useState(generateSecurityToken());
  const [userTokenInput, setUserTokenInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [quoteId, setQuoteId] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const featuresList = [
    'Login / User Auth',
    'Admin Panel',
    'Payment Gateway',
    'AI Integration',
    'Dashboard & Analytics',
    'Reports & PDF Export',
    'Push Notifications',
    'API Integration',
    'Multi-language Support',
    'Mobile Responsive Design',
  ];

  const timelinesList = ['2–4 Weeks', '1–2 Months', '2–4 Months', '4–6 Months', 'Flexible'];

  const budgetRangesList = [
    '₹10,000 – ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,50,000',
    '₹1,50,000 – ₹3,00,000',
    '₹3,00,000+',
  ];

  const meetingMethods = [
    { name: 'Google Meet', icon: Video },
    { name: 'Zoom', icon: Video },
    { name: 'Phone Call', icon: Phone },
    { name: 'WhatsApp', icon: MessageSquare },
    { name: 'Email', icon: Mail },
  ];

  useEffect(() => {
    const services = categoryServicesMap[category] || [];
    if (services.length > 0) {
      setProjectType(services[0].name);
      setEstimatedPrice(services[0].price);
    }
  }, [category]);

  const handleServiceChange = (serviceName) => {
    setProjectType(serviceName);
    const services = categoryServicesMap[category] || [];
    const found = services.find((s) => s.name === serviceName);
    if (found) {
      setEstimatedPrice(found.price);
    }
  };

  const toggleFeature = (feat) => {
    if (requiredFeatures.includes(feat)) {
      setRequiredFeatures(requiredFeatures.filter((f) => f !== feat));
    } else {
      setRequiredFeatures([...requiredFeatures, feat]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErrorMsg('');
    if (file) {
      const fileCheck = validateFileUpload(file);
      if (!fileCheck.valid) {
        setErrorMsg(fileCheck.message);
        setSelectedFile(null);
        setFormData({ ...formData, fileName: '' });
        return;
      }
      setSelectedFile(file);
      setFormData({ ...formData, fileName: file.name });
    }
  };

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

    // 4. Description check (20-2000 chars)
    const descCheck = validateDescription(formData.description);
    if (!descCheck.valid) {
      setErrorMsg(descCheck.message);
      return;
    }

    // 5. Anti-Spam Code check
    if (userTokenInput.trim().toUpperCase() !== 'SOLVIX') {
      setErrorMsg('Anti-spam verification failed. Please type "SOLVIX" in the security code field.');
      return;
    }

    setLoading(true);

    try {
      // Execute REAL HTTP fetch() request to Express Backend (POST /api/quote)
      const result = await api.submitQuote({
        ...formData,
        category,
        projectType,
        estimatedPrice,
        requiredFeatures,
        securityToken,
      });

      setQuoteId(result.data?.id || 'QTE-LIVE');
      setSuccessMsg(result.message || 'Your enquiry has been submitted successfully. A confirmation email has been sent to you. Our team will contact you within one business day.');
      setSubmittedEmail(formData.email);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        budgetRange: '₹25,000 – ₹50,000',
        expectedTimeline: '2–4 Weeks',
        meetingMethod: 'Google Meet',
        description: '',
        fileName: '',
      });
      setSelectedFile(null);
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Unable to connect to SOLVIX backend server. Please try again.');
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
          maxWidth: '720px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.25)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(124, 58, 237, 0.06))',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={22} style={{ color: '#2563EB' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
                Let's Build Your Next Software Solution
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748B' }}>
                Share your requirements and we'll prepare a personalized proposal with scope, timeline, and estimated pricing.
              </p>
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

        {/* Form Body */}
        <div style={{ padding: '28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10B981',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={36} style={{ color: '#10B981' }} />
              </div>
              <h4 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                {successMsg}
              </h4>
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  color: '#2563EB',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginBottom: '18px',
                }}
              >
                Quote Reference ID: {quoteId}
              </div>
              <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Notification alerts were dispatched to the SOLVIX team. An auto-reply confirmation email has been sent to <strong>{submittedEmail || 'your email address'}</strong>.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ width: '100%', maxWidth: '280px', justifyContent: 'center' }}>
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {errorMsg && (
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#DC2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Category Dropdown */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Project Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none', fontWeight: 600 }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Project Type & Live Estimated Starting Price Card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Select Project Type *
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none', fontWeight: 600 }}
                  >
                    {(categoryServicesMap[category] || []).map((serv) => (
                      <option key={serv.name} value={serv.name}>
                        {serv.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(37, 99, 235, 0.05)',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 800 }}>Est. Starting Price</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#2563EB' }}>{estimatedPrice}</div>
                  </div>
                  <Info size={18} style={{ color: '#2563EB' }} />
                </div>
              </div>

              {/* Name & Company */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name (3–60 chars)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Company (Max 100 chars)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Budget Range & Timeline */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Target Budget Range (INR) *
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none' }}
                  >
                    {budgetRangesList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                    Expected Timeline *
                  </label>
                  <select
                    value={formData.expectedTimeline}
                    onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none' }}
                  >
                    {timelinesList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Required Features Checklist */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                  Required Features Checklist
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {featuresList.map((feat) => {
                    const isChecked = requiredFeatures.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: isChecked ? '1px solid #2563EB' : '1px solid #E2E8F0',
                          background: isChecked ? 'rgba(37, 99, 235, 0.05)' : '#F8FAFC',
                          color: isChecked ? '#2563EB' : '#475569',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          textAlign: 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: isChecked ? '1px solid #2563EB' : '1px solid #CBD5E1', background: isChecked ? '#2563EB' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isChecked && <Check size={12} style={{ color: '#FFFFFF' }} />}
                        </div>
                        <span>{feat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Meeting Method Selector */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                  Preferred Meeting Method *
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {meetingMethods.map((m) => {
                    const IconComp = m.icon;
                    const isSelected = formData.meetingMethod === m.name;
                    return (
                      <button
                        type="button"
                        key={m.name}
                        onClick={() => setFormData({ ...formData, meetingMethod: m.name })}
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

              {/* Description */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Project Description & Requirements (Min 20 characters) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your project requirements, target users, custom logic, or goals..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* File Upload Attachment Option (Max 10 MB: PDF, DOC, DOCX, PNG, JPG, JPEG) */}
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '6px' }}>
                  Attach Requirement Document (Max 10 MB: PDF, DOC, DOCX, PNG, JPG, JPEG)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}
                />
                {selectedFile && (
                  <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>
                    ✓ Attached: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                )}
              </div>

              {/* Anti-Spam Security Verification */}
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

              {/* Confidential Privacy Notice */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748B', background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <Lock size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                <span>Your information is kept confidential and is used only to prepare your quotation.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                <Send size={18} />
                <span>{loading ? 'Submitting to Express API...' : 'Submit via API'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
