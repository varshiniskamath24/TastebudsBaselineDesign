// backend/routes/rescueRoutes.js
const express = require("express");
const router = express.Router();
const rescueController = require("../controllers/rescueController");
const requireAuth = require("../middleware/auth"); // optional: use if you want authenticated donors

// POST /api/rescue/donate
// If you want only authenticated restaurants to donate, change to: router.post("/donate", requireAuth, rescueController.submitDonation)
router.post("/donate", /* requireAuth, */ rescueController.submitDonation);

module.exports = router;
