// backend/models/NGO.js
const mongoose = require("mongoose");

const NgoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" }
  },
  address: { type: String, default: "" },

  // accepted food types, e.g. ["cooked","raw","packaged"]
  acceptedFoodTypes: { type: [String], default: [] },

  // capacityCurrent = current available capacity (same unit as donation.quantity)
  // capacityMax = maximum capacity (optional)
  capacityCurrent: { type: Number, default: 0 },
  capacityMax: { type: Number, default: 0 },

  // whether NGO is currently available to accept pickups
  availability: { type: Boolean, default: true },

  // location as GeoJSON point — [lng, lat]
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Ensure 2dsphere index for geospatial queries
NgoSchema.index({ location: "2dsphere" });

NgoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("NGO", NgoSchema);
