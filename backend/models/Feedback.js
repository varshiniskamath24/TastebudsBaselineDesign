// backend/models/Feedback.js
const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  orderId: { type: String, required: false },
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
