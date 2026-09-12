const express = require("express");
const router = express.Router();

const {
  createQuote,
} = require("../controllers/quoteController");

// POST /api/quote
router.post("/", createQuote);

module.exports = router;