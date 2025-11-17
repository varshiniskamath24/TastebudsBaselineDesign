// seed_udupi_realistic.js
// Seeds ~60 realistic Udupi restaurants into MongoDB.
// Usage: cd backend && node seed/seed_udupi_realistic.js

const mongoose = require("mongoose");
require("dotenv").config();
const Restaurant = require("../models/Restaurant");

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tastebuds";

async function connectDB() {
  await mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected for Udupi seeding");
}

const restaurants = [
  // 1
  {
    name: "Udupi Krishna Bhavan",
    cuisine: "Udupi / South Indian",
    avgRating: 4.5,
    location: { lat: 13.3409, lng: 74.7421 },
    menu: [
      { name: "Masala Dosa", price: 80 },
      { name: "Plain Dosa", price: 45 },
      { name: "Udupi Thali (Veg)", price: 140 },
      { name: "Filter Coffee", price: 30 },
    ],
  },
  // 2
  {
    name: "Coastal Spice House",
    cuisine: "Seafood",
    avgRating: 4.4,
    location: { lat: 13.3425, lng: 74.7448 },
    menu: [
      { name: "Ghee Roast Fish", price: 360 },
      { name: "Prawn Sukka", price: 320 },
      { name: "Neer Dosa", price: 50 },
      { name: "Kori Rotti", price: 280 },
    ],
  },
  // 3
  {
    name: "Mandara Veg Delights",
    cuisine: "Udupi / Vegetarian",
    avgRating: 4.3,
    location: { lat: 13.3441, lng: 74.7429 },
    menu: [
      { name: "Veg Thali", price: 150 },
      { name: "Rava Idli", price: 60 },
      { name: "Sambar Vada", price: 70 },
      { name: "Payasam", price: 50 },
    ],
  },
  // 4
  {
    name: "Fisherman's Wharf - Malpe Road",
    cuisine: "Seafood",
    avgRating: 4.6,
    location: { lat: 13.3510, lng: 74.7375 },
    menu: [
      { name: "Fish Curry Meal", price: 280 },
      { name: "Prawns Fry", price: 340 },
      { name: "Soda", price: 25 },
      { name: "Fried Pomfret", price: 420 },
    ],
  },
  // 5
  {
    name: "Gokul Tiffins",
    cuisine: "South Indian",
    avgRating: 4.1,
    location: { lat: 13.3388, lng: 74.7433 },
    menu: [
      { name: "Set Dosa", price: 75 },
      { name: "Idli-Sambar", price: 50 },
      { name: "Vada", price: 35 },
    ],
  },
  // 6
  {
    name: "Cafe Malpe Breeze",
    cuisine: "Cafe",
    avgRating: 4.2,
    location: { lat: 13.3518, lng: 74.7310 },
    menu: [
      { name: "Cold Coffee", price: 120 },
      { name: "Veg Sandwich", price: 120 },
      { name: "Egg Omelette", price: 90 },
    ],
  },
  // 7
  {
    name: "Annapoorna Sagar",
    cuisine: "Indian Vegetarian",
    avgRating: 4.0,
    location: { lat: 13.3419, lng: 74.7465 },
    menu: [
      { name: "Roti Sabzi", price: 110 },
      { name: "Paneer Butter Masala", price: 200 },
      { name: "Jeera Rice", price: 80 },
    ],
  },
  // 8
  {
    name: "Biryani Ghar - Udupi",
    cuisine: "Biryani",
    avgRating: 4.3,
    location: { lat: 13.3437, lng: 74.7402 },
    menu: [
      { name: "Chicken Biryani", price: 220 },
      { name: "Veg Biryani", price: 160 },
      { name: "Raita", price: 30 },
    ],
  },
  // 9
  {
    name: "Madpalli Seafood Corner",
    cuisine: "Seafood",
    avgRating: 4.5,
    location: { lat: 13.3453, lng: 74.7390 },
    menu: [
      { name: "Crab Masala", price: 450 },
      { name: "Fish Thokku", price: 300 },
      { name: "Neer Dosa (3 pcs)", price: 120 },
    ],
  },
  // 10
  {
    name: "Coorg Spice & Dosa",
    cuisine: "South Indian",
    avgRating: 4.1,
    location: { lat: 13.3396, lng: 74.7440 },
    menu: [
      { name: "Masala Dosa", price: 85 },
      { name: "Uttapam", price: 90 },
      { name: "Filter Coffee", price: 35 },
    ],
  },
  // 11
  {
    name: "Sea Salt - Beachside",
    cuisine: "Seafood / Continental",
    avgRating: 4.4,
    location: { lat: 13.3502, lng: 74.7355 },
    menu: [
      { name: "Grilled Pomfret", price: 420 },
      { name: "Prawn Curry", price: 330 },
      { name: "French Fries", price: 110 },
    ],
  },
  // 12
  {
    name: "Rose Mangalore Bun",
    cuisine: "Coastal / Snacks",
    avgRating: 4.2,
    location: { lat: 13.3470, lng: 74.7410 },
    menu: [
      { name: "Mangalore Bun", price: 50 },
      { name: "Chicken Sukka", price: 240 },
      { name: "Tea", price: 20 },
    ],
  },
  // 13
  {
    name: "Udupi Spice Thali",
    cuisine: "Udupi / Thali",
    avgRating: 4.3,
    location: { lat: 13.3422, lng: 74.7460 },
    menu: [
      { name: "Veg Thali", price: 140 },
      { name: "Extra Chapati", price: 12 },
      { name: "Buttermilk", price: 25 },
    ],
  },
  // 14
  {
    name: "Rama's Coastal Kitchen",
    cuisine: "Seafood",
    avgRating: 4.5,
    location: { lat: 13.3490, lng: 74.7368 },
    menu: [
      { name: "Fish Curry Rice", price: 260 },
      { name: "Prawn Pepper Fry", price: 350 },
      { name: "Appam", price: 60 },
    ],
  },
  // 15
  {
    name: "Sagar Veg Restaurant",
    cuisine: "Vegetarian",
    avgRating: 4.0,
    location: { lat: 13.3412, lng: 74.7396 },
    menu: [
      { name: "Chapati Sabzi", price: 100 },
      { name: "Mixed Veg Fry", price: 120 },
      { name: "Sweet Pongal", price: 40 },
    ],
  },
  // 16
  {
    name: "Malpe Waves Cafe",
    cuisine: "Cafe / Seafood",
    avgRating: 4.4,
    location: { lat: 13.3555, lng: 74.7308 },
    menu: [
      { name: "Grilled Fish Sandwich", price: 220 },
      { name: "Iced Coffee", price: 120 },
      { name: "Veg Wrap", price: 140 },
    ],
  },
  // 17
  {
    name: "Hotel Neelam - Udupi",
    cuisine: "South Indian",
    avgRating: 4.1,
    location: { lat: 13.3448, lng: 74.7479 },
    menu: [
      { name: "Rava Dosa", price: 85 },
      { name: "Idli Sampler", price: 70 },
      { name: "Sambar Rice", price: 95 },
    ],
  },
  // 18
  {
    name: "Shree Krishna Bhavan",
    cuisine: "Udupi",
    avgRating: 4.3,
    location: { lat: 13.3416, lng: 74.7438 },
    menu: [
      { name: "Masala Dosa", price: 80 },
      { name: "Kesari", price: 40 },
      { name: "Filter Coffee", price: 30 },
    ],
  },
  // 19
  {
    name: "Anand Sea Foods",
    cuisine: "Seafood",
    avgRating: 4.6,
    location: { lat: 13.3520, lng: 74.7345 },
    menu: [
      { name: "Prawn Balchao", price: 330 },
      { name: "Fried Pomfret", price: 420 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 20
  {
    name: "Ruchi Family Restaurant",
    cuisine: "Indian / Vegetarian",
    avgRating: 4.0,
    location: { lat: 13.3456, lng: 74.7455 },
    menu: [
      { name: "Paneer Tikka", price: 210 },
      { name: "Dal Fry", price: 110 },
      { name: "Tiffin Plate", price: 95 },
    ],
  },
  // 21
  {
    name: "Malpe Beach Shack",
    cuisine: "Seafood / Snacks",
    avgRating: 4.3,
    location: { lat: 13.3590, lng: 74.7285 },
    menu: [
      { name: "Grilled Prawns", price: 320 },
      { name: "Fish Fry", price: 240 },
      { name: "Coconut Water", price: 60 },
    ],
  },
  // 22
  {
    name: "Sree Sagar Biryani",
    cuisine: "Biryani",
    avgRating: 4.2,
    location: { lat: 13.3382, lng: 74.7408 },
    menu: [
      { name: "Mutton Biryani", price: 320 },
      { name: "Chicken 65", price: 180 },
      { name: "Raita", price: 30 },
    ],
  },
  // 23
  {
    name: "Kote Marine Delicacies",
    cuisine: "Seafood",
    avgRating: 4.5,
    location: { lat: 13.3542, lng: 74.7326 },
    menu: [
      { name: "Crab Ghee Roast", price: 480 },
      { name: "Squid Fry", price: 290 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 24
  {
    name: "Ravindra's Veg Corner",
    cuisine: "Vegetarian",
    avgRating: 3.9,
    location: { lat: 13.3406, lng: 74.7488 },
    menu: [
      { name: "Veg Pulav", price: 120 },
      { name: "Paneer Bhurji", price: 180 },
      { name: "Curd Rice", price: 60 },
    ],
  },
  // 25
  {
    name: "Udupi Spice Lounge",
    cuisine: "Multi-cuisine",
    avgRating: 4.1,
    location: { lat: 13.3430, lng: 74.7418 },
    menu: [
      { name: "Chicken Korma", price: 240 },
      { name: "Veg Fried Rice", price: 140 },
      { name: "Schezwan Noodles", price: 150 },
    ],
  },
  // 26
  {
    name: "Coastal Curry House",
    cuisine: "Seafood",
    avgRating: 4.4,
    location: { lat: 13.3499, lng: 74.7370 },
    menu: [
      { name: "Fish Curry with Rice", price: 260 },
      { name: "Prawn Masala", price: 340 },
      { name: "Appam", price: 70 },
    ],
  },
  // 27
  {
    name: "Hotel Sagarika",
    cuisine: "South Indian",
    avgRating: 4.0,
    location: { lat: 13.3461, lng: 74.7450 },
    menu: [
      { name: "Plain Dosa", price: 45 },
      { name: "Masala Uttapam", price: 95 },
      { name: "Filter Coffee", price: 30 },
    ],
  },
  // 28
  {
    name: "Mangala Kitchen",
    cuisine: "Coastal",
    avgRating: 4.2,
    location: { lat: 13.3485, lng: 74.7400 },
    menu: [
      { name: "Bombil Fry", price: 260 },
      { name: "Chicken Sukka", price: 240 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 29
  {
    name: "Cafe Coconut Grove",
    cuisine: "Cafe",
    avgRating: 4.3,
    location: { lat: 13.3410, lng: 74.7380 },
    menu: [
      { name: "Cold Coffee", price: 120 },
      { name: "Veg Wrap", price: 140 },
      { name: "Blueberry Muffin", price: 90 },
    ],
  },
  // 30
  {
    name: "Kamat Upachar - Udupi",
    cuisine: "Udupi / South Indian",
    avgRating: 4.2,
    location: { lat: 13.3428, lng: 74.7442 },
    menu: [
      { name: "Poori Sagu", price: 80 },
      { name: "Tomato Saar", price: 40 },
      { name: "Kesari", price: 40 },
    ],
  },
  // 31
  {
    name: "Sree Krishna Seafoods",
    cuisine: "Seafood",
    avgRating: 4.5,
    location: { lat: 13.3505, lng: 74.7332 },
    menu: [
      { name: "Garlic Prawns", price: 340 },
      { name: "Surmai Fry", price: 360 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 32
  {
    name: "Dosa Plaza - Udupi",
    cuisine: "Dosa / South Indian",
    avgRating: 4.0,
    location: { lat: 13.3392, lng: 74.7415 },
    menu: [
      { name: "Cheese Masala Dosa", price: 120 },
      { name: "Onion Uttapam", price: 95 },
      { name: "Ghee Roast", price: 110 },
    ],
  },
  // 33
  {
    name: "Bhavana's Kitchen",
    cuisine: "Vegetarian",
    avgRating: 4.1,
    location: { lat: 13.3439, lng: 74.7480 },
    menu: [
      { name: "Veg Thali", price: 130 },
      { name: "Mysore Bonda", price: 50 },
      { name: "Pal Payasam", price: 60 },
    ],
  },
  // 34
  {
    name: "Nalin's Coastal Bites",
    cuisine: "Seafood",
    avgRating: 4.3,
    location: { lat: 13.3560, lng: 74.7292 },
    menu: [
      { name: "Prawn Ghee Roast", price: 350 },
      { name: "Kori Rotti", price: 260 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 35
  {
    name: "Udupi Palace",
    cuisine: "Udupi / Banquets",
    avgRating: 4.2,
    location: { lat: 13.3440, lng: 74.7459 },
    menu: [
      { name: "Veg Meals", price: 140 },
      { name: "Paneer Butter Masala", price: 210 },
      { name: "Chapati", price: 10 },
    ],
  },
  // 36
  {
    name: "Fresh Catch - Malpe",
    cuisine: "Seafood",
    avgRating: 4.6,
    location: { lat: 13.3620, lng: 74.7245 },
    menu: [
      { name: "Pomfret Fry", price: 420 },
      { name: "Fish Curry", price: 260 },
      { name: "Prawn Fry", price: 330 },
    ],
  },
  // 37
  {
    name: "Hotel Shiva - Town",
    cuisine: "South Indian",
    avgRating: 3.9,
    location: { lat: 13.3418, lng: 74.7402 },
    menu: [
      { name: "Idli Sambar", price: 50 },
      { name: "Rava Kesari", price: 40 },
      { name: "Sambar Vada", price: 70 },
    ],
  },
  // 38
  {
    name: "Kala Katta Seafood",
    cuisine: "Seafood",
    avgRating: 4.4,
    location: { lat: 13.3538, lng: 74.7360 },
    menu: [
      { name: "Bombil Fry", price: 260 },
      { name: "Crab Roast", price: 480 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 39
  {
    name: "Laxmi Sweets & Snacks",
    cuisine: "Sweets / Snacks",
    avgRating: 4.1,
    location: { lat: 13.3420, lng: 74.7470 },
    menu: [
      { name: "Jilebi", price: 60 },
      { name: "Mysore Pak", price: 80 },
      { name: "Samosa", price: 25 },
    ],
  },
  // 40
  {
    name: "Udupi Veg Corner",
    cuisine: "Vegetarian",
    avgRating: 3.9,
    location: { lat: 13.3402, lng: 74.7390 },
    menu: [
      { name: "Veg Cutlet", price: 40 },
      { name: "Curd Rice", price: 60 },
      { name: "Rasam", price: 30 },
    ],
  },
  // 41
  {
    name: "Spice Route - Malpe Road",
    cuisine: "Multi-cuisine",
    avgRating: 4.2,
    location: { lat: 13.3508, lng: 74.7336 },
    menu: [
      { name: "Chicken Chettinad", price: 260 },
      { name: "Veg Kolhapuri", price: 180 },
      { name: "Garlic Naan", price: 40 },
    ],
  },
  // 42
  {
    name: "Dolphin Bay Cafe",
    cuisine: "Cafe / Seafood",
    avgRating: 4.3,
    location: { lat: 13.3585, lng: 74.7278 },
    menu: [
      { name: "Seafood Platter", price: 560 },
      { name: "Lemon Iced Tea", price: 80 },
      { name: "Grilled Fish", price: 320 },
    ],
  },
  // 43
  {
    name: "Swathi Delicacies",
    cuisine: "Vegetarian",
    avgRating: 4.0,
    location: { lat: 13.3433, lng: 74.7430 },
    menu: [
      { name: "Puliyogare", price: 70 },
      { name: "Ragi Mudde (side)", price: 40 },
      { name: "Saaru", price: 30 },
    ],
  },
  // 44
  {
    name: "Madras Cafe",
    cuisine: "South Indian",
    avgRating: 4.1,
    location: { lat: 13.3411, lng: 74.7425 },
    menu: [
      { name: "Idli Sambhar", price: 50 },
      { name: "Filter Coffee", price: 30 },
      { name: "Pongal", price: 60 },
    ],
  },
  // 45
  {
    name: "Harshini's Home Foods",
    cuisine: "Homestyle",
    avgRating: 4.2,
    location: { lat: 13.3450, lng: 74.7468 },
    menu: [
      { name: "Home-style Rice & Sambar", price: 120 },
      { name: "Veg Kurma", price: 110 },
      { name: "Payasam", price: 50 },
    ],
  },
  // 46
  {
    name: "Ocean's Catch - Malpe",
    cuisine: "Seafood",
    avgRating: 4.5,
    location: { lat: 13.3598, lng: 74.7270 },
    menu: [
      { name: "Grilled Prawns", price: 340 },
      { name: "Fish Curry", price: 260 },
      { name: "Rice", price: 30 },
    ],
  },
  // 47
  {
    name: "Hotel Padmini",
    cuisine: "Vegetarian",
    avgRating: 3.8,
    location: { lat: 13.3436, lng: 74.7487 },
    menu: [
      { name: "Chapathi & Sabzi", price: 100 },
      { name: "Veg Cutlet", price: 45 },
      { name: "Sweet Pongal", price: 40 },
    ],
  },
  // 48
  {
    name: "Sagar Samrat",
    cuisine: "Seafood",
    avgRating: 4.4,
    location: { lat: 13.3512, lng: 74.7351 },
    menu: [
      { name: "Prawn Curry", price: 320 },
      { name: "Squid Masala", price: 280 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 49
  {
    name: "Shradha Veg Restaurant",
    cuisine: "Vegetarian",
    avgRating: 4.0,
    location: { lat: 13.3425, lng: 74.7416 },
    menu: [
      { name: "Bisibelebath", price: 90 },
      { name: "Bajjis", price: 60 },
      { name: "Curd Rice", price: 60 },
    ],
  },
  // 50
  {
    name: "Kumble's Coastal Restaurant",
    cuisine: "Seafood",
    avgRating: 4.5,
    location: { lat: 13.3549, lng: 74.7317 },
    menu: [
      { name: "Prawn Curry", price: 330 },
      { name: "Fish Fry", price: 260 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 51
  {
    name: "Cafe Harbour Lights",
    cuisine: "Cafe",
    avgRating: 4.2,
    location: { lat: 13.3565, lng: 74.7280 },
    menu: [
      { name: "Espresso", price: 100 },
      { name: "Avocado Toast", price: 160 },
      { name: "Chocolate Brownie", price: 90 },
    ],
  },
  // 52
  {
    name: "Anjappar Chettinad (Udupi)",
    cuisine: "Chettinad",
    avgRating: 4.1,
    location: { lat: 13.3399, lng: 74.7446 },
    menu: [
      { name: "Chettinad Chicken", price: 260 },
      { name: "Karaikudi Biryani", price: 300 },
      { name: "Parotta", price: 30 },
    ],
  },
  // 53
  {
    name: "Udupi Sweet House",
    cuisine: "Sweets",
    avgRating: 4.3,
    location: { lat: 13.3422, lng: 74.7405 },
    menu: [
      { name: "Mysorepak", price: 80 },
      { name: "Payasam", price: 50 },
      { name: "Kesari", price: 40 },
    ],
  },
  // 54
  {
    name: "Coastal Tadka",
    cuisine: "Multi-cuisine",
    avgRating: 4.0,
    location: { lat: 13.3477, lng: 74.7422 },
    menu: [
      { name: "Mixed Seafood Platter", price: 520 },
      { name: "Veg Fried Rice", price: 140 },
      { name: "Chicken 65", price: 180 },
    ],
  },
  // 55
  {
    name: "Sea Breeze Restaurant",
    cuisine: "Seafood",
    avgRating: 4.4,
    location: { lat: 13.3589, lng: 74.7265 },
    menu: [
      { name: "Grilled Pomfret", price: 420 },
      { name: "Prawns Masala", price: 340 },
      { name: "Neer Dosa", price: 50 },
    ],
  },
  // 56
  {
    name: "Town Tiffins",
    cuisine: "South Indian",
    avgRating: 4.0,
    location: { lat: 13.3415, lng: 74.7409 },
    menu: [
      { name: "Masala Dosa", price: 75 },
      { name: "Idli Vada", price: 60 },
      { name: "Sambar Rice", price: 95 },
    ],
  },
  // 57
  {
    name: "Fishy Flavours",
    cuisine: "Seafood",
    avgRating: 4.3,
    location: { lat: 13.3550, lng: 74.7330 },
    menu: [
      { name: "Pomfret Curry", price: 360 },
      { name: "Prawns Fry", price: 330 },
      { name: "Rice", price: 30 },
    ],
  },
  // 58
  {
    name: "Udupi Urban Cafe",
    cuisine: "Cafe / Bakery",
    avgRating: 4.1,
    location: { lat: 13.3434, lng: 74.7436 },
    menu: [
      { name: "Cappuccino", price: 120 },
      { name: "Grilled Sandwich", price: 140 },
      { name: "Blueberry Cheesecake", price: 130 },
    ],
  },
  // 59
  {
    name: "Bhatkal Spice Corner",
    cuisine: "Coastal",
    avgRating: 4.2,
    location: { lat: 13.3492, lng: 74.7397 },
    menu: [
      { name: "Mutton Sukka", price: 300 },
      { name: "Neer Dosa", price: 50 },
      { name: "Prawn Fry", price: 330 },
    ],
  },
  // 60
  {
    name: "Lakshmi Family Dining",
    cuisine: "Vegetarian",
    avgRating: 3.9,
    location: { lat: 13.3419, lng: 74.7461 },
    menu: [
      { name: "Plain Rice & Sambar", price: 80 },
      { name: "Mixed Veg Curry", price: 120 },
      { name: "Payasam", price: 45 },
    ],
  }
];

async function seed() {
  try {
    await connectDB();
    await Restaurant.deleteMany();
    console.log("Cleared old restaurants");
    await Restaurant.insertMany(restaurants);
    console.log("Inserted", restaurants.length, "restaurants into DB");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
