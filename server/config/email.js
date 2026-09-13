const { Resend } = require("resend");

const getResendInstance = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && !apiKey.includes("your_resend") && !apiKey.includes("your_actual_resend_key")) {
    return new Resend(apiKey);
  }
  return null;
};

// Helper: Sleep for ms
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendEmail = async ({ to, subject, html, replyTo }, retries = 2) => {
  const resend = getResendInstance();
  const recipients = Array.isArray(to) ? to.join(", ") : to;

  console.log("==================================================");
  console.log("📧 DISPATCHING EMAIL");
  console.log("  To       :", recipients);
  console.log("  Subject  :", subject);
  if (replyTo) console.log("  Reply-To :", replyTo);
  console.log("==================================================");

  if (!resend) {
    console.warn("⚠️ [EMAIL NOTICE] RESEND_API_KEY is missing or placeholder. Skipping email dispatch.");
    return { success: false, reason: "MISSING_OR_PLACEHOLDER_API_KEY" };
  }

  const fromAddress = process.env.FROM_EMAIL || "SOLVIX Software Solutions <contact@solvixsoftwaresolutions.com>";

  const payload = {
    from: fromAddress,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  };

  if (replyTo && typeof replyTo === "string" && replyTo.includes("@")) {
    payload.replyTo = replyTo;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { data, error } = await resend.emails.send(payload);

      if (error) {
        console.error(`❌ RESEND ERROR (Attempt ${attempt}/${retries}):`, JSON.stringify(error, null, 2));
        
        // If rate limited (statusCode 429), wait 800ms and retry
        if (error.statusCode === 429 && attempt < retries) {
          console.log(`⏳ Rate limit detected. Retrying in 800ms...`);
          await sleep(800);
          continue;
        }

        return { success: false, error };
      }

      console.log(`✅ Email Delivered Successfully via Resend (Attempt ${attempt}):`, data);
      return { success: true, data };
    } catch (err) {
      console.error(`❌ EXCEPTION DISPATCHING EMAIL (Attempt ${attempt}/${retries}):`, err.message);
      if (attempt < retries) {
        await sleep(800);
      } else {
        return { success: false, error: err.message };
      }
    }
  }

  return { success: false, reason: "MAX_RETRIES_EXCEEDED" };
};

module.exports = {
  sendEmail,
};