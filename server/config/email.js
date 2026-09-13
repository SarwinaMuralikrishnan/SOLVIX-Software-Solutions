const { Resend } = require("resend");

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey && !apiKey.includes("your_resend") ? new Resend(apiKey) : null;

const sendEmail = async ({ to, subject, html, replyTo }) => {
  const recipients = Array.isArray(to) ? to.join(", ") : to;

  console.log("==================================================");
  console.log("📧 DISPATCHING EMAIL");
  console.log("  To       :", recipients);
  console.log("  Subject  :", subject);
  if (replyTo) console.log("  Reply-To :", replyTo);
  console.log("==================================================");

  if (!resend) {
    console.log("ℹ️ [EMAIL NOTICE] RESEND_API_KEY is missing or placeholder in server/.env.");
    console.log("ℹ️ To receive real emails in your inbox, set RESEND_API_KEY in server/.env.");
    return false;
  }

  try {
    const payload = {
      from: process.env.FROM_EMAIL || "SOLVIX Software Solutions <contact@solvixsoftwaresolutions.com>",
      to,
      subject,
      html,
    };

    if (replyTo) {
      payload.replyTo = replyTo;
    }

    const { data, error } = await resend.emails.send(payload);

    if (error) {
      console.error("EMAIL_NOTIFICATION_FAILED:", error.message || error);
      console.log("💡 Tip: When using onboarding@resend.dev or testing mode, Resend ONLY allows sending to your registered Resend account email.");
      return false;
    }

    console.log("✅ Email Delivered Successfully via Resend:", data);
    return true;
  } catch (err) {
    console.error("EMAIL_NOTIFICATION_FAILED Exception:", err.message);
    return false;
  }
};

module.exports = {
  sendEmail,
};