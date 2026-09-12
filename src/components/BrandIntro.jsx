import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandIntro({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('solvix_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      const shortTimer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 600);
      return () => clearTimeout(shortTimer);
    }

    sessionStorage.setItem('solvix_intro_seen', 'true');
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence style={{ userSelect: 'none' }}>
      {visible && (
        <motion.div
          key="brand-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.15, 1], opacity: [0, 0.25, 0.15] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, rgba(124, 58, 237, 0.15) 60%, transparent 80%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', textAlign: 'center', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '16px' }}
            >
              <img
                src="/solvix-logo.png"
                alt="SOLVIX Software Solutions"
                style={{
                  height: '64px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(37, 99, 235, 0.15))',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#475569',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              SOFTWARE SOLUTIONS
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'rgba(37, 99, 235, 0.06)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#2563EB',
              }}
            >
              <span>Build.</span>
              <span style={{ color: '#7C3AED' }}>Innovate.</span>
              <span style={{ color: '#0F172A' }}>Scale.</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
