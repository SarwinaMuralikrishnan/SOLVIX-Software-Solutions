// SOLVIX Professional Email Template Engine

const FOUNDER_EMAILS = [
  "sarwinamuralikrishnan07feb@gmail.com",
  "subetha076@gmail.com"
];

// Helper: Common HTML Header
const getEmailHeader = (title) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #0f172a; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 30px 24px; font-size: 15px; line-height: 1.6; }
    .badge { display: inline-block; padding: 4px 12px; background: #e0e7ff; color: #3730a3; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
    .field-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .field-row { margin-bottom: 10px; font-size: 14px; }
    .field-label { font-weight: 700; color: #475569; width: 140px; display: inline-block; }
    .field-value { color: #0f172a; font-weight: 600; }
    .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 13px; color: #64748B; border-top: 1px solid #e2e8f0; }
    .footer a { color: #2563eb; text-decoration: none; font-weight: 600; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 700; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SOLVIX Software Solutions</h1>
      <p>${title}</p>
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

// 1. Contact Enquiry — Founder Alert
const getContactFounderEmail = (data) => ({
  to: FOUNDER_EMAILS,
  subject: `🚀 [SOLVIX Contact Alert] Message from ${data.name}`,
  html: `
    ${getEmailHeader("New Contact Enquiry Received")}
    <span class="badge">Contact Form Enquiry</span>
    <p>A new customer has sent a message via the website contact form.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Customer Name:</span> <span class="field-value">${data.name}</span></div>
      <div class="field-row"><span class="field-label">Email Address:</span> <span class="field-value">${data.email}</span></div>
      <div class="field-row"><span class="field-label">Phone Number:</span> <span class="field-value">${data.phone}</span></div>
      <div class="field-row"><span class="field-label">Company Name:</span> <span class="field-value">${data.company || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">Submission Date:</span> <span class="field-value">${new Date().toLocaleString()}</span></div>
    </div>
    <p><strong>Message / Requirements:</strong></p>
    <div style="background: #ffffff; border-left: 4px solid #2563eb; padding: 12px 16px; margin: 10px 0; font-style: italic; background: #f8fafc;">
      ${data.message.replace(/\n/g, '<br>')}
    </div>
    ${getEmailFooter()}
  `
});

// 2. Contact Enquiry — Customer Auto-Reply
const getContactCustomerEmail = (data) => ({
  to: data.email,
  subject: "SOLVIX — We Received Your Enquiry",
  html: `
    ${getEmailHeader("Thank You for Contacting SOLVIX")}
    <p>Dear <strong>${data.name}</strong>,</p>
    <p>Thank you for reaching out to <strong>SOLVIX Software Solutions</strong> (www.solvixsoftwaresolutions.com). We have received your enquiry and our technical team is reviewing your requirements.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Your Name:</span> <span class="field-value">${data.name}</span></div>
      <div class="field-row"><span class="field-label">Phone:</span> <span class="field-value">${data.phone}</span></div>
      <div class="field-row"><span class="field-label">Company:</span> <span class="field-value">${data.company || "N/A"}</span></div>
    </div>
    <p>One of our team members will get back to you within 24 business hours.</p>
    <p>Warm regards,<br><strong>SOLVIX Engineering Team</strong></p>
    ${getEmailFooter()}
  `
});

// 3. Quote Request — Founder Alert
const getQuoteFounderEmail = (data) => ({
  to: FOUNDER_EMAILS,
  subject: `💼 [SOLVIX Quote Request] ${data.service || data.category || 'Project Quote'} from ${data.name}`,
  html: `
    ${getEmailHeader("New Project Quotation Request")}
    <span class="badge">Quote Proposal Request</span>
    <p>A new quotation request has been submitted by a client on www.solvixsoftwaresolutions.com.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Customer Name:</span> <span class="field-value">${data.name}</span></div>
      <div class="field-row"><span class="field-label">Email Address:</span> <span class="field-value">${data.email}</span></div>
      <div class="field-row"><span class="field-label">Phone Number:</span> <span class="field-value">${data.phone}</span></div>
      <div class="field-row"><span class="field-label">Company:</span> <span class="field-value">${data.company || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">Project Category/Service:</span> <span class="field-value">${data.service || data.category || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">Target Budget:</span> <span class="field-value">${data.budget || data.budgetRange || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">Expected Timeline:</span> <span class="field-value">${data.timeline || data.expectedTimeline || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">Meeting Preference:</span> <span class="field-value">${data.meetingMethod || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">File Attached:</span> <span class="field-value">${data.fileName || "None"}</span></div>
    </div>
    <p><strong>Project Requirements:</strong></p>
    <div style="background: #ffffff; border-left: 4px solid #7c3aed; padding: 12px 16px; margin: 10px 0; background: #f8fafc;">
      ${data.description ? data.description.replace(/\n/g, '<br>') : "N/A"}
    </div>
    ${getEmailFooter()}
  `
});

// 4. Quote Request — Customer Auto-Reply
const getQuoteCustomerEmail = (data) => ({
  to: data.email,
  subject: "SOLVIX — Quotation Request Received",
  html: `
    ${getEmailHeader("Quotation Proposal Confirmation")}
    <p>Dear <strong>${data.name}</strong>,</p>
    <p>Thank you for requesting a project quotation from <strong>SOLVIX Software Solutions</strong> (www.solvixsoftwaresolutions.com).</p>
    <p>We have successfully registered your project details:</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Service Category:</span> <span class="field-value">${data.service || data.category || "Software Solution"}</span></div>
      <div class="field-row"><span class="field-label">Budget Range:</span> <span class="field-value">${data.budget || data.budgetRange || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">Expected Timeline:</span> <span class="field-value">${data.timeline || data.expectedTimeline || "N/A"}</span></div>
    </div>
    <p>Our solutions architects are assessing your requirements and preparing a customized technical proposal with scope, milestone breakdowns, and final pricing.</p>
    <p>Regards,<br><strong>SOLVIX Solutions Team</strong></p>
    ${getEmailFooter()}
  `
});

// 5. Consultation Booking — Founder Alert
const getConsultationFounderEmail = (data) => ({
  to: FOUNDER_EMAILS,
  subject: `📅 [SOLVIX Technical Consultation] Booking from ${data.name}`,
  html: `
    ${getEmailHeader("New Consultation Scheduled")}
    <span class="badge">Technical Consultation</span>
    <p>A client has scheduled a 1-on-1 technical consultation meeting on www.solvixsoftwaresolutions.com.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Client Name:</span> <span class="field-value">${data.name}</span></div>
      <div class="field-row"><span class="field-label">Email:</span> <span class="field-value">${data.email}</span></div>
      <div class="field-row"><span class="field-label">Phone:</span> <span class="field-value">${data.phone}</span></div>
      <div class="field-row"><span class="field-label">Company:</span> <span class="field-value">${data.company || "N/A"}</span></div>
      <div class="field-row"><span class="field-label">Meeting Type:</span> <span class="field-value">${data.meeting_type || data.meetingType || "Google Meet"}</span></div>
      <div class="field-row"><span class="field-label">Preferred Date:</span> <span class="field-value">${data.preferred_date || data.preferredDate}</span></div>
      <div class="field-row"><span class="field-label">Preferred Time:</span> <span class="field-value">${data.preferred_time || data.preferredTime}</span></div>
    </div>
    <p><strong>Technical Agenda / Topics:</strong></p>
    <div style="background: #ffffff; border-left: 4px solid #10b981; padding: 12px 16px; margin: 10px 0; background: #f8fafc;">
      ${data.description ? data.description.replace(/\n/g, '<br>') : "N/A"}
    </div>
    ${getEmailFooter()}
  `
});

// 6. Consultation Booking — Customer Auto-Reply
const getConsultationCustomerEmail = (data) => ({
  to: data.email,
  subject: "SOLVIX — Technical Consultation Booking Confirmed",
  html: `
    ${getEmailHeader("Consultation Booking Confirmed")}
    <p>Dear <strong>${data.name}</strong>,</p>
    <p>Your technical consultation session with <strong>SOLVIX Software Solutions</strong> (www.solvixsoftwaresolutions.com) has been scheduled.</p>
    <div class="field-card">
      <div class="field-row"><span class="field-label">Meeting Type:</span> <span class="field-value">${data.meeting_type || data.meetingType || "Google Meet"}</span></div>
      <div class="field-row"><span class="field-label">Scheduled Date:</span> <span class="field-value">${data.preferred_date || data.preferredDate}</span></div>
      <div class="field-row"><span class="field-label">Scheduled Time:</span> <span class="field-value">${data.preferred_time || data.preferredTime}</span></div>
    </div>
    <p>Our lead engineers will connect with you via your preferred method. If you need to make changes, please reply directly to this email.</p>
    <p>Best regards,<br><strong>SOLVIX Technical Team</strong></p>
    ${getEmailFooter()}
  `
});

// 7. Newsletter Subscriber — Confirmation & Alert
const getNewsletterEmail = (email) => ({
  customer: {
    to: email,
    subject: "Welcome to SOLVIX Tech Updates",
    html: `
      ${getEmailHeader("Welcome to SOLVIX Newsletter")}
      <p>Hello!</p>
      <p>Thank you for subscribing to the <strong>SOLVIX Software Solutions</strong> newsletter (www.solvixsoftwaresolutions.com).</p>
      <p>You will receive periodic updates on custom software engineering, AI advancements, web/mobile architecture, and technical insights from Coimbatore.</p>
      <p>Best regards,<br><strong>SOLVIX Team</strong></p>
      ${getEmailFooter()}
    `
  },
  founder: {
    to: FOUNDER_EMAILS,
    subject: `📩 [SOLVIX Newsletter] New Subscriber: ${email}`,
    html: `
      ${getEmailHeader("New Newsletter Subscriber")}
      <span class="badge">Newsletter Subscription</span>
      <p>A new user subscribed to the website newsletter on www.solvixsoftwaresolutions.com.</p>
      <div class="field-card">
        <div class="field-row"><span class="field-label">Subscriber Email:</span> <span class="field-value">${email}</span></div>
        <div class="field-row"><span class="field-label">Subscribed At:</span> <span class="field-value">${new Date().toLocaleString()}</span></div>
      </div>
      ${getEmailFooter()}
    `
  }
});

module.exports = {
  FOUNDER_EMAILS,
  getContactFounderEmail,
  getContactCustomerEmail,
  getQuoteFounderEmail,
  getQuoteCustomerEmail,
  getConsultationFounderEmail,
  getConsultationCustomerEmail,
  getNewsletterEmail
};
