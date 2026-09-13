// SOLVIX Chatbot Express Controller
const { generateChatResponse } = require("../services/aiService");
const solvixKnowledge = require("../data/solvixKnowledge");
const { supabase } = require("../config/supabase");
const { sendEmail } = require("../config/email");
const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../data/db.json");

// Helper to save local fallback DB
const saveToLocalDb = (type, data) => {
  try {
    let currentDb = { contacts: [], quotes: [], consultations: [], subscribers: [] };
    if (fs.existsSync(DB_FILE)) {
      currentDb = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    }
    if (!currentDb[type]) currentDb[type] = [];
    currentDb[type].unshift(data);
    fs.writeFileSync(DB_FILE, JSON.stringify(currentDb, null, 2));
  } catch (err) {
    console.error("Local JSON DB Save Error:", err);
  }
};

/**
 * Handle incoming chat message (POST /api/chat)
 * Phase 2 Standardized API Endpoint
 */
exports.handleChatMessage = async (req, res) => {
  try {
    const { message, conversation, context, conversationHistory } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      console.warn("[CHAT] Invalid request: Empty or missing message string.");
      return res.status(400).json({
        success: false,
        error: "Message is required and must be a valid non-empty string.",
        code: "INVALID_REQUEST",
      });
    }

    // Support both conversation and conversationHistory parameter names for robustness
    const chatHistory = conversation || conversationHistory || [];

    const aiResult = await generateChatResponse(message, chatHistory, context || {});

    if (!aiResult.success) {
      console.error(`[CHAT] Error code: ${aiResult.code} | Message: ${aiResult.error}`);
      return res.status(aiResult.code === "AI_NOT_CONFIGURED" ? 503 : 500).json({
        success: false,
        error: aiResult.error,
        code: aiResult.code || "CHAT_ERROR",
      });
    }

    return res.json({
      success: true,
      reply: aiResult.reply,
      message: aiResult.reply,
      conversationId: aiResult.conversationId || `conv-${Date.now()}`,
    });
  } catch (error) {
    console.error("[CHAT] Unhandled Controller Exception:", error);
    return res.status(500).json({
      success: false,
      error: `Internal Server Error: ${error.message || "Unexpected failure."}`,
      code: "SERVER_ERROR",
    });
  }
};

/**
 * Generate Structured Project Estimate (POST /api/chat/estimate)
 */
exports.handleEstimate = async (req, res) => {
  try {
    const { category, projectType, features } = req.body;

    const catObj = solvixKnowledge.services.find((s) => s.category === category) || solvixKnowledge.services[0];
    const servObj = catObj.items.find((i) => i.name === projectType) || catObj.items[0];

    const estimate = {
      category: catObj.category,
      projectType: servObj.name,
      estimatedStartingPrice: servObj.range,
      estimatedTimeline: servObj.timeline,
      recommendedStack: solvixKnowledge.technologies[category === "Mobile App Development" ? "mobile" : category === "AI Solutions" ? "ai_ml" : "frontend"],
      features: features && features.length > 0 ? features : ["Responsive Design", "API Integration", "User Auth", "Admin Portal"],
      summary: servObj.desc,
    };

    return res.json({
      success: true,
      estimate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate estimate.",
      code: "ESTIMATE_ERROR",
    });
  }
};

/**
 * Handle Lead Submission from Chatbot (POST /api/chat/enquiry)
 * Reuses existing Quote / DB architecture tagged with source = "ai_chatbot"
 */
exports.handleChatEnquiry = async (req, res) => {
  try {
    const { name, email, phone, company, category, projectType, description, estimatedPrice } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: "Name, Email, and Phone number are required fields.",
        code: "INVALID_ENQUIRY",
      });
    }

    const enquiryPayload = {
      id: `AI-LEAD-${Date.now()}`,
      name,
      email,
      phone,
      company: company || "N/A",
      category: category || "General AI Enquiry",
      project_type: projectType || "AI Chatbot Discovery",
      estimated_price: estimatedPrice || "Custom Quote",
      description: description || "Inquired via SOLVIX AI Chatbot Assistant",
      status: "New",
      source: "ai_chatbot",
      created_at: new Date().toISOString(),
    };

    // 1. Store in Supabase if available
    let dbSuccess = false;
    if (supabase) {
      try {
        const { error } = await supabase.from("quotes").insert([
          {
            name: enquiryPayload.name,
            email: enquiryPayload.email,
            phone: enquiryPayload.phone,
            company: enquiryPayload.company,
            category: enquiryPayload.category,
            project_type: enquiryPayload.project_type,
            estimated_price: enquiryPayload.estimated_price,
            description: `[AI Chatbot Lead] ${enquiryPayload.description}`,
            status: "New",
            source: "ai_chatbot",
            created_at: enquiryPayload.created_at,
          }
        ]);
        if (!error) dbSuccess = true;
      } catch (sbErr) {
        console.warn("Supabase insert warning:", sbErr.message);
      }
    }

    // 2. Save locally if Supabase unavailable
    if (!dbSuccess) {
      saveToLocalDb("quotes", enquiryPayload);
    }

    // 3. Dispatch Email Notification via Resend
    try {
      if (sendEmail) {
        await sendEmail({
          subject: `🤖 NEW AI Chatbot Lead: ${name} (${category || "General"})`,
          text: `New project enquiry submitted via SOLVIX AI Chatbot:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category}\nProject: ${projectType}\nDetails: ${description}`,
          html: `
            <h3>🤖 New Lead via SOLVIX AI Chatbot</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Estimated Price:</strong> ${estimatedPrice}</p>
            <p><strong>Details:</strong> ${description}</p>
            <hr />
            <p><small>SOLVIX Software Solutions Admin Alert</small></p>
          `,
        });
      }
    } catch (emailErr) {
      console.warn("Resend email warning:", emailErr.message);
    }

    return res.json({
      success: true,
      message: "Your request has been submitted successfully! Our technical team will reach out shortly.",
      enquiryId: enquiryPayload.id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to submit chatbot enquiry.",
      code: "ENQUIRY_ERROR",
    });
  }
};
