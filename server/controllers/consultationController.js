const supabase = require("../config/supabase");
const emailService = require("../services/emailService");

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

    // 1. Insert into Supabase 'consultations' table FIRST
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
      console.error("SUPABASE CONSULTATION INSERT ERROR:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to save consultation booking."
      });
    }

    console.log("Consultation Inserted Successfully into Supabase:", data);

    // 2. Send dual email notifications via Centralized Email Service
    const consultationPayload = {
      name,
      email,
      phone,
      company,
      meetingType: selectedMeetingType,
      meeting_type: selectedMeetingType,
      preferredDate: selectedDate,
      preferred_date: selectedDate,
      preferredTime: selectedTime,
      preferred_time: selectedTime,
      description
    };

    try {
      await emailService.dispatchDualEmails(
        emailService.sendConsultationConfirmation,
        emailService.sendConsultationNotification,
        consultationPayload
      );
    } catch (emailErr) {
      console.error("EMAIL_NOTIFICATION_FAILED for Consultation Booking:", emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Consultation booked successfully.",
      data: {
        id: data && data[0] ? data[0].id : "CNS-RECORDED"
      }
    });

  } catch (err) {
    console.error("CONSULTATION CONTROLLER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error."
    });
  }
};