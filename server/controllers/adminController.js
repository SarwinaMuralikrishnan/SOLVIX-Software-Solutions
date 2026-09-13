const supabase = require("../config/supabase");
const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../data/db.json");

// Helper: Log Admin Action to Audit Logs
const logAuditAction = async (adminUsername, recordType, recordId, action, details) => {
  const logEntry = {
    id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    admin_username: adminUsername || "admin",
    record_type: recordType,
    record_id: recordId,
    action,
    details
  };

  try {
    // Attempt Supabase insert
    if (supabase) {
      try {
        await supabase.from("audit_logs").insert([logEntry]);
      } catch (sbErr) {
        // Ignored if table not created in Supabase yet
      }
    }

    // Persist in local JSON database
    if (fs.existsSync(DB_FILE)) {
      const currentDb = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      if (!currentDb.audit_logs) currentDb.audit_logs = [];
      currentDb.audit_logs.unshift(logEntry);
      // Keep last 200 audit logs
      if (currentDb.audit_logs.length > 200) {
        currentDb.audit_logs = currentDb.audit_logs.slice(0, 200);
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(currentDb, null, 2));
    }
  } catch (err) {
    console.error("Audit log recording error:", err.message);
  }
};

// ==============================
// GET CONTACTS
// ==============================
exports.getContacts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// GET CONSULTATIONS
// ==============================
exports.getConsultations = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// GET QUOTES
// ==============================
exports.getQuotes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// GET SUBSCRIBERS
// ==============================
exports.getSubscribers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==============================
// GET AUDIT LOGS
// ==============================
exports.getAuditLogs = async (req, res) => {
  try {
    let logs = [];
    if (fs.existsSync(DB_FILE)) {
      const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      logs = db.audit_logs || [];
    }
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==============================
// GET EMAIL SYSTEM DIAGNOSTICS
// ==============================
exports.getEmailStatus = async (req, res) => {
  try {
    const resendKeyConfigured = Boolean(
      process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.includes("your_resend") &&
      !process.env.RESEND_API_KEY.includes("your_actual_resend_key")
    );

    const emailStatus = {
      connected: resendKeyConfigured,
      statusMessage: resendKeyConfigured ? "Resend Integration Operational" : "Resend API Key Missing / Unconfigured",
      configuredNotificationEmail: process.env.NOTIFICATION_EMAIL || "contact@solvixsoftwaresolutions.com",
      fromEmail: process.env.FROM_EMAIL || "SOLVIX Software Solutions <contact@solvixsoftwaresolutions.com>",
      provider: "Resend Email API"
    };

    res.json({ success: true, emailStatus });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==============================
// GET ALL ENQUIRIES & DASHBOARD DATA
// ==============================
exports.getAllEnquiries = async (req, res) => {
  try {
    const { data: contacts } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: consultations } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: quotes } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    // Separate AI Leads from quotes (records with source === 'ai_chatbot' or description starting with '[AI Chatbot Lead]')
    const allQuotesList = quotes || [];
    const aiLeads = allQuotesList.filter(
      (q) => q.source === "ai_chatbot" || (q.description && q.description.includes("[AI Chatbot Lead]"))
    );
    const standardQuotes = allQuotesList.filter(
      (q) => q.source !== "ai_chatbot" && (!q.description || !q.description.includes("[AI Chatbot Lead]"))
    );

    // Read audit logs from local DB or Supabase
    let auditLogs = [];
    if (fs.existsSync(DB_FILE)) {
      const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      auditLogs = db.audit_logs || [];
    }

    const resendKeyConfigured = Boolean(
      process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.includes("your_resend") &&
      !process.env.RESEND_API_KEY.includes("your_actual_resend_key")
    );

    const emailStatus = {
      connected: resendKeyConfigured,
      statusMessage: resendKeyConfigured ? "Resend Integration Operational" : "Resend API Key Unconfigured",
      configuredNotificationEmail: process.env.NOTIFICATION_EMAIL || "contact@solvixsoftwaresolutions.com",
      fromEmail: process.env.FROM_EMAIL || "SOLVIX Software Solutions <contact@solvixsoftwaresolutions.com>",
      provider: "Resend Email API"
    };

    res.json({
      success: true,
      contacts: contacts || [],
      consultations: consultations || [],
      quotes: standardQuotes,
      allQuotes: allQuotesList,
      aiLeads: aiLeads,
      messages: contacts || [],
      subscribers: subscribers || [],
      auditLogs: auditLogs,
      emailStatus: emailStatus
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ==============================
// UPDATE STATUS
// ==============================
exports.updateStatus = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;

    const allowedTables = [
      "contacts",
      "consultations",
      "quotes",
      "subscribers"
    ];

    if (!allowedTables.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid table name specified."
      });
    }

    const { data, error } = await supabase
      .from(type)
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;

    // Log admin audit action
    const adminUser = req.admin?.username || "admin";
    await logAuditAction(adminUser, type, id, "STATUS_UPDATE", `Changed status of ${type} record (${id}) to '${status}'`);

    res.json({
      success: true,
      message: "Status updated successfully.",
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ==============================
// DELETE RECORD
// ==============================
exports.deleteRecord = async (req, res) => {
  try {
    const { type, id } = req.params;

    const allowedTables = [
      "contacts",
      "consultations",
      "quotes",
      "subscribers"
    ];

    if (!allowedTables.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid table name specified."
      });
    }

    const { error } = await supabase
      .from(type)
      .delete()
      .eq("id", id);

    if (error) throw error;

    // Log admin audit action
    const adminUser = req.admin?.username || "admin";
    await logAuditAction(adminUser, type, id, "DELETE_RECORD", `Permanently deleted record (${id}) from ${type}`);

    res.json({
      success: true,
      message: "Record deleted successfully."
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};