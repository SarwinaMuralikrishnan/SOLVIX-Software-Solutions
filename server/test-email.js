require("dotenv").config();

const { sendEmail } = require("./config/email");

(async () => {
  await sendEmail({
    to: "sarwinamuralikrishnan07feb@gmail.com",
    subject: "SOLVIX Email Test",
    html: `
      <h2>Hello Sarwina 👋</h2>

      <p>Your SOLVIX backend email service is working successfully.</p>

      <p>This is a test email sent using Resend.</p>
    `,
  });

  process.exit();
})();