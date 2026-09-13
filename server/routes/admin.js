const express = require("express");
const router = express.Router();
const { authenticateAdmin } = require("../middleware/auth");
const { adminLogin } = require("../controllers/authController");

const {
  getContacts,
  getConsultations,
  getQuotes,
  getSubscribers,
  getAllEnquiries,
  getAuditLogs,
  getEmailStatus,
  updateStatus,
  deleteRecord
} = require("../controllers/adminController");

// Public admin route for login
router.post("/login", adminLogin);

// Protected admin endpoints requiring Bearer JWT authentication
router.use(authenticateAdmin);

router.get("/enquiries", getAllEnquiries);

router.get("/contacts", getContacts);

router.get("/consultations", getConsultations);

router.get("/quotes", getQuotes);

router.get("/subscribers", getSubscribers);

router.get("/logs", getAuditLogs);

router.get("/email-status", getEmailStatus);

router.patch("/enquiries/:type/:id", updateStatus);

router.delete("/enquiries/:type/:id", deleteRecord);

module.exports = router;