import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

/* ── SVG Icons ── */
const BookIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF9B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const UserIcon = ({ error }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={error ? "#e05555" : "#C4956A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const LockIcon = ({ error }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={error ? "#e05555" : "#C4956A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ────────────────────────────────────────
   Login Component
──────────────────────────────────────── */
const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.username.trim()) e.username = "Username is required";
    if (!formData.password)       e.password = "Password is required";
    else if (formData.password.length < 4) e.password = "Password is too short";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // TODO: replace with real API call
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "USER", ...formData }),
    })
      .then(response => {
        if (!response.ok) throw new Error("Login failed");
        return response.json();
      })
      .then(data => {
        console.log("Login Success:", data);
        if (data.token) localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      })
      .catch(error => {
        console.error("Error:", error);
        setLoading(false);
        alert("Login failed. Please check your credentials.");
      });
      
    setTimeout(() => {
      setLoading(false);
      console.log("Login Payload:", { role: "USER", ...formData });
      alert("Login submitted! Connect to your Spring Boot API.");
    }, 1500);
  };

  return (
    <div className="login-page">

      {/* ── Animated background blobs ── */}
      <div className="login-bg">
        <div className="login-bg__shape login-bg__shape--1" />
        <div className="login-bg__shape login-bg__shape--2" />
        <div className="login-bg__shape login-bg__shape--3" />
      </div>

      {/* ══════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════ */}
      <aside className="login-panel">
        <div className="login-panel__inner">

          {/* Logo */}
          <div className="login-panel__logo">
            <div className="login-panel__logo-icon">
              <BookIcon />
            </div>
            <span className="login-panel__logo-text">LibraryHub</span>
          </div>

          {/* Floating book illustrations */}
          {/* <div className="login-panel__illustration">
            <div className="login-panel__glow" />
            <div className="float-book float-book--1 book--orange">
              <div className="book-spine" /><div className="book-cover" />
            </div>
            <div className="float-book float-book--2 book--green">
              <div className="book-spine" /><div className="book-cover" />
            </div>
            <div className="float-book float-book--3 book--blue">
              <div className="book-spine" /><div className="book-cover" />
            </div>
          </div> */}

          <h2 className="login-panel__title">Welcome Back,<br />Reader</h2>
          <p className="login-panel__subtitle">
            Sign in to explore thousands of books and manage your library journey with ease.
          </p>

          {/* Quote */}
          <div className="login-panel__quote">
            <div className="login-panel__quote-bar" />
            <p className="login-panel__quote-text">
              "A reader lives a thousand lives before he dies. The man who never reads lives only one."
            </p>
          </div>

          {/* Stats */}
          <div className="login-panel__stats">
            <div className="login-panel__stat">
              <span className="login-panel__stat-num">10K+</span>
              <span className="login-panel__stat-label">Books</span>
            </div>
            <div className="login-panel__stat">
              <span className="login-panel__stat-num">500+</span>
              <span className="login-panel__stat-label">Members</span>
            </div>
            <div className="login-panel__stat">
              <span className="login-panel__stat-num">99%</span>
              <span className="login-panel__stat-label">Uptime</span>
            </div>
          </div>

        </div>
      </aside>

      {/* ══════════════════════════════════
          RIGHT FORM SIDE
      ══════════════════════════════════ */}
      <div className="login-form-side">
        <div className="login-card">

          {/* Card header */}
          <div className="login-card__header">
            <div className="login-card__icon-wrap">
              <BookIcon />
            </div>
            <h1 className="login-card__title">Sign In</h1>
            <p className="login-card__subtitle">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <div className="login-field">
              <label className="login-field__label">Username</label>
              <div className={`login-field__wrap${errors.username ? " login-field__wrap--error" : ""}`}>
                <span className={`login-field__icon${errors.username ? " login-field__icon--error" : ""}`}>
                  <UserIcon error={!!errors.username} />
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
              {errors.username && <p className="login-field__error">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-field__label">Password</label>
              <div className={`login-field__wrap${errors.password ? " login-field__wrap--error" : ""}`}>
                <span className={`login-field__icon${errors.password ? " login-field__icon--error" : ""}`}>
                  <LockIcon error={!!errors.password} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <p className="login-field__error">{errors.password}</p>}
            </div>

            {/* Forgot password */}
            <div className="login-forgot-row">
              <a href="#" className="login-link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-btn-primary"
              disabled={loading}
            >
              {loading
                ? <span className="login-spinner" />
                : <> Sign In <ArrowIcon /> </>
              }
            </button>

          </form>

          {/* Divider */}
          <div className="login-divider">
            <span className="login-divider__line" />
            <span className="login-divider__text">or</span>
            <span className="login-divider__line" />
          </div>

          {/* Switch to register */}
          <p className="login-switch-text">
            Don't have an account?{" "}
            <Link to="/register" className="login-link">Create one →</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
