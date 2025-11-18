// src/components/DonationHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DonationHistory({ token }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/rescue/donations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonations(res.data.donations || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  return (
    <div className="page-container">
      <h1 className="page-title">Donation History</h1>
      {loading && <p>Loading…</p>}
      {!loading && donations.length === 0 && <p>No donations recorded yet.</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {donations.map(d => (
          <div key={d._id} className="card" style={{ padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{d.foodType} • {d.quantity} kg</div>
                <div style={{ color: "#555" }}>{new Date(d.createdAt).toLocaleString()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div>Status: <b>{d.status}</b></div>
                <div>NGO: {d.assignedNgoId ? d.assignedNgoId.name : "—"}</div>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div><b>Pickup Instructions:</b> {d.pickupInstructions || "—"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
