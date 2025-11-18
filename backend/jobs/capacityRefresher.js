// backend/jobs/capacityRefresher.js
const NGO = require("../models/NGO");

/**
 * This job randomly adjusts NGO.capacityCurrent every intervalMs.
 * It ensures 0 <= capacityCurrent <= capacityMax.
 * Purpose: to simulate capacity changes for demo/testing.
 */
function startCapacityRefresher({ intervalMs = 60_000 } = {}) {
  console.log("[CapacityRefresher] starting with intervalMs =", intervalMs);

  async function tick() {
    try {
      // pick a few NGOs at random
      const ngos = await NGO.find({}).limit(10).lean();
      for (const ng of ngos) {
        // random change between -5 and +10 (kg)
        const delta = Math.floor(Math.random() * 16) - 5;
        let newCap = (ng.capacityCurrent || 0) + delta;
        if (newCap < 0) newCap = 0;
        if (ng.capacityMax && newCap > ng.capacityMax) newCap = ng.capacityMax;

        await NGO.findByIdAndUpdate(ng._id, { capacityCurrent: newCap });
      }
      // optionally log
      // console.log("[CapacityRefresher] ticked");
    } catch (err) {
      console.error("[CapacityRefresher] error:", err);
    }
  }

  const id = setInterval(tick, intervalMs);
  // return stop function
  return () => clearInterval(id);
}

module.exports = { startCapacityRefresher };
