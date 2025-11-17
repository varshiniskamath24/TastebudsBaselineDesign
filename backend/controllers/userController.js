import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Missing fields" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User exists" });
    const user = await User.create({ email, password });
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ msg: "Error", err: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Missing fields" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Error", err: err.message });
  }
};
