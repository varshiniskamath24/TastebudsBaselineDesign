import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      setMsg("Login successful!");
      onLogin(res.data.token);
    } catch (err) {
      setMsg("Invalid email or password");
    }
  }

  return (
    <div className="card">
      <h3>Login</h3>

      {msg && <div className="alert alert-success">{msg}</div>}

      <form onSubmit={submit}>
        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
}
