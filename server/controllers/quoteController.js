const supabase = require("../config/supabase");
const emailService = require("../services/emailService");

exports.createQuote = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      category,
      service,
      projectType,
      budgetRange,
      budget,
      expectedTimeline,
      timeline,
      description,
      meetingMethod,
      requiredFeatures,
      fileName
    } = req.body;

    console.log("=================================");
    console.log("========== QUOTE REQUEST ==========");
    console.log(req.body);
    console.log("=================================");

    const selectedService = service || category || projectType;
    const selectedBudget = budget || budgetRange;
    const selectedTimeline = timeline || expectedTimeline;

    if (
      !name ||
      !email ||
      !phone ||
      !selectedService ||
      !selectedBudget ||
      !selectedTimeline ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    // 1. Insert into Supabase 'quotes' table FIRST
    const { data, error } = await supabase
      .from("quotes")
      .insert([
        {
          name,
          email,
          phone,
          company: company || "",
          service: selectedService,
          budget: selectedBudget,
          timeline: selectedTimeline,
          description,
          status: "New"
        }
      ])
      .select();

    if (error) {
      console.error("SUPABASE QUOTE INSERT ERROR:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to save quote request."
      });
    }

    console.log("Quote Inserted Successfully into Supabase:", data);

    // 2. Send dual email notifications via Centralized Email Service
    const quotePayload = {
      name,
      email,
      phone,
      company,
      category,
      service: selectedService,
      projectType: projectType || selectedService,
      budget: selectedBudget,
      timeline: selectedTimeline,
      description,
      meetingMethod,
      requiredFeatures,
      fileName
    };

    try {
      await emailService.dispatchDualEmails(
        emailService.sendQuoteConfirmation,
        emailService.sendQuoteNotification,
        quotePayload
      );
    } catch (emailErr) {
      console.error("EMAIL_NOTIFICATION_FAILED for Quote Request:", emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Quote request submitted successfully.",
      data: data ? data[0] : { id: "QTE-RECORDED" }
    });

  } catch (err) {
    console.error("QUOTE CONTROLLER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error."
    });
  }
};