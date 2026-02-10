import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

/* ══════════════════════════════════════
   SVG Icons
══════════════════════════════════════ */
const BookIcon = ({ size = 26, color = "#FF9B7A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const UserIcon = ({ size = 16, color = "#C4956A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = ({ size = 16, color = "#C4956A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneIcon = ({ size = 16, color = "#C4956A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
  </svg>
);
const MapPinIcon = ({ size = 16, color = "#C4956A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const GraduationIcon = ({ size = 16, color = "#FF9B7A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const BriefcaseIcon = ({ size = 16, color = "#FF9B7A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const UploadIcon = ({ size = 34, color = "#C4956A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);
const CheckIcon = ({ size = 16, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ChevronLeftIcon = ({ size = 18, color = "#FF9B7A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRightIcon = ({ size = 18, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ══════════════════════════════════════
   Step configuration
══════════════════════════════════════ */
const USER_STEPS      = ["Personal", "Address", "Academic", "Experience", "Documents"];
const LIBRARIAN_STEPS = ["Personal", "Address", "Role", "Documents"];

/* ══════════════════════════════════════
   Sub-components
══════════════════════════════════════ */

/** Reusable field wrapper */
const Field = ({ label, error, icon: Icon, children }) => (
  <div className="register-field">
    {label && <label className="register-field__label">{label}</label>}
    <div className={`register-field__wrap${error ? " register-field__wrap--error" : ""}`}>
      {Icon && (
        <span className={`register-field__icon${error ? " register-field__icon--error" : ""}`}>
          <Icon size={16} color={error ? "#e05555" : "#C4956A"} />
        </span>
      )}
      {children}
    </div>
    {error && <p className="register-field__error">{error}</p>}
  </div>
);

/** Back + Next/Submit buttons */
const StepButtons = ({ onBack, isLast, loading, label = "Next Step" }) => (
  <div className="register-step-btns">
    {onBack && (
      <button type="button" className="register-btn-back" onClick={onBack}>
        <ChevronLeftIcon /> Back
      </button>
    )}
    <button
      type="submit"
      className={`register-btn-primary${!onBack ? " register-btn-full" : ""}`}
      disabled={loading}
    >
      {loading
        ? <span className="register-spinner" />
        : isLast
          ? <>{label} <CheckIcon size={15} /></>
          : <>Next Step <ChevronRightIcon /></>
      }
    </button>
  </div>
);

/* ══════════════════════════════════════
   Main Register Component
══════════════════════════════════════ */
const Register = () => {
  const [role, setRole]   = useState("USER");
  const [step, setStep]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = role === "USER" ? USER_STEPS : LIBRARIAN_STEPS;

  const [formData, setFormData] = useState({
    username: "", firstName: "", lastName: "",
    email: "", phone: "", contactNo: "",
    gender: "", maritalStatus: "",
    street: "", city: "", state: "", pincode: "",
    academicInfoList: [
      { institutionName: "", degree: "", passingYear: "", grade: "", gradeInPercentage: "" }
    ],
    workExperienceList: [
      { startDate: "", endDate: "", currentlyWorking: false, companyName: "", designation: "", ctc: "", reasonForLeaving: "" }
    ],
    employeeId: "", librarySection: "",
    idProof: null,
  });

  /* ── helpers ── */
  const set = (key, val) => setFormData(f => ({ ...f, [key]: val }));
  const clrErr = (key) => setErrors(e => ({ ...e, [key]: "" }));

  const setAcademic = (i, field, val) => {
    const list = [...formData.academicInfoList];
    list[i][field] = val;
    set("academicInfoList", list);
  };
  const addAcademic = () =>
    set("academicInfoList", [
      ...formData.academicInfoList,
      { institutionName: "", degree: "", passingYear: "", grade: "", gradeInPercentage: "" }
    ]);

  const setWork = (i, field, val) => {
    const list = [...formData.workExperienceList];
    list[i][field] = val;
    set("workExperienceList", list);
  };
  const addWork = () =>
    set("workExperienceList", [
      ...formData.workExperienceList,
      { startDate: "", endDate: "", currentlyWorking: false, companyName: "", designation: "", ctc: "", reasonForLeaving: "" }
    ]);

  /* ── validation ── */
  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!formData.username.trim())  e.username  = "Required";
      if (!formData.firstName.trim()) e.firstName = "Required";
      if (!formData.lastName.trim())  e.lastName  = "Required";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        e.email = "Valid email required";
      if (!formData.phone.trim())  e.phone  = "Required";
      if (!formData.gender)        e.gender = "Required";
    }
    if (step === 1) {
      if (!formData.street.trim())  e.street  = "Required";
      if (!formData.city.trim())    e.city    = "Required";
      if (!formData.state.trim())   e.state   = "Required";
      if (!formData.pincode.trim()) e.pincode = "Required";
    }
    return e;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errs = validateStep();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Build FormData for multipart/form-data API call
    const fd = new FormData();
    fd.append("role", role);
    fd.append("personalDetails", JSON.stringify({
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      contactNo: formData.contactNo,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
    }));
    fd.append("address", JSON.stringify({
      street: formData.street,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    }));
    if (role === "USER") {
      fd.append("academicInfoList",    JSON.stringify(formData.academicInfoList));
      fd.append("workExperienceList",  JSON.stringify(formData.workExperienceList));
    }
    if (role === "LIBRARIAN") {
      fd.append("employeeId",    formData.employeeId);
      fd.append("librarySection", formData.librarySection);
    }
    if (formData.idProof) fd.append("idProof", formData.idProof);

    // TODO: replace with real API call
    // fetch("/api/register", { method: "POST", body: fd })
    console.log("Register Payload (FormData):", Object.fromEntries(fd));
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  const isLastStep = step === steps.length - 1;

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="register-page">
        <div className="register-bg">
          <div className="register-bg__shape register-bg__shape--1" />
          <div className="register-bg__shape register-bg__shape--2" />
          <div className="register-bg__shape register-bg__shape--3" />
        </div>
        <div className="register-success">
          <div className="register-success__card">
            <div className="register-success__orb">
              <CheckIcon size={38} color="white" />
            </div>
            <h2 className="register-success__title">Registration Submitted!</h2>
            <p className="register-success__text">
              Your details are under review. An admin will verify your information
              and send login credentials to{" "}
              <strong className="register-success__email">{formData.email || "your email"}</strong>.
              This usually takes 1–2 business days.
            </p>
            <Link to="/login">
              <button className="register-btn-primary register-btn-full">
                Go to Login <ChevronRightIcon />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main render ── */
  return (
    <div className="register-page">

      {/* Animated background */}
      <div className="register-bg">
        <div className="register-bg__shape register-bg__shape--1" />
        <div className="register-bg__shape register-bg__shape--2" />
        <div className="register-bg__shape register-bg__shape--3" />
      </div>

      {/* ══════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════ */}
      <aside className="register-panel">
        <div className="register-panel__inner">

          <div className="register-panel__logo">
            <div className="register-panel__logo-icon"><BookIcon size={22} /></div>
            <span className="register-panel__logo-text">LibraryHub</span>
          </div>

          <div className="register-panel__illustration">
            <div className="register-panel__glow" />
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

          <h2 className="register-panel__title">Join LibraryHub</h2>
          <p className="register-panel__subtitle">
            Create your account and start exploring a world of knowledge at your fingertips.
          </p>

          <div className="register-panel__quote">
            <div className="register-panel__quote-bar" />
            <p className="register-panel__quote-text">
              "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
            </p>
          </div>

          <div className="register-panel__stats">
            <div>
              <span className="register-panel__stat-num">10K+</span>
              <span className="register-panel__stat-label">Books</span>
            </div>
            <div>
              <span className="register-panel__stat-num">500+</span>
              <span className="register-panel__stat-label">Readers</span>
            </div>
            <div>
              <span className="register-panel__stat-num">24/7</span>
              <span className="register-panel__stat-label">Access</span>
            </div>
          </div>

        </div>
      </aside>

      {/* ══════════════════════════════════
          RIGHT FORM SIDE
      ══════════════════════════════════ */}
      <div className="register-form-side">
        <div className="register-card">

          {/* Header */}
          <div className="register-card__header">
            <div className="register-card__icon-wrap"><BookIcon size={26} /></div>
            <h1 className="register-card__title">Create Account</h1>
            <p className="register-card__subtitle">Step {step + 1} of {steps.length} — {steps[step]}</p>
          </div>

          {/* Role toggle */}
          <div className="register-role-toggle">
            {["USER", "LIBRARIAN"].map(r => (
              <button
                key={r}
                type="button"
                className={`register-role-btn${role === r ? " register-role-btn--active" : ""}`}
                onClick={() => { setRole(r); setStep(0); setErrors({}); }}
              >
                {r === "USER" ? " Member" : "Librarian"}
              </button>
            ))}
          </div>

          {/* Progress steps */}
          <div className="register-progress">
            {steps.map((label, i) => (
              <React.Fragment key={i}>
                <div className="register-step">
                  <div className={[
                    "register-step__dot",
                    i === step ? "register-step__dot--active" : "",
                    i < step  ? "register-step__dot--done"   : "",
                  ].join(" ")}>
                    {i < step ? <CheckIcon size={12} color="white" /> : i + 1}
                  </div>
                  <span className={[
                    "register-step__label",
                    i === step ? "register-step__label--active" : "",
                    i < step  ? "register-step__label--done"   : "",
                  ].join(" ")}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`register-step-line${i < step ? " register-step-line--done" : ""}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ════════════════════════════
              STEP 0 — Personal Details
          ════════════════════════════ */}
          {step === 0 && (
            <form onSubmit={handleNext} noValidate>
              <h3 className="register-step-heading">
                <UserIcon size={20} color="#FF9B7A" /> Personal Details
              </h3>

              <div className="register-grid-2">
                <Field label="First Name" error={errors.firstName}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={e => { set("firstName", e.target.value); clrErr("firstName"); }}
                  />
                </Field>
                <Field label="Last Name" error={errors.lastName}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={e => { set("lastName", e.target.value); clrErr("lastName"); }}
                  />
                </Field>
              </div>

              <Field label="Username" icon={UserIcon} error={errors.username}>
                <input
                  type="text"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={e => { set("username", e.target.value); clrErr("username"); }}
                />
              </Field>

              <Field label="Email Address" icon={MailIcon} error={errors.email}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => { set("email", e.target.value); clrErr("email"); }}
                />
              </Field>

              <div className="register-grid-2">
                <Field label="Phone Number" icon={PhoneIcon} error={errors.phone}>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={e => { set("phone", e.target.value); clrErr("phone"); }}
                  />
                </Field>
                <Field label="Alt. Contact" icon={PhoneIcon}>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={formData.contactNo}
                    onChange={e => set("contactNo", e.target.value)}
                  />
                </Field>
              </div>

              <div className="register-grid-2">
                <Field label="Gender" error={errors.gender}>
                  <select
                    value={formData.gender}
                    onChange={e => { set("gender", e.target.value); clrErr("gender"); }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
                <Field label="Marital Status">
                  <select value={formData.maritalStatus} onChange={e => set("maritalStatus", e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
              </div>

              <StepButtons onBack={null} isLast={false} loading={false} />
            </form>
          )}

          {/* ════════════════════════════
              STEP 1 — Address
          ════════════════════════════ */}
          {step === 1 && (
            <form onSubmit={handleNext} noValidate>
              <h3 className="register-step-heading">
                <MapPinIcon size={20} color="#FF9B7A" /> Address Details
              </h3>

              <Field label="Street / Area" icon={MapPinIcon} error={errors.street}>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={e => { set("street", e.target.value); clrErr("street"); }}
                />
              </Field>

              <div className="register-grid-2">
                <Field label="City" error={errors.city}>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={e => { set("city", e.target.value); clrErr("city"); }}
                  />
                </Field>
                <Field label="State" error={errors.state}>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={e => { set("state", e.target.value); clrErr("state"); }}
                  />
                </Field>
              </div>

              <Field label="Pincode / ZIP" error={errors.pincode}>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={e => { set("pincode", e.target.value); clrErr("pincode"); }}
                />
              </Field>

              <StepButtons onBack={() => setStep(s => s - 1)} isLast={false} loading={false} />
            </form>
          )}

          {/* ════════════════════════════
              STEP 2 (USER) — Academic
          ════════════════════════════ */}
          {step === 2 && role === "USER" && (
            <form onSubmit={handleNext} noValidate>
              <h3 className="register-step-heading">
                <GraduationIcon size={20} color="#FF9B7A" /> Academic Information
              </h3>

              {formData.academicInfoList.map((ac, i) => (
                <div key={i} className="register-dynamic-block">
                  <p className="register-dynamic-block__title">
                    <GraduationIcon size={16} /> Education {i + 1}
                  </p>
                  <Field label="Institution Name">
                    <input
                      placeholder="University / College / School"
                      value={ac.institutionName}
                      onChange={e => setAcademic(i, "institutionName", e.target.value)}
                      required
                    />
                  </Field>
                  <div className="register-grid-2">
                    <Field label="Degree">
                      <input
                        placeholder="e.g. B.Tech, MBA"
                        value={ac.degree}
                        onChange={e => setAcademic(i, "degree", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="Passing Year">
                      <input
                        type="number"
                        placeholder="2024"
                        min="1950"
                        max="2030"
                        value={ac.passingYear}
                        onChange={e => setAcademic(i, "passingYear", e.target.value)}
                        required
                      />
                    </Field>
                  </div>
                  <div className="register-grid-2">
                    <Field label="Grade / CGPA">
                      <input
                        placeholder="A / 8.5 CGPA"
                        value={ac.grade}
                        onChange={e => setAcademic(i, "grade", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="Percentage (%)">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="85.5"
                        value={ac.gradeInPercentage}
                        onChange={e => setAcademic(i, "gradeInPercentage", e.target.value)}
                        required
                      />
                    </Field>
                  </div>
                </div>
              ))}

              <button type="button" className="register-add-btn" onClick={addAcademic}>
                + Add Education
              </button>

              <StepButtons onBack={() => setStep(s => s - 1)} isLast={false} loading={false} />
            </form>
          )}

          {/* ════════════════════════════
              STEP 3 (USER) — Work Experience
          ════════════════════════════ */}
          {step === 3 && role === "USER" && (
            <form onSubmit={handleNext} noValidate>
              <h3 className="register-step-heading">
                <BriefcaseIcon size={20} color="#FF9B7A" /> Work Experience
              </h3>

              {formData.workExperienceList.map((wk, i) => (
                <div key={i} className="register-dynamic-block">
                  <p className="register-dynamic-block__title">
                    <BriefcaseIcon size={16} /> Experience {i + 1}
                  </p>
                  <div className="register-grid-2">
                    <Field label="Start Date">
                      <input
                        type="date"
                        value={wk.startDate}
                        onChange={e => setWork(i, "startDate", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="End Date">
                      <input
                        type="date"
                        value={wk.endDate}
                        onChange={e => setWork(i, "endDate", e.target.value)}
                        disabled={wk.currentlyWorking}
                      />
                    </Field>
                  </div>

                  <label className="register-checkbox-row">
                    <input
                      type="checkbox"
                      checked={wk.currentlyWorking}
                      onChange={e => setWork(i, "currentlyWorking", e.target.checked)}
                    />
                    <span>Currently Working Here</span>
                  </label>

                  <div className="register-grid-2">
                    <Field label="Company Name">
                      <input
                        placeholder="Company / Organisation"
                        value={wk.companyName}
                        onChange={e => setWork(i, "companyName", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="Designation">
                      <input
                        placeholder="Job Title"
                        value={wk.designation}
                        onChange={e => setWork(i, "designation", e.target.value)}
                        required
                      />
                    </Field>
                  </div>
                  <div className="register-grid-2">
                    <Field label="CTC (LPA)">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="5.5"
                        value={wk.ctc}
                        onChange={e => setWork(i, "ctc", e.target.value)}
                        required
                      />
                    </Field>
                    <Field label="Reason for Leaving">
                      <input
                        placeholder="Optional"
                        value={wk.reasonForLeaving}
                        onChange={e => setWork(i, "reasonForLeaving", e.target.value)}
                        disabled={wk.currentlyWorking}
                      />
                    </Field>
                  </div>
                </div>
              ))}

              <button type="button" className="register-add-btn" onClick={addWork}>
                + Add Experience
              </button>

              <StepButtons onBack={() => setStep(s => s - 1)} isLast={false} loading={false} />
            </form>
          )}

          {/* ════════════════════════════
              STEP 2 (LIBRARIAN) — Role Details
          ════════════════════════════ */}
          {step === 2 && role === "LIBRARIAN" && (
            <form onSubmit={handleNext} noValidate>
              <h3 className="register-step-heading">
                <BriefcaseIcon size={20} color="#FF9B7A" /> Librarian Details
              </h3>

              <Field label="Employee ID" icon={BriefcaseIcon}>
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={formData.employeeId}
                  onChange={e => set("employeeId", e.target.value)}
                  required
                />
              </Field>

              <Field label="Library Section" icon={BriefcaseIcon}>
                <input
                  type="text"
                  placeholder="e.g. Fiction, Reference, Archives"
                  value={formData.librarySection}
                  onChange={e => set("librarySection", e.target.value)}
                  required
                />
              </Field>

              <StepButtons onBack={() => setStep(s => s - 1)} isLast={false} loading={false} />
            </form>
          )}

          {/* ════════════════════════════
              LAST STEP — Upload Documents
          ════════════════════════════ */}
          {isLastStep && (
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="register-step-heading">
                <UploadIcon size={20} color="#FF9B7A" /> Upload Documents
              </h3>

              <div className="register-upload-section">
                <p className="register-upload-title">Government ID Proof</p>
                <p className="register-upload-hint">Accepted formats: PDF, PNG, JPG, JPEG · Max 5 MB</p>

                <label className={`register-file-drop${formData.idProof ? " register-file-drop--filled" : ""}`}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e => set("idProof", e.target.files[0])}
                  />
                  {formData.idProof ? (
                    <div className="register-file-name">
                      <CheckIcon size={20} color="#4CAF50" />
                      <span>{formData.idProof.name}</span>
                    </div>
                  ) : (
                    <>
                      <UploadIcon size={34} color="#C4956A" />
                      <p className="register-file-text">Click to browse or drag & drop</p>
                      <p className="register-file-sub">PDF, PNG, JPG supported</p>
                    </>
                  )}
                </label>
              </div>

              <div className="register-note-box">
                <span className="register-note-dot" />
                Admin will verify your details and send login credentials via email.
                This process typically takes 1–2 business days.
              </div>

              <StepButtons
                onBack={() => setStep(s => s - 1)}
                isLast={true}
                loading={loading}
                label="Submit Registration"
              />
            </form>
          )}

          {/* Switch to login */}
          <p className="register-switch-text">
            Already have an account?{" "}
            <Link to="/login" className="register-link">Sign in →</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
