import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Forgotpassword.css";

/* ── SVG Icons ── */
const BookIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF9B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const MailIcon = ({ error }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={error ? "#e05555" : "#C4956A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B9BD1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ────────────────────────────────────────
   ForgotPassword Component
──────────────────────────────────────── */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    // TODO: Connect to your Spring Boot API
    // POST /api/auth/forgot-password
    // Body: { "email": email }
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log("Forgot Password Payload:", { email });
    }, 1500);
  };

  // Success screen
  if (submitted) {
    return (
      <div className="fp-page">
        <div className="fp-bg">
          <div className="fp-bg__shape fp-bg__shape--1" />
          <div className="fp-bg__shape fp-bg__shape--2" />
          <div className="fp-bg__shape fp-bg__shape--3" />
        </div>
        <div className="fp-success">
          <div className="fp-success__card">
            <div className="fp-success__orb">
              <CheckIcon />
            </div>
            <h2 className="fp-success__title">Check Your Email</h2>
            <p className="fp-success__text">
              We've sent a password reset link to{" "}
              <strong className="fp-success__email">{email}</strong>.
              <br />
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <Link to="/login">
              <button className="fp-btn-primary">
                Back to Login <ArrowIcon />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fp-page">

      {/* ── Animated background blobs ── */}
      <div className="fp-bg">
        <div className="fp-bg__shape fp-bg__shape--1" />
        <div className="fp-bg__shape fp-bg__shape--2" />
        <div className="fp-bg__shape fp-bg__shape--3" />
      </div>

      {/* ══════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════ */}
      <aside className="fp-panel">
        <div className="fp-panel__inner">

          {/* Logo */}
          <div className="fp-panel__logo">
            <div className="fp-panel__logo-icon">
              <BookIcon />
            </div>
            <span className="fp-panel__logo-text">LibraryHub</span>
          </div>

          {/* Floating book illustrations */}
          <div className="fp-panel__illustration">
            <div className="fp-panel__glow" />
            <div className="float-book float-book--1 book--orange">
              <div className="book-spine" /><div className="book-cover" />
            </div>
            <div className="float-book float-book--2 book--green">
              <div className="book-spine" /><div className="book-cover" />
            </div>
            <div className="float-book float-book--3 book--blue">
              <div className="book-spine" /><div className="book-cover" />
            </div>
          </div>

          <h2 className="fp-panel__title">Forgot Your Password?</h2>
          <p className="fp-panel__subtitle">
            Don't worry! Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Quote */}
          <div className="fp-panel__quote">
            <div className="fp-panel__quote-bar" />
            <p className="fp-panel__quote-text">
              "A book is a dream that you hold in your hand."
            </p>
          </div>

        </div>
      </aside>

      {/* ══════════════════════════════════
          RIGHT FORM SIDE
      ══════════════════════════════════ */}
      <div className="fp-form-side">
        <div className="fp-card">

          {/* Card header */}
          <div className="fp-card__header">
            <div className="fp-card__icon-wrap">
              <BookIcon />
            </div>
            <h1 className="fp-card__title">Reset Password</h1>
            <p className="fp-card__subtitle">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          {/* Info box */}
          <div className="fp-info-box">
            <div className="fp-info-box__icon">
              <InfoIcon />
            </div>
            <p className="fp-info-box__text">
              You'll receive an email with a secure link to create a new password. The link expires in 1 hour.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="fp-field">
              <label className="fp-field__label">Email Address</label>
              <div className={`fp-field__wrap${error ? " fp-field__wrap--error" : ""}`}>
                <span className={`fp-field__icon${error ? " fp-field__icon--error" : ""}`}>
                  <MailIcon error={!!error} />
                </span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  autoComplete="email"
                />
              </div>
              {error && <p className="fp-field__error">{error}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="fp-btn-primary"
              disabled={loading}
            >
              {loading
                ? <span className="fp-spinner" />
                : <>Send Reset Link <ArrowIcon /></>
              }
            </button>

          </form>

          {/* Switch to login */}
          <p className="fp-switch-text">
            Remember your password?{" "}
            <Link to="/login" className="fp-link">Sign in →</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
