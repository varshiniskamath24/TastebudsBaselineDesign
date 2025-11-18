// src/components/Donate.js
import React, { useState } from "react";
import axios from "axios";

export default function Donate({ token }) {
  const [foodType, setFoodType] = useState("cooked");
  const [quantity, setQuantity] = useState("");
  const [instructions, setInstructions] = useState("");
  const [assignedNgo, setAssignedNgo] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitDonation(e) {
    e.preventDefault();
    setMsg("");
    setAssignedNgo(null);

    if (!quantity || isNaN(quantity)) {
      setMsg("Please enter a valid quantity.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/rescue/donate",
            {
              foodType,
              quantity: Number(quantity),
              pickupLat: pos.coords.latitude,
              pickupLng: pos.coords.longitude,
              pickupInstructions: instructions,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setMsg(res.data.message || "Donation submitted.");
          if (res.data.assignedNgo) {
            setAssignedNgo(res.data.assignedNgo);
          }
        } catch (err) {
          console.error(err);
          setMsg("Donation failed");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setMsg("Please enable location access.");
        setLoading(false);
      }
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Donate Surplus Food</h1>

      {msg && (
        <div
          className="alert"
          style={{ marginBottom: 16, textAlign: "center", fontSize: 16 }}
        >
          {msg}
        </div>
      )}

      {/* FORM CARD */}
      <form
        className="card"
        onSubmit={submitDonation}
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <label>Food Type</label>
        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          className="input"
        >
          <option value="cooked">Cooked</option>
          <option value="packaged">Packaged</option>
        </select>

        <label>Quantity (kg)</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g., 5"
          className="input"
        />

        <label>Pickup Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g., Back gate, call manager"
          className="input"
          rows={3}
        />

        <button className="primary-btn" disabled={loading}>
          {loading ? "Submitting…" : "Donate"}
        </button>
      </form>

      {/* ASSIGNED NGO CARD */}
      {assignedNgo && (
        <div
          className="card"
          style={{
            marginTop: 24,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 20,
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: 12 }}>
            Assigned NGO
          </h3>

          <p>
            <b>Name:</b> {assignedNgo.name}
          </p>
          <p>
            <b>Phone:</b> {assignedNgo.contact?.phone || "N/A"}
          </p>
          <p>
            <b>Address:</b> {assignedNgo.address || "N/A"}
          </p>
          <p>
            <b>Remaining Capacity:</b> {assignedNgo.remainingCapacity}
          </p>
        </div>
      )}
    </div>
  );
}
