const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../middleware/auth");

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both username and password."
      });
    }

    const expectedUsername = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
    const expectedPassword = (process.env.ADMIN_PASSWORD || "solvix2026").trim();

    const inputUsername = username.trim().toLowerCase();

    const isValidUser = inputUsername === expectedUsername;
    const isValidPass = password === expectedPassword;

    if (!isValidUser || !isValidPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin username or password."
      });
    }

    // Generate JWT Token valid for 24 hours
    const token = jwt.sign(
      {
        username: username.trim(),
        role: "Founder",
        iss: "SOLVIX Security Engine"
      },
      getJwtSecret(),
      { expiresIn: "24h" }
    );

    console.log("=================================");
    console.log("🔒 ADMIN LOGGED IN SUCCESSFULLY:", username);
    console.log("=================================");

    return res.json({
      success: true,
      message: "Admin authentication successful.",
      token,
      admin: {
        username: username.trim(),
        role: "Founder"
      }
    });

  } catch (err) {
    console.log("AUTH CONTROLLER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
