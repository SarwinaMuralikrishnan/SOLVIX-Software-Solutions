import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Do I get 100% full source code ownership for custom projects?',
      a: 'Yes, absolutely! Every custom software application developed by SOLVIX includes 100% full source code transfer, intellectual property ownership, database schemas, and technical documentation upon completion.',
    },
    {
      q: 'How does the custom project pricing model work?',
      a: 'We operate on a transparent, milestone-based model tailored to your exact scope. After analyzing your requirements, we issue an itemized quotation with clear milestone deliverables (e.g. 30% upfront, 40% demo milestone, 30% final cloud launch).',
    },
    {
      q: 'What is the typical timeline for custom software development?',
      a: 'MVP web and mobile applications take between 2 to 4 weeks depending on feature complexity. Enterprise platforms take 1 to 3 months. We work in 1-week agile sprints with live staging progress links.',
    },
    {
      q: 'What technologies do you specialize in at SOLVIX?',
      a: 'Our core stack includes React, TypeScript, Tailwind CSS, Flutter, Python, Flask, Java, Node.js, Express, MongoDB, MySQL, Firebase, SQLite, Git, GitHub, Docker, Android Studio, VS Code, and Figma.',
    },
    {
      q: 'Do you offer ongoing post-launch technical support?',
      a: 'Yes, all SOLVIX projects include 1 to 3 months of complimentary post-launch technical support. We also provide long-term SLA maintenance covering server uptime, security patches, and feature updates.',
    },
    {
      q: 'How can I schedule a 1-on-1 technical consultation session?',
      a: 'You can click on the "Book Consultation" button at any time to select your preferred date, time slot, and discussion topics. Our technical leads will meet with you virtually to discuss your project scope.',
    },
  ];

  return (
    <section id="faq" className="section-padding" style={{ position: 'relative', background: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2>
            Got Questions? <span className="text-gradient">We Have Answers</span>
          </h2>
          <p>
            Everything you need to know about working with SOLVIX, custom development workflows, IP ownership, and SLA guarantees.
          </p>
        </div>

        {/* Accordion List with Framer Motion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card-static"
                style={{
                  border: isOpen ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  boxShadow: isOpen ? '0 6px 20px rgba(37, 99, 235, 0.08)' : 'var(--shadow-sm)',
                  transition: 'var(--transition-fast)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: isOpen ? 'rgba(37, 99, 235, 0.04)' : '#FFFFFF',
                    border: 'none',
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={20} style={{ color: isOpen ? '#2563EB' : '#64748B', flexShrink: 0 }} />
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown size={20} style={{ color: '#64748B', flexShrink: 0 }} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 24px 20px 56px', color: '#475569', fontSize: '0.94rem', lineHeight: 1.65 }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
