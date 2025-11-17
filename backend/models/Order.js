const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    items: [
      {
        restaurantId: { type: String, required: true },
        restaurantName: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true }
      }
    ],

    total: { type: Number, required: true },

    status: {
      type: String,
      default: "placed" // placed → accepted → preparing → completed
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
