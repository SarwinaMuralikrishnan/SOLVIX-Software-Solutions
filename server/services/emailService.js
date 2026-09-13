const { sendEmail } = require("../config/email");
const emailTemplates = require("./emailTemplates");

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

module.exports = {
  sendEmail,
  sendContactNotification,
  sendContactConfirmation,
  sendQuoteNotification,
  sendQuoteConfirmation,
  sendConsultationNotification,
  sendConsultationConfirmation,
  ...emailTemplates
};
