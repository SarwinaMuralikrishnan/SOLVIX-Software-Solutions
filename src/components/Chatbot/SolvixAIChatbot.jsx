import React, { useState, useEffect, useRef } from 'react';
import { Bot, Minus, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import EstimateFlow from './EstimateFlow';
import { api } from '../../services/api';
import './Chatbot.css';

export default function SolvixAIChatbot({ onOpenQuote, onOpenConsultation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeEstimate, setActiveEstimate] = useState(null);
  const [sessionId, setSessionId] = useState(`session-${Date.now()}`);

  const bodyRef = useRef(null);
  const messagesEndRef = useRef(null);

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
        handleCloseChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Open chatbot -> ALWAYS start a fresh conversation session
  const handleOpenChat = () => {
    setMessages([]);
    setActiveEstimate(null);
    setSessionId(`session-${Date.now()}`);
    setIsOpen(true);
  };

  // Close chatbot -> Destroy current conversation context
  const handleCloseChat = () => {
    setIsOpen(false);
    setMessages([]);
    setActiveEstimate(null);
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
      // Map current session conversation history for backend
      const formattedHistory = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text || '',
      }));

      const data = await api.sendChatMessage(userText, formattedHistory, sessionId);

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

      const userFacingMessage = "Sorry, I'm having trouble responding right now. Please try again in a moment.";

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

  return (
    <>
      {/* 1. FLOATING BOT BUTTON */}
      {!isOpen && (
        <div className="solvix-chat-trigger-container">
          <span className="solvix-chat-tooltip">Ask SOLVIX AI</span>
          <button
            onClick={handleOpenChat}
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
                <p className="solvix-header-subtitle">AI Assistant</p>
                <div className="solvix-header-status">
                  <span className="solvix-status-dot" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            <div className="solvix-header-actions">
              {/* Minimize Button */}
              <button
                onClick={handleCloseChat}
                className="solvix-header-icon-btn"
                title="Minimize"
                aria-label="Minimize"
              >
                <Minus size={16} />
              </button>

              {/* Close Button */}
              <button
                onClick={handleCloseChat}
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
                      handleCloseChat();
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
