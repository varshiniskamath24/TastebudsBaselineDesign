const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// GET restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id).lean();

    if (!r) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    res.json(r);
  } catch (err) {
    console.error("restaurant get error:", err);
    res.status(500).json({ msg: "Error fetching restaurant" });
  }
});

module.exports = router;
