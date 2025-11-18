// backend/routes/ratingRoutes.js
const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/auth");
const ratingController = require("../controllers/ratingController");

router.post("/:id/rate", requireAuth, ratingController.submitRating);

module.exports = router;
