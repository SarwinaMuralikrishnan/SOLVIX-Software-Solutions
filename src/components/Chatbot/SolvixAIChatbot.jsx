import React, { useState, useEffect, useRef } from 'react';
import { Bot, Minus, X, MoreVertical, Trash2, Info, ShieldCheck, RefreshCw } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import EstimateFlow from './EstimateFlow';
import { api } from '../../services/api';
import './Chatbot.css';

export default function SolvixAIChatbot({ onOpenQuote, onOpenConsultation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('solvix_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [activeEstimate, setActiveEstimate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const bodyRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Persist conversation state
  useEffect(() => {
    try {
      localStorage.setItem('solvix_chat_history', JSON.stringify(messages.slice(-20)));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [messages]);

  // Scroll to bottom on message change
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  // Escape key handler to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setShowDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (userText) => {
    if (!userText.trim() || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Map conversation format for backend
      const formattedHistory = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text || '',
      }));

      const data = await api.sendChatMessage(userText, formattedHistory);

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "I'm here to help with your software project.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (data.suggestedEstimate) {
        setActiveEstimate(data.suggestedEstimate);
      }
    } catch (error) {
      console.error('[CHATBOT ERROR]', error.code || 'UNKNOWN', error.message);

      let userFacingMessage = "SOLVIX AI assistant is temporarily offline. Please use the options below to connect with our team directly.";

      const errorMsg = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: userFacingMessage,
        actions: [
          { label: 'Request a Quote', type: 'quote' },
          { label: 'Book a Consultation', type: 'consultation' },
        ],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setActiveEstimate(null);
    setShowDropdown(false);
    try {
      localStorage.removeItem('solvix_chat_history');
    } catch (e) {}
  };

  return (
    <>
      {/* 1. FLOATING BOT BUTTON */}
      {!isOpen && (
        <div className="solvix-chat-trigger-container">
          <span className="solvix-chat-tooltip">Ask SOLVIX AI</span>
          <button
            onClick={() => setIsOpen(true)}
            className="solvix-chat-trigger-btn"
            aria-label="Ask SOLVIX AI"
          >
            <Bot size={26} />
            <div className="solvix-chat-pulse-ring" />
          </button>
        </div>
      )}

      {/* 2. CHAT WINDOW PANEL */}
      {isOpen && (
        <div className="solvix-chat-panel">
          {/* HEADER */}
          <div className="solvix-chat-header">
            <div className="solvix-header-left">
              <div className="solvix-header-avatar" title="SOLVIX AI">
                <Bot size={18} />
              </div>
              <div className="solvix-header-info">
                <h4 className="solvix-header-title">SOLVIX AI</h4>
                <p className="solvix-header-subtitle">Project Consultant</p>
                <div className="solvix-header-status">
                  <span className="solvix-status-dot" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            <div className="solvix-header-actions">
              {/* 3-Dot Settings Menu */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="solvix-header-icon-btn"
                title="Options"
                aria-label="Options"
              >
                <MoreVertical size={16} />
              </button>

              {showDropdown && (
                <div className="solvix-header-dropdown">
                  <button
                    className="solvix-dropdown-item danger"
                    onClick={handleClearChat}
                  >
                    <Trash2 size={14} />
                    <span>Clear chat</span>
                  </button>
                  <button
                    className="solvix-dropdown-item"
                    onClick={() => {
                      setShowDropdown(false);
                      alert('SOLVIX AI Project Consultant provides real-time software requirement scoping, tech recommendations, and cost estimations.');
                    }}
                  >
                    <Info size={14} />
                    <span>About SOLVIX AI</span>
                  </button>
                  <button
                    className="solvix-dropdown-item"
                    onClick={() => {
                      setShowDropdown(false);
                      alert('Your privacy is protected. Chat interactions are used solely to generate project estimates.');
                    }}
                  >
                    <ShieldCheck size={14} />
                    <span>Privacy Notice</span>
                  </button>
                </div>
              )}

              {/* Minimize Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowDropdown(false);
                }}
                className="solvix-header-icon-btn"
                title="Minimize"
                aria-label="Minimize"
              >
                <Minus size={16} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowDropdown(false);
                }}
                className="solvix-header-icon-btn"
                title="Close"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* CHAT BODY */}
          <div className="solvix-chat-body" ref={bodyRef}>
            {messages.length === 0 ? (
              <QuickActions onSelectAction={handleSendMessage} />
            ) : (
              <>
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onSelectAction={handleSendMessage}
                    onOpenQuote={onOpenQuote}
                    onOpenConsultation={onOpenConsultation}
                  />
                ))}

                {/* Estimate Summary Card */}
                {activeEstimate && (
                  <EstimateFlow
                    estimate={activeEstimate}
                    onRequestQuote={(type) => {
                      setIsOpen(false);
                      if (onOpenQuote) onOpenQuote(type);
                    }}
                  />
                )}

                {/* Typing Indicator */}
                {loading && (
                  <div className="solvix-typing-container">
                    <div className="solvix-bot-avatar">
                      <Bot size={15} />
                    </div>
                    <div className="solvix-typing-bubble">
                      <div className="solvix-dot" />
                      <div className="solvix-dot" />
                      <div className="solvix-dot" />
                    </div>
                  </div>
                )}
              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="solvix-chat-footer">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
