import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClipboardList,
  FaBell,
  FaUserCog,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

import "../styles/StudentRegisterPage.css";

function StudentRegisterPage() {
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    hostelBlock: "",
    role: ["STUDENT"],
  });

  useEffect(() => {
    if (!showSuccess) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showSuccess, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8081/users",
        formData
      );

      setShowSuccess(true);

    } catch (error) {

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Registration Failed!");
      }

    }
  };

  return (
    <>
      {showSuccess && (
        <div className="success-overlay">

          <div className="success-popup">

            <div className="circle-animation">

              <FaCheckCircle className="check-icon" />

            </div>

            <h1>Registration Successful!</h1>

            <h3>Welcome to GrievancePro</h3>

            <p>
              Your account has been created successfully.
              <br />
              You can now login and raise hostel complaints.
            </p>

            <div className="feature-box">

              <div className="feature-card">
                <FaClipboardList />
                <span>Complaint Registration</span>
              </div>

              <div className="feature-card">
                <FaChartLine />
                <span>Status Tracking</span>
              </div>

              <div className="feature-card">
                <FaUserCog />
                <span>Worker Assignment</span>
              </div>

              <div className="feature-card">
                <FaBell />
                <span>Instant Notifications</span>
              </div>

            </div>

            <div className="countdown-box">

              <FaShieldAlt className="shield-icon" />

              <p>
                Redirecting to Login in
              </p>

              <h2>{countdown}</h2>

            </div>

            <div className="wave-footer">

              <span>
                Secure • Reliable • Paperless Hostel Complaint System
              </span>

            </div>

          </div>

        </div>
      )}

      <div className="register-wrapper">

        <div className="register-card">

          <h2>Student Registration</h2>

          <form onSubmit={handleSubmit}>

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>

            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <label>Hostel Block</label>

            <input
              type="text"
              name="hostelBlock"
              placeholder="Example : A Block"
              value={formData.hostelBlock}
              onChange={handleChange}
              required
            />

            <button type="submit">

              Create Account

            </button>

          </form>

          <p>

            Already have an account?

            <span onClick={() => navigate("/login")}>

              Login

            </span>

          </p>

        </div>

      </div>
    </>
  );
}

export default StudentRegisterPage;