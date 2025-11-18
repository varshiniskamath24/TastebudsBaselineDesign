// backend/controllers/rescueController.js
const NGO = require("../models/NGO");
const Donation = require("../models/Donation");

// OPTIONAL Twilio (commented)
// const twilio = require("twilio");
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
// const SMS_FROM = process.env.TWILIO_NUMBER;

function calcDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

exports.submitDonation = async (req, res) => {
  try {
    const { foodType, quantity, pickupLat, pickupLng, pickupInstructions } =
      req.body;

    if (!foodType || !quantity || !pickupLat || !pickupLng) {
      return res.status(400).json({
        message:
          "Missing required fields: foodType, quantity, pickupLat, pickupLng",
      });
    }

    // 1. Store donation first
    const donation = await Donation.create({
      donorId: req.user.id,
      foodType,
      quantity,
      pickupLat,
      pickupLng,
      pickupInstructions,
      status: "Pending",
      timestamp: Date.now(),
    });

    // 2. Find eligible NGOs
    let ngos = await NGO.find({
      acceptedFoodTypes: { $in: [foodType] },
      availability: true,
      remainingCapacity: { $gte: quantity },
    });

    if (ngos.length === 0) {
      return res.json({
        message: "Donation recorded (Pending). No eligible NGO found.",
      });
    }

    // 3. Find nearest NGO (within 15 km)
    ngos = ngos
      .map((ngo) => ({
        ...ngo._doc,
        distance: calcDistance(pickupLat, pickupLng, ngo.lat, ngo.lng),
      }))
      .filter((n) => n.distance <= 15)
      .sort((a, b) => a.distance - b.distance);

    if (ngos.length === 0) {
      return res.json({
        message: "Donation recorded (Pending). No NGO within 15 km.",
      });
    }

    const ngo = ngos[0];

    // 4. Deduct capacity
    ngo.remainingCapacity -= quantity;
    await NGO.findByIdAndUpdate(ngo._id, {
      remainingCapacity: ngo.remainingCapacity,
    });

    // 5. Assign donation
    donation.status = "Assigned";
    donation.assignedNgo = ngo._id;
    await donation.save();

    // 6. Notify NGO (SMS Simulation)
    console.log(
      `📩 SMS to NGO ${ngo.phone}: New donation of ${quantity}kg ${foodType}. Pickup at lat=${pickupLat}, lng=${pickupLng}. Instructions: ${pickupInstructions}`
    );

    // OPTIONAL TWILIO
    /*
    await twilioClient.messages.create({
      body: `New donation: ${quantity}kg ${foodType}. Pickup instructions: ${pickupInstructions}`,
      from: SMS_FROM,
      to: ngo.phone
    });
    */

    res.json({
      message: "Donation recorded and assigned.",
      assignedNgo: {
        _id: ngo._id,
        name: ngo.name,
        phone: ngo.phone,
        address: ngo.address,
        lat: ngo.lat,
        lng: ngo.lng,
        remainingCapacity: ngo.remainingCapacity,
      },
    });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
