import React from 'react';
import { ArrowRight, FileText, Calendar, CheckCircle2, MapPin, Sparkles, Layers, Code, Cpu, Database, Cloud, Terminal, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onOpenConsultation, onOpenQuote }) {
  // 20 Genuine Technologies Badges
  const techBadges = [
    { name: 'React', icon: '⚛️', color: '#61DAFB', top: '4%', left: '8%', duration: 4.5, delay: 0 },
    { name: 'HTML5', icon: '🌐', color: '#E34F26', top: '6%', left: '72%', duration: 5.2, delay: 0.3 },
    { name: 'CSS3', icon: '🎨', color: '#1572B6', top: '20%', left: '2%', duration: 4.8, delay: 0.6 },
    { name: 'JavaScript', icon: '⚡', color: '#F7DF1E', top: '18%', left: '76%', duration: 5.5, delay: 0.2 },
    { name: 'TypeScript', icon: '🔷', color: '#3178C6', top: '36%', left: '4%', duration: 4.2, delay: 0.8 },
    { name: 'Flutter', icon: '📱', color: '#02569B', top: '36%', left: '80%', duration: 5.0, delay: 0.4 },
    { name: 'Python', icon: '🐍', color: '#3776AB', top: '54%', left: '6%', duration: 4.6, delay: 0.1 },
    { name: 'Flask', icon: '🧪', color: '#000000', top: '54%', left: '78%', duration: 5.8, delay: 0.7 },
    { name: 'Java', icon: '☕', color: '#007396', top: '72%', left: '8%', duration: 4.4, delay: 0.5 },
    { name: 'Node.js', icon: '🟢', color: '#339933', top: '72%', left: '76%', duration: 5.1, delay: 0.9 },
    { name: 'Express.js', icon: '🚀', color: '#000000', top: '88%', left: '14%', duration: 4.7, delay: 0.3 },
    { name: 'MySQL', icon: '🐬', color: '#4479A1', top: '88%', left: '66%', duration: 5.3, delay: 0.6 },
    { name: 'SQLite', icon: '📦', color: '#003B57', top: '10%', left: '42%', duration: 4.9, delay: 0.2 },
    { name: 'Firebase', icon: '🔥', color: '#FFCA28', top: '92%', left: '40%', duration: 5.6, delay: 0.4 },
    { name: 'Git', icon: '🌿', color: '#F05032', top: '28%', left: '12%', duration: 4.3, delay: 0.7 },
    { name: 'GitHub', icon: '🐙', color: '#181717', top: '28%', left: '68%', duration: 5.4, delay: 0.1 },
    { name: 'Docker', icon: '🐋', color: '#2496ED', top: '46%', left: '14%', duration: 4.7, delay: 0.5 },
    { name: 'VS Code', icon: '💻', color: '#007ACC', top: '46%', left: '68%', duration: 5.0, delay: 0.8 },
    { name: 'Android Studio', icon: '🤖', color: '#3DDC84', top: '64%', left: '12%', duration: 4.8, delay: 0.3 },
    { name: 'Figma', icon: '📐', color: '#F24E1E', top: '64%', left: '70%', duration: 5.2, delay: 0.6 },
  ];

  return (
    <section
      id="home"
      style={{
        paddingTop: '150px',
        paddingBottom: '110px',
        position: 'relative',
        background: '#F8FAFC',
        overflow: 'hidden',
      }}
    >
      {/* Background Lighting, Light Grid & Subtle Mesh Gradient */}
      <div className="hero-bg-container">
        <div className="hero-grid-pattern" style={{ opacity: 0.4 }} />
        <div className="hero-glow-purple" style={{ filter: 'blur(70px)', opacity: 0.35 }} />
        <div className="hero-glow-blue" style={{ filter: 'blur(70px)', opacity: 0.35 }} />

        {/* Floating Particles */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '25%', left: '20%', width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }}
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '60%', left: '75%', width: '10px', height: '10px', borderRadius: '50%', background: '#7C3AED' }}
        />
        <motion.div
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '75%', left: '35%', width: '6px', height: '6px', borderRadius: '50%', background: '#06B6D4' }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* 2-Column Split: LEFT Content | RIGHT Technology Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '60px',
            alignItems: 'center',
          }}
          className="hero-split-grid"
        >
          {/* LEFT SIDE: Content & 3 CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Tagline Badge Pill */}
            <div className="badge-pill" style={{ marginBottom: '24px' }}>
              <span className="pulse-dot" />
              <span>SOLVIX — WE BUILD WHAT YOU IMAGINE</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: '3.6rem',
                lineHeight: 1.15,
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '22px',
                letterSpacing: '-0.035em',
              }}
              className="hero-main-title"
            >
              Build Smarter.<br />
              Grow Faster.<br />
              <span className="text-gradient">Transform Digitally.</span>
            </h1>

            {/* Short Company Description */}
            <p
              style={{
                fontSize: '1.18rem',
                color: '#475569',
                lineHeight: 1.65,
                marginBottom: '36px',
                maxWidth: '610px',
              }}
            >
              SOLVIX is an authentic software development company founded in 2026 in Coimbatore, Tamil Nadu, India.
              <br /><br />
              We specialize in engineering customized digital solutions—from web and mobile applications to AI platforms and enterprise software—tailored specifically to each client’s unique business goals.
            </p>

            {/* Three CTA Buttons: Request a Quote | Book Consultation | View Services */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {/* 1. Request a Quote */}
              <button
                onClick={() => onOpenQuote()}
                className="btn-primary btn-lg"
              >
                <FileText size={18} />
                <span>Request a Quote</span>
              </button>

              {/* 2. Book Consultation */}
              <button
                onClick={() => onOpenConsultation('Hero Section')}
                className="btn-secondary btn-lg"
              >
                <Calendar size={18} style={{ color: '#7C3AED' }} />
                <span>Book Consultation</span>
              </button>

              {/* 3. View Services */}
              <a
                href="#services"
                className="btn-secondary btn-lg"
                style={{ textDecoration: 'none' }}
              >
                <Layers size={18} style={{ color: '#2563EB' }} />
                <span>View Services</span>
              </a>
            </div>

            {/* Key Highlights */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid #E2E8F0', paddingTop: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                <CheckCircle2 size={18} style={{ color: '#2563EB' }} />
                <span>100% Customized Software</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                <CheckCircle2 size={18} style={{ color: '#7C3AED' }} />
                <span>Full Source Code Ownership</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                <MapPin size={18} style={{ color: '#38BDF8' }} />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Premium Technology Showcase with Central Glass Logo Card & 20 Floating Tech Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '480px',
              width: '100%',
            }}
          >
            {/* Rotating Ambient Gradient Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                border: '2px dashed rgba(37, 99, 235, 0.2)',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
                zIndex: 0,
              }}
            />

            {/* Rotating Ambient Gradient Ring 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                border: '1px solid rgba(124, 58, 237, 0.15)',
                zIndex: 0,
              }}
            />

            {/* Soft Glow Aura */}
            <div
              style={{
                position: 'absolute',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(124, 58, 237, 0.16) 50%, transparent 80%)',
                filter: 'blur(45px)',
                zIndex: 0,
              }}
            />

            {/* Central Glassmorphism Card Housing SOLVIX Logo */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.03, y: -16 }}
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '32px 40px',
                background: 'rgba(255, 255, 255, 0.82)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 25px 60px rgba(37, 99, 235, 0.12), 0 0 40px rgba(56, 189, 248, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '340px',
                width: '100%',
              }}
            >
              <img
                src="/solvix-logo.png"
                alt="SOLVIX Official Logo"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '260px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 20px rgba(37, 99, 235, 0.15))',
                }}
              />
            </motion.div>

            {/* 20 Floating Technology Badges Surrounding Logo */}
            {techBadges.map((badge, bIdx) => (
              <motion.div
                key={badge.name}
                animate={{
                  y: [0, bIdx % 2 === 0 ? -12 : 12, 0],
                  x: [0, bIdx % 3 === 0 ? 8 : -8, 0],
                }}
                transition={{
                  duration: badge.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: badge.delay,
                }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                style={{
                  position: 'absolute',
                  top: badge.top,
                  left: badge.left,
                  zIndex: 3,
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{badge.icon}</span>
                <span>{badge.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          .hero-main-title {
            font-size: 2.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
