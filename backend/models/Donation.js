import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  donorName: String,
  foodType: String,
  quantity: Number,
  pickupLocation: { lat: Number, lng: Number },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO" },
  status: { type: String, default: "pending" }
});

export default mongoose.model("Donation", DonationSchema);
