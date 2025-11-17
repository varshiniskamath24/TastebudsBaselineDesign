const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/place", async (req, res) => {
  try {
    const { userId, items } = req.body;
    const total = items.reduce((a, b) => a + b.price, 0);

    const order = await Order.create({
      userId,
      items,
      total,
      status: "placed"
    });

    res.json(order);
  } catch (err) {
    console.error("Order place error:", err);
    res.status(500).json({ msg: "Order failed" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).lean();
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ msg: "Failed to get orders" });
  }
});

module.exports = router;
