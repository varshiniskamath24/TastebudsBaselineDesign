const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Missing username or password" });
    }

    // check if user exists
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // save user
    const user = await User.create({
      username,
      password: hashed,
    });

    res.json({ msg: "Registration successful", user });
  } catch (err) {
    console.error("🔥 REGISTRATION ERROR:", err);
    res.status(500).json({ msg: "Error registering user", error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid username" });

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Incorrect password" });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      msg: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
};
