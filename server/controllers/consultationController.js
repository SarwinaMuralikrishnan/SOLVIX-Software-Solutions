const supabase = require("../config/supabase");
const { sendEmail } = require("../config/email");
const { getConsultationFounderEmail, getConsultationCustomerEmail } = require("../services/emailTemplates");

exports.createConsultation = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      meetingType,
      meeting_type,
      preferredDate,
      preferred_date,
      preferredTime,
      preferred_time,
      description,
      securityToken
    } = req.body;

    console.log("=================================");
    console.log("====== CONSULTATION REQUEST ======");
    console.log(req.body);
    console.log("=================================");

    const selectedMeetingType = meetingType || meeting_type || "Google Meet";
    const selectedDate = preferredDate || preferred_date;
    const selectedTime = preferredTime || preferred_time;

    if (
      !name ||
      !email ||
      !phone ||
      !selectedDate ||
      !selectedTime ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    // Insert into Supabase 'consultations' table
    const { data, error } = await supabase
      .from("consultations")
      .insert([
        {
          name,
          email,
          phone,
          company: company || "",
          meeting_type: selectedMeetingType,
          preferred_date: selectedDate,
          preferred_time: selectedTime,
          description,
          status: "New"
        }
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

    console.log("Consultation Inserted Successfully into Supabase:", data);

    // Send dual email notifications via Resend
    const consultationPayload = {
      name,
      email,
      phone,
      company,
      meeting_type: selectedMeetingType,
      preferred_date: selectedDate,
      preferred_time: selectedTime,
      description
    };

    const customerMail = getConsultationCustomerEmail(consultationPayload);
    const founderMail = getConsultationFounderEmail(consultationPayload);

    await sendEmail(customerMail);
    await sendEmail(founderMail);

    res.status(201).json({
      success: true,
      message: "Consultation booked successfully. Email confirmation sent.",
      data: {
        id: data && data[0] ? data[0].id : "CNS-RECORDED"
      }
    });

  } catch (err) {
    console.log("CONSULTATION CONTROLLER ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};