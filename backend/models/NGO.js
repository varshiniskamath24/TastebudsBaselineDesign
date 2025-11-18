// backend/models/NGO.js
const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }, // For SMS notifications
  address: { type: String, required: true },

  acceptedFoodTypes: {
    type: [String],
    default: ["cooked", "packaged"]
  },

  baseCapacity: { type: Number, default: 100 },   // Max daily capacity
  remainingCapacity: { type: Number, default: 100 },

  availability: { type: Boolean, default: true },

  lat: Number,
  lng: Number
});

module.exports = mongoose.model("NGO", NGOSchema);
