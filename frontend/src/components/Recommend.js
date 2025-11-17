import React, { useState } from "react";
import axios from "axios";

export default function Recommend({ token }) {
  const [lat, setLat] = useState(12.9716);
  const [lng, setLng] = useState(77.5946);
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState("");

  async function getRec() {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/recommend",
        { lat, lng },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResults(res.data);
      setMsg("Recommendations generated based on your location.");
    } catch {
      setMsg("Failed to fetch recommendations.");
    }
  }

  return (
    <div className="card">
      <h3>Find Food Near You</h3>

      {msg && <div className="alert alert-success">{msg}</div>}

      <input value={lat} onChange={(e) => setLat(e.target.value)} />
      <input value={lng} onChange={(e) => setLng(e.target.value)} />
      <button onClick={getRec}>Search</button>

      {results.map((r) => (
        <div key={r.id} className="card">
          <b>{r.name}</b>
          <p>{r.cuisine}</p>
          <p>⭐ {r.avgRating}</p>
          <p>{r.distance.toFixed(2)} km away</p>
        </div>
      ))}
    </div>
  );
}
