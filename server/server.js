require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Routes
const contactRoutes = require("./routes/contact");
const consultationRoutes = require("./routes/consultation");
const quoteRoutes = require("./routes/quote");
const newsletterRoutes = require("./routes/newsletter");
const adminRoutes = require("./routes/admin");
const chatRoutes = require("./routes/chat");

const app = express();

// ===============================
// Security Middleware & Rate Limit
// ===============================
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", apiLimiter);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://www.solvixsoftwaresolutions.com",
  "https://solvixsoftwaresolutions.com"
];
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation: Origin not allowed."));
      }
    },
    credentials: true,
  })
);

// ===============================
// Body Parser & Static Assets
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SOLVIX Backend Running Successfully",
  });
});

// ===============================
// Health Check
// ===============================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SOLVIX Backend Running Successfully",
  });
});

// ===============================
// API Routes
// ===============================
app.use("/api/contact", contactRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("UNHANDLED EXPRESS ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 SOLVIX Backend Started");
  console.log(`🌐 Server : http://localhost:${PORT}`);
  console.log(`❤️ Health : http://localhost:${PORT}/api/health`);
  console.log("=================================");
});