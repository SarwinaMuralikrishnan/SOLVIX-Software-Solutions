const { sendEmail } = require("../config/email");
const emailTemplates = require("./emailTemplates");

module.exports = {
  sendEmail,
  ...emailTemplates
};
