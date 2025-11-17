import React, { useState } from "react";
import axios from "axios";
import RestaurantDetails from "./RestaurantDetails";

export default function FindFood({ token, setPage }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchLocation() {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await axios.get("http://localhost:5000/api/recommend", {
          params: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        setRestaurants(res.data || []);
      } catch (err) {
        console.log("Recommend error:", err);
      }
      setLoading(false);
    });
  }

  // If restaurant is selected → show details
  if (selectedId) {
    return (
      <RestaurantDetails
        id={selectedId}
        goBack={() => setSelectedId(null)}
        openCart={() => setPage("cart")}   // ⭐ FIX HERE
      />
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Find Food Near You 🍽️</h1>

      <button className="primary-btn" onClick={fetchLocation}>
        {loading ? "Finding..." : "Use My Location"}
      </button>

      <div className="restaurant-list">
  {restaurants.map((r) => {
    const id = r.restaurant?._id || r._id;

    return (
      <div
        key={id}
        className="restaurant-card"
        onClick={() => setSelectedId(id)}
      >
        <div className="rest-left">
          <div className="rest-name">{r.restaurant?.name || r.name}</div>
          <div className="rest-cuisine">
            Cuisine: {r.restaurant?.cuisine || r.cuisine}
          </div>
        </div>

        <div className="rest-right">
          <div className="rest-rating">⭐ {r.restaurant?.avgRating || r.avgRating}</div>
          <div className="rest-distance">
            {(r.distanceKm || 0).toFixed(2)} km
          </div>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
}
