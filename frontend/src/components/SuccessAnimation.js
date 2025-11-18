// SuccessAnimation.js
import React, { useEffect } from "react";

export default function SuccessAnimation({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500); // auto-close after 1.5 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-overlay">
      <div className="success-box">
        <div className="success-checkmark">
          <span>✓</span>
        </div>
        <p className="success-text">Donation Assigned</p>
      </div>
    </div>
  );
}
