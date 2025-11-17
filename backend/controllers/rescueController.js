
const NGO = require("../models/NGO");

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

exports.donateFood = async (req, res) => {
  try {
    const { foodType, quantity, qtyKg, pickupLocation, lat, lng } = req.body;

    const q = qtyKg || quantity || 0;
    const pl = pickupLocation || (lat && lng ? { lat, lng } : null);

    if (!q || !pl) {
      return res.status(400).json({ msg: "qtyKg (or quantity) and pickupLocation required" });
    }

    const ngos = await NGO.find().lean();
    if (!ngos.length) return res.status(404).json({ msg: "No NGOs available" });

    // simple nearest match
    let best = null;
    let bestDist = Infinity;
    ngos.forEach(n => {
      if (!n.location || n.location.lat==null) return;
      const d = haversineKm(pl.lat, pl.lng, n.location.lat, n.location.lng);
      if (d < bestDist) { bestDist = d; best = n; }
    });

    if (!best) return res.status(500).json({ msg: "No suitable NGO found" });

    res.json({ msg: "Donation assigned", ngo: best, distanceKm: bestDist });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ msg: "Error processing donation" });
  }
};
