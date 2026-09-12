const { Resend } = require("resend");

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey && !apiKey.includes("your_resend") ? new Resend(apiKey) : null;

const sendEmail = async ({ to, subject, html }) => {
  const recipients = Array.isArray(to) ? to.join(", ") : to;

  console.log("==================================================");
  console.log("📧 DISPATCHING EMAIL");
  console.log("  To      :", recipients);
  console.log("  Subject :", subject);
  console.log("==================================================");

  if (!resend) {
    console.log("ℹ️ [EMAIL NOTICE] RESEND_API_KEY is missing or placeholder in server/.env.");
    console.log("ℹ️ To receive real emails in your inbox, set RESEND_API_KEY in server/.env.");
    return true;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "SOLVIX Software Solutions <contact@solvixsoftwaresolutions.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.log("❌ RESEND EMAIL ERROR:", error);
      console.log("💡 Tip: When using onboarding@resend.dev, Resend ONLY allows sending to the email registered on your Resend.com account.");
      return false;
    }

    console.log("✅ Email Delivered Successfully via Resend:", data);
    return true;
  } catch (err) {
    console.log("❌ EMAIL EXCEPTION:", err.message);
    return false;
  }
};

module.exports = {
  sendEmail,
};