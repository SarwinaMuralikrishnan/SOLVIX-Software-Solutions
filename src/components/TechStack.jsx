import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Globe,
  Palette,
  Zap,
  FileCode,
  Layers,
  Server,
  Cpu,
  Coffee,
  Database,
  Flame,
  Smartphone,
  Cloud,
  Box,
  Bot,
  GitBranch,
  Github,
  Laptop,
  Layout,
  Terminal,
} from 'lucide-react';

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const categories = ['Frontend', 'Backend', 'Database', 'Mobile', 'Cloud', 'AI', 'Tools'];

  const techMap = {
    Frontend: [
      { name: 'React', icon: Code2, color: '#0284C7', desc: 'Modern UI Library' },
      { name: 'HTML5', icon: Globe, color: '#EA580C', desc: 'Semantic Markup' },
      { name: 'CSS3', icon: Palette, color: '#2563EB', desc: 'Styling & Tokens' },
      { name: 'JavaScript', icon: Zap, color: '#D97706', desc: 'ES6+ Logic' },
      { name: 'TypeScript', icon: FileCode, color: '#3178C6', desc: 'Typed Code' },
      { name: 'Tailwind CSS', icon: Layers, color: '#06B6D4', desc: 'Utility Design' },
    ],
    Backend: [
      { name: 'Node.js', icon: Server, color: '#16A34A', desc: 'JS Runtime' },
      { name: 'Express.js', icon: Cpu, color: '#0F172A', desc: 'REST Framework' },
      { name: 'Python', icon: Terminal, color: '#2563EB', desc: 'Backend Logic' },
      { name: 'Flask', icon: Server, color: '#475569', desc: 'Lightweight Backend' },
      { name: 'Java', icon: Coffee, color: '#DC2626', desc: 'Enterprise Systems' },
    ],
    Database: [
      { name: 'MongoDB', icon: Database, color: '#16A34A', desc: 'NoSQL Database' },
      { name: 'MySQL', icon: Database, color: '#2563EB', desc: 'Relational DB' },
      { name: 'SQLite', icon: Database, color: '#0284C7', desc: 'Embedded DB' },
      { name: 'Firebase', icon: Flame, color: '#D97706', desc: 'Realtime Cloud DB' },
    ],
    Mobile: [
      { name: 'Flutter', icon: Smartphone, color: '#0284C7', desc: 'Cross-Platform Engine' },
    ],
    Cloud: [
      { name: 'AWS Cloud', icon: Cloud, color: '#D97706', desc: 'Cloud Infrastructure' },
      { name: 'Docker', icon: Box, color: '#2563EB', desc: 'Container Orchestration' },
      { name: 'Vercel / Netlify', icon: Globe, color: '#0F172A', desc: 'Edge Deployment' },
    ],
    AI: [
      { name: 'Python', icon: Terminal, color: '#2563EB', desc: 'AI & Data Science' },
      { name: 'OpenAI API', icon: Bot, color: '#059669', desc: 'LLM & NLP Integrations' },
      { name: 'TensorFlow / PyTorch', icon: Cpu, color: '#EA580C', desc: 'Machine Learning' },
    ],
    Tools: [
      { name: 'Git', icon: GitBranch, color: '#EA580C', desc: 'Version Control' },
      { name: 'GitHub', icon: Github, color: '#0F172A', desc: 'Code Repositories' },
      { name: 'VS Code', icon: Laptop, color: '#0284C7', desc: 'Primary IDE' },
      { name: 'Android Studio', icon: Smartphone, color: '#16A34A', desc: 'Mobile IDE' },
      { name: 'Figma', icon: Layout, color: '#7C3AED', desc: 'UI/UX Wireframing' },
    ],
  };

  const activeTechs = techMap[activeCategory] || [];

  return (
    <section id="technologies" style={{ padding: '70px 0', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="badge-pill" style={{ marginBottom: '10px' }}>
            <span>CORE TOOLKIT</span>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
            Technology <span className="text-gradient">Stack</span>
          </h3>
          <p style={{ color: '#475569', fontSize: '0.96rem', marginTop: '6px' }}>
            Filter our core technologies by category below.
          </p>
        </div>

        {/* 7 Category Pill Navigation Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  position: 'relative',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  background: isActive ? '#2563EB' : '#F8FAFC',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontWeight: isActive ? '800' : '600',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(37, 99, 235, 0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Animated Tech Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {activeTechs.map((tech) => {
              const IconComp = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="glass-card"
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: `${tech.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={22} style={{ color: tech.color }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                      {tech.name}
                    </h4>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
                      {tech.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
