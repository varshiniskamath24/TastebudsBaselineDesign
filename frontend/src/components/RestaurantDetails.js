// src/components/RestaurantDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import FloatingCartBar from "./FloatingCartBar";

export default function RestaurantDetails({ id, token, goBack }) {
  const [info, setInfo] = useState(null);
  const { cart, addToCart, incQty, decQty, removeFromCart } = useCart();
  const [justAdded, setJustAdded] = useState(null);

  // ⭐ NEW STATE FOR RATING MODAL
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/restaurant/${id}`)
      .then((r) => setInfo(r.data))
      .catch(() => setInfo(null));
  }, [id]);

  // ⭐ AUTO-OPEN RATING MODAL AFTER ORDER
  useEffect(() => {
    const last = localStorage.getItem("latestOrderRestaurant");
    if (last && last === id) {
      setShowRatingModal(true);
      localStorage.removeItem("latestOrderRestaurant");
    }
  }, [id]);

  if (!info)
    return (
      <div className="page-container">
        <p>Loading…</p>
      </div>
    );

  // get cart entry for item
  function cartEntryFor(item) {
    return cart.find(
      (c) => c.restaurantId === info._id && c.name === item.name
    );
  }

  function handleAdd(item, e) {
    if (e) e.stopPropagation();
    addToCart({
      restaurantId: info._id,
      restaurantName: info.name,
      name: item.name,
      price: item.price,
    });
    setJustAdded(item.name);
    setTimeout(() => setJustAdded(null), 1200);
  }

  // ⭐ SUBMIT RATING FUNCTION
  async function submitRating() {
    try {
      await axios.post(
        `http://localhost:5000/api/rating/${id}/rate`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Thanks for your feedback!");
      setShowRatingModal(false);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating");
    }
  }

  return (
    <div className="page-container">
      <button className="primary-btn back-btn" onClick={() => goBack?.()}>
        ← Back
      </button>

      <h2 className="page-title">{info.name}</h2>
      <p className="rest-sub-info">
        Cuisine: {info.cuisine} • ⭐ {info.avgRating}
      </p>

      <h3 className="menu-heading">Menu</h3>

      {info.menu && info.menu.length > 0 ? (
        info.menu.map((m, idx) => {
          const ent = cartEntryFor(m);
          return (
            <div key={idx} className="menu-card">
              <div className="menu-left">
                <div className="menu-title">{m.name}</div>
                <div className="menu-price">₹ {m.price}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {!ent ? (
                  <button
                    className="menu-add-btn"
                    onClick={(e) => handleAdd(m, e)}
                  >
                    + Add
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        decQty({
                          restaurantId: info._id,
                          name: m.name,
                        })
                      }
                    >
                      −
                    </button>
                    <div className="qty-number">{ent.qty}</div>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        incQty({
                          restaurantId: info._id,
                          name: m.name,
                        })
                      }
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart({
                          restaurantId: info._id,
                          name: m.name,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No menu items.</p>
      )}

      {justAdded && <div className="inline-msg">{justAdded} added ✔</div>}

      {/* Floating cart bar */}
      <FloatingCartBar />

      {/* ⭐⭐⭐ RATING MODAL ⭐⭐⭐ */}
      {showRatingModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Rate This Restaurant</h3>

            <div style={{ marginBottom: 10 }}>
              <label>Rating: </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="0">Select rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐ 2</option>
                <option value="3">⭐ 3</option>
                <option value="4">⭐ 4</option>
                <option value="5">⭐ 5</option>
              </select>
            </div>

            <textarea
              placeholder="Write a comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: "100%",
                height: 80,
                padding: 8,
                marginBottom: 10,
              }}
            />

            <button
              className="primary-btn"
              onClick={submitRating}
              disabled={rating === 0}
            >
              Submit Rating
            </button>

            <button
              className="remove-btn"
              style={{ marginTop: 8 }}
              onClick={() => setShowRatingModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
