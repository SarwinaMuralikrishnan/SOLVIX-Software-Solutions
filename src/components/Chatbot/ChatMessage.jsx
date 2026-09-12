import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';

export default function ChatMessage({ message, onSelectAction, onOpenQuote, onOpenConsultation }) {
  const isUser = message.sender === 'user';

  // Format simple Markdown without raw syntax
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, lIdx) => {
      // Process bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const content = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} style={{ color: isUser ? '#FFFFFF' : '#0F172A', fontWeight: 700 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <span key={lIdx} style={{ display: 'block', marginBottom: line.trim() === '' ? '4px' : '2px' }}>
          {content}
        </span>
      );
    });
  };

  return (
    <div className={`solvix-msg-row ${isUser ? 'user' : 'ai'}`}>
      {/* Bot Avatar for AI Messages */}
      {!isUser && (
        <div className="solvix-bot-avatar" title="SOLVIX AI Assistant">
          <Bot size={15} />
        </div>
      )}

      {/* Bubble */}
      <div className={`solvix-bubble ${isUser ? 'user' : 'ai'}`}>
        {renderFormattedText(message.text)}

        {/* Action Chips under AI Message */}
        {!isUser && message.actions && message.actions.length > 0 && (
          <div className="solvix-msg-action-chips">
            {message.actions.map((act) => (
              <button
                key={act.label}
                className="solvix-action-chip"
                onClick={() => {
                  if (act.type === 'quote' && onOpenQuote) {
                    onOpenQuote(act.payload || 'Business Website');
                  } else if (act.type === 'consultation' && onOpenConsultation) {
                    onOpenConsultation(act.payload || 'Technical Consultation');
                  } else if (act.prompt && onSelectAction) {
                    onSelectAction(act.prompt);
                  }
                }}
              >
                <span>{act.label}</span>
                <ArrowRight size={12} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
