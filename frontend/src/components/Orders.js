// frontend/src/components/Orders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const userId = "demoUser";

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data || []))
      .catch(() => setOrders([]));
  }, [token]);

  if (!orders.length) {
    return (
      <div className="page-container">
        <h2 className="page-title">Your Orders</h2>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Your Orders</h2>

      <div className="orders-list">
        {orders.map((o) => (
          <div key={o._id} className="order-card">
            <div className="order-id">
              Order #{o._id.slice(-5)}
            </div>

            <div className="order-items">
              {o.items.map((i, idx) => (
                <div key={idx} className="order-item-row">
                  <span className="order-item-name">• {i.name}</span>
                  <span className="order-item-price">₹{i.price}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              Total: <span>₹{o.total}</span>
            </div>

            <div className="order-status">
              Status: <span className="status-pill">{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
