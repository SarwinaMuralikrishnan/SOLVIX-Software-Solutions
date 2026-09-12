import React from 'react';
import { Bot, Globe, Smartphone, Cpu, Lightbulb, Calculator } from 'lucide-react';

export default function QuickActions({ onSelectAction }) {
  const firstFour = [
    { label: 'Website', prompt: 'What web development services and price packages does SOLVIX offer?', icon: Globe },
    { label: 'Mobile App', prompt: 'What is the starting cost for building an Android and iOS mobile app?', icon: Smartphone },
    { label: 'AI / ML', prompt: 'Tell me about custom AI chatbots and automated workflow solutions.', icon: Bot },
    { label: 'Software', prompt: 'What custom business software (CRM, ERP, Payroll) do you build?', icon: Cpu },
  ];

  const defineIdeaAction = {
    label: 'Help me define my idea',
    prompt: 'I have a new software idea. Can you help me define the technical requirements and features?',
    icon: Lightbulb,
  };

  const estimateAction = {
    label: 'Get a project estimate',
    prompt: 'I want to get a project estimate. Can you help calculate an estimated cost range?',
    icon: Calculator,
  };

  return (
    <div className="solvix-welcome-container">
      {/* Centered Avatar */}
      <div className="solvix-welcome-avatar">
        <Bot size={26} />
      </div>

      <h3 className="solvix-welcome-title">SOLVIX AI</h3>
      <span className="solvix-welcome-subtitle">Project Consultant</span>
      <p className="solvix-welcome-desc">
        Tell me what you're planning to build. You don't need technical knowledge.
      </p>

      {/* Quick Action Cards */}
      <div className="solvix-quick-actions-grid">
        {/* 2-Column Grid */}
        <div className="solvix-actions-2col">
          {firstFour.map((item) => {
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

        {/* Help me define my idea */}
        <button
          className="solvix-quick-btn-full"
          onClick={() => onSelectAction(defineIdeaAction.prompt)}
        >
          <Lightbulb size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
          <span>{defineIdeaAction.label}</span>
        </button>

        {/* Get a project estimate */}
        <button
          className="solvix-quick-btn-full"
          onClick={() => onSelectAction(estimateAction.prompt)}
        >
          <Calculator size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
          <span>{estimateAction.label}</span>
        </button>
      </div>
    </div>
  );
}
