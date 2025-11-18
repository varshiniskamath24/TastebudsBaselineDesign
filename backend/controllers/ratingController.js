// backend/controllers/ratingController.js
const Feedback = require("../models/Feedback");
const Restaurant = require("../models/Restaurant");
const mongoose = require("mongoose");

exports.submitRating = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    if (!rating) return res.status(400).json({ msg: "Rating required" });

    // Save feedback
    await Feedback.create({
      userId,
      restaurantId,
      rating,
      comment: comment || "",
    });

    // Recalculate average rating
    const stats = await Feedback.aggregate([
      { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    const newAvg = stats.length ? stats[0].avgRating : rating;

    await Restaurant.findByIdAndUpdate(restaurantId, {
      avgRating: newAvg.toFixed(1),
    });

    res.json({ msg: "Rating submitted", avgRating: newAvg });

  } catch (err) {
    console.error("RATING ERROR:", err);
    res.status(500).json({ msg: "Server error submitting rating" });
  }
};
