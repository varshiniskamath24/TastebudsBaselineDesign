// App.js
import React, { useState, useEffect } from "react";
import RegisterLogin from "./components/RegisterLogin";
import FindFood from "./components/FindFood";
import Donate from "./components/Donate";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "./styles.css";

function App() {
  const [page, setPage] = useState("findFood");
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Make global navigation functions for FloatingCartBar & RestaurantDetails
  useEffect(() => {
    window.goToCart = () => setPage("cart");
    window.openCart = () => setPage("cart"); // REQUIRED FIX
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // If user is NOT logged in → show login page
  if (!token) {
    return <RegisterLogin setToken={setToken} />;
  }

  return (
    <CartProvider>
      <div className="app">

        {/* TOP HEADER */}
        <div className="header">
          <div className="brand">
            <div className="logo">TB</div>
            <div className="title">TasteBuds</div>
          </div>

          {/* Nav Buttons */}
          <div className="nav">
            <button
              className={page === "findFood" ? "active" : ""}
              onClick={() => setPage("findFood")}
            >
              Find Food
            </button>

            <button
              className={page === "donate" ? "active" : ""}
              onClick={() => setPage("donate")}
            >
              Donate
            </button>

            <button
              className={page === "orders" ? "active" : ""}
              onClick={() => setPage("orders")}
            >
              Orders
            </button>

            <button
              className={page === "cart" ? "active" : ""}
              onClick={() => setPage("cart")}
            >
              Cart
            </button>

            <button className="danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="content">

          {page === "findFood" && (
            <FindFood token={token} setPage={setPage} />
          )}

          {page === "donate" && (
            <Donate token={token} />
          )}

          {page === "orders" && (
            <Orders token={token} />
          )}

          {page === "cart" && (
            <Cart
              token={token}
              goBack={() => setPage("findFood")} // Back button inside cart
            />
          )}

        </div>
      </div>
    </CartProvider>
  );
}

export default App;
