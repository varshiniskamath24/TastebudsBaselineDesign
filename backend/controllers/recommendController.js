const Restaurant = require("../models/Restaurant");

exports.getRecommendations = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ avgRating: -1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching recommendations" });
  }
};
