// src/components/DonateModern.js
import React, { useState } from "react";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import SuccessAnimation from "./SuccessAnimation";
import NGOMap from "./NGOMap";

export default function DonateModern({ token }) {
  const [foodType, setFoodType] = useState("cooked");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");

  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [assignedNgo, setAssignedNgo] = useState(null);
  const [donationMsg, setDonationMsg] = useState("");

  const [pickupCoords, setPickupCoords] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  function openConfirm(e) {
    e.preventDefault();

    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      setDonationMsg("Enter a valid quantity.");
      return;
    }

    setConfirmOpen(true);
  }

  async function doDonate() {
    setConfirmOpen(false);
    setLoading(true);
    setDonationMsg("");

    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          p => resolve(p),
          err => reject(err)
        );
      });

      const payload = {
        foodType,
        quantity: Number(quantity),
        pickupLat: pos.coords.latitude,
        pickupLng: pos.coords.longitude,
        pickupInstructions: instructions
      };

      const res = await axios.post(
        "http://localhost:5000/api/rescue/donate",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDonationMsg(res.data.message || "Donation submitted");

      if (res.data.assignedNgo) {
        setAssignedNgo(res.data.assignedNgo);
        setPickupCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });

        // 🔥 Trigger success animation
        setSuccessOpen(true);
      } else {
        setAssignedNgo(null);
      }
    } catch (err) {
      console.error(err);
      setDonationMsg(
        "Donation failed: " +
          (err?.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 8px 30px rgba(16,24,40,0.06)"
          }}
        >
          <h1 style={{ textAlign: "center", marginTop: 0 }}>
            Donate Surplus Food
          </h1>
          <p style={{ textAlign: "center", color: "#444" }}>
            {donationMsg}
          </p>

          <form
            onSubmit={openConfirm}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              alignItems: "end"
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: 6 }}>
                Food Type
              </label>
              <select
                value={foodType}
                onChange={e => setFoodType(e.target.value)}
                style={inputStyle}
              >
                <option value="cooked">Cooked</option>
                <option value="packaged">Packaged</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6 }}>
                Quantity (kg)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                style={inputStyle}
                placeholder="e.g., 5"
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", marginBottom: 6 }}>
                Pickup Instructions (optional)
              </label>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                style={{ ...inputStyle, minHeight: 80 }}
                placeholder="Back gate, call manager"
              />
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                marginTop: 8
              }}
            >
              <button
                className="primary-btn"
                style={{ padding: "10px 18px" }}
                disabled={loading}
              >
                {loading ? "Submitting…" : "Donate Now"}
              </button>
            </div>
          </form>
        </div>

        {/* Assigned NGO + Map */}
        {assignedNgo && (
          <div style={{ marginTop: 18 }}>
            <div
              style={{
                background: "#fff",
                padding: 16,
                borderRadius: 12,
                boxShadow: "0 8px 30px rgba(16,24,40,0.06)"
              }}
            >
              <h3 style={{ marginTop: 0 }}>Assigned NGO</h3>

              <div
                style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
              >
                <div style={{ flex: "1 1 320px" }}>
                  <p>
                    <b>Name:</b> {assignedNgo.name}
                  </p>
                  <p>
                    <b>Phone:</b>{" "}
                    {assignedNgo.contact?.phone || "N/A"}
                  </p>
                  <p>
                    <b>Address:</b>{" "}
                    {assignedNgo.address || "N/A"}
                  </p>
                  <p>
                    <b>Remaining Capacity:</b>{" "}
                    {assignedNgo.remainingCapacity}
                  </p>
                </div>

                <div style={{ flex: "1 1 320px" }}>
                  <NGOMap
                    assignedNgo={assignedNgo}
                    pickup={pickupCoords}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Confirm Donation"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDonate}
        confirmText="Confirm & Donate"
        loading={loading}
      >
        <div>
          <p style={{ margin: 0 }}>
            <b>Food Type:</b> {foodType}
          </p>
          <p style={{ margin: 0 }}>
            <b>Quantity:</b> {quantity} kg
          </p>

          <p style={{ marginTop: 8 }}>
            {instructions ? (
              <span>
                <b>Instructions:</b> {instructions}
              </span>
            ) : (
              <em>No instructions</em>
            )}
          </p>

          <p style={{ marginTop: 8 }}>
            <small>
              We will look for NGOs within 15 km who accept this food
              type and have capacity.
            </small>
          </p>
        </div>
      </ConfirmModal>

      {/* SUCCESS POPUP */}
      {successOpen && (
        <SuccessAnimation onClose={() => setSuccessOpen(false)} />
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #ddd",
  boxSizing: "border-box"
};
