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
  Inbox,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  LogOut,
  Filter,
  User,
  Eye,
} from "lucide-react";

import { api } from "../../services/api";
import { dbService } from "../../services/db";

export default function AdminPanelModal({ onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [consultations, setConsultations] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // -----------------------------
  // Load all enquiries from API
  // -----------------------------
  const fetchEnquiries = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await api.getAdminEnquiries();

      setConsultations(data.consultations || []);
      setQuotes(data.quotes || []);
      setMessages(data.contacts || data.messages || []);
      setSubscribers(data.subscribers || []);

    } catch (err) {
      setErrorMsg(
        err.message || "Unable to connect to backend server. Please verify Express server status."
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // -----------------------------
  // Statistics
  // -----------------------------
  const unreadQuotes = quotes.filter((q) => q.status === "New").length;
  const unreadConsultations = consultations.filter((c) => c.status === "New").length;
  const unreadMessages = messages.filter((m) => m.status === "New").length;

  // -----------------------------
  // Sidebar Tabs
  // -----------------------------
  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "quotes",
      label: "Quote Requests",
      icon: FileText,
      badge: quotes.length,
      unread: unreadQuotes,
      type: "quotes"
    },
    {
      id: "consultations",
      label: "Consultations",
      icon: Calendar,
      badge: consultations.length,
      unread: unreadConsultations,
      type: "consultations"
    },
    {
      id: "messages",
      label: "Contact Enquiries",
      icon: MessageSquare,
      badge: messages.length,
      unread: unreadMessages,
      type: "contacts"
    },
    {
      id: "subscribers",
      label: "Subscribers",
      icon: Mail,
      badge: subscribers.length,
      type: "subscribers"
    },
  ];

  // -----------------------------
  // Update Status
  // -----------------------------
  const handleUpdateStatus = async (type, id, status) => {
    try {
      await api.updateStatus(type, id, status);
      fetchEnquiries();
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  // -----------------------------
  // Delete Record
  // -----------------------------
  const handleDeleteRecord = async (type, id) => {
    if (!window.confirm("Are you sure you want to permanently delete this record?")) {
      return;
    }

    try {
      await api.deleteEnquiry(type, id);
      fetchEnquiries();
    } catch (err) {
      alert("Error deleting record: " + err.message);
    }
  };

  // -----------------------------
  // Search & Status Filter
  // -----------------------------
  const filterItems = (list) => {
    if (!list) return [];
    return list.filter((item) => {
      const matchesSearch = JSON.stringify(item)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter ||
        (!item.status && statusFilter === "All");

      return matchesSearch && matchesStatus;
    });
  };

  // -----------------------------
  // CSV Export for Current API Data
  // -----------------------------
  const handleExportCSV = (filename, dataArray) => {
    if (!dataArray || dataArray.length === 0) {
      alert("No records available to export.");
      return;
    }
    dbService.exportToCSV(filename, dataArray);
  };

  const getStatusBadge = (status = "New") => {
    const map = {
      New: { bg: "#FEF2F2", text: "#DC2626", border: "#FCA5A5" },
      Contacted: { bg: "#EFF6FF", text: "#2563EB", border: "#93C5FD" },
      "In Progress": { bg: "#FFFBEB", text: "#D97706", border: "#FCD34D" },
      Completed: { bg: "#ECFDF5", text: "#059669", border: "#6EE7B7" },
      Active: { bg: "#ECFDF5", text: "#059669", border: "#6EE7B7" },
    };
    const style = map[status] || map.New;
    return (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "9999px",
          fontSize: "0.76rem",
          fontWeight: 700,
          background: style.bg,
          color: style.text,
          border: `1px solid ${style.border}`,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20000,
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          height: "92vh",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "var(--radius-xl)",
          boxShadow: "0 25px 60px rgba(15, 23, 42, 0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Bar Header */}
        <div
          style={{
            padding: "16px 24px",
            background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/solvix-logo.png" alt="SOLVIX Logo" style={{ height: "32px" }} />
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#FFFFFF" }}>
                SOLVIX Master Admin Dashboard
              </h3>
              <p style={{ fontSize: "0.78rem", opacity: 0.8, margin: 0 }}>
                Live Database Management & Founder Alert Portal
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={fetchEnquiries}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <RefreshCw size={14} className={loading ? "spin" : ""} />
              <span>Refresh</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  color: "#FECACA",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#FFFFFF",
                padding: "8px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Dashboard Main Area */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar Tabs */}
          <div
            style={{
              width: "240px",
              background: "#F8FAFC",
              borderRight: "1px solid #E2E8F0",
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", paddingLeft: "8px", marginBottom: "4px" }}>
              Navigation Menu
            </div>
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "none",
                    background: isActive ? "#2563EB" : "transparent",
                    color: isActive ? "#FFFFFF" : "#475569",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 700 : 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <TabIcon size={16} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      style={{
                        padding: "2px 7px",
                        borderRadius: "9999px",
                        background: isActive ? "rgba(255,255,255,0.25)" : "#E2E8F0",
                        color: isActive ? "#FFFFFF" : "#0F172A",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div style={{ marginTop: "auto", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "10px", padding: "12px", fontSize: "0.78rem", color: "#1E40AF" }}>
              <strong>Founder Alert System</strong><br />
              Notifications dispatched live to sarwinamuralikrishnan07feb@gmail.com & subetha076@gmail.com
            </div>
          </div>

          {/* Content Body */}
          <div style={{ flex: 1, padding: "24px", overflowY: "auto", background: "#FFFFFF" }}>
            {errorMsg && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#DC2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem" }}>
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* TAB 1: OVERVIEW DASHBOARD */}
            {activeTab === "dashboard" && (
              <div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", marginBottom: "18px" }}>
                  System Overview Statistics
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px" }}>
                    <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 800, textTransform: "uppercase" }}>Quote Requests</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#2563EB", marginTop: "4px" }}>{quotes.length}</div>
                    <div style={{ fontSize: "0.8rem", color: "#DC2626", fontWeight: 700, marginTop: "2px" }}>{unreadQuotes} New</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px" }}>
                    <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 800, textTransform: "uppercase" }}>Consultations</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#7C3AED", marginTop: "4px" }}>{consultations.length}</div>
                    <div style={{ fontSize: "0.8rem", color: "#DC2626", fontWeight: 700, marginTop: "2px" }}>{unreadConsultations} New</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px" }}>
                    <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 800, textTransform: "uppercase" }}>Contact Messages</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0284C7", marginTop: "4px" }}>{messages.length}</div>
                    <div style={{ fontSize: "0.8rem", color: "#DC2626", fontWeight: 700, marginTop: "2px" }}>{unreadMessages} New</div>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px" }}>
                    <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 800, textTransform: "uppercase" }}>Subscribers</div>
                    <div style={{ fontSize: "2rem", fontWeight: 900, color: "#059669", marginTop: "4px" }}>{subscribers.length}</div>
                    <div style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, marginTop: "2px" }}>Active Subscribers</div>
                  </div>
                </div>

                <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "20px" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "12px" }}>Recent Enquiries Stream</h4>
                  {quotes.length === 0 && consultations.length === 0 && messages.length === 0 ? (
                    <div style={{ color: "#64748B", fontSize: "0.88rem", textAlign: "center", padding: "20px" }}>
                      No submission entries recorded yet. Submissions from the website will automatically populate here.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[...quotes, ...consultations, ...messages].slice(0, 5).map((item, idx) => (
                        <div key={item.id || idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "0.86rem" }}>
                          <div>
                            <strong>{item.name}</strong> ({item.email}) &bull; <span style={{ color: "#64748B" }}>{item.service || item.meeting_type || "Contact Message"}</span>
                          </div>
                          <div>{getStatusBadge(item.status)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2, 3, 4, 5: LIST TABLES */}
            {activeTab !== "dashboard" && (
              <div>
                {/* Search & Action Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flex: 1 }}>
                    <div style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
                      <Search size={16} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748B" }} />
                      <input
                        type="text"
                        placeholder="Search records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: "100%", padding: "8px 12px 8px 32px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.86rem", outline: "none" }}
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.86rem", outline: "none" }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      const currentTabObj = tabs.find((t) => t.id === activeTab);
                      const currentList =
                        activeTab === "quotes" ? quotes :
                        activeTab === "consultations" ? consultations :
                        activeTab === "messages" ? messages : subscribers;
                      handleExportCSV(`SOLVIX_${activeTab}`, filterItems(currentList));
                    }}
                    style={{
                      background: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      color: "#0F172A",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </div>

                {/* Table Rendering */}
                {(() => {
                  const currentTabObj = tabs.find((t) => t.id === activeTab);
                  const currentList =
                    activeTab === "quotes" ? quotes :
                    activeTab === "consultations" ? consultations :
                    activeTab === "messages" ? messages : subscribers;
                  const filtered = filterItems(currentList);

                  if (filtered.length === 0) {
                    return (
                      <div style={{ textAlign: "center", padding: "50px 20px" }}>
                        <Inbox size={36} style={{ color: "#94A3B8", marginBottom: "10px" }} />
                        <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0" }}>No Records Found</h4>
                        <p style={{ color: "#64748B", fontSize: "0.88rem" }}>No matching records under current search/filters.</p>
                      </div>
                    );
                  }

                  return (
                    <div style={{ border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
                        <thead>
                          <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontSize: "0.76rem", textTransform: "uppercase" }}>
                            <th style={{ padding: "12px 14px" }}>Date</th>
                            {activeTab !== "subscribers" && <th style={{ padding: "12px 14px" }}>Customer</th>}
                            <th style={{ padding: "12px 14px" }}>Email / Contact</th>
                            {activeTab === "quotes" && <th style={{ padding: "12px 14px" }}>Service / Budget</th>}
                            {activeTab === "consultations" && <th style={{ padding: "12px 14px" }}>Meeting Date/Time</th>}
                            {activeTab === "messages" && <th style={{ padding: "12px 14px" }}>Message</th>}
                            <th style={{ padding: "12px 14px" }}>Status</th>
                            <th style={{ padding: "12px 14px", textAlign: "right" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((item) => (
                            <tr key={item.id} style={{ borderBottom: "1px solid #E2E8F0" }}>
                              <td style={{ padding: "12px 14px", color: "#64748B", whiteSpace: "nowrap" }}>
                                {item.created_at ? new Date(item.created_at).toLocaleDateString() : item.createdAt || "N/A"}
                              </td>

                              {activeTab !== "subscribers" && (
                                <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0F172A" }}>
                                  {item.name || "N/A"}<br />
                                  <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 400 }}>{item.company || ""}</span>
                                </td>
                              )}

                              <td style={{ padding: "12px 14px" }}>
                                <strong>{item.email}</strong><br />
                                <span style={{ fontSize: "0.78rem", color: "#64748B" }}>{item.phone || ""}</span>
                              </td>

                              {activeTab === "quotes" && (
                                <td style={{ padding: "12px 14px" }}>
                                  <strong>{item.service}</strong><br />
                                  <span style={{ fontSize: "0.78rem", color: "#2563EB", fontWeight: 700 }}>{item.budget} &bull; {item.timeline}</span>
                                </td>
                              )}

                              {activeTab === "consultations" && (
                                <td style={{ padding: "12px 14px" }}>
                                  <strong>{item.meeting_type || item.meetingType}</strong><br />
                                  <span style={{ fontSize: "0.78rem", color: "#7C3AED", fontWeight: 700 }}>{item.preferred_date || item.preferredDate} @ {item.preferred_time || item.preferredTime}</span>
                                </td>
                              )}

                              {activeTab === "messages" && (
                                <td style={{ padding: "12px 14px", maxWidth: "250px" }}>
                                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#475569" }}>
                                    {item.message}
                                  </div>
                                </td>
                              )}

                              <td style={{ padding: "12px 14px" }}>
                                <select
                                  value={item.status || "New"}
                                  onChange={(e) => handleUpdateStatus(currentTabObj.type, item.id, e.target.value)}
                                  style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "0.78rem", fontWeight: 700, outline: "none" }}
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>

                              <td style={{ padding: "12px 14px", textAlign: "right" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                                  <button
                                    onClick={() => setSelectedRecord({ ...item, recordType: currentTabObj.label })}
                                    style={{
                                      background: "#EFF6FF",
                                      border: "1px solid #BFDBFE",
                                      color: "#2563EB",
                                      padding: "6px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                    }}
                                    title="View Full Details"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRecord(currentTabObj.type, item.id)}
                                    style={{
                                      background: "#FEF2F2",
                                      border: "1px solid #FCA5A5",
                                      color: "#DC2626",
                                      padding: "6px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                    }}
                                    title="Delete Record"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Record Detail Modal Overlay */}
      {selectedRecord && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 25000,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #E2E8F0", pb: "14px" }}>
              <div>
                <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>{selectedRecord.recordType}</span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", margin: "2px 0 0 0" }}>{selectedRecord.name || selectedRecord.email}</h3>
              </div>
              <button onClick={() => setSelectedRecord(null)} style={{ background: "#F1F5F9", border: "none", padding: "6px", borderRadius: "50%", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.9rem" }}>
              {selectedRecord.id && <div><strong>Record ID:</strong> <span style={{ fontFamily: "monospace", color: "#2563EB" }}>{selectedRecord.id}</span></div>}
              {selectedRecord.created_at && <div><strong>Date Submitted:</strong> {new Date(selectedRecord.created_at).toLocaleString()}</div>}
              {selectedRecord.email && <div><strong>Email:</strong> <a href={`mailto:${selectedRecord.email}`} style={{ color: "#2563EB" }}>{selectedRecord.email}</a></div>}
              {selectedRecord.phone && <div><strong>Phone:</strong> <a href={`tel:${selectedRecord.phone}`} style={{ color: "#2563EB" }}>{selectedRecord.phone}</a></div>}
              {selectedRecord.company && <div><strong>Company:</strong> {selectedRecord.company}</div>}
              {selectedRecord.service && <div><strong>Service Required:</strong> {selectedRecord.service}</div>}
              {selectedRecord.budget && <div><strong>Budget Range:</strong> {selectedRecord.budget}</div>}
              {selectedRecord.timeline && <div><strong>Expected Timeline:</strong> {selectedRecord.timeline}</div>}
              {selectedRecord.meeting_type && <div><strong>Meeting Type:</strong> {selectedRecord.meeting_type}</div>}
              {(selectedRecord.preferred_date || selectedRecord.preferred_time) && <div><strong>Preferred Schedule:</strong> {selectedRecord.preferred_date} @ {selectedRecord.preferred_time}</div>}
              
              <div style={{ marginTop: "10px", background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "16px", borderRadius: "10px" }}>
                <strong style={{ display: "block", marginBottom: "6px", color: "#0F172A" }}>Requirement / Message Details:</strong>
                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6, whitespace: "pre-wrap" }}>
                  {selectedRecord.description || selectedRecord.message || "No additional text provided."}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "24px", textAlign: "right" }}>
              <button onClick={() => setSelectedRecord(null)} className="btn-primary" style={{ padding: "8px 20px" }}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
