import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Services from './components/Services';
import Industries from './components/Industries';
import TechStack from './components/TechStack';
import Process from './components/Process';
import Pricing from './components/Pricing';
import WhyChooseUs from './components/WhyChooseUs';
import WhyWorkWithUs from './components/WhyWorkWithUs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import SolvixAIChatbot from './components/Chatbot/SolvixAIChatbot';

// Modals & Interactive Workflows
import ConsultationModal from './components/Modals/ConsultationModal';
import QuoteModal from './components/Modals/QuoteModal';
import LegalModal from './components/Modals/LegalModal';
import AdminLoginModal from './components/Modals/AdminLoginModal';
import AdminPanelModal from './components/Modals/AdminPanelModal';
import LiveDemoModal from './components/Modals/LiveDemoModal';

export default function App() {
  const [consultationModal, setConsultationModal] = useState({
    open: false,
    title: 'Book a Free Technical Consultation',
    topic: '',
  });

  const [quoteModal, setQuoteModal] = useState({
    open: false,
    prefilledType: 'Business Website',
  });

  const [legalModal, setLegalModal] = useState({
    open: false,
    title: '',
    content: '',
  });

  const [demoModal, setDemoModal] = useState({
    open: false,
    productName: '',
  });

  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const handleOpenConsultation = (topic = '', customTitle = 'Book a Free Technical Consultation') => {
    setConsultationModal({
      open: true,
      title: customTitle,
      topic: topic,
    });
  };

  const handleOpenQuote = (projectType = 'Business Website') => {
    setQuoteModal({
      open: true,
      prefilledType: projectType,
    });
  };

  const handleOpenDemo = (productName = 'SOLVIX Software System') => {
    setDemoModal({
      open: true,
      productName: productName,
    });
  };

  const handleOpenLegal = (title, content) => {
    setLegalModal({
      open: true,
      title,
      content,
    });
  };

  const handleOpenAdminTrigger = () => {
    const token = sessionStorage.getItem('solvix_admin_token');
    if (token) {
      setAdminPanelOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setAdminLoginOpen(false);
    setAdminPanelOpen(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('solvix_admin_token');
    setAdminPanelOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', backgroundColor: '#F8FAFC' }}>
      {/* Background Interactive Light Grid Particles */}
      <ParticleBackground />

      {/* Navigation Bar & Top Scroll Progress Bar */}
      <Navbar
        onOpenConsultation={(topic) => handleOpenConsultation(topic, 'Book Technical Consultation')}
        onOpenQuote={handleOpenQuote}
      />

      {/* Main Homepage Section Flow */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* 1. Hero Section */}
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onOpenQuote={handleOpenQuote}
        />

        {/* 2. About SOLVIX (Story, Mission, Vision, Core Values) */}
        <About />

        {/* 3. Meet the Founders Team Section */}
        <Team />

        {/* 4. Genuine Services Section (12 Genuine Services) */}
        <Services
          onSelectService={(serviceTitle) => handleOpenQuote(serviceTitle)}
          onOpenQuote={handleOpenQuote}
        />

        {/* 5. Industries We Serve (10 Industry Cards) */}
        <Industries onOpenQuote={handleOpenQuote} />

        {/* 6. Technology Stack (7 Category Tabs: Frontend, Backend, Database, Mobile, Cloud, AI, Tools) */}
        <TechStack />

        {/* 7. Development Process (7-Step Vertical Timeline) */}
        <Process />

        {/* 8. Pricing Section (9 Colorful Service Category Accent Blocks + Disclaimer + CTA) */}
        <Pricing
          onOpenQuote={handleOpenQuote}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 9. Why Choose SOLVIX (8 Animated Feature Cards) */}
        <WhyChooseUs />

        {/* 10. Why Work With SOLVIX (7 Key Pillars) */}
        <WhyWorkWithUs onOpenConsultation={handleOpenConsultation} />

        {/* 11. FAQ Accordion */}
        <FAQ />

        {/* 12. Contact Info & Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={handleOpenLegal}
        onOpenAdmin={handleOpenAdminTrigger}
      />

      {/* Floating Controls (WhatsApp Chat, Direct Call, Direct Email, Back to Top) */}
      <FloatingControls />

      {/* Production-Ready SOLVIX AI Chatbot Consultant */}
      <SolvixAIChatbot
        onOpenQuote={handleOpenQuote}
        onOpenConsultation={(topic) => handleOpenConsultation(topic, 'Book AI Technical Consultation')}
      />

      {/* Interactive Modals & Workflows */}
      {quoteModal.open && (
        <QuoteModal
          prefilledType={quoteModal.prefilledType}
          onClose={() => setQuoteModal({ open: false, prefilledType: '' })}
        />
      )}

      {consultationModal.open && (
        <ConsultationModal
          title={consultationModal.title}
          initialTopic={consultationModal.topic}
          onClose={() => setConsultationModal({ open: false, title: '', topic: '' })}
        />
      )}

      {legalModal.open && (
        <LegalModal
          title={legalModal.title}
          content={legalModal.content}
          onClose={() => setLegalModal({ open: false, title: '', content: '' })}
        />
      )}

      {demoModal.open && (
        <LiveDemoModal
          productName={demoModal.productName}
          onClose={() => setDemoModal({ open: false, productName: '' })}
          onBuyNow={({ title }) => {
            setDemoModal({ open: false, productName: '' });
            handleOpenQuote(title);
          }}
        />
      )}

      {adminLoginOpen && (
        <AdminLoginModal
          onClose={() => setAdminLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {adminPanelOpen && (
        <AdminPanelModal
          onClose={() => setAdminPanelOpen(false)}
          onLogout={handleAdminLogout}
        />
      )}
    </div>
  );
}
