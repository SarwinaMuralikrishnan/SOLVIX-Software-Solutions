const jwt = require("jsonwebtoken");

const getJwtSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  if (process.env.NODE_ENV === "production") {
    console.error("⚠️ SECURITY WARNING: JWT_SECRET environment variable is missing in production environment.");
  }
  return "solvix_super_secret_jwt_key_2026";
};

const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authentication token provided."
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, getJwtSecret());
      req.admin = decoded;
      return next();
    } catch (jwtErr) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired admin authentication token."
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Authentication error: " + err.message
    });
  }
};

module.exports = {
  authenticateAdmin,
  getJwtSecret
};
