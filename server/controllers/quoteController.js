const supabase = require("../config/supabase");
const { sendEmail } = require("../config/email");
const { getQuoteFounderEmail, getQuoteCustomerEmail } = require("../services/emailTemplates");

exports.createQuote = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      category,
      service,
      budgetRange,
      budget,
      expectedTimeline,
      timeline,
      description,
      meetingMethod,
      fileName
    } = req.body;

    console.log("=================================");
    console.log("========== QUOTE REQUEST ==========");
    console.log(req.body);
    console.log("=================================");

    const selectedService = service || category;
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

    // Insert into Supabase 'quotes' table
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
      console.log("SUPABASE ERROR:");
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    console.log("Quote Inserted Successfully into Supabase:", data);

    // Send dual email notifications via Resend
    const quotePayload = {
      name,
      email,
      phone,
      company,
      service: selectedService,
      budget: selectedBudget,
      timeline: selectedTimeline,
      description,
      meetingMethod,
      fileName
    };

    const customerMail = getQuoteCustomerEmail(quotePayload);
    const founderMail = getQuoteFounderEmail(quotePayload);

    await sendEmail(customerMail);
    await sendEmail(founderMail);

    return res.status(201).json({
      success: true,
      message: "Quote request submitted successfully. Email confirmation sent.",
      data: data ? data[0] : { id: "QTE-RECORDED" }
    });

  } catch (err) {
    console.log("QUOTE CONTROLLER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};