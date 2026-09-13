const { sendEmail } = require("../config/email");
const emailTemplates = require("./emailTemplates");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendContactNotification = async (data) => {
  const mailObj = emailTemplates.getContactFounderEmail(data);
  return await sendEmail(mailObj);
};

const sendContactConfirmation = async (data) => {
  const mailObj = emailTemplates.getContactCustomerEmail(data);
  return await sendEmail(mailObj);
};

const sendQuoteNotification = async (data) => {
  const mailObj = emailTemplates.getQuoteFounderEmail(data);
  return await sendEmail(mailObj);
};

const sendQuoteConfirmation = async (data) => {
  const mailObj = emailTemplates.getQuoteCustomerEmail(data);
  return await sendEmail(mailObj);
};

const sendConsultationNotification = async (data) => {
  const mailObj = emailTemplates.getConsultationFounderEmail(data);
  return await sendEmail(mailObj);
};

const sendConsultationConfirmation = async (data) => {
  const mailObj = emailTemplates.getConsultationCustomerEmail(data);
  return await sendEmail(mailObj);
};

// Helper: Dispatch both customer confirmation and founder notification with safe 500ms spacing
const dispatchDualEmails = async (confirmationFn, notificationFn, payload) => {
  try {
    // 1. Dispatch Customer Confirmation
    const custRes = await confirmationFn(payload);

    // 2. Wait 500ms to respect Resend Rate Limits (max 2 req/sec)
    await sleep(500);

    // 3. Dispatch Team Notification
    const teamRes = await notificationFn(payload);

    return { customer: custRes, team: teamRes };
  } catch (err) {
    console.error("DUAL_EMAIL_DISPATCH_ERROR:", err);
    return { error: err.message };
  }
};

module.exports = {
  sendEmail,
  sendContactNotification,
  sendContactConfirmation,
  sendQuoteNotification,
  sendQuoteConfirmation,
  sendConsultationNotification,
  sendConsultationConfirmation,
  dispatchDualEmails,
  ...emailTemplates
};
