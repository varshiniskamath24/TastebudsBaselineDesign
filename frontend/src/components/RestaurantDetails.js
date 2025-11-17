// src/components/RestaurantDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import FloatingCartBar from "./FloatingCartBar";

export default function RestaurantDetails({ id, goBack }) {
  const [info, setInfo] = useState(null);
  const { cart, addToCart, incQty, decQty, removeFromCart } = useCart();
  const [justAdded, setJustAdded] = useState(null);

  useEffect(() => {
    setInfo(null);
    axios
      .get(`http://localhost:5000/api/restaurant/${id}`)
      .then((r) => setInfo(r.data))
      .catch((e) => {
        console.error("restaurant fetch error:", e);
        setInfo(null);
      });
  }, [id]);

  if (!info) return <div className="page-container"><p>Loading…</p></div>;

  // helper: get cart entry for a menu item
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
    setTimeout(() => setJustAdded(null), 1400);
  }

  return (
    <div className="page-container">
      <button className="primary-btn back-btn" onClick={() => goBack && goBack()}>
        ← Back
      </button>

      <h2 className="page-title">{info.name}</h2>
      <p className="rest-sub-info">
        Cuisine: {info.cuisine} &nbsp; • &nbsp; ⭐ {info.avgRating}
      </p>

      <h3 className="menu-heading">Menu</h3>

      {info.menu && info.menu.length > 0 ? (
        info.menu.map((m, idx) => {
          const ent = cartEntryFor(m);
          return (
            <div key={idx} className="menu-card" style={{ cursor: "default" }}>
              <div className="menu-left">
                <div className="menu-title">{m.name}</div>
                <div className="menu-price">₹ {m.price}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {!ent ? (
                  <button
                    className="menu-add-btn"
                    onClick={(e) => handleAdd(m, e)}
                    aria-label={`Add ${m.name}`}
                  >
                    + Add
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        decQty({
                          restaurantId: info._id,
                          name: m.name,
                        })
                      }
                      aria-label={`Decrease ${m.name}`}
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
                      aria-label={`Increase ${m.name}`}
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
                      aria-label={`Remove ${m.name}`}
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

      {/* Floating cart bar (shows only when cart has items) */}
      <FloatingCartBar />
    </div>
  );
}
