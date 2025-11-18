// src/components/ConfirmModal.js
import React from "react";

export default function ConfirmModal({ open, title, children, onCancel, onConfirm, confirmText="Confirm", loading=false }) {
  if (!open) return null;
  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <div style={{ marginBottom: 12 }}>{children}</div>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
          <button onClick={onConfirm} style={styles.confirmBtn} disabled={loading}>
            {loading ? "Processing…" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", left:0, top:0, right:0, bottom:0,
    background: "rgba(0,0,0,0.35)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1200
  },
  box: {
    width: "min(720px, 92%)",
    background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
  },
  confirmBtn: {
    background: "#6b46c1", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8, cursor:"pointer"
  },
  cancelBtn: {
    background: "#eee", border: "none", padding: "8px 14px", borderRadius: 8, cursor:"pointer"
  }
};
