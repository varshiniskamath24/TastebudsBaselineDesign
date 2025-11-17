const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json({ msg: "Order saved", order });
  } catch (err) {
    res.status(500).json({ msg: "Error placing order" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching orders" });
  }
};
