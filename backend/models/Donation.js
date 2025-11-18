// backend/models/Donation.js
const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },

  pickupLat: { type: Number, required: true },
  pickupLng: { type: Number, required: true },

  pickupInstructions: { type: String, default: "" },

  status: { type: String, default: "Pending" },

  assignedNgo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", default: null },

  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", DonationSchema);
