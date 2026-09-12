import React, { useState } from 'react';
import { Lightbulb, Layout, Code2, Cpu, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Animation/solvixAnimations.css';

export default function SolvixBrandConcept({ onOpenQuote }) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'idea',
      step: '01',
      title: 'IDEA',
      subtitle: 'Discovery & Feasibility',
      icon: Lightbulb,
      color: '#3B82F6',
      badge: 'Step 1: Scoping',
      desc: 'We clarify software goals, target audience, technical scope, and project architecture feasibility.',
      deliverables: ['Requirement Blueprint', 'Technical Scope Document', 'Milestone Roadmap'],
    },
    {
      id: 'design',
      step: '02',
      title: 'DESIGN',
      subtitle: 'UI/UX & Prototype Blueprint',
      icon: Layout,
      color: '#8B5CF6',
      badge: 'Step 2: Prototyping',
      desc: 'Intuitive, responsive wireframes and interactive UI prototypes crafted to reflect your brand identity.',
      deliverables: ['Figma UI/UX Designs', 'Interactive Prototypes', 'Design System'],
    },
    {
      id: 'build',
      step: '03',
      title: 'BUILD',
      subtitle: 'Agile Code Architecture',
      icon: Code2,
      color: '#06B6D4',
      badge: 'Step 3: Development',
      desc: 'Clean, modular, production-ready code with weekly client demo sprints and strict quality assurance.',
      deliverables: ['Clean Modular Code', 'Weekly Review Demos', 'Automated Testing'],
    },
    {
      id: 'intelligence',
      step: '04',
      title: 'INTELLIGENCE',
      subtitle: 'AI Model & Automation Integration',
      icon: Cpu,
      color: '#7C3AED',
      badge: 'Step 4: AI & Workflows',
      desc: 'Integrating custom AI models, RAG vector search, intelligent chatbots, and automated backend data pipelines.',
      deliverables: ['Custom AI Models', 'Automated Pipelines', 'RAG Vector Search'],
    },
    {
      id: 'launch',
      step: '05',
      title: 'LAUNCH',
      subtitle: 'Cloud Deployment & Support',
      icon: Rocket,
      color: '#10B981',
      badge: 'Step 5: Scale',
      desc: 'Production deployment on secure cloud infrastructure with domain setup, SSL, admin training, and 3 months free support.',
      deliverables: ['Cloud Deployment', '100% Code Ownership', '3 Months Support'],
    },
  ];

  return (
    <section style={{ padding: '80px 24px', background: '#FFFFFF', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.12em', background: 'rgba(37, 99, 235, 0.06)', padding: '6px 14px', borderRadius: '9999px', border: '1px solid rgba(37, 99, 235, 0.15)' }}>
            The SOLVIX Brand Concept
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A', marginTop: '12px', marginBottom: '10px' }}>
            IDEA <span style={{ color: '#2563EB' }}>→</span> DESIGN <span style={{ color: '#8B5CF6' }}>→</span> BUILD <span style={{ color: '#06B6D4' }}>→</span> INTELLIGENCE <span style={{ color: '#7C3AED' }}>→</span> LAUNCH
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#64748B', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Every software product built at SOLVIX follows a structured 5-stage transformation pipeline from initial concept to intelligent cloud production.
          </p>
        </div>

        {/* 5-Stage Stepper Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {stages.map((stg, idx) => {
            const IconComp = stg.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 12px',
                  background: isActive ? '#FFFFFF' : '#F8FAFC',
                  border: isActive ? `2px solid ${stg.color}` : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 8px 20px ${stg.color}22` : 'none',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: isActive ? stg.color : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : stg.color,
                    border: isActive ? 'none' : `1px solid ${stg.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <IconComp size={18} />
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94A3B8' }}>{stg.step}</span>
                <span style={{ fontSize: '0.86rem', fontWeight: 800, color: isActive ? '#0F172A' : '#64748B', marginTop: '2px' }}>
                  {stg.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        {stages[activeStage] && (
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '32px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: stages[activeStage].color, background: `${stages[activeStage].color}12`, border: `1px solid ${stages[activeStage].color}33`, padding: '4px 12px', borderRadius: '9999px' }}>
                {stages[activeStage].badge}
              </span>

              <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', marginTop: '14px', marginBottom: '8px' }}>
                {stages[activeStage].title}: {stages[activeStage].subtitle}
              </h3>

              <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                {stages[activeStage].desc}
              </p>

              <button
                onClick={() => onOpenQuote && onOpenQuote(`Phase: ${stages[activeStage].title}`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  background: stages[activeStage].color,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: `0 6px 16px ${stages[activeStage].color}44`,
                }}
              >
                <span>Start Your Project at {stages[activeStage].title} Phase</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Deliverables Checklist */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key Deliverables & Outcomes
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {stages[activeStage].deliverables.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.90rem', color: '#334155', fontWeight: 600 }}>
                    <CheckCircle2 size={18} style={{ color: stages[activeStage].color, flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
