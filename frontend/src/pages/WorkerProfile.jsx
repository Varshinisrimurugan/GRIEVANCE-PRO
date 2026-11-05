import React, { useState } from "react";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaTools,
  FaLock,
  FaEdit,
  FaSave,
} from "react-icons/fa";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/WorkerProfile.css";

const WorkerProfile = () => {

   const worker = {

  name: "John David",

  email: "johnworker@gmail.com",

  phone: "+91 9876543210",

  department: "Electrical Maintenance",

  experience: "4 Years",

};

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  return (

    <div className="profile-page">

      <WorkerSidebar />

      <main className="profile-main">

        <WorkerHeader />

        <div className="profile-header">

          <h2>Worker Profile</h2>

          <p>

            View and update your profile information.

          </p>

        </div>
                {/* ================= PROFILE GRID ================= */}

        <div className="profile-grid">

          {/* ================= PROFILE CARD ================= */}

          <div className="profile-card">

            <div className="profile-image">

              <FaUserCircle />

            </div>

            <h3>{worker.name}</h3>

            <p>Maintenance Worker</p>

            <button className="edit-btn">

              <FaEdit />

              Edit Profile

            </button>

          </div>

          {/* ================= DETAILS CARD ================= */}

          <div className="details-card">

            <h3>Personal Information</h3>

            <div className="detail-item">

              <label>

                <FaUserCircle />

                Full Name

              </label>

              <input
                type="text"
                value={worker.name}
                readOnly
              />

            </div>

            <div className="detail-item">

              <label>

                <FaEnvelope />

                Email Address

              </label>

              <input
                type="email"
                value={worker.email}
                readOnly
              />

            </div>

            <div className="detail-item">

              <label>

                <FaPhoneAlt />

                Phone Number

              </label>

              <input
                type="text"
                value={worker.phone}
                readOnly
              />

            </div>

            <div className="detail-item">

              <label>

                <FaBuilding />

                Department

              </label>

              <input
                type="text"
                value={worker.department}
                readOnly
              />

            </div>

            <div className="detail-item">

              <label>

                <FaTools />

                Experience

              </label>

              <input
                type="text"
                value={worker.experience}
                readOnly
              />

            </div>

          </div>

        </div>

        {/* ================= PERFORMANCE ================= */}

        <div className="performance-section">

          <div className="performance-card">

            <h2>150</h2>

            <p>Total Complaints Resolved</p>

          </div>

          <div className="performance-card">

            <h2>4.9 ⭐</h2>

            <p>Average Rating</p>

          </div>

          <div className="performance-card">

            <h2>2.3 hrs</h2>

            <p>Average Resolution Time</p>

          </div>

        </div>

        {/* ================= PASSWORD CARD ================= */}

        <div className="password-card">

          <h3>

            <FaLock />

            Change Password

          </h3>
                    <div className="password-form">

            <div className="form-group">

              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

            </div>

            <div className="button-group">

              <button
                type="button"
                className="save-btn"
              >

                <FaSave />

                Save Changes

              </button>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

};

export default WorkerProfile;