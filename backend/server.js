const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/restaurant", require("./routes/restaurantRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recommend", require("./routes/recommendRoutes"));
app.use("/api/rescue", require("./routes/rescueRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));  // ← works now
//app.use("/api/feedback", require("./routes/feedbackRoutes"));

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected: localhost"))
  .catch((err) => console.log("MongoDB Error:", err));

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
