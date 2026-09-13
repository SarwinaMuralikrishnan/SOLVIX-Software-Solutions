import React, { useState } from 'react';
import { Globe, Smartphone, Bot, Briefcase, Stethoscope, GraduationCap, Cloud, Lock, Settings, FileText, Info, ArrowRight, Calendar, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pricing({ onOpenQuote, onOpenConsultation }) {
  const [activeCategory, setActiveCategory] = useState('Web Development');

  const categories = [
    { id: 'Web Development', label: 'Web Development', icon: Globe, color: '#2563EB' },
    { id: 'Mobile App Development', label: 'Mobile App', icon: Smartphone, color: '#10B981' },
    { id: 'AI Solutions', label: 'AI Solutions', icon: Bot, color: '#7C3AED' },
    { id: 'Business Software', label: 'Business Software', icon: Briefcase, color: '#F59E0B' },
    { id: 'Healthcare', label: 'Healthcare', icon: Stethoscope, color: '#10B981' },
    { id: 'Education', label: 'Education', icon: GraduationCap, color: '#D97706' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps', icon: Cloud, color: '#06B6D4' },
    { id: 'Security', label: 'Security', icon: Lock, color: '#EF4444' },
    { id: 'Custom Development', label: 'Custom Dev', icon: Settings, color: '#6366F1' },
  ];

  const categoryBlocks = [
    {
      id: 'Web Development',
      title: 'Web Development',
      badge: '🌐 WEB DEVELOPMENT',
      color: '#2563EB',
      bgLight: 'rgba(37, 99, 235, 0.05)',
      borderColor: 'rgba(37, 99, 235, 0.2)',
      icon: Globe,
      cards: [
        { title: 'Landing Page', desc: 'High-converting single page website optimized for speed, lead capture, and mobile devices.', price: '₹12,000', timeline: '1 – 2 Weeks', icon: Globe },
        { title: 'Portfolio Website', desc: 'Sleek personal or agency portfolio showcasing projects, credentials, and contact integration.', price: '₹18,000', timeline: '1 – 2 Weeks', icon: Globe },
        { title: 'Business Website', desc: 'Multi-page corporate site with modern typography, service pages, and lead capture forms.', price: '₹25,000', timeline: '2 – 3 Weeks', icon: Globe },
        { title: 'Corporate Website', desc: 'Enterprise web portal with custom CMS, team management, and multi-language support.', price: '₹45,000', timeline: '3 – 4 Weeks', icon: Globe },
        { title: 'E-Commerce Website', desc: 'Full online storefront with product catalog, cart, checkout, and payment gateway integration.', price: '₹80,000', timeline: '3 – 5 Weeks', icon: Globe },
        { title: 'Multi-Vendor Marketplace', desc: 'Scalable marketplace platform supporting vendor onboarding, commission engines, and payout workflows.', price: '₹2,50,000', timeline: '2 – 3 Months', icon: Globe },
      ],
    },
    {
      id: 'Mobile App Development',
      title: 'Mobile App Development',
      badge: '📱 MOBILE APP DEVELOPMENT',
      color: '#10B981',
      bgLight: 'rgba(16, 185, 129, 0.05)',
      borderColor: 'rgba(16, 185, 129, 0.2)',
      icon: Smartphone,
      cards: [
        { title: 'Android App', desc: 'Native Kotlin/Java Android application engineered for high performance and Google Play deployment.', price: '₹80,000', timeline: '3 – 5 Weeks', icon: Smartphone },
        { title: 'iOS App', desc: 'Native Swift iOS application built for iPhone and iPad with Apple App Store compliance.', price: '₹1,00,000', timeline: '4 – 6 Weeks', icon: Smartphone },
        { title: 'Flutter App (Android + iOS)', desc: 'Unified cross-platform Flutter application delivering native performance on both iOS & Android.', price: '₹1,50,000', timeline: '5 – 8 Weeks', icon: Smartphone },
      ],
    },
    {
      id: 'AI Solutions',
      title: 'AI Solutions',
      badge: '🤖 AI SOLUTIONS',
      color: '#7C3AED',
      bgLight: 'rgba(124, 58, 237, 0.05)',
      borderColor: 'rgba(124, 58, 237, 0.2)',
      icon: Bot,
      cards: [
        { title: 'AI Chatbot', desc: 'Intelligent conversational AI chatbot trained on custom business knowledge bases.', price: '₹75,000', timeline: '2 – 3 Weeks', icon: Bot },
        { title: 'AI Customer Support', desc: 'Automated 24/7 customer service agent integrated with live support ticketing.', price: '₹1,50,000', timeline: '3 – 5 Weeks', icon: Bot },
        { title: 'AI Automation', desc: 'Workflow automation pipelines powered by machine learning and NLP APIs.', price: '₹2,00,000', timeline: '4 – 6 Weeks', icon: Bot },
        { title: 'AI Document Processing', desc: 'Automated OCR document parsing, invoice extraction, and data indexing engine.', price: '₹2,50,000', timeline: '6 – 8 Weeks', icon: Bot },
      ],
    },
    {
      id: 'Business Software',
      title: 'Business Software',
      badge: '💼 BUSINESS SOFTWARE',
      color: '#F59E0B',
      bgLight: 'rgba(245, 158, 11, 0.05)',
      borderColor: 'rgba(245, 158, 11, 0.2)',
      icon: Briefcase,
      cards: [
        { title: 'CRM Software', desc: 'Custom Customer Relationship Management platform for lead tracking and sales pipelines.', price: '₹1,80,000', timeline: '4 – 6 Weeks', icon: Briefcase },
        { title: 'ERP Platform', desc: 'Comprehensive Enterprise Resource Planning software connecting operations, inventory, and finance.', price: '₹4,50,000', timeline: '2 – 3 Months', icon: Briefcase },
        { title: 'Inventory Management', desc: 'Real-time stock tracking, multi-warehouse sync, and automated low-stock reordering.', price: '₹1,20,000', timeline: '3 – 4 Weeks', icon: Briefcase },
        { title: 'HR & Payroll System', desc: 'Automated employee management, attendance tracking, and monthly payslip generation.', price: '₹1,75,000', timeline: '4 – 5 Weeks', icon: Briefcase },
      ],
    },
    {
      id: 'Healthcare',
      title: 'Healthcare Software',
      badge: '🏥 HEALTHCARE',
      color: '#10B981',
      bgLight: 'rgba(16, 185, 129, 0.05)',
      borderColor: 'rgba(16, 185, 129, 0.2)',
      icon: Stethoscope,
      cards: [
        { title: 'Hospital Management System', desc: 'Multi-module hospital ERP covering IPD, OPD billing, pharmacy, and laboratory reports.', price: '₹2,50,000', timeline: '6 – 8 Weeks', icon: Stethoscope },
        { title: 'Clinic Management', desc: 'Streamlined doctor consultation portal, patient medical history, and prescription printing.', price: '₹1,40,000', timeline: '3 – 4 Weeks', icon: Stethoscope },
        { title: 'Appointment Booking System', desc: 'Online patient appointment scheduling, SMS alerts, and doctor schedule management.', price: '₹75,000', timeline: '2 – 3 Weeks', icon: Stethoscope },
      ],
    },
    {
      id: 'Education',
      title: 'Educational Software',
      badge: '🎓 EDUCATION',
      color: '#D97706',
      bgLight: 'rgba(217, 119, 6, 0.05)',
      borderColor: 'rgba(217, 119, 6, 0.2)',
      icon: GraduationCap,
      cards: [
        { title: 'Learning Management System (LMS)', desc: 'Online course delivery portal, video lesson streaming, student quizzes, and certificates.', price: '₹2,00,000', timeline: '4 – 6 Weeks', icon: GraduationCap },
        { title: 'School ERP', desc: 'Complete institution suite for student admissions, fee collection, timetable, and parent apps.', price: '₹2,75,000', timeline: '6 – 8 Weeks', icon: GraduationCap },
        { title: 'Online Examination Portal', desc: 'Proctored online exam engine supporting MCQ tests, automated grading, and instant scorecards.', price: '₹1,50,000', timeline: '3 – 5 Weeks', icon: GraduationCap },
      ],
    },
    {
      id: 'Cloud & DevOps',
      title: 'Cloud & DevOps',
      badge: '☁️ CLOUD & DEVOPS',
      color: '#06B6D4',
      bgLight: 'rgba(6, 182, 212, 0.05)',
      borderColor: 'rgba(6, 182, 212, 0.2)',
      icon: Cloud,
      cards: [
        { title: 'Cloud Deployment', desc: 'Production server deployment on AWS, Vercel, or DigitalOcean with SSL and CDN configuration.', price: '₹50,000', timeline: '1 – 2 Weeks', icon: Cloud },
        { title: 'DevOps Setup', desc: 'CI/CD automated build pipelines, Docker containerization, and auto-scaling architecture.', price: '₹1,00,000', timeline: '2 – 3 Weeks', icon: Cloud },
      ],
    },
    {
      id: 'Security',
      title: 'Security',
      badge: '🔒 SECURITY',
      color: '#EF4444',
      bgLight: 'rgba(239, 68, 68, 0.05)',
      borderColor: 'rgba(239, 68, 68, 0.2)',
      icon: Lock,
      cards: [
        { title: 'Authentication System', desc: 'Zero-trust auth architecture with JWT, OAuth2 social login, and 2FA multi-factor OTP.', price: '₹35,000', timeline: '1 – 2 Weeks', icon: Lock },
        { title: 'Security Audit', desc: 'Comprehensive application penetration testing, vulnerability assessment, and code remediation.', price: '₹75,000', timeline: '2 – 3 Weeks', icon: Lock },
      ],
    },
    {
      id: 'Custom Development',
      title: 'Custom Development',
      badge: '⚙️ CUSTOM DEVELOPMENT',
      color: '#6366F1',
      bgLight: 'rgba(99, 102, 241, 0.05)',
      borderColor: 'rgba(99, 102, 241, 0.2)',
      icon: Settings,
      cards: [
        { title: 'Enterprise Software', desc: 'High-concurrency bespoke enterprise platforms engineered strictly around proprietary business rules.', price: 'Starting from ₹3,00,000', timeline: '1 – 3 Months', icon: Settings },
        { title: 'SaaS Platform', desc: 'Multi-tenant Software-as-a-Service platforms built for subscription billing and global scale.', price: 'Starting from ₹4,50,000', timeline: '2 – 4 Months', icon: Settings },
        { title: 'API Development', desc: 'High-performance RESTful or GraphQL microservices APIs with full technical documentation.', price: 'Starting from ₹30,000', timeline: '1 – 2 Weeks', icon: Settings },
      ],
    },
  ];

  const filteredBlocks = categoryBlocks.filter((b) => b.id === activeCategory);

  return (
    <section id="pricing" className="section-padding" style={{ position: 'relative', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2>
            Software Engineering <span className="text-gradient">Pricing & Category Plans</span>
          </h2>
          <p>
            Transparent estimated starting prices and timelines for custom software development across all major service categories.
          </p>
        </div>

        {/* Category Filter Pills Top Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? `1px solid ${cat.color}` : '1px solid #E2E8F0',
                  background: isActive ? cat.color : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 4px 14px ${cat.color}33` : 'none',
                }}
              >
                <IconComp size={15} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Colorful Service Category Blocks List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '60px' }}
          >
            {filteredBlocks.map((block) => {
              const BlockIcon = block.icon;
              return (
                <div
                  key={block.id}
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${block.borderColor}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: '36px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {/* Category Block Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', borderBottom: `2px solid ${block.borderColor}`, paddingBottom: '16px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: block.bgLight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BlockIcon size={24} style={{ color: block.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.76rem', fontWeight: 800, color: block.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {block.badge}
                      </div>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
                        {block.title}
                      </h3>
                    </div>
                  </div>

                  {/* Cards Responsive Grid (3-4 cards per row on desktop) */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '22px' }}>
                    {block.cards.map((card, cIdx) => {
                      const CardIcon = card.icon;
                      return (
                        <motion.div
                          key={cIdx}
                          whileHover={{ y: -5, boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)' }}
                          transition={{ duration: 0.2 }}
                          style={{
                            background: block.bgLight,
                            border: `1px solid ${block.borderColor}`,
                            borderRadius: 'var(--radius-lg)',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '16px',
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                              <div
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '10px',
                                  background: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                                }}
                              >
                                <CardIcon size={20} style={{ color: block.color }} />
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 800 }}>Est. Starting</div>
                                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: block.color }}>{card.price}</div>
                              </div>
                            </div>

                            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                              {card.title}
                            </h4>
                            <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55, marginBottom: '14px' }}>
                              {card.desc}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>
                              <Clock size={14} style={{ color: block.color }} />
                              <span>Timeline: <strong>{card.timeline}</strong></span>
                            </div>
                          </div>

                          <button
                            onClick={() => onOpenQuote(`${card.title} (${block.title}) — Est: ${card.price}`)}
                            className="btn-primary btn-sm"
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              background: block.color,
                              borderColor: block.color,
                            }}
                          >
                            <FileText size={14} />
                            <span>Request Quote</span>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer Note */}
        <div
          style={{
            padding: '20px 24px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Info size={20} style={{ color: '#2563EB', flexShrink: 0 }} />
          <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
            <strong>Note:</strong> All prices shown are estimated starting prices. Final quotations depend on project requirements, integrations, features, and development complexity.
          </p>
        </div>

        {/* Centered CTA Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(124, 58, 237, 0.06))',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 32px',
            textAlign: 'center',
            maxWidth: '860px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
            Request a Custom Quote
          </h3>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '640px', margin: '0 auto 28px auto' }}>
            Every business has unique requirements. Contact SOLVIX for a personalized quotation tailored to your business goals.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => onOpenQuote()} className="btn-primary btn-lg">
              <FileText size={18} />
              <span>Request a Quote</span>
            </button>

            <button onClick={() => onOpenConsultation('Pricing Centered CTA')} className="btn-secondary btn-lg">
              <Calendar size={18} style={{ color: '#7C3AED' }} />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
