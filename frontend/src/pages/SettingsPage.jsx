import React, { useState } from "react";

import Sidebar from "../components/Sidebar";

import "../styles/SettingsPage.css";

import {
  FiMenu,
  FiChevronRight,
  FiUser,
  FiSettings,
  FiLogOut,
  FiLock,
  FiInfo,
  FiMoon,
  FiBell,
} from "react-icons/fi";

export default function SettingsPage() {

  const [emailNotification, setEmailNotification] =
    useState(true);

  const [complaintNotification, setComplaintNotification] =
    useState(true);

  const student = {

    name: "Varshini Sri",

    department: "Information Technology",

    email: "student@gmail.com",

  };

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div className="student-dashboard">

      {/* ======================
          COMMON SIDEBAR
      ====================== */}

      <Sidebar />

      {/* ======================
          MAIN CONTENT
      ====================== */}

      <main className="main-content">

        {/* ======================
            TOPBAR
        ====================== */}

        <header className="topbar">

          <div className="top-left">

            <button className="menu-btn">

              <FiMenu />

            </button>

            <div>

              <h1>Settings</h1>

              <p>
                Manage your account preferences
              </p>

            </div>

          </div>

          <div className="top-right">

            <div className="profile-box">

              <img
                src={`https://ui-avatars.com/api/?background=8B5E3C&color=fff&name=${student.name}`}
                alt="Student"
              />

              <div>

                <h4>{student.name}</h4>

                <p>{student.department}</p>

              </div>

              <FiChevronRight />

            </div>

          </div>

        </header>

        {/* ======================
            SETTINGS CARD
        ====================== */}

        <section className="settings-card">

          <div className="settings-title">

            <h2>

              <FiSettings />

              Account Settings

            </h2>

            <p>

              Manage your preferences and application settings.

            </p>

          </div>
                    {/* ======================
              PROFILE INFORMATION
          ====================== */}

          <div className="setting-item">

            <div className="setting-left">

              <FiUser />

              <div>

                <h4>Profile Information</h4>

                <span>View your profile details</span>

              </div>

            </div>

            <FiChevronRight />

          </div>

          {/* ======================
              CHANGE PASSWORD
          ====================== */}

          <div className="setting-item">

            <div className="setting-left">

              <FiLock />

              <div>

                <h4>Change Password</h4>

                <span>Update your password</span>

              </div>

            </div>

            <FiChevronRight />

          </div>

          {/* ======================
              EMAIL NOTIFICATION
          ====================== */}

          <div className="setting-item">

            <div className="setting-left">

              <FiBell />

              <div>

                <h4>Email Notifications</h4>

                <span>Receive updates through email</span>

              </div>

            </div>

            <input
              type="checkbox"
              checked={emailNotification}
              onChange={() =>
                setEmailNotification(!emailNotification)
              }
            />

          </div>

          {/* ======================
              COMPLAINT ALERTS
          ====================== */}

          <div className="setting-item">

            <div className="setting-left">

              <FiBell />

              <div>

                <h4>Complaint Status Alerts</h4>

                <span>
                  Notify when complaint status changes
                </span>

              </div>

            </div>

            <input
              type="checkbox"
              checked={complaintNotification}
              onChange={() =>
                setComplaintNotification(
                  !complaintNotification
                )
              }
            />

          </div>

          {/* ======================
              THEME
          ====================== */}

          <div className="setting-item">

            <div className="setting-left">

              <FiMoon />

              <div>

                <h4>Theme</h4>

                <span>Light Theme (Default)</span>

              </div>

            </div>

            <span className="setting-value">

              Light

            </span>

          </div>

          {/* ======================
              ABOUT
          ====================== */}

          <div className="setting-item">

            <div className="setting-left">

              <FiInfo />

              <div>

                <h4>About GrievancePro</h4>

                <span>Version 1.0.0</span>

              </div>

            </div>

            <FiChevronRight />

          </div>
                    {/* ======================
              LOGOUT
          ====================== */}

          <div className="settings-footer">

            <button
              className="logout-btn"
              onClick={logout}
            >

              <FiLogOut />

              Logout

            </button>

          </div>

        </section>

      </main>

    </div>

  );

}