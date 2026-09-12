import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingControls() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-end',
      }}
    >
      {/* 1. Floating WhatsApp Button */}
      <a
        href="https://wa.me/917639410944"
        target="_blank"
        rel="noreferrer"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
        }}
        title="Chat on WhatsApp (+91 7639410944)"
      >
        <MessageCircle size={24} />
      </a>

      {/* 2. Floating Call Button */}
      <a
        href="tel:+917639410944"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#2563EB',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
        }}
        title="Call Directly (+91 7639410944)"
      >
        <Phone size={22} />
      </a>

      {/* 3. Floating Email Button */}
      <a
        href="mailto:sarwinamuralikrishnan@gmail.com"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#7C3AED',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
        }}
        title="Send Official Email"
      >
        <Mail size={22} />
      </a>

      {/* 4. Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#0F172A',
              color: '#FFFFFF',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)',
              cursor: 'pointer',
            }}
            title="Back to Top"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
