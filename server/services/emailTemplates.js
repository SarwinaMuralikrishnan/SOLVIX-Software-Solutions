// SOLVIX Professional Email Template Engine

// Helper: Escape HTML to sanitize user input against injection
const escapeHtml = (str) => {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Helper: Resolve Team Notification Email Recipient from Environment
const getNotificationEmailRecipient = () => {
  const envRecipient = process.env.NOTIFICATION_EMAIL;
  if (envRecipient && envRecipient.trim() !== "") {
    if (envRecipient.includes(",")) {
      return envRecipient.split(",").map(e => e.trim());
    }
    return envRecipient.trim();
  }
  return ["sarwinamuralikrishnan07feb@gmail.com", "subetha076@gmail.com"];
};

// Helper: Common HTML Header
const getEmailHeader = (title) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #0f172a; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); padding: 28px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 28px 24px; font-size: 15px; line-height: 1.6; }
    .badge { display: inline-block; padding: 4px 12px; background: #e0e7ff; color: #3730a3; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
    .field-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .field-row { margin-bottom: 10px; font-size: 14px; }
    .field-label { font-weight: 700; color: #475569; width: 150px; display: inline-block; }
    .field-value { color: #0f172a; font-weight: 600; }
    .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 13px; color: #64748B; border-top: 1px solid #e2e8f0; }
    .footer a { color: #2563eb; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SOLVIX Software Solutions</h1>
      <p>${escapeHtml(title)}</p>
    </div>
    <div class="content">
`;

// Helper: Common HTML Footer
const getEmailFooter = () => `
    </div>
    <div class="footer">
      <p><strong>SOLVIX Software Solutions</strong> &bull; Coimbatore, Tamil Nadu, India</p>
      <p>Official Website: <a href="https://www.solvixsoftwaresolutions.com" target="_blank">www.solvixsoftwaresolutions.com</a></p>
      <p>Serving clients across India and Worldwide | Mon &ndash; Sat: 9:00 AM &ndash; 6:00 PM IST</p>
    </div>
  </div>
</body>
</html>
`;

// 1. Contact Enquiry — Team Notification Email
const getContactFounderEmail = (data) => ({
  to: getNotificationEmailRecipient(),
  replyTo: data.email,
  subject: "New Contact Enquiry — SOLVIX",
  html: `
    ${getEmailHeader("New Contact Enquiry Received")}
    <span class="badge">Contact Form Enquiry</span>
    <p>A new customer has submitted a message via the SOLVIX contact form.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Customer Name:</span> <span class="field-value">${escapeHtml(data.name)}</span></div>
      <div class="field-row"><span class="field-label">Email Address:</span> <span class="field-value">${escapeHtml(data.email)}</span></div>
      <div class="field-row"><span class="field-label">Phone Number:</span> <span class="field-value">${escapeHtml(data.phone)}</span></div>
      <div class="field-row"><span class="field-label">Company Name:</span> <span class="field-value">${escapeHtml(data.company || "N/A")}</span></div>
      <div class="field-row"><span class="field-label">Submission Date:</span> <span class="field-value">${escapeHtml(new Date().toLocaleString())}</span></div>
    </div>
    <p><strong>Message / Requirements:</strong></p>
    <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 12px 16px; margin: 10px 0; font-style: italic;">
      ${escapeHtml(data.message).replace(/\n/g, '<br>')}
    </div>
    <p style="font-size: 13px; color: #64748b;"><em>Tip: Click "Reply" in your email client to respond directly to ${escapeHtml(data.name)} (${escapeHtml(data.email)}).</em></p>
    ${getEmailFooter()}
  `
});

// 2. Contact Enquiry — Customer Confirmation Email
const getContactCustomerEmail = (data) => ({
  to: data.email,
  subject: "We received your enquiry — SOLVIX Software Solutions",
  html: `
    ${getEmailHeader("Thank You for Contacting SOLVIX")}
    <p>Hi <strong>${escapeHtml(data.name)}</strong>,</p>
    <p>Thank you for contacting <strong>SOLVIX Software Solutions</strong> (www.solvixsoftwaresolutions.com).</p>
    <p>We have received your enquiry successfully. Our technical team will review your requirements and get back to you soon.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Your Name:</span> <span class="field-value">${escapeHtml(data.name)}</span></div>
      <div class="field-row"><span class="field-label">Phone:</span> <span class="field-value">${escapeHtml(data.phone)}</span></div>
      <div class="field-row"><span class="field-label">Company:</span> <span class="field-value">${escapeHtml(data.company || "N/A")}</span></div>
    </div>
    <p>If you have additional project details to share, feel free to reply directly to this message.</p>
    <p>Regards,<br><strong>SOLVIX Software Solutions</strong></p>
    ${getEmailFooter()}
  `
});

// 3. Quote Request — Team Notification Email
const getQuoteFounderEmail = (data) => {
  const serviceCat = escapeHtml(data.service || data.category || "Software Solution");
  const projectType = escapeHtml(data.projectType || data.service || "Custom Software");
  const budget = escapeHtml(data.budget || data.budgetRange || "N/A");
  const timeline = escapeHtml(data.timeline || data.expectedTimeline || "N/A");
  const meetingMethod = escapeHtml(data.meetingMethod || "N/A");
  const fileName = data.fileName ? escapeHtml(data.fileName) : null;
  const features = Array.isArray(data.requiredFeatures) ? data.requiredFeatures.map(f => escapeHtml(f)).join(", ") : (data.requiredFeatures ? escapeHtml(data.requiredFeatures) : "None specified");

  return {
    to: getNotificationEmailRecipient(),
    replyTo: data.email,
    subject: "New Quote Request — SOLVIX",
    html: `
      ${getEmailHeader("New Project Quotation Request")}
      <span class="badge">Quote Request</span>
      <p>A new quote request has been submitted by a prospective client on www.solvixsoftwaresolutions.com.</p>
      <div class="field-card">
        <div class="field-row"><span class="field-label">Customer Name:</span> <span class="field-value">${escapeHtml(data.name)}</span></div>
        <div class="field-row"><span class="field-label">Email Address:</span> <span class="field-value">${escapeHtml(data.email)}</span></div>
        <div class="field-row"><span class="field-label">Phone Number:</span> <span class="field-value">${escapeHtml(data.phone)}</span></div>
        <div class="field-row"><span class="field-label">Company:</span> <span class="field-value">${escapeHtml(data.company || "N/A")}</span></div>
        <div class="field-row"><span class="field-label">Service / Category:</span> <span class="field-value">${serviceCat}</span></div>
        <div class="field-row"><span class="field-label">Project Type:</span> <span class="field-value">${projectType}</span></div>
        <div class="field-row"><span class="field-label">Target Budget:</span> <span class="field-value">${budget}</span></div>
        <div class="field-row"><span class="field-label">Expected Timeline:</span> <span class="field-value">${timeline}</span></div>
        <div class="field-row"><span class="field-label">Meeting Preference:</span> <span class="field-value">${meetingMethod}</span></div>
        <div class="field-row"><span class="field-label">Required Features:</span> <span class="field-value">${features}</span></div>
        ${fileName ? `<div class="field-row"><span class="field-label">Requirement Document:</span> <span class="field-value">${fileName} (Filename specified by customer)</span></div>` : ""}
      </div>
      <p><strong>Project Description & Requirements:</strong></p>
      <div style="background: #f8fafc; border-left: 4px solid #7c3aed; padding: 12px 16px; margin: 10px 0;">
        ${data.description ? escapeHtml(data.description).replace(/\n/g, '<br>') : "N/A"}
      </div>
      <p style="font-size: 13px; color: #64748b;"><em>Tip: Click "Reply" in your email client to respond directly to ${escapeHtml(data.name)} (${escapeHtml(data.email)}).</em></p>
      ${getEmailFooter()}
    `
  };
};

// 4. Quote Request — Customer Confirmation Email
const getQuoteCustomerEmail = (data) => ({
  to: data.email,
  subject: "Quote Request Received — SOLVIX",
  html: `
    ${getEmailHeader("Quotation Request Received")}
    <p>Hi <strong>${escapeHtml(data.name)}</strong>,</p>
    <p>Thank you for requesting a project quotation from <strong>SOLVIX Software Solutions</strong> (www.solvixsoftwaresolutions.com).</p>
    <p>We have successfully received your project requirements:</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Service Category:</span> <span class="field-value">${escapeHtml(data.service || data.category || "Custom Software")}</span></div>
      <div class="field-row"><span class="field-label">Budget Range:</span> <span class="field-value">${escapeHtml(data.budget || data.budgetRange || "N/A")}</span></div>
      <div class="field-row"><span class="field-label">Expected Timeline:</span> <span class="field-value">${escapeHtml(data.timeline || data.expectedTimeline || "N/A")}</span></div>
    </div>
    <p>Our engineering team is reviewing your requirements and will prepare a detailed proposal covering technical scope, milestones, and pricing options.</p>
    <p>Regards,<br><strong>SOLVIX Software Solutions</strong></p>
    ${getEmailFooter()}
  `
});

// 5. Consultation Booking — Team Notification Email
const getConsultationFounderEmail = (data) => ({
  to: getNotificationEmailRecipient(),
  replyTo: data.email,
  subject: "New Consultation Booking — SOLVIX",
  html: `
    ${getEmailHeader("New Consultation Scheduled")}
    <span class="badge">Technical Consultation</span>
    <p>A client has scheduled a technical consultation meeting on www.solvixsoftwaresolutions.com.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Client Name:</span> <span class="field-value">${escapeHtml(data.name)}</span></div>
      <div class="field-row"><span class="field-label">Email:</span> <span class="field-value">${escapeHtml(data.email)}</span></div>
      <div class="field-row"><span class="field-label">Phone:</span> <span class="field-value">${escapeHtml(data.phone)}</span></div>
      <div class="field-row"><span class="field-label">Company:</span> <span class="field-value">${escapeHtml(data.company || "N/A")}</span></div>
      <div class="field-row"><span class="field-label">Meeting Type:</span> <span class="field-value">${escapeHtml(data.meeting_type || data.meetingType || "Google Meet")}</span></div>
      <div class="field-row"><span class="field-label">Preferred Date:</span> <span class="field-value">${escapeHtml(data.preferred_date || data.preferredDate)}</span></div>
      <div class="field-row"><span class="field-label">Preferred Time:</span> <span class="field-value">${escapeHtml(data.preferred_time || data.preferredTime)}</span></div>
    </div>
    <p><strong>Technical Topics / Description:</strong></p>
    <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 12px 16px; margin: 10px 0;">
      ${data.description ? escapeHtml(data.description).replace(/\n/g, '<br>') : "N/A"}
    </div>
    <p style="font-size: 13px; color: #64748b;"><em>Tip: Click "Reply" in your email client to respond directly to ${escapeHtml(data.name)} (${escapeHtml(data.email)}).</em></p>
    ${getEmailFooter()}
  `
});

// 6. Consultation Booking — Customer Confirmation Email
const getConsultationCustomerEmail = (data) => ({
  to: data.email,
  subject: "Consultation Request Received — SOLVIX",
  html: `
    ${getEmailHeader("Consultation Request Received")}
    <p>Hi <strong>${escapeHtml(data.name)}</strong>,</p>
    <p>Thank you for scheduling a technical consultation with <strong>SOLVIX Software Solutions</strong> (www.solvixsoftwaresolutions.com).</p>
    <p>We have received your requested meeting schedule:</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Meeting Type:</span> <span class="field-value">${escapeHtml(data.meeting_type || data.meetingType || "Google Meet")}</span></div>
      <div class="field-row"><span class="field-label">Preferred Date:</span> <span class="field-value">${escapeHtml(data.preferred_date || data.preferredDate)}</span></div>
      <div class="field-row"><span class="field-label">Preferred Time:</span> <span class="field-value">${escapeHtml(data.preferred_time || data.preferredTime)}</span></div>
    </div>
    <p>Our team will review your agenda and confirm the session. If you need to make changes, please reply directly to this email.</p>
    <p>Regards,<br><strong>SOLVIX Software Solutions</strong></p>
    ${getEmailFooter()}
  `
});

// 7. Newsletter Subscriber — Confirmation & Team Alert
const getNewsletterEmail = (email) => {
  const cleanEmail = escapeHtml(email);
  return {
    customer: {
      to: email,
      subject: "Welcome to SOLVIX Tech Updates",
      html: `
        ${getEmailHeader("Welcome to SOLVIX Newsletter")}
        <p>Hi!</p>
        <p>Thank you for subscribing to the <strong>SOLVIX Software Solutions</strong> newsletter (www.solvixsoftwaresolutions.com).</p>
        <p>You will receive periodic updates on custom software engineering, AI advancements, web/mobile architecture, and tech insights.</p>
        <p>Regards,<br><strong>SOLVIX Software Solutions</strong></p>
        ${getEmailFooter()}
      `
    },
    founder: {
      to: getNotificationEmailRecipient(),
      replyTo: email,
      subject: `New Newsletter Subscription — SOLVIX`,
      html: `
        ${getEmailHeader("New Newsletter Subscriber")}
        <span class="badge">Newsletter Subscription</span>
        <p>A new user subscribed to the website newsletter on www.solvixsoftwaresolutions.com.</p>
        <div class="field-card">
          <div class="field-row"><span class="field-label">Subscriber Email:</span> <span class="field-value">${cleanEmail}</span></div>
          <div class="field-row"><span class="field-label">Subscribed At:</span> <span class="field-value">${escapeHtml(new Date().toLocaleString())}</span></div>
        </div>
        ${getEmailFooter()}
      `
    }
  };
};

module.exports = {
  escapeHtml,
  getNotificationEmailRecipient,
  getContactFounderEmail,
  getContactCustomerEmail,
  getQuoteFounderEmail,
  getQuoteCustomerEmail,
  getConsultationFounderEmail,
  getConsultationCustomerEmail,
  getNewsletterEmail
};
