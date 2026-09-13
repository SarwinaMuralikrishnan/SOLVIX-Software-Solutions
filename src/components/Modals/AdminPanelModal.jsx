import React, { useState, useEffect } from "react";
import {
  X,
  LayoutDashboard,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Settings,
  Search,
  Download,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  LogOut,
  Filter,
  User,
  Eye,
  Bot,
  ShieldCheck,
  Activity,
  Send,
  FileSpreadsheet,
  Database,
  Lock
} from "lucide-react";

import { api } from "../../services/api";

export default function AdminPanelModal({ onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter] = useState("All");

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const [consultations, setConsultations] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [aiLeads, setAiLeads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [emailStatus, setEmailStatus] = useState({
    connected: false,
    statusMessage: "Checking Resend status...",
    configuredNotificationEmail: "contact@solvixsoftwaresolutions.com",
    fromEmail: "SOLVIX Software Solutions <contact@solvixsoftwaresolutions.com>",
    provider: "Resend Email API"
  });

  // -----------------------------
  // Load All Enquiries from Express REST API
  // -----------------------------
  const fetchEnquiries = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await api.getAdminEnquiries();

      setConsultations(data.consultations || []);
      setQuotes(data.quotes || []);
      setAiLeads(data.aiLeads || []);
      setMessages(data.contacts || data.messages || []);
      setSubscribers(data.subscribers || []);
      setAuditLogs(data.auditLogs || []);
      if (data.emailStatus) {
        setEmailStatus(data.emailStatus);
      }
    } catch (err) {
      if (err.status === 401) {
        sessionStorage.removeItem("solvix_admin_token");
        onLogout();
        return;
      }
      setErrorMsg(
        err.message || "Unable to connect to backend server. Please verify Express server status."
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Show temporary action toast banner
  const triggerToast = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(""), 4000);
  };

  // -----------------------------
  // Real Statistics Computation (No Fake Stats)
  // -----------------------------
  const totalEnquiriesCount =
    messages.length + quotes.length + consultations.length + aiLeads.length;

  const newEnquiriesCount =
    messages.filter((m) => m.status === "New").length +
    quotes.filter((q) => q.status === "New").length +
    consultations.filter((c) => c.status === "New" || c.status === "Requested").length +
    aiLeads.filter((a) => a.status === "New").length;

  const pendingConsultationsCount = consultations.filter(
    (c) => c.status === "New" || c.status === "Requested" || c.status === "Confirmed"
  ).length;

  const quoteRequestsCount = quotes.length;

  const todayStr = new Date().toISOString().split("T")[0];
  const todayEnquiriesCount =
    messages.filter((m) => m.created_at && m.created_at.startsWith(todayStr)).length +
    quotes.filter((q) => q.created_at && q.created_at.startsWith(todayStr)).length +
    consultations.filter((c) => c.created_at && c.created_at.startsWith(todayStr)).length +
    aiLeads.filter((a) => a.created_at && a.created_at.startsWith(todayStr)).length;

  const currentMonthStr = new Date().toISOString().substring(0, 7);
  const monthlyEnquiriesCount =
    messages.filter((m) => m.created_at && m.created_at.startsWith(currentMonthStr)).length +
    quotes.filter((q) => q.created_at && q.created_at.startsWith(currentMonthStr)).length +
    consultations.filter((c) => c.created_at && c.created_at.startsWith(currentMonthStr)).length +
    aiLeads.filter((a) => a.created_at && a.created_at.startsWith(currentMonthStr)).length;

  // Unified Recent Activity List
  const recentEnquiries = [
    ...messages.map((m) => ({ ...m, recordType: "contacts", typeLabel: "Contact Enquiry" })),
    ...quotes.map((q) => ({ ...q, recordType: "quotes", typeLabel: "Quote Request" })),
    ...consultations.map((c) => ({ ...c, recordType: "consultations", typeLabel: "Consultation" })),
    ...aiLeads.map((a) => ({ ...a, recordType: "quotes", typeLabel: "AI Chatbot Lead" }))
  ]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 8);

  // -----------------------------
  // Sidebar Tabs Configuration
  // -----------------------------
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "contacts", label: "Contact Enquiries", icon: MessageSquare, badge: messages.length, unread: messages.filter(m => m.status === 'New').length },
    { id: "quotes", label: "Quote Requests", icon: FileText, badge: quotes.length, unread: quotes.filter(q => q.status === 'New').length },
    { id: "consultations", label: "Consultations", icon: Calendar, badge: consultations.length, unread: consultations.filter(c => c.status === 'New' || c.status === 'Requested').length },
    { id: "ai_leads", label: "AI Leads", icon: Bot, badge: aiLeads.length, unread: aiLeads.filter(a => a.status === 'New').length },
    { id: "subscribers", label: "Newsletter", icon: Mail, badge: subscribers.length },
    { id: "reports", label: "Reports / Export", icon: FileSpreadsheet },
    { id: "activity_logs", label: "Activity Log", icon: Activity },
    { id: "email_status", label: "Email Status", icon: Send },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Admin Profile", icon: User }
  ];

  // -----------------------------
  // Update Record Status
  // -----------------------------
  const handleUpdateStatus = async (type, id, newStatus) => {
    try {
      await api.updateStatus(type, id, newStatus);
      triggerToast(`Status updated to '${newStatus}' successfully.`);
      fetchEnquiries();
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord({ ...selectedRecord, status: newStatus });
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  // -----------------------------
  // Delete Record
  // -----------------------------
  const confirmDeleteRecord = async () => {
    if (!recordToDelete) return;
    try {
      await api.deleteEnquiry(recordToDelete.type, recordToDelete.id);
      triggerToast("Record deleted successfully.");
      setRecordToDelete(null);
      if (selectedRecord && selectedRecord.id === recordToDelete.id) {
        setSelectedRecord(null);
      }
      fetchEnquiries();
    } catch (err) {
      alert("Error deleting record: " + err.message);
    }
  };

  // -----------------------------
  // CSV Exporter Engine
  // -----------------------------
  const exportToCSV = (datasetName, records) => {
    if (!records || records.length === 0) {
      alert(`No records available to export for ${datasetName}.`);
      return;
    }

    const headers = Object.keys(records[0]).filter(k => typeof records[0][k] !== 'object');
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of records) {
      const values = headers.map(header => {
        const val = row[header] === undefined || row[header] === null ? "" : String(row[header]);
        const escaped = val.replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `solvix_${datasetName.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -----------------------------
  // Multi-Criteria Filtering Logic
  // -----------------------------
  const filterList = (list) => {
    if (!list) return [];
    return list.filter((item) => {
      // 1. Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.service && item.service.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));

      // 2. Status Filter
      const matchesStatus =
        statusFilter === "All" ||
        (item.status && item.status.toLowerCase() === statusFilter.toLowerCase());

      // 3. Service Filter
      const matchesService =
        serviceFilter === "All" ||
        (item.service && item.service.toLowerCase().includes(serviceFilter.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(serviceFilter.toLowerCase()));

      return matchesSearch && matchesStatus && matchesService;
    });
  };

  // Helper Badge Color Styling
  const getStatusBadgeStyle = (status) => {
    const s = (status || "New").toLowerCase();
    if (s === "new" || s === "requested") {
      return { bg: "rgba(37, 99, 235, 0.1)", color: "#2563EB", border: "rgba(37, 99, 235, 0.25)" };
    }
    if (s === "contacted" || s === "in discussion" || s === "reviewing" || s === "quoted" || s === "confirmed") {
      return { bg: "rgba(124, 58, 237, 0.1)", color: "#7C3AED", border: "rgba(124, 58, 237, 0.25)" };
    }
    if (s === "converted" || s === "won" || s === "completed" || s === "active") {
      return { bg: "rgba(16, 185, 129, 0.1)", color: "#10B981", border: "rgba(16, 185, 129, 0.25)" };
    }
    return { bg: "rgba(100, 116, 139, 0.1)", color: "#64748B", border: "rgba(100, 116, 139, 0.25)" };
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1340px",
          height: "92vh",
          background: "#F8FAFC",
          borderRadius: "var(--radius-xl)",
          border: "1px solid #E2E8F0",
          boxShadow: "0 25px 60px rgba(15, 23, 42, 0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            padding: "16px 24px",
            background: "#FFFFFF",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #7C3AED, #2563EB)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 900
              }}
            >
              S
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                  SOLVIX Business Management Dashboard
                </h3>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(16, 185, 129, 0.25)"
                  }}
                >
                  LIVE SYSTEM
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                Logged in as <strong>admin</strong> &bull; Production Enquiries & Lead Control Portal
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                background: "#FFFFFF",
                color: "#475569",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh Data</span>
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem("solvix_admin_token");
                onLogout();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                background: "rgba(239, 68, 68, 0.06)",
                color: "#DC2626",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: "#F1F5F9",
                border: "1px solid #E2E8F0",
                color: "#0F172A",
                padding: "8px",
                borderRadius: "50%",
                cursor: "pointer"
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Global Toast Action Banner */}
        {actionSuccess && (
          <div
            style={{
              background: "#10B981",
              color: "#FFFFFF",
              padding: "8px 24px",
              fontSize: "0.86rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <CheckCircle size={16} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Main Split Layout: Sidebar + Dashboard Content */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left Navigation Sidebar */}
          <div
            style={{
              width: "250px",
              background: "#FFFFFF",
              borderRight: "1px solid #E2E8F0",
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              overflowY: "auto",
              flexShrink: 0
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "#94A3B8",
                textTransform: "uppercase",
                padding: "8px 12px",
                letterSpacing: "0.06em"
              }}
            >
              Navigation
            </div>

            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedRecord(null);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "none",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))"
                      : "transparent",
                    color: isActive ? "#2563EB" : "#475569",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconComponent size={18} style={{ color: isActive ? "#2563EB" : "#64748B" }} />
                    <span>{tab.label}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {tab.badge !== undefined && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          background: isActive ? "#2563EB" : "#E2E8F0",
                          color: isActive ? "#FFFFFF" : "#475569",
                          padding: "2px 7px",
                          borderRadius: "var(--radius-full)"
                        }}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #E2E8F0" }}>
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "0.78rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10B981", fontWeight: 800, marginBottom: "4px" }}>
                  <ShieldCheck size={14} />
                  <span>Secure SSL Channel</span>
                </div>
                <div style={{ color: "#64748B" }}>JWT Bearer Authentication Active</div>
              </div>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: "24px" }}>
            {/* Global Search & Filter Bar */}
            {activeTab !== "dashboard" && activeTab !== "reports" && activeTab !== "activity_logs" && activeTab !== "email_status" && activeTab !== "settings" && activeTab !== "profile" && (
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "var(--radius-lg)",
                  padding: "14px 18px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                  flexWrap: "wrap",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {/* Search Input */}
                <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  <input
                    type="text"
                    placeholder="Search name, email, company, phone, service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px 9px 36px",
                      borderRadius: "8px",
                      border: "1px solid #E2E8F0",
                      background: "#F8FAFC",
                      fontSize: "0.86rem",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Filters */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  {/* Status Filter */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Filter size={14} style={{ color: "#64748B" }} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        background: "#F8FAFC",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        outline: "none"
                      }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Export CSV Button */}
                  <button
                    onClick={() => {
                      if (activeTab === "contacts") exportToCSV("Contacts", filterList(messages));
                      if (activeTab === "quotes") exportToCSV("Quotes", filterList(quotes));
                      if (activeTab === "consultations") exportToCSV("Consultations", filterList(consultations));
                      if (activeTab === "ai_leads") exportToCSV("AI_Leads", filterList(aiLeads));
                      if (activeTab === "subscribers") exportToCSV("Subscribers", filterList(subscribers));
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: "1px solid #2563EB",
                      background: "rgba(37, 99, 235, 0.06)",
                      color: "#2563EB",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            )}

            {/* Error Notice */}
            {errorMsg && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#DC2626",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  fontSize: "0.88rem",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {/* ======================================================== */}
            {activeTab === "dashboard" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* 6 High-Level KPI Metric Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                  <div className="glass-card-static" style={{ padding: "20px", background: "#FFFFFF", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Total Enquiries</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0F172A", marginTop: "4px" }}>{totalEnquiriesCount}</div>
                    <div style={{ fontSize: "0.74rem", color: "#2563EB", fontWeight: 700, marginTop: "4px" }}>Real Database Count</div>
                  </div>

                  <div className="glass-card-static" style={{ padding: "20px", background: "#FFFFFF", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>New Action Items</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#2563EB", marginTop: "4px" }}>{newEnquiriesCount}</div>
                    <div style={{ fontSize: "0.74rem", color: "#64748B", fontWeight: 600, marginTop: "4px" }}>Requires Response</div>
                  </div>

                  <div className="glass-card-static" style={{ padding: "20px", background: "#FFFFFF", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Quote Requests</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#7C3AED", marginTop: "4px" }}>{quoteRequestsCount}</div>
                    <div style={{ fontSize: "0.74rem", color: "#7C3AED", fontWeight: 700, marginTop: "4px" }}>Web & Mobile Quotes</div>
                  </div>

                  <div className="glass-card-static" style={{ padding: "20px", background: "#FFFFFF", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Pending Consultations</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#F59E0B", marginTop: "4px" }}>{pendingConsultationsCount}</div>
                    <div style={{ fontSize: "0.74rem", color: "#F59E0B", fontWeight: 700, marginTop: "4px" }}>Google Meet Sessions</div>
                  </div>

                  <div className="glass-card-static" style={{ padding: "20px", background: "#FFFFFF", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Today's Submissions</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#10B981", marginTop: "4px" }}>{todayEnquiriesCount}</div>
                    <div style={{ fontSize: "0.74rem", color: "#10B981", fontWeight: 700, marginTop: "4px" }}>Last 24 Hours</div>
                  </div>

                  <div className="glass-card-static" style={{ padding: "20px", background: "#FFFFFF", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Monthly Enquiries</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0284C7", marginTop: "4px" }}>{monthlyEnquiriesCount}</div>
                    <div style={{ fontSize: "0.74rem", color: "#0284C7", fontWeight: 700, marginTop: "4px" }}>Current Month</div>
                  </div>
                </div>

                {/* Recent Activity Table */}
                <div className="glass-card-static" style={{ padding: "24px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>Recent Business Enquiries</h4>
                      <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>Latest form submissions across website, quotes, and consultations.</p>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B" }}>Showing top {recentEnquiries.length} recent</span>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                      <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "left", color: "#475569", fontWeight: 700 }}>
                          <th style={{ padding: "10px 14px" }}>Type</th>
                          <th style={{ padding: "10px 14px" }}>Client Name</th>
                          <th style={{ padding: "10px 14px" }}>Email / Contact</th>
                          <th style={{ padding: "10px 14px" }}>Date</th>
                          <th style={{ padding: "10px 14px" }}>Status</th>
                          <th style={{ padding: "10px 14px", textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentEnquiries.map((item, idx) => {
                          const badge = getStatusBadgeStyle(item.status);
                          return (
                            <tr key={idx} style={{ borderBottom: "1px solid #F1F5F9" }}>
                              <td style={{ padding: "12px 14px", fontWeight: 700, color: "#2563EB" }}>{item.typeLabel}</td>
                              <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0F172A" }}>{item.name}</td>
                              <td style={{ padding: "12px 14px", color: "#475569" }}>{item.email}</td>
                              <td style={{ padding: "12px 14px", color: "#64748B", fontSize: "0.8rem" }}>
                                {item.created_at ? new Date(item.created_at).toLocaleString() : "Recent"}
                              </td>
                              <td style={{ padding: "12px 14px" }}>
                                <span style={{ padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: "0.74rem", fontWeight: 800, background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
                                  {item.status || "New"}
                                </span>
                              </td>
                              <td style={{ padding: "12px 14px", textAlign: "right" }}>
                                <button
                                  onClick={() => setSelectedRecord(item)}
                                  style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", padding: "6px 12px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: CONTACT ENQUIRIES */}
            {/* ======================================================== */}
            {activeTab === "contacts" && (
              <div className="glass-card-static" style={{ padding: "24px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "16px" }}>Contact Enquiries ({filterList(messages).length})</h4>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "left", color: "#475569", fontWeight: 700 }}>
                        <th style={{ padding: "10px 14px" }}>Name</th>
                        <th style={{ padding: "10px 14px" }}>Email</th>
                        <th style={{ padding: "10px 14px" }}>Phone</th>
                        <th style={{ padding: "10px 14px" }}>Company</th>
                        <th style={{ padding: "10px 14px" }}>Submitted At</th>
                        <th style={{ padding: "10px 14px" }}>Status</th>
                        <th style={{ padding: "10px 14px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterList(messages).map((m) => {
                        const badge = getStatusBadgeStyle(m.status);
                        return (
                          <tr key={m.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0F172A" }}>{m.name}</td>
                            <td style={{ padding: "12px 14px" }}>
                              <a href={`mailto:${m.email}`} style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>{m.email}</a>
                            </td>
                            <td style={{ padding: "12px 14px", color: "#475569" }}>{m.phone}</td>
                            <td style={{ padding: "12px 14px", color: "#64748B" }}>{m.company || "N/A"}</td>
                            <td style={{ padding: "12px 14px", color: "#64748B", fontSize: "0.8rem" }}>{new Date(m.created_at).toLocaleString()}</td>
                            <td style={{ padding: "12px 14px" }}>
                              <select
                                value={m.status || "New"}
                                onChange={(e) => handleUpdateStatus("contacts", m.id, e.target.value)}
                                style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 800, background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, outline: "none" }}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Discussion">In Discussion</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td style={{ padding: "12px 14px", textAlign: "right" }}>
                              <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                                <button onClick={() => setSelectedRecord({ ...m, typeLabel: "Contact Enquiry" })} style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Eye size={13} />
                                </button>
                                <a href={`mailto:${m.email}?subject=RE: SOLVIX Contact Enquiry`} style={{ background: "rgba(37, 99, 235, 0.08)", color: "#2563EB", border: "1px solid rgba(37, 99, 235, 0.2)", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, textDecoration: "none" }}>
                                  <Mail size={13} />
                                </a>
                                <button onClick={() => setRecordToDelete({ type: "contacts", id: m.id, name: m.name })} style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#DC2626", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: QUOTE REQUESTS */}
            {/* ======================================================== */}
            {activeTab === "quotes" && (
              <div className="glass-card-static" style={{ padding: "24px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "16px" }}>Quote Requests ({filterList(quotes).length})</h4>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "left", color: "#475569", fontWeight: 700 }}>
                        <th style={{ padding: "10px 14px" }}>Client Name</th>
                        <th style={{ padding: "10px 14px" }}>Service / Category</th>
                        <th style={{ padding: "10px 14px" }}>Budget</th>
                        <th style={{ padding: "10px 14px" }}>Timeline</th>
                        <th style={{ padding: "10px 14px" }}>Submitted At</th>
                        <th style={{ padding: "10px 14px" }}>Status</th>
                        <th style={{ padding: "10px 14px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterList(quotes).map((q) => {
                        const badge = getStatusBadgeStyle(q.status);
                        return (
                          <tr key={q.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ fontWeight: 800, color: "#0F172A" }}>{q.name}</div>
                              <div style={{ fontSize: "0.76rem", color: "#64748B" }}>{q.email}</div>
                            </td>
                            <td style={{ padding: "12px 14px", fontWeight: 700, color: "#2563EB" }}>{q.service || q.category || "Custom Software"}</td>
                            <td style={{ padding: "12px 14px", fontWeight: 700, color: "#7C3AED" }}>{q.budget || q.budgetRange || "N/A"}</td>
                            <td style={{ padding: "12px 14px", color: "#475569" }}>{q.timeline || q.expectedTimeline || "N/A"}</td>
                            <td style={{ padding: "12px 14px", color: "#64748B", fontSize: "0.8rem" }}>{new Date(q.created_at).toLocaleString()}</td>
                            <td style={{ padding: "12px 14px" }}>
                              <select
                                value={q.status || "New"}
                                onChange={(e) => handleUpdateStatus("quotes", q.id, e.target.value)}
                                style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 800, background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, outline: "none" }}
                              >
                                <option value="New">New</option>
                                <option value="Reviewing">Reviewing</option>
                                <option value="Quoted">Quoted</option>
                                <option value="Negotiation">Negotiation</option>
                                <option value="Won">Won</option>
                                <option value="Lost">Lost</option>
                              </select>
                            </td>
                            <td style={{ padding: "12px 14px", textAlign: "right" }}>
                              <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                                <button onClick={() => setSelectedRecord({ ...q, typeLabel: "Quote Request" })} style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Eye size={13} />
                                </button>
                                <a href={`mailto:${q.email}?subject=RE: SOLVIX Quotation Proposal for ${encodeURIComponent(q.service || 'Software Project')}`} style={{ background: "rgba(37, 99, 235, 0.08)", color: "#2563EB", border: "1px solid rgba(37, 99, 235, 0.2)", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, textDecoration: "none" }}>
                                  <Mail size={13} />
                                </a>
                                <button onClick={() => setRecordToDelete({ type: "quotes", id: q.id, name: q.name })} style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#DC2626", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: CONSULTATIONS */}
            {/* ======================================================== */}
            {activeTab === "consultations" && (
              <div className="glass-card-static" style={{ padding: "24px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "16px" }}>Technical Consultations ({filterList(consultations).length})</h4>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "left", color: "#475569", fontWeight: 700 }}>
                        <th style={{ padding: "10px 14px" }}>Client Name</th>
                        <th style={{ padding: "10px 14px" }}>Meeting Type</th>
                        <th style={{ padding: "10px 14px" }}>Preferred Date & Time</th>
                        <th style={{ padding: "10px 14px" }}>Company</th>
                        <th style={{ padding: "10px 14px" }}>Status</th>
                        <th style={{ padding: "10px 14px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterList(consultations).map((c) => {
                        const badge = getStatusBadgeStyle(c.status);
                        return (
                          <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ fontWeight: 800, color: "#0F172A" }}>{c.name}</div>
                              <div style={{ fontSize: "0.76rem", color: "#64748B" }}>{c.email} &bull; {c.phone}</div>
                            </td>
                            <td style={{ padding: "12px 14px", fontWeight: 700, color: "#2563EB" }}>{c.meeting_type || c.meetingType || "Google Meet"}</td>
                            <td style={{ padding: "12px 14px", fontWeight: 700, color: "#7C3AED" }}>
                              {c.preferred_date || c.preferredDate} ({c.preferred_time || c.preferredTime})
                            </td>
                            <td style={{ padding: "12px 14px", color: "#64748B" }}>{c.company || "N/A"}</td>
                            <td style={{ padding: "12px 14px" }}>
                              <select
                                value={c.status || "Requested"}
                                onChange={(e) => handleUpdateStatus("consultations", c.id, e.target.value)}
                                style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 800, background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, outline: "none" }}
                              >
                                <option value="Requested">Requested</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td style={{ padding: "12px 14px", textAlign: "right" }}>
                              <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                                <button onClick={() => setSelectedRecord({ ...c, typeLabel: "Technical Consultation" })} style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Eye size={13} />
                                </button>
                                <a href={`mailto:${c.email}?subject=RE: SOLVIX Consultation Session Confirmation`} style={{ background: "rgba(37, 99, 235, 0.08)", color: "#2563EB", border: "1px solid rgba(37, 99, 235, 0.2)", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, textDecoration: "none" }}>
                                  <Mail size={13} />
                                </a>
                                <button onClick={() => setRecordToDelete({ type: "consultations", id: c.id, name: c.name })} style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#DC2626", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: AI LEADS */}
            {/* ======================================================== */}
            {activeTab === "ai_leads" && (
              <div className="glass-card-static" style={{ padding: "24px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>AI Chatbot Leads ({filterList(aiLeads).length})</h4>
                    <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>Enquiries generated via SOLVIX AI Project Consultant chatbot assistant.</p>
                  </div>
                  <span style={{ padding: "4px 12px", borderRadius: "var(--radius-full)", background: "rgba(124, 58, 237, 0.1)", color: "#7C3AED", fontWeight: 800, fontSize: "0.76rem", border: "1px solid rgba(124, 58, 237, 0.2)" }}>
                    Source: SOLVIX AI Chatbot
                  </span>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "left", color: "#475569", fontWeight: 700 }}>
                        <th style={{ padding: "10px 14px" }}>Customer Name</th>
                        <th style={{ padding: "10px 14px" }}>Project Category</th>
                        <th style={{ padding: "10px 14px" }}>Estimated Price</th>
                        <th style={{ padding: "10px 14px" }}>Summary</th>
                        <th style={{ padding: "10px 14px" }}>Date</th>
                        <th style={{ padding: "10px 14px" }}>Status</th>
                        <th style={{ padding: "10px 14px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterList(aiLeads).map((a) => {
                        const badge = getStatusBadgeStyle(a.status);
                        return (
                          <tr key={a.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ fontWeight: 800, color: "#0F172A" }}>{a.name}</div>
                              <div style={{ fontSize: "0.76rem", color: "#64748B" }}>{a.email} &bull; {a.phone}</div>
                            </td>
                            <td style={{ padding: "12px 14px", fontWeight: 700, color: "#7C3AED" }}>{a.category || a.service || "AI Discovery"}</td>
                            <td style={{ padding: "12px 14px", fontWeight: 700, color: "#2563EB" }}>{a.estimated_price || a.budget || "Custom Quote"}</td>
                            <td style={{ padding: "12px 14px", color: "#475569", maxWidth: "240px" }}>
                              {a.description || "Inquired via SOLVIX AI Chatbot Assistant"}
                            </td>
                            <td style={{ padding: "12px 14px", color: "#64748B", fontSize: "0.8rem" }}>{new Date(a.created_at).toLocaleString()}</td>
                            <td style={{ padding: "12px 14px" }}>
                              <select
                                value={a.status || "New"}
                                onChange={(e) => handleUpdateStatus("quotes", a.id, e.target.value)}
                                style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 800, background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, outline: "none" }}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Discussion">In Discussion</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td style={{ padding: "12px 14px", textAlign: "right" }}>
                              <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                                <button onClick={() => setSelectedRecord({ ...a, typeLabel: "AI Chatbot Lead" })} style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Eye size={13} />
                                </button>
                                <a href={`mailto:${a.email}?subject=RE: SOLVIX AI Project Enquiry Followup`} style={{ background: "rgba(37, 99, 235, 0.08)", color: "#2563EB", border: "1px solid rgba(37, 99, 235, 0.2)", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, textDecoration: "none" }}>
                                  <Mail size={13} />
                                </a>
                                <button onClick={() => setRecordToDelete({ type: "quotes", id: a.id, name: a.name })} style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#DC2626", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 6: NEWSLETTER SUBSCRIBERS */}
            {/* ======================================================== */}
            {activeTab === "subscribers" && (
              <div className="glass-card-static" style={{ padding: "24px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "16px" }}>Newsletter Subscribers ({filterList(subscribers).length})</h4>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "left", color: "#475569", fontWeight: 700 }}>
                        <th style={{ padding: "10px 14px" }}>Subscriber Email</th>
                        <th style={{ padding: "10px 14px" }}>Subscribed At</th>
                        <th style={{ padding: "10px 14px" }}>Status</th>
                        <th style={{ padding: "10px 14px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterList(subscribers).map((s) => (
                        <tr key={s.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                          <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0F172A" }}>{s.email}</td>
                          <td style={{ padding: "12px 14px", color: "#64748B", fontSize: "0.8rem" }}>{new Date(s.created_at).toLocaleString()}</td>
                          <td style={{ padding: "12px 14px" }}>
                            <span style={{ padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: "0.74rem", fontWeight: 800, background: "rgba(16, 185, 129, 0.1)", color: "#10B981", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                              {s.status || "Active"}
                            </span>
                          </td>
                          <td style={{ padding: "12px 14px", textAlign: "right" }}>
                            <button onClick={() => setRecordToDelete({ type: "subscribers", id: s.id, name: s.email })} style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#DC2626", padding: "5px 10px", borderRadius: "6px", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer" }}>
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 7: REPORTS / EXPORT */}
            {/* ======================================================== */}
            {activeTab === "reports" && (
              <div className="glass-card-static" style={{ padding: "32px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", marginBottom: "8px" }}>CSV Data Exporter</h4>
                <p style={{ color: "#64748B", fontSize: "0.9rem", marginBottom: "28px" }}>Export live business data to CSV for offline analysis, accounting, or CRM imports.</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "var(--radius-lg)", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, color: "#0F172A", fontSize: "1.05rem" }}>
                        <MessageSquare size={18} style={{ color: "#2563EB" }} />
                        <span>Contact Enquiries</span>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "6px" }}>Export all website contact submissions ({messages.length} total records).</p>
                    </div>
                    <button onClick={() => exportToCSV("Contacts", messages)} className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                      <Download size={14} /> Download CSV
                    </button>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "var(--radius-lg)", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, color: "#0F172A", fontSize: "1.05rem" }}>
                        <FileText size={18} style={{ color: "#7C3AED" }} />
                        <span>Quote Requests</span>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "6px" }}>Export project quotation requests ({quotes.length} total records).</p>
                    </div>
                    <button onClick={() => exportToCSV("Quotes", quotes)} className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                      <Download size={14} /> Download CSV
                    </button>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "var(--radius-lg)", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, color: "#0F172A", fontSize: "1.05rem" }}>
                        <Calendar size={18} style={{ color: "#F59E0B" }} />
                        <span>Consultations</span>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "6px" }}>Export technical consultation bookings ({consultations.length} total records).</p>
                    </div>
                    <button onClick={() => exportToCSV("Consultations", consultations)} className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                      <Download size={14} /> Download CSV
                    </button>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "var(--radius-lg)", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, color: "#0F172A", fontSize: "1.05rem" }}>
                        <Bot size={18} style={{ color: "#10B981" }} />
                        <span>AI Chatbot Leads</span>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "6px" }}>Export lead submissions from AI Chatbot ({aiLeads.length} total records).</p>
                    </div>
                    <button onClick={() => exportToCSV("AI_Leads", aiLeads)} className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                      <Download size={14} /> Download CSV
                    </button>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "var(--radius-lg)", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, color: "#0F172A", fontSize: "1.05rem" }}>
                        <Mail size={18} style={{ color: "#0284C7" }} />
                        <span>Subscribers</span>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "6px" }}>Export newsletter subscriber emails ({subscribers.length} total records).</p>
                    </div>
                    <button onClick={() => exportToCSV("Subscribers", subscribers)} className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                      <Download size={14} /> Download CSV
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 8: ACTIVITY LOG (AUDIT TRAIL) */}
            {/* ======================================================== */}
            {activeTab === "activity_logs" && (
              <div className="glass-card-static" style={{ padding: "24px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>System Audit Trail ({auditLogs.length})</h4>
                    <p style={{ fontSize: "0.82rem", color: "#64748B", margin: 0 }}>Real-time audit logging of status updates, deletions, and admin activity.</p>
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#10B981" }}>🔒 Audit Protection Active</span>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84rem" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", textAlign: "left", color: "#475569", fontWeight: 700 }}>
                        <th style={{ padding: "10px 14px" }}>Timestamp</th>
                        <th style={{ padding: "10px 14px" }}>Admin</th>
                        <th style={{ padding: "10px 14px" }}>Action</th>
                        <th style={{ padding: "10px 14px" }}>Target Record</th>
                        <th style={{ padding: "10px 14px" }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "#64748B" }}>
                            No audit log actions recorded yet. Admin operations (status changes, deletions) will appear here in real-time.
                          </td>
                        </tr>
                      ) : (
                        auditLogs.map((log) => (
                          <tr key={log.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "12px 14px", color: "#64748B" }}>{new Date(log.timestamp).toLocaleString()}</td>
                            <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0F172A" }}>{log.admin_username || "admin"}</td>
                            <td style={{ padding: "12px 14px" }}>
                              <span style={{ padding: "3px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 800, background: log.action === "DELETE_RECORD" ? "rgba(239, 68, 68, 0.1)" : "rgba(37, 99, 235, 0.1)", color: log.action === "DELETE_RECORD" ? "#DC2626" : "#2563EB" }}>
                                {log.action}
                              </span>
                            </td>
                            <td style={{ padding: "12px 14px", fontWeight: 700, color: "#475569" }}>{log.record_type} ({log.record_id})</td>
                            <td style={{ padding: "12px 14px", color: "#0F172A" }}>{log.details}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 9: EMAIL STATUS DIAGNOSTICS */}
            {/* ======================================================== */}
            {activeTab === "email_status" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="glass-card-static" style={{ padding: "28px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: emailStatus.connected ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Send size={22} style={{ color: emailStatus.connected ? "#10B981" : "#F59E0B" }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>Resend Email API Engine Status</h4>
                      <p style={{ fontSize: "0.84rem", color: "#64748B", margin: 0 }}>{emailStatus.statusMessage}</p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "16px", borderRadius: "12px" }}>
                      <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Connection Status</div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: emailStatus.connected ? "#10B981" : "#DC2626", marginTop: "4px" }}>
                        {emailStatus.connected ? "Connected & Active" : "Unconfigured / Missing Key"}
                      </div>
                    </div>

                    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "16px", borderRadius: "12px" }}>
                      <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Configured Team Notification Email</div>
                      <div style={{ fontSize: "0.94rem", fontWeight: 800, color: "#2563EB", marginTop: "4px" }}>
                        {emailStatus.configuredNotificationEmail}
                      </div>
                    </div>

                    <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "16px", borderRadius: "12px" }}>
                      <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Configured Sender Email Header</div>
                      <div style={{ fontSize: "0.86rem", fontWeight: 700, color: "#0F172A", marginTop: "4px" }}>
                        {emailStatus.fromEmail}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card-static" style={{ padding: "20px", background: "rgba(37, 99, 235, 0.04)", border: "1px solid rgba(37, 99, 235, 0.2)", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, color: "#2563EB", fontSize: "0.92rem", marginBottom: "6px" }}>
                    <ShieldCheck size={18} />
                    <span>Security Notice & Secret Masking</span>
                  </div>
                  <p style={{ fontSize: "0.84rem", color: "#475569", margin: 0, lineHeight: 1.55 }}>
                    For security reasons, raw environment secrets (<code>RESEND_API_KEY</code>, <code>JWT_SECRET</code>, <code>OPENAI_API_KEY</code>, <code>SUPABASE_SERVICE_ROLE_KEY</code>) are strictly hidden and never exposed to the frontend.
                  </p>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 10: SETTINGS */}
            {/* ======================================================== */}
            {activeTab === "settings" && (
              <div className="glass-card-static" style={{ padding: "32px", background: "#FFFFFF", borderRadius: "var(--radius-xl)" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", marginBottom: "8px" }}>System Configuration & Environment Health</h4>
                <p style={{ color: "#64748B", fontSize: "0.9rem", marginBottom: "28px" }}>Read-only operational status of backend services and database connections.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Database size={20} style={{ color: "#2563EB" }} />
                      <div>
                        <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.94rem" }}>Database Provider</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Supabase PostgreSQL with Local JSON Fallback (`server/data/db.json`)</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#10B981", background: "rgba(16, 185, 129, 0.1)", padding: "4px 12px", borderRadius: "var(--radius-full)" }}>ACTIVE</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Lock size={20} style={{ color: "#7C3AED" }} />
                      <div>
                        <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.94rem" }}>Admin Security & Token Manager</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748B" }}>JWT Authentication (Bearer Header) &bull; Token Expiration 24 Hours</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#10B981", background: "rgba(16, 185, 129, 0.1)", padding: "4px 12px", borderRadius: "var(--radius-full)" }}>PROTECTED</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Send size={20} style={{ color: "#10B981" }} />
                      <div>
                        <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.94rem" }}>Email Dispatch Engine</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Resend Email API with Automatic Rate Limit Spacing & Retries</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#10B981", background: "rgba(16, 185, 129, 0.1)", padding: "4px 12px", borderRadius: "var(--radius-full)" }}>CONFIGURED</span>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 11: ADMIN PROFILE */}
            {/* ======================================================== */}
            {activeTab === "profile" && (
              <div className="glass-card-static" style={{ padding: "32px", background: "#FFFFFF", borderRadius: "var(--radius-xl)", maxWidth: "600px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: "1.8rem", fontWeight: 900 }}>
                    A
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>System Administrator</h4>
                    <p style={{ fontSize: "0.86rem", color: "#64748B", margin: 0 }}>SOLVIX Software Solutions Lead Operations</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
                    <span style={{ color: "#64748B", fontWeight: 600 }}>Username:</span>
                    <span style={{ fontWeight: 800, color: "#0F172A" }}>admin</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
                    <span style={{ color: "#64748B", fontWeight: 600 }}>Access Scope:</span>
                    <span style={{ fontWeight: 800, color: "#2563EB" }}>Full Administrative Privileges</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F1F5F9" }}>
                    <span style={{ color: "#64748B", fontWeight: 600 }}>Session Auth Token:</span>
                    <span style={{ fontWeight: 700, color: "#10B981" }}>JWT Bearer Issued</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RECORD DETAIL DRAWER / MODAL */}
      {/* ======================================================== */}
      {selectedRecord && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: "rgba(15, 23, 42, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#FFFFFF",
              borderRadius: "var(--radius-xl)",
              padding: "28px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #E2E8F0", paddingBottom: "14px" }}>
              <div>
                <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>{selectedRecord.typeLabel || "Enquiry Detail"}</span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>{selectedRecord.name}</h3>
              </div>
              <button onClick={() => setSelectedRecord(null)} style={{ background: "#F1F5F9", border: "none", padding: "8px", borderRadius: "50%", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Email Address</div>
                  <a href={`mailto:${selectedRecord.email}`} style={{ fontWeight: 800, color: "#2563EB", textDecoration: "none" }}>{selectedRecord.email}</a>
                </div>
                <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Phone Number</div>
                  <div style={{ fontWeight: 800, color: "#0F172A" }}>{selectedRecord.phone || "N/A"}</div>
                </div>
              </div>

              {selectedRecord.company && (
                <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Company Name</div>
                  <div style={{ fontWeight: 800, color: "#0F172A" }}>{selectedRecord.company}</div>
                </div>
              )}

              {(selectedRecord.service || selectedRecord.category) && (
                <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Requested Service / Category</div>
                  <div style={{ fontWeight: 800, color: "#7C3AED" }}>{selectedRecord.service || selectedRecord.category}</div>
                </div>
              )}

              {(selectedRecord.budget || selectedRecord.estimated_price) && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Budget Range</div>
                    <div style={{ fontWeight: 800, color: "#10B981" }}>{selectedRecord.budget || selectedRecord.estimated_price}</div>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Timeline</div>
                    <div style={{ fontWeight: 800, color: "#0284C7" }}>{selectedRecord.timeline || selectedRecord.expectedTimeline || "N/A"}</div>
                  </div>
                </div>
              )}

              {selectedRecord.meeting_type && (
                <div style={{ background: "#F8FAFC", padding: "10px 14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700 }}>Meeting Schedule</div>
                  <div style={{ fontWeight: 800, color: "#0F172A" }}>{selectedRecord.meeting_type} on {selectedRecord.preferred_date} ({selectedRecord.preferred_time})</div>
                </div>
              )}

              <div style={{ background: "#F8FAFC", padding: "14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, marginBottom: "4px" }}>Project Requirements / Description</div>
                <div style={{ color: "#0F172A", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {selectedRecord.description || selectedRecord.message || "No additional description provided."}
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <a
                href={`mailto:${selectedRecord.email}?subject=RE: SOLVIX Software Solutions Enquiry`}
                className="btn-primary btn-sm"
                style={{ textDecoration: "none" }}
              >
                <Mail size={14} /> Send Email Response
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* ======================================================== */}
      {recordToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100001,
            background: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div style={{ width: "100%", maxWidth: "440px", background: "#FFFFFF", borderRadius: "var(--radius-xl)", padding: "24px", border: "1px solid #E2E8F0", textAlign: "center" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.12)", color: "#DC2626", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
              <Trash2 size={26} />
            </div>
            <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>Confirm Permanent Deletion</h4>
            <p style={{ fontSize: "0.86rem", color: "#64748B", marginTop: "8px", marginBottom: "20px" }}>
              Are you sure you want to delete the record for <strong>{recordToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button onClick={() => setRecordToDelete(null)} style={{ padding: "9px 18px", borderRadius: "8px", border: "1px solid #E2E8F0", background: "#FFFFFF", color: "#475569", fontWeight: 700, cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={confirmDeleteRecord} style={{ padding: "9px 18px", borderRadius: "8px", border: "none", background: "#DC2626", color: "#FFFFFF", fontWeight: 800, cursor: "pointer" }}>
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
