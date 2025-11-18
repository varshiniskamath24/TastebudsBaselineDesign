// backend/routes/rescueRoutes.js
const express = require("express");
const router = express.Router();
const rescueController = require("../controllers/rescueController");
const auth = require("../middleware/auth");

// DONATE food
router.post("/donate", auth, rescueController.submitDonation);

// (Optional) View user's donations - ONLY IF you still need it
// router.get("/my-donations", auth, rescueController.getUserDonations);

module.exports = router;
