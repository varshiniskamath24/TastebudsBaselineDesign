// src/components/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Cart({ token, goBack }) {
  const { cart, clearCart, incQty, decQty, removeFromCart, total } = useCart();

  if (!cart || cart.length === 0)
    return (
      <div className="page-container">
        <h3>Your cart is empty</h3>
        <button className="primary-btn back-btn" onClick={() => goBack && goBack()}>
          ← Back
        </button>
      </div>
    );

  async function placeOrder() {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders/place",
        { userId: "demoUser", items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed!");
      clearCart();
      if (goBack) goBack();
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  }

  return (
    <div className="page-container">
      <h2>Your Cart</h2>

      {cart.map((it, i) => (
        <div className="card" key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ textAlign: "left" }}>
            <div className="card-title">{it.name}</div>
            <div className="card-sub">
              ₹ {it.price} × {it.qty} = ₹ {it.price * it.qty}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="qty-btn" onClick={() => decQty({ restaurantId: it.restaurantId, name: it.name })}>−</button>
            <div className="qty-number">{it.qty}</div>
            <button className="qty-btn" onClick={() => incQty({ restaurantId: it.restaurantId, name: it.name })}>+</button>
            <button className="remove-btn" onClick={() => removeFromCart({ restaurantId: it.restaurantId, name: it.name })}>Remove</button>
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 14 }}>Total: ₹ {total}</h3>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
        <button className="primary-btn" onClick={placeOrder}>Place Order</button>
        <button className="remove-btn" onClick={clearCart}>Clear</button>
      </div>
    </div>
  );
}
