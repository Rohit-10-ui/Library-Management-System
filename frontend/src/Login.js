import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const API_BASE_URL = "http://localhost:8080/api";

const Login = () => {
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginData = {
        role,
        ...formData
      };

      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      console.log("Login successful:", response.data);
      
      // Store token or user info if needed
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // Redirect to dashboard or home
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
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

          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="note">Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
      <div className="login-image"></div>
    </div>
  );
};

export default Login;