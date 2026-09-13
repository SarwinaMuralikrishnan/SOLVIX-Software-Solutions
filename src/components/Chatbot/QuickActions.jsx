import React from 'react';
import { Bot, Compass, Tag, FolderGit2, HelpCircle } from 'lucide-react';

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
      label: 'Our Projects',
      prompt: 'What real projects has SOLVIX completed?',
      icon: FolderGit2,
    },
    {
      label: 'Ask Anything',
      prompt: 'I have a question about software, technology, or SOLVIX.',
      icon: HelpCircle,
    },
  ];

  return (
    <div className="solvix-welcome-container">
      {/* Centered Avatar */}
      <div className="solvix-welcome-avatar">
        <Bot size={28} />
      </div>

      <h3 className="solvix-welcome-title">SOLVIX AI</h3>
      <span className="solvix-welcome-subtitle">AI Assistant</span>
      <p className="solvix-welcome-desc">
        Hi! 👋 I'm the SOLVIX AI Assistant.<br />
        Ask me anything about SOLVIX, our services, pricing, projects, technology, or general questions.
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
