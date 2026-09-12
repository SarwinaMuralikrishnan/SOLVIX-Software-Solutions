const supabase = require("../config/supabase");
const { sendEmail } = require("../config/email");

const submitContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      message
    } = req.body;

    console.log("=================================");
    console.log("========== CONTACT REQUEST ==========");
    console.log(req.body);
    console.log("=================================");

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    // Insert into Supabase
        const { data, error } = await supabase
        .from("contacts")
        .insert([
        {
          name,
          email,
          phone,
          company,
          message,
          status: "New",
        },
    ])
    .select();

    if (error) {
      console.log("SUPABASE ERROR:");
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    console.log("Inserted Successfully");
console.log(data);

// Email to Customer
await sendEmail({
  to: email,
  subject: "SOLVIX - We Received Your Enquiry",
  html: `
    <h2>Thank You, ${name}!</h2>

    <p>We have received your enquiry successfully.</p>

    <p>Our team will contact you shortly.</p>

    <hr>

    <b>Company:</b> ${company || "N/A"}<br>
    <b>Phone:</b> ${phone}<br>
    <b>Message:</b> ${message}

    <br><br>

    <p>Regards,<br><b>SOLVIX Technologies</b></p>
  `,
});

// Email to Founders
await sendEmail({
  to: [
    "sarwinamuralikrishnan07feb@gmail.com",
    "subetha076@gmail.com"
  ],
  subject: "🚀 New Contact Enquiry Received",
  html: `
    <h2>New Contact Enquiry</h2>

    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Company:</b> ${company || "N/A"}</p>

    <p><b>Message:</b></p>

    <p>${message}</p>
  `,
});

return res.status(200).json({
  success: true,
  message: "Contact enquiry submitted successfully.",
  data,
});

  } catch (err) {
    console.log("SERVER ERROR:");
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  submitContact
};