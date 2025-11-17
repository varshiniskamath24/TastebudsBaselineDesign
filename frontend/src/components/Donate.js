
import React, { useState } from "react";
import axios from "axios";

export default function Donate({ token }) {
  const [foodType, setFoodType] = useState("cooked");
  const [quantity, setQuantity] = useState("");
  const [assigned, setAssigned] = useState(null);
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg(""); setAssigned(null);
    if (!quantity) { setMsg("Enter quantity"); return; }
    navigator.geolocation.getCurrentPosition(async pos=>{
      try {
        const res = await axios.post("http://localhost:5000/api/rescue/donate", {
          foodType,
          qtyKg: Number(quantity),
          pickupLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude }
        });
        setAssigned(res.data.ngo || res.data.assignedTo || null);
        setMsg(res.data.msg || "Assigned");
      } catch (err) {
        console.error(err); setMsg("Donation failed");
      }
    }, ()=> setMsg("Allow location"));
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Donate Surplus Food</h1>
      {msg && <div className="alert">{msg}</div>}
      <form className="card" onSubmit={submit}>
        <label>Food Type</label>
        <select value={foodType} onChange={e=>setFoodType(e.target.value)}>
          <option value="cooked">Cooked</option>
          <option value="packaged">Packaged</option>
        </select>
        <label style={{marginTop:8}}>Quantity (kg)</label>
        <input value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="e.g., 5" />
        <button className="primary-btn" style={{marginTop:12}}>Donate</button>
      </form>

      {assigned && <div className="card" style={{marginTop:12}}>
        <h3>Assigned NGO</h3>
        <p><b>Name:</b> {assigned.name}</p>
      </div>}
    </div>
  );
}
