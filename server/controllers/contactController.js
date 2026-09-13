const supabase = require("../config/supabase");
const emailService = require("../services/emailService");

const submitContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      message
    } = req.body;

    console.log("=================================");
    console.log("========== CONTACT REQUEST ==========");
    console.log(req.body);
    console.log("=================================");

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    // 1. Insert into Supabase / Database FIRST
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          phone,
          company: company || "",
          message,
          status: "New",
        },
      ])
      .select();

    if (error) {
      console.error("SUPABASE CONTACT INSERT ERROR:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to save contact enquiry."
      });
    }

    console.log("Contact Record Saved to Database Successfully:", data);

    // 2. Dispatch Email Notifications using Centralized Email Service
    const contactPayload = {
      name,
      email,
      phone,
      company,
      message
    };

    try {
      await emailService.dispatchDualEmails(
        emailService.sendContactConfirmation,
        emailService.sendContactNotification,
        contactPayload
      );
    } catch (emailErr) {
      console.error("EMAIL_NOTIFICATION_FAILED for Contact Enquiry:", emailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "Contact enquiry submitted successfully.",
      data,
    });

  } catch (err) {
    console.error("CONTACT CONTROLLER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error."
    });
  }
};

module.exports = {
  submitContact
};