import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      err.email = "Enter a valid email";

    if (!password) err.password = "Password is required";
    else if (password.length < 6)
      err.password = "Minimum 6 characters required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Signup Successful!");
    }
  };

  return (
    <div className="auth-container">
      <div className="lms-title">📚 Library Management System</div>
      <h2>Student Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <button type="submit">Register</button>
      </form>

      <div className="switch-link">
        Already registered? <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
