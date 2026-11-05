import React, { useState } from "react";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/WorkerSettings.css";

const WorkerSettings = () => {

  const [notifications, setNotifications] = useState({
    assignment: true,
    updates: true,
    system: false,
  });

  const [theme, setTheme] = useState("Light");

  const [language, setLanguage] = useState("English");

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handlePasswordChange = (e) => {

    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });

  };

  const handleNotificationChange = (e) => {

    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });

  };

  const handleSave = () => {

    alert("Settings Saved Successfully!");

  };

  return (

    <div
      className={`worker-settings-page ${
        theme === "Dark" ? "dark-theme" : "light-theme"
      }`}
    >

      <WorkerSidebar />

      <main className="worker-settings-main">

        <WorkerHeader />

        <div className="settings-header">

          <h2>Worker Settings</h2>

          <p>
            Manage your account preferences and application settings.
          </p>

        </div>

        <div className="settings-container">

          {/* ==========================
              Account Information
          ========================== */}

          <div className="settings-card">

            <h3>👤 Account Information</h3>

            <div className="info-grid">

              <div>

                <label>Full Name</label>

                <input
                  type="text"
                  value="Rahul Kumar"
                  readOnly
                />

              </div>

              <div>

                <label>Email</label>

                <input
                  type="email"
                  value="rahul@gmail.com"
                  readOnly
                />

              </div>

              <div>

                <label>Phone Number</label>

                <input
                  type="text"
                  value="9876543210"
                  readOnly
                />

              </div>

            </div>

          </div>

          {/* ==========================
              Change Password
          ========================== */}

          <div className="settings-card">

            <h3>🔒 Change Password</h3>

            <div className="password-grid">

              <input
                type="password"
                name="current"
                placeholder="Current Password"
                value={password.current}
                onChange={handlePasswordChange}
              />

              <input
                type="password"
                name="newPass"
                placeholder="New Password"
                value={password.newPass}
                onChange={handlePasswordChange}
              />

              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={password.confirm}
                onChange={handlePasswordChange}
              />

            </div>

          </div>
                    {/* ==========================
              Notification Preferences
          ========================== */}

          <div className="settings-card">

            <h3>🔔 Notification Preferences</h3>

            <div className="checkbox-group">

              <label>

                <input
                  type="checkbox"
                  name="assignment"
                  checked={notifications.assignment}
                  onChange={handleNotificationChange}
                />

                Complaint Assignment Notifications

              </label>

              <label>

                <input
                  type="checkbox"
                  name="updates"
                  checked={notifications.updates}
                  onChange={handleNotificationChange}
                />

                Complaint Status Updates

              </label>

              <label>

                <input
                  type="checkbox"
                  name="system"
                  checked={notifications.system}
                  onChange={handleNotificationChange}
                />

                System Notifications

              </label>

            </div>

          </div>

          {/* ==========================
              Appearance
          ========================== */}

          <div className="settings-card">

            <h3>🎨 Appearance</h3>

            <label>Select Theme</label>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >

              <option value="Light">Light</option>

              <option value="Dark">Dark</option>

            </select>

          </div>

          {/* ==========================
              Language
          ========================== */}

          <div className="settings-card">

            <h3>🌐 Language</h3>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >

              <option value="English">English</option>

              <option value="தமிழ்">தமிழ்</option>

            </select>

          </div>

          {/* ==========================
              About
          ========================== */}

          <div className="settings-card">

            <h3>ℹ️ About</h3>

            <p><strong>Application :</strong> GrievancePro</p>

            <p><strong>Version :</strong> 1.0.0</p>

            <p><strong>Module :</strong> Worker Portal</p>

            <p><strong>Developed By :</strong> GrievancePro Team</p>

          </div>

          {/* ==========================
              Save Button
          ========================== */}

          <div className="settings-actions">

            <button
              className="save-btn"
              onClick={handleSave}
            >

              Save Settings

            </button>

          </div>

        </div>

      </main>

    </div>

  );

};

export default WorkerSettings;