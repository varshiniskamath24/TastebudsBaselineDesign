// src/context/CartContext.js
import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  // cart: array of { restaurantId, restaurantName, name, price, qty }
  const [cart, setCart] = useState([]);

  // Add item (if exists, increment qty)
  function addToCart(item) {
    setCart((prev) => {
      const idx = prev.findIndex(
        (x) =>
          x.restaurantId === item.restaurantId &&
          x.name === item.name
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  }

  // Remove item entirely
  function removeFromCart(item) {
    setCart((prev) =>
      prev.filter(
        (x) =>
          !(
            x.restaurantId === item.restaurantId &&
            x.name === item.name
          )
      )
    );
  }

  // increment / decrement quantity
  function incQty(item) {
    setCart((prev) =>
      prev.map((x) =>
        x.restaurantId === item.restaurantId && x.name === item.name
          ? { ...x, qty: x.qty + 1 }
          : x
      )
    );
  }
  function decQty(item) {
    setCart((prev) =>
      prev
        .map((x) =>
          x.restaurantId === item.restaurantId && x.name === item.name
            ? { ...x, qty: Math.max(0, x.qty - 1) }
            : x
        )
        .filter((x) => x.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  // derived values
  const count = useMemo(
    () => cart.reduce((s, it) => s + (it.qty || 0), 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((s, it) => s + (it.price || 0) * (it.qty || 0), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incQty,
        decQty,
        clearCart,
        count,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
