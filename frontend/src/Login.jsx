import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!loginId) err.loginId = "Login ID is required";
    if (!password) err.password = "Password is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login Successful", { loginId, password });
      alert("Login Successful!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-image">
          <img src="/library-illustration.svg" alt="Library" />
        </div>
        <div className="auth-form">
          <div className="lms-title">📚 Library Management System</div>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Login ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            {errors.loginId && <div className="error">{errors.loginId}</div>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}

            <button type="submit">Login</button>
          </form>

          <div className="switch-link">
            New-User? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
