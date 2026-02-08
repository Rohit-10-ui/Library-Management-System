import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [role, setRole] = useState("USER");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      role,
      ...formData
    };

    console.log("Login Payload:", loginData);
    // later → POST to Spring Boot API
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Library Login</h2>

          {/* Toggle Buttons */}
          <div className="role-toggle">
            {["USER", "LIBRARIAN"].map((r) => (
              <button
                type="button"
                key={r}
                className={role === r ? "active" : ""}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />

          <button type="submit">Login</button>

          <p className="note">Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
      <div className="login-image"></div>
    </div>
  );
};

export default Login;
