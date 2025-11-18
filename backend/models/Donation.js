// backend/models/Donation.js
const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  donorName: { type: String, default: "" },

  foodType: { type: String, required: true }, // e.g. "cooked"
  quantity: { type: Number, required: true }, // units / kg - document in UI

  // when food was prepared (optional from client)
  preparedAt: { type: Date, default: Date.now },

  // donor-provided pickup instructions
  pickupInstructions: { type: String, default: "" },

  // pickup location geojson point [lng, lat]
  pickupLocation: {
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

  // assignment result
  assignedNgoId: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", default: null },

  // status: baseline requires Pending -> Assigned
  status: {
    type: String,
    enum: ["Pending", "Assigned", "PickedUp", "Completed", "Cancelled"],
    default: "Pending"
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// optimize geo queries
DonationSchema.index({ pickupLocation: "2dsphere" });

DonationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Donation", DonationSchema);
