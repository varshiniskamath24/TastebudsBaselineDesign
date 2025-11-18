// src/components/NGODonationCard.js
import React from "react";

export default function NGODonationCard({ d, onStatusChange }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 700 }}>{d.foodType} • {d.quantity} kg</div>
          <div style={{ color: "#666", marginTop: 6 }}>{new Date(d.createdAt).toLocaleString()}</div>
          <div style={{ marginTop: 6 }}><b>Pickup:</b> {d.pickupInstructions || "—"}</div>
          <div style={{ marginTop: 6 }}><b>Address:</b> {d.pickupLocation?.address || "—"}</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div>Status: <b>{d.status}</b></div>
          <div style={{ marginTop: 10 }}>
            {d.status !== "PickedUp" && (
              <button className="primary-btn" onClick={() => onStatusChange(d._id, "PickedUp")} style={{ marginRight: 8 }}>
                Mark Picked Up
              </button>
            )}
            {d.status !== "Completed" && (
              <button className="remove-btn" onClick={() => onStatusChange(d._id, "Completed")}>Mark Completed</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
