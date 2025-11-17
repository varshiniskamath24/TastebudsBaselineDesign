import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

export default function RegisterLogin({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!username || !password) {
      setMsg("Please fill all fields");
      return;
    }

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          username,
          password,
        });

        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
      } else {
        // REGISTER
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          username,
          password,
        });

        setMsg("Registration successful! Logging you in...");

        // auto login
        const loginRes = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            username,
            password,
          }
        );

        localStorage.setItem("token", loginRes.data.token);
        setToken(loginRes.data.token);
      }
    } catch (error) {
      setMsg("Error: " + (error.response?.data?.msg || "Something went wrong"));
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 380,
          padding: 26,
          background: "rgba(255,255,255,0.98)",
          borderRadius: 16,
          boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div
            style={{
              width: 70,
              height: 70,
              margin: "auto",
              borderRadius: 16,
              background:
                "linear-gradient(135deg,#b993d6 0%, #8ca6db 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "white",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}
          >
            TB
          </div>

          <h2 style={{ marginTop: 12, fontWeight: 700 }}>
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p style={{ color: "#6b7280" }}>
            {isLogin
              ? "Login to continue"
              : "Register to explore TasteBuds"}
          </p>
        </div>

        {msg && (
          <div
            className="alert"
            style={{
              background: "#e6ffef",
              color: "#064e3b",
              marginBottom: 12,
            }}
          >
            {msg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="auth-row">
    <label>Username</label>
    <input
      className="auth-input"
      placeholder="Enter username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="auth-row">
    <label>Password</label>
    <input
      type="password"
      className="auth-input"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  <button
    type="submit"
    className="primary"
    style={{ marginTop: 16, width: "100%" }}
  >
    {isLogin ? "Login" : "Register"}
  </button>
        </form>

        {/* Toggle link */}
        <p style={{ marginTop: 16, textAlign: "center", color: "#444" }}>
          {isLogin ? "New to TasteBuds?" : "Already a user?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
            }}
            style={{
              color: "var(--accent)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {isLogin ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
