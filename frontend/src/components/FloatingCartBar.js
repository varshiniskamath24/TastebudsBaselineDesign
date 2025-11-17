// src/components/FloatingCartBar.js
import React from "react";
import { useCart } from "../context/CartContext";

export default function FloatingCartBar({ className }) {
  const { count, total } = useCart();

  if (!count) return null;

  function openCart() {
    // App sets window.openCart = ( ) => setPage('cart')
    if (typeof window.openCart === "function") {
      window.openCart();
    } else {
      // fallback: try to navigate to /cart route if you have routing
      console.warn("openCart not defined on window");
    }
  }

  return (
    <div
      className={"floating-cart-bar " + (className || "")}
      onClick={openCart}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openCart()}
    >
      <span style={{ marginRight: 12 }}>🛒 View Cart ({count})</span>
      <span
        style={{
          background: "white",
          color: "#6c63ff",
          padding: "6px 10px",
          borderRadius: 20,
          fontWeight: 700,
        }}
      >
        ₹ {total}
      </span>
    </div>
  );
}
