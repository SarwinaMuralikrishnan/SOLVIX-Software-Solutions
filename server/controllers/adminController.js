const supabase = require("../config/supabase");

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
// GET ALL ENQUIRIES & DATA
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

    res.json({
      success: true,
      contacts: contacts || [],
      consultations: consultations || [],
      quotes: quotes || [],
      messages: contacts || [], // alias for backwards compatibility
      subscribers: subscribers || []
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