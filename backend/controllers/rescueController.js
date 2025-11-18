// backend/controllers/rescueController.js
const mongoose = require("mongoose");
const NGO = require("../models/NGO");
const Donation = require("../models/Donation");

/**
 * POST /api/rescue/donate
 * Body (JSON):
 * {
 *   donorId (optional),
 *   donorName (optional),
 *   foodType,           // required
 *   quantity,           // required (Number)
 *   pickupLng,          // required (Number)
 *   pickupLat,          // required (Number)
 *   pickupInstructions (optional)
 * }
 *
 * Behavior (baseline):
 * - Save donation with status "Pending"
 * - Search NGOs that:
 *    - accept the given foodType
 *    - availability == true
 *    - capacityCurrent >= quantity
 *    - within 15 km
 * - Attempt to atomically decrement NGO.capacityCurrent and assign the donation
 * - If assigned -> update donation.assignedNgoId and donation.status = "Assigned"
 * - If none found -> leave donation as Pending and return that message
 */
exports.submitDonation = async (req, res) => {
  try {
    const {
      donorId,
      donorName,
      foodType,
      quantity,
      pickupLng,
      pickupLat,
      pickupInstructions
    } = req.body;

    // basic validation
    if (!foodType || !quantity || pickupLng === undefined || pickupLat === undefined) {
      return res.status(400).json({ message: "Missing required fields: foodType, quantity, pickupLng, pickupLat" });
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Create donation (Pending)
    const donation = new Donation({
      donorId: donorId || null,
      donorName: donorName || "",
      foodType,
      quantity: qty,
      pickupInstructions: pickupInstructions || "",
      pickupLocation: {
        type: "Point",
        coordinates: [Number(pickupLng), Number(pickupLat)]
      },
      status: "Pending"
    });

    await donation.save();

    // Search for NGOs within 15 km (= 15000 meters)
    const maxDistanceMeters = 15000;

    // Use aggregation with $geoNear (requires NGO.location 2dsphere index)
    const ngos = await NGO.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [Number(pickupLng), Number(pickupLat)] },
          distanceField: "dist.calculated",
          spherical: true,
          maxDistance: maxDistanceMeters,
          query: {
            acceptedFoodTypes: foodType,
            availability: true,
            capacityCurrent: { $gte: qty }
          }
        }
      },
      { $sort: { "dist.calculated": 1 } },
      { $limit: 10 }
    ]);

    if (!ngos || ngos.length === 0) {
      // No eligible NGO found within 15km
      return res.status(200).json({
        message: "Donation recorded (Pending). No eligible NGO found within 15 km.",
        donation
      });
    }

    // Try to reserve capacity atomically
    let assignedNgo = null;
    for (const ng of ngos) {
      const updated = await NGO.findOneAndUpdate(
        { _id: ng._id, capacityCurrent: { $gte: qty }, availability: true },
        { $inc: { capacityCurrent: -qty } },
        { new: true }
      );
      if (updated) {
        assignedNgo = updated;
        break;
      }
      // if reservation failed due to race condition, try next NGO
    }

    if (!assignedNgo) {
      return res.status(200).json({
        message: "Donation recorded (Pending). No NGO could be reserved right now (race condition).",
        donation
      });
    }

    // Update donation to Assigned
    donation.assignedNgoId = assignedNgo._id;
    donation.status = "Assigned";
    await donation.save();

    return res.status(200).json({
      message: "Donation recorded and assigned to NGO.",
      donation,
      assignedNgo: {
        id: assignedNgo._id,
        name: assignedNgo.name,
        contact: assignedNgo.contact,
        address: assignedNgo.address,
        remainingCapacity: assignedNgo.capacityCurrent
      }
    });

  } catch (err) {
    console.error("rescue.submitDonation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
