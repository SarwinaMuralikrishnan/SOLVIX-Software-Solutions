import React from 'react';
import { Bot, Compass, Tag, Building2, HelpCircle } from 'lucide-react';

export default function QuickActions({ onSelectAction }) {
  const suggestions = [
    {
      label: 'Explore Services',
      prompt: 'What software development services does SOLVIX offer?',
      icon: Compass,
    },
    {
      label: 'View Pricing',
      prompt: 'What is the base pricing for SOLVIX services and projects?',
      icon: Tag,
    },
    {
      label: 'Tell me about SOLVIX',
      prompt: 'Tell me about SOLVIX Software Solutions, your team, and real projects.',
      icon: Building2,
    },
    {
      label: 'Ask a Question',
      prompt: 'Can you help me answer a technical or business question?',
      icon: HelpCircle,
    },
  ];

  return (
    <div className="solvix-welcome-container">
      {/* Centered Avatar */}
      <div className="solvix-welcome-avatar">
        <Bot size={28} />
      </div>

      <h3 className="solvix-welcome-title">SOLVIX AI Assistant</h3>
      <span className="solvix-welcome-subtitle">General AI & Project Consultant</span>
      <p className="solvix-welcome-desc">
        Hi! 👋 I'm the SOLVIX AI Assistant. I can help you with SOLVIX services, pricing, projects, technical questions, business questions, or general questions. How can I help you today?
      </p>

      {/* Suggested Prompts Grid */}
      <div className="solvix-quick-actions-grid">
        <div className="solvix-actions-2col">
          {suggestions.map((item) => {
            const IconComp = item.icon;
            return (
              <button
                key={item.label}
                className="solvix-quick-btn"
                onClick={() => onSelectAction(item.prompt)}
              >
                <IconComp size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
