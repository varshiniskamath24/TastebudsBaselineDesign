const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Haversine distance
function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

router.get("/", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng)
      return res
        .status(400)
        .json({ msg: "Latitude & Longitude required" });

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    const restaurants = await Restaurant.find().lean();

    // 🚀 DO NOT FILTER BY DISTANCE — SHOW ALL LIKE ZOMATO/SWIGGY
    const results = restaurants
      .map((r) => {
        const rlat = r.location?.lat || 0;
        const rlng = r.location?.lng || 0;
        const distanceKm = haversineKm(userLat, userLng, rlat, rlng);

        // simple scoring: rating + distance factor
        const score = (r.avgRating || 3) - distanceKm * 0.05;

        return {
          ...r,
          distanceKm,
          score,
        };
      })
      .sort((a, b) => b.score - a.score); // highest score first

    res.json(results.slice(0, 20)); // send top 20
  } catch (err) {
    console.error("Recommend error:", err);
    res.status(500).json({ msg: "Failed to fetch restaurants" });
  }
});

module.exports = router;
