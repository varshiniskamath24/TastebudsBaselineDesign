// App.js
import React, { useState, useEffect } from "react";
import RegisterLogin from "./components/RegisterLogin";
import FindFood from "./components/FindFood";
import DonateModern from "./components/DonateModern";
import Orders from "./components/Orders";
import Cart from "./components/Cart";

import { CartProvider } from "./context/CartContext";
import "./styles.css";

function App() {
  const [page, setPage] = useState("findFood");

  // customer token
  const [token, setToken] = useState(localStorage.getItem("token"));


  useEffect(() => {
    window.goToCart = () => setPage("cart");
    window.openCart = () => setPage("cart");
  }, []);

  // CUSTOMER logout
  function logoutCustomer() {
    localStorage.removeItem("token");
    setToken(null);
  }


  return (
    <CartProvider>
      <div className="app">
        {/* HEADER */}
        <div className="header">
          <div className="brand">
            <div className="logo">TB</div>
            <div className="title">TasteBuds</div>
          </div>

          {/* NAVIGATION */}
          <div className="nav">
            {/* Customer navigation */}
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

            <button className="danger" onClick={logoutCustomer}>
              Logout
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* Customer pages */}
          {page === "findFood" && <FindFood token={token} setPage={setPage} />}
          {page === "donate" && <DonateModern token={token} />}
          {page === "orders" && <Orders token={token} />}
          {page === "cart" && <Cart token={token} goBack={() => setPage("findFood")} />}
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
