import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [role, setRole] = useState("USER");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    qualification: "",
    employeeId: "",
    librarySection: "",
    idProof: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, idProof: e.target.files[0] });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('role', role);
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log("Register Payload:", formDataToSend);
    alert("Registration submitted! Admin will verify and send login credentials via email.");
    // later → POST to Spring Boot API
  };

  return (
    <div className="register-container">
        <div className="refister-content">
      <form className="register-form" onSubmit={step === 1 ? handleNext : handleSubmit}>
        <h2>Library Registration</h2>

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

        {step === 1 && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username (must be unique)"
              onChange={handleChange}
              value={formData.username}
              required
            />

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstName}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastName}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              value={formData.phone}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={formData.address}
              rows="2"
              required
            />

            <button type="submit">Next</button>
            <p className="note">Already have an account? <Link to="/login">Login here</Link></p>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              onChange={handleChange}
              value={formData.dateOfBirth}
              required
            />

            <select name="gender" onChange={handleChange} value={formData.gender} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {role === "USER" && (
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                onChange={handleChange}
                value={formData.qualification}
                required
              />
            )}

            {role === "LIBRARIAN" && (
              <>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Employee ID"
                  onChange={handleChange}
                  value={formData.employeeId}
                  required
                />

                <input
                  type="text"
                  name="librarySection"
                  placeholder="Library Section"
                  onChange={handleChange}
                  value={formData.librarySection}
                  required
                />
              </>
            )}

            <div className="file-upload">
              <label>Upload Government ID Proof * (.pdf, .png, .jpeg, jpg)</label>
              <input
                type="file"
                name="idProof"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
            </div>

            <p className="note">* Admin will verify your details and send login credentials via email</p>

            <div className="button-group">
              <button type="button" onClick={() => setStep(1)}>Back</button>
              <button type="submit">Submit Registration</button>
            </div>
            <p className="note">Already have an account? <Link to="/login">Login here</Link></p>
          </>
        )}
      </form>
      </div>
      <div className="register-image"></div>
    </div>
  );
};

export default Register;
