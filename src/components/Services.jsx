import React from 'react';
import { Code, Globe, AppWindow, Smartphone, Layers, Bot, Stethoscope, GraduationCap, Palette, Network, Database, Wrench, ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services({ onOpenQuote }) {
  const serviceList = [
    {
      title: 'Custom Software Development',
      desc: 'Bespoke software applications engineered specifically according to each client’s unique business logic, workflows, and security requirements.',
      techs: ['React', 'Node.js', 'Python', 'MySQL'],
      startingPrice: '₹30,000',
      icon: Code,
      color: '#2563EB',
    },
    {
      title: 'Website Development',
      desc: 'High-performance responsive web applications, corporate websites, and portfolio sites optimized for speed, SEO, and user experience.',
      techs: ['React', 'HTML5', 'Tailwind CSS', 'TypeScript'],
      startingPrice: '₹12,000',
      icon: Globe,
      color: '#7C3AED',
    },
    {
      title: 'Web Applications',
      desc: 'Scalable multi-tenant SaaS web apps built with modern React, Next.js, Node.js, and cloud backend databases.',
      techs: ['React', 'Express.js', 'MongoDB', 'AWS'],
      startingPrice: '₹45,000',
      icon: AppWindow,
      color: '#0284C7',
    },
    {
      title: 'Mobile App Development',
      desc: 'Native-feel iOS and Android mobile applications designed for high performance, smooth UX, and offline sync capability.',
      icon: Smartphone,
      techs: ['Flutter', 'Android Studio', 'Firebase'],
      startingPrice: '₹80,000',
      color: '#38BDF8',
    },
    {
      title: 'Flutter Development',
      desc: 'Cross-platform Flutter apps delivering a unified codebase, native performance, and fast feature updates on iOS & Android.',
      techs: ['Flutter', 'Dart', 'REST API', 'SQLite'],
      startingPrice: '₹1,50,000',
      icon: Layers,
      color: '#10B981',
    },
    {
      title: 'AI Applications',
      desc: 'Machine learning platforms, natural language processing (NLP) models, predictive engines, and intelligent automated chatbots.',
      techs: ['Python', 'Flask', 'OpenAI API', 'Docker'],
      startingPrice: '₹75,000',
      icon: Bot,
      color: '#F59E0B',
    },
    {
      title: 'Healthcare Software',
      desc: 'Tailored healthcare systems, electronic health records (EHR) portals, hospital management suites, and medical scheduling tools.',
      techs: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      startingPrice: '₹1,40,000',
      icon: Stethoscope,
      color: '#EC4899',
    },
    {
      title: 'Educational Software',
      desc: 'Custom university ERPs, school management tools, online exam portals, attendance systems, and student mobile apps.',
      techs: ['React', 'Express.js', 'MySQL', 'Node.js'],
      startingPrice: '₹1,50,000',
      icon: GraduationCap,
      color: '#2563EB',
    },
    {
      title: 'UI/UX Design',
      desc: 'Intuitive user interface wireframing, high-fidelity Figma design systems, dynamic prototyping, and accessibility auditing.',
      techs: ['Figma', 'CSS3', 'Design Tokens'],
      startingPrice: '₹15,000',
      icon: Palette,
      color: '#7C3AED',
    },
    {
      title: 'API Development',
      desc: 'Robust RESTful and GraphQL API development, microservices architecture, and secure third-party gateway integrations.',
      techs: ['Node.js', 'Express.js', 'Python', 'Swagger'],
      startingPrice: '₹30,000',
      icon: Network,
      color: '#0284C7',
    },
    {
      title: 'Database Design',
      desc: 'Relational database schema architecture (MySQL, PostgreSQL, SQLite, MongoDB), indexing, and high-concurrency optimization.',
      techs: ['MongoDB', 'MySQL', 'SQLite', 'Firebase'],
      startingPrice: '₹20,000',
      icon: Database,
      color: '#38BDF8',
    },
    {
      title: 'Software Maintenance',
      desc: 'Ongoing technical maintenance, code refactoring, cloud server SLA monitoring, security audits, and bug fixes.',
      techs: ['Docker', 'Git', 'AWS', 'Linux'],
      startingPrice: '₹2,999 / mo',
      icon: Wrench,
      color: '#10B981',
    },
  ];

  return (
    <section id="services" className="section-padding" style={{ position: 'relative', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill">
            <span className="pulse-dot" />
            <span>OUR GENUINE SERVICES</span>
          </div>
          <h2>
            Customized Software Engineering <span className="text-gradient">For Your Unique Goals</span>
          </h2>
          <p>
            We don't offer generic templates. Every software application is crafted with personal attention to clean code, performance, security, and scalability.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {serviceList.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="glass-card"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  borderRadius: 'var(--radius-lg)',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: `rgba(${parseInt(s.color.slice(1, 3), 16)}, ${parseInt(s.color.slice(3, 5), 16)}, ${parseInt(s.color.slice(5, 7), 16)}, 0.12)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={24} style={{ color: s.color }} />
                    </div>

                    {/* Starting Price Tag */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 800 }}>Est. Starting</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#2563EB' }}>{s.startingPrice}</div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '14px' }}>
                    {s.desc}
                  </p>

                  {/* Technologies Used Pills */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {s.techs.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-full)',
                          background: '#F1F5F9',
                          color: '#475569',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Request Quote Button */}
                <button
                  onClick={() => onOpenQuote(s.title)}
                  className="btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <FileText size={14} />
                  <span>Request Quote</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
