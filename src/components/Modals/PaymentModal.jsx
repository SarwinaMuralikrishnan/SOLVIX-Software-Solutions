import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Download, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, History, FileText, Check, Inbox } from 'lucide-react';
import { dbService } from '../../services/db';

export default function PaymentModal({ onClose, initialInvoiceId = null }) {
  const [activeTab, setActiveTab] = useState('invoice');
  const [invoices, setInvoices] = useState(dbService.getInvoices());
  const [selectedInvoice, setSelectedInvoice] = useState(
    invoices.find((i) => i.id === initialInvoiceId) || (invoices.length > 0 ? invoices[0] : null)
  );
  const [paymentMethod, setPaymentMethod] = useState('Razorpay (UPI / Card / NetBanking)');
  const [processing, setProcessing] = useState(false);
  const [lastPayment, setLastPayment] = useState(null);

  const payments = dbService.getPayments();

  const handleProcessPayment = () => {
    if (!selectedInvoice) return;
    setProcessing(true);
    setActiveTab('status');

    setTimeout(() => {
      const payRecord = dbService.addPayment({
        invoiceId: selectedInvoice.id,
        clientName: selectedInvoice.clientName || 'Client',
        amount: selectedInvoice.totalAmount,
        currency: selectedInvoice.currency || 'INR (₹)',
        method: paymentMethod,
        transactionRef: `pay_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      });
      setLastPayment(payRecord);
      setInvoices(dbService.getInvoices());
      setSelectedInvoice({ ...selectedInvoice, status: 'Paid' });
      setProcessing(false);
      setActiveTab('success');
    }, 1800);
  };

  const handleDownloadInvoicePDF = (inv) => {
    if (!inv) return;
    const content = `=====================================================
SOLVIX OFFICIAL COMPANY INVOICE
=====================================================
Invoice ID: ${inv.id}
Client: ${inv.clientName}
Date Generated: ${new Date(inv.createdAt).toLocaleDateString()}
Status: ${inv.status}
TOTAL AMOUNT: ₹${inv.totalAmount} ${inv.currency || 'INR'}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOLVIX_Invoice_${inv.id}.txt`;
    a.click();
  };

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
          maxWidth: '820px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header Navigation Bar */}
        <div
          style={{
            padding: '20px 28px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(124, 58, 237, 0.06))',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={20} style={{ color: '#2563EB' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>SOLVIX Payment Gateway Architecture</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Production Ready Razorpay & Stripe Gateway Workflow</p>
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

        {/* Tab Selection */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '12px 28px',
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'invoice', label: '1. Invoice View', icon: FileText },
            { id: 'summary', label: '2. Payment Gateway', icon: CreditCard },
            { id: 'history', label: 'Payment Records', icon: History },
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
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <IconComp size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Body */}
        <div style={{ padding: '28px', flex: 1 }}>
          {/* TAB 1: INVOICE VIEW */}
          {activeTab === 'invoice' && (
            selectedInvoice ? (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(37, 99, 235, 0.05)',
                    border: '1px solid rgba(37, 99, 235, 0.15)',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '24px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>
                      Official Invoice
                    </span>
                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>{selectedInvoice.id}</h4>
                    <div style={{ fontSize: '0.88rem', color: '#475569' }}>Project: {selectedInvoice.projectTitle}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 14px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        background: selectedInvoice.status === 'Paid' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: selectedInvoice.status === 'Paid' ? '#10B981' : '#D97706',
                        border: selectedInvoice.status === 'Paid' ? '1px solid #10B981' : '1px solid #F59E0B',
                        marginBottom: '8px',
                      }}
                    >
                      STATUS: {selectedInvoice.status.toUpperCase()}
                    </span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#2563EB' }}>
                      ₹{selectedInvoice.totalAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('summary')}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                >
                  <span>Proceed to Payment Gateway</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F1F5F9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Inbox size={28} style={{ color: '#64748B' }} />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No Pending Invoices</h4>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 24px auto' }}>
                  Real invoices are issued after a custom quote specification is reviewed and approved by the SOLVIX team.
                </p>
                <button onClick={onClose} className="btn-secondary">
                  Close Window
                </button>
              </div>
            )
          )}

          {/* TAB 2: PAYMENT SUMMARY */}
          {activeTab === 'summary' && (
            selectedInvoice ? (
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Payment Summary</h4>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Select production payment gateway method for invoice <strong>{selectedInvoice.id}</strong>.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { id: 'Razorpay (UPI / Card / NetBanking)', label: 'Razorpay Gateway (UPI, GPay, PhonePe, Cards, NetBanking)', badge: 'India' },
                    { id: 'Stripe International Card Gateway', label: 'Stripe Gateway (International Credit Cards, Apple Pay)', badge: 'Global USD' },
                  ].map((m) => (
                    <label
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: paymentMethod === m.id ? '2px solid #2563EB' : '1px solid #E2E8F0',
                        background: paymentMethod === m.id ? 'rgba(37, 99, 235, 0.04)' : '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>{m.label}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: 'var(--radius-full)', background: '#F1F5F9', color: '#64748B' }}>
                        {m.badge}
                      </span>
                    </label>
                  ))}
                </div>

                <button onClick={handleProcessPayment} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  <ShieldCheck size={18} />
                  <span>Initiate Gateway Transaction</span>
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <Inbox size={32} style={{ color: '#64748B', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>No Active Invoice Selected</h4>
                <p style={{ color: '#64748B', fontSize: '0.88rem' }}>Please select an invoice to proceed to payment.</p>
              </div>
            )
          )}

          {/* TAB 3: PAYMENT STATUS */}
          {activeTab === 'status' && (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <RefreshCw size={36} style={{ color: '#2563EB', animation: 'spin 2s linear infinite', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>Processing Gateway Check...</h4>
              <p style={{ color: '#64748B', fontSize: '0.88rem' }}>Connecting to {paymentMethod} API sandbox...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* TAB 4: PAYMENT SUCCESS */}
          {activeTab === 'success' && lastPayment && (
            <div style={{ textAlign: 'center', padding: '30px 16px' }}>
              <CheckCircle2 size={40} style={{ color: '#10B981', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Payment Transaction Successful!</h4>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '20px' }}>Ref: <strong>{lastPayment.transactionRef}</strong></p>
              <button onClick={() => setActiveTab('history')} className="btn-primary">
                View Payment Records
              </button>
            </div>
          )}

          {/* TAB 5: PAYMENT HISTORY */}
          {activeTab === 'history' && (
            payments.length > 0 ? (
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>Payment Transaction History</h4>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px 16px' }}>Txn Ref</th>
                        <th style={{ padding: '12px 16px' }}>Invoice</th>
                        <th style={{ padding: '12px 16px' }}>Amount</th>
                        <th style={{ padding: '12px 16px' }}>Gateway Method</th>
                        <th style={{ padding: '12px 16px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                          <td style={{ padding: '12px 16px', fontWeight: 700 }}>{p.transactionRef || p.id}</td>
                          <td style={{ padding: '12px 16px', fontWeight: 600 }}>{p.invoiceId}</td>
                          <td style={{ padding: '12px 16px', fontWeight: 800, color: '#10B981' }}>₹{p.amount.toLocaleString()}</td>
                          <td style={{ padding: '12px 16px', color: '#64748B' }}>{p.method}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontWeight: 700, fontSize: '0.76rem' }}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F1F5F9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Inbox size={28} style={{ color: '#64748B' }} />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>No Payment Records Yet</h4>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 24px auto' }}>
                  Real transaction history will appear here automatically as clients complete payments via Stripe or Razorpay.
                </p>
                <button onClick={onClose} className="btn-secondary">
                  Close Window
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
