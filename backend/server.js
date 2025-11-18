const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/restaurant", require("./routes/restaurantRoutes"));
// add this line (place after restaurantRoutes require line)
app.use("/api/rating", require("./routes/ratingRoutes"));  // ⭐ ADD THIS

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recommend", require("./routes/recommendRoutes"));
app.use("/api/rescue", require("./routes/rescueRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));  // ← works now
//app.use("/api/feedback", require("./routes/feedbackRoutes"));

// after mongoose.connect(...).then(...)
const { startCapacityRefresher } = require("./jobs/capacityRefresher");
// start refresher with interval 60s for demo
startCapacityRefresher({ intervalMs: 60 * 1000 });
// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected: localhost"))
  .catch((err) => console.log("MongoDB Error:", err));

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
