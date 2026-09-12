const supabase = require("../config/supabase");
const { sendEmail } = require("../config/email");
const { getNewsletterEmail } = require("../services/emailTemplates");

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    console.log("=================================");
    console.log("===== NEWSLETTER SUBSCRIPTION =====");
    console.log("Email:", cleanEmail);
    console.log("=================================");

    // Insert into Supabase 'subscribers' table
    const { data, error } = await supabase
      .from("subscribers")
      .insert([
        {
          email: cleanEmail,
          status: "Active"
        }
      ])
      .select();

    if (error) {
      // Handle unique constraint violation (duplicate subscription)
      if (error.code === "23505") {
        return res.status(200).json({
          success: true,
          message: "You are already subscribed to SOLVIX updates."
        });
      }

      console.log("SUPABASE ERROR:", error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    console.log("Subscriber Inserted Successfully:", data);

    // Send welcome email & founder notification
    const { customer, founder } = getNewsletterEmail(cleanEmail);
    await sendEmail(customer);
    await sendEmail(founder);

    return res.status(201).json({
      success: true,
      message: "Subscribed to SOLVIX newsletter successfully.",
      data
    });

  } catch (err) {
    console.log("NEWSLETTER CONTROLLER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
