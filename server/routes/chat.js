// SOLVIX AI Chatbot Express Routes
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const chatController = require("../controllers/chatController");

// Per-IP Chatbot Rate Limiter (20 requests per 15 minutes)
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Rate limit reached for AI Chatbot. Please wait a few minutes before sending more messages.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/chat - Main AI response endpoint
router.post("/", chatLimiter, chatController.handleChatMessage);

// POST /api/chat/estimate - Structured estimate endpoint
router.post("/estimate", chatLimiter, chatController.handleEstimate);

// POST /api/chat/enquiry - Lead capture endpoint
router.post("/enquiry", chatLimiter, chatController.handleChatEnquiry);

module.exports = router;
