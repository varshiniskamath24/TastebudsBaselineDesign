// backend/routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST /api/feedback
router.post("/", async (req, res) => {
  try {
    const { orderId, userId, rating, comments } = req.body;
    if (!userId || typeof rating === "undefined") {
      return res.status(400).json({ msg: "userId and rating required" });
    }
    const f = await Feedback.create({ orderId, userId, rating, comments });
    res.json(f);
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ msg: "Failed to save feedback" });
  }
});

module.exports = router;
