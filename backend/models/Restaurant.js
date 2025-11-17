const mongoose = require("mongoose");

// Menu schema
const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: null }, // NEW
});

// Restaurant schema
const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, default: "Multi-cuisine" },
  avgRating: { type: Number, default: 4.0 },

  image: { type: String, default: null }, // NEW restaurant banner image

  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },

  menu: {
    type: [MenuItemSchema],
    default: [],
  }
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
