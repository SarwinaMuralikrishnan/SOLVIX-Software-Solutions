import React, { useState } from 'react';
import { X, UserCheck, FileText, CreditCard, Activity, Download, CheckCircle2, Lock, User, Inbox, MessageSquare, ArrowRight } from 'lucide-react';
import { dbService } from '../../services/db';

export default function ClientPortalModal({ onClose, onOpenPayment, onOpenQuote }) {
  const [authenticated, setAuthenticated] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'projects' | 'invoices' | 'payments' | 'messages' | 'downloads' | 'profile'

  const quotes = dbService.getQuotes();
  const invoices = dbService.getInvoices();
  const payments = dbService.getPayments();
  const projects = dbService.getProjects();
  const messages = dbService.getMessages();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20000,
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          height: '90vh',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Portal Header */}
        <div
          style={{
            padding: '20px 28px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.08))',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={22} style={{ color: '#2563EB' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>SOLVIX Secure Client Portal</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748B' }}>Track project milestones, view invoices & download deliverables</p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              color: '#0F172A',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {!authenticated ? (
          <div style={{ padding: '50px 28px', maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Lock size={28} style={{ color: '#7C3AED' }} />
            </div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: '#0F172A' }}>Client Secure Login</h4>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '24px' }}>
              Enter your registered email address to access your client portal.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthenticated(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter registered email address"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none' }}
              />
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                <span>Access Client Portal</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', padding: '12px 28px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', overflowX: 'auto' }}>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: UserCheck },
                { id: 'projects', label: 'Projects', icon: Activity, badge: projects.length },
                { id: 'invoices', label: 'Invoices', icon: CreditCard, badge: invoices.length },
                { id: 'payments', label: 'Payments', icon: CheckCircle2, badge: payments.length },
                { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messages.length },
                { id: 'downloads', label: 'Downloads', icon: Download },
                { id: 'profile', label: 'Profile', icon: User },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      border: isActive ? '1px solid #2563EB' : '1px solid #E2E8F0',
                      background: isActive ? '#2563EB' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <IconComp size={15} />
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span style={{ padding: '2px 6px', borderRadius: '50%', background: isActive ? 'rgba(255,255,255,0.3)' : '#E2E8F0', fontSize: '0.72rem', fontWeight: 800 }}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Tab View Area */}
            <div style={{ padding: '28px', flex: 1, overflowY: 'auto' }}>
              {/* TAB: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Client Dashboard Overview</h4>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '24px' }}>
                    Welcome to your official SOLVIX client portal. Submit quote requests, track agile development progress, and manage invoices.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>Active Projects</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563EB', marginTop: '4px' }}>{projects.length}</div>
                    </div>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>Invoices</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#7C3AED', marginTop: '4px' }}>{invoices.length}</div>
                    </div>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase' }}>Payments Settled</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10B981', marginTop: '4px' }}>{payments.length}</div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(37, 99, 235, 0.04)', border: '1px solid rgba(37, 99, 235, 0.2)', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                    <h5 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Ready to Start a New Project?</h5>
                    <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '16px' }}>Submit your project requirements to get an itemized quote proposal.</p>
                    <button onClick={() => { onClose(); onOpenQuote(); }} className="btn-primary">
                      <FileText size={16} />
                      <span>Request a Quote</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                projects.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {projects.map((proj) => (
                      <div key={proj.id} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
                        <h5 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>{proj.title}</h5>
                        <div style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '4px' }}>Status: {proj.status} ({proj.progressPercent}%)</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <Inbox size={36} style={{ color: '#64748B', marginBottom: '12px' }} />
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No Active Software Projects</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                      You have no active projects yet. Submit a quotation request to kick off your project with SOLVIX.
                    </p>
                    <button onClick={() => { onClose(); onOpenQuote(); }} className="btn-primary">
                      <span>Submit Quote Request</span>
                    </button>
                  </div>
                )
              )}

              {/* TAB: INVOICES */}
              {activeTab === 'invoices' && (
                invoices.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {invoices.map((inv) => (
                      <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                        <div>
                          <div style={{ fontWeight: 800, color: '#0F172A' }}>Invoice #{inv.id}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{inv.projectTitle}</div>
                        </div>
                        <div style={{ fontWeight: 900, color: '#2563EB', fontSize: '1.1rem' }}>₹{inv.totalAmount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <Inbox size={36} style={{ color: '#64748B', marginBottom: '12px' }} />
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No Invoices Issued</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Official invoices will appear here once project milestones are established.</p>
                  </div>
                )
              )}

              {/* TAB: PAYMENTS */}
              {activeTab === 'payments' && (
                payments.length > 0 ? (
                  <div>
                    {payments.map((p) => (
                      <div key={p.id} style={{ padding: '14px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Payment #{p.id}</span>
                        <strong style={{ color: '#10B981' }}>₹{p.amount.toLocaleString()}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <Inbox size={36} style={{ color: '#64748B', marginBottom: '12px' }} />
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No Payment Records</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Payment transaction receipts will automatically record here after completed payment.</p>
                  </div>
                )
              )}

              {/* TAB: MESSAGES */}
              {activeTab === 'messages' && (
                messages.length > 0 ? (
                  <div>
                    {messages.map((m) => (
                      <div key={m.id} style={{ padding: '14px', borderBottom: '1px solid #E2E8F0' }}>
                        <div><strong>{m.name}</strong> ({m.email})</div>
                        <p style={{ color: '#475569', fontSize: '0.88rem', margin: '4px 0 0 0' }}>"{m.message}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                    <Inbox size={36} style={{ color: '#64748B', marginBottom: '12px' }} />
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No Messages Recorded</h4>
                    <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Direct project inquiries will display here.</p>
                  </div>
                )
              )}

              {/* TAB: DOWNLOADS */}
              {activeTab === 'downloads' && (
                <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                  <Download size={36} style={{ color: '#64748B', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No Available Deliverable Downloads</h4>
                  <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Project source code ZIP files and architecture specs will be available upon milestone deployment.</p>
                </div>
              )}

              {/* TAB: PROFILE */}
              {activeTab === 'profile' && (
                <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>Client Profile Settings</h4>
                  <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>Contact Email</label>
                      <input type="email" defaultValue={loginEmail || 'client@company.com'} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginTop: '4px' }} />
                    </div>
                    <button className="btn-primary" onClick={() => alert('Profile updated successfully!')} style={{ justifyContent: 'center' }}>
                      Update Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
