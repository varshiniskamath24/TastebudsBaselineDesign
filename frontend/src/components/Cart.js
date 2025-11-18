// src/components/Cart.js
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Cart({ token, goBack }) {
  const { cart, clearCart, incQty, decQty, removeFromCart, total } = useCart();

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ratingRestaurantId, setRatingRestaurantId] = useState(null);

  if (!cart || cart.length === 0)
    return (
      <div className="page-container">
        <h3>Your cart is empty</h3>
        <button className="primary-btn back-btn" onClick={() => goBack?.()}>
          ← Back
        </button>
      </div>
    );

  async function placeOrder() {
    try {
      await axios.post(
        "http://localhost:5000/api/orders/place",
        { userId: "demoUser", items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");

      const restId = cart[0].restaurantId;
      setRatingRestaurantId(restId);
      setShowRatingModal(true);

    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  }

  async function submitRating() {
    try {
      await axios.post(
        `http://localhost:5000/api/rating/${ratingRestaurantId}/rate`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Thank you for your feedback!");

      setShowRatingModal(false);
      setRating(0);
      setComment("");
      clearCart();
      if (goBack) goBack();

    } catch (err) {
      console.error(err);
      alert("Failed to submit rating");
    }
  }

  return (
    <div className="page-container">
      <h2>Your Cart</h2>

      {cart.map((it, i) => (
        <div
          className="card"
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="card-title">{it.name}</div>
            <div className="card-sub">
              ₹ {it.price} × {it.qty} = ₹ {it.price * it.qty}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              className="qty-btn"
              onClick={() =>
                decQty({ restaurantId: it.restaurantId, name: it.name })
              }
            >
              −
            </button>

            <div className="qty-number">{it.qty}</div>

            <button
              className="qty-btn"
              onClick={() =>
                incQty({ restaurantId: it.restaurantId, name: it.name })
              }
            >
              +
            </button>

            <button
              className="remove-btn"
              onClick={() =>
                removeFromCart({ restaurantId: it.restaurantId, name: it.name })
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 14 }}>Total: ₹ {total}</h3>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
        <button className="primary-btn" onClick={placeOrder}>
          Place Order
        </button>
        <button className="remove-btn" onClick={clearCart}>
          Clear
        </button>
      </div>

      {/* ⭐⭐⭐ STAR RATING MODAL ⭐⭐⭐ */}
      {showRatingModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: "center" }}>
            <h3 style={{ marginBottom: 10 }}>Rate This Restaurant</h3>

            {/* ⭐ STAR SELECTOR */}
            <div style={{ marginBottom: 15 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    fontSize: 32,
                    cursor: "pointer",
                    marginRight: 5,
                    color:
                      (hoverRating || rating) >= star ? "#ffd700" : "#ccc",
                  }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Write a comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: "100%",
                height: 90,
                padding: 10,
                marginBottom: 15,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />

            {/* Buttons with spacing */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                className="primary-btn"
                disabled={rating === 0}
                onClick={submitRating}
              >
                Submit Rating
              </button>

              <button
                className="remove-btn"
                onClick={() => setShowRatingModal(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
