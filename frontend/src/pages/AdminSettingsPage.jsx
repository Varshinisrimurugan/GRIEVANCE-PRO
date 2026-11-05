import React, { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import "../styles/AdminSettingsPage.css";

import {
    FaUserShield,
    FaLock,
    FaEnvelope,
    FaBell,
    FaMoon,
    FaGlobe,
    FaShieldAlt,
    FaDatabase,
    FaUsersCog,
    FaPaintBrush,
    FaInfoCircle,
    FaSave,
    FaUndo,
    FaCheckCircle,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function AdminSettingsPage() {

    const [showPassword, setShowPassword] = useState(false);

    const [settings, setSettings] = useState({

        adminName: "Admin",

        email: "admin@grievancepro.com",

        phone: "+91 98765 43210",

        location: "Coimbatore, Tamil Nadu",

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

        emailNotification: true,

        browserNotification: true,

        darkMode: false,

        language: "English"

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSettings({

            ...settings,

            [name]: value

        });

    };

    const toggleSwitch = (field) => {

        setSettings({

            ...settings,

            [field]: !settings[field]

        });

    };

    const saveSettings = () => {

        alert("Settings Saved Successfully!");

    };

    const resetSettings = () => {

        window.location.reload();

    };

    return (

        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="admin-settings-page">

                    {/* ========================= */}
                    {/* PAGE HEADER */}
                    {/* ========================= */}

                    <div className="settings-header">

                        <div>

                            <h2>Settings</h2>

                            <p>

                                Manage your account, preferences and
                                system settings.

                            </p>

                        </div>

                    </div>

                    {/* ========================= */}
                    {/* TOP GRID */}
                    {/* ========================= */}

                    <div className="settings-top-grid">

                        {/* ========================= */}
                        {/* PROFILE CARD */}
                        {/* ========================= */}

                        <div className="settings-card profile-card">

                            <div className="card-title">

                                <FaUserShield />

                                <h3>Admin Profile</h3>

                            </div>

                            <div className="profile-avatar">

                                👨‍💼

                            </div>

                            <h3 className="profile-name">

                                {settings.adminName}

                            </h3>

                            <span className="profile-role">

                                Super Administrator

                            </span>

                            <div className="profile-info">

                                <p>

                                    <FaEnvelope />

                                    {settings.email}

                                </p>

                                <p>

                                    📞 {settings.phone}

                                </p>

                                <p>

                                    📍 {settings.location}

                                </p>

                            </div>

                            <button className="edit-profile-btn">

                                Edit Profile

                            </button>

                        </div>
                                                {/* ========================= */}
                        {/* CHANGE PASSWORD CARD */}
                        {/* ========================= */}

                        <div className="settings-card password-card">

                            <div className="card-title">

                                <FaLock />

                                <h3>Change Password</h3>

                            </div>

                            <div className="form-group">

                                <label>

                                    Current Password

                                </label>

                                <div className="password-box">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="currentPassword"
                                        value={settings.currentPassword}
                                        onChange={handleChange}
                                        placeholder="Enter Current Password"
                                    />

                                    <button
                                        type="button"
                                        className="eye-btn"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>

                                </div>

                            </div>

                            <div className="form-group">

                                <label>

                                    New Password

                                </label>

                                <div className="password-box">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="newPassword"
                                        value={settings.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter New Password"
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>

                                    Confirm Password

                                </label>

                                <div className="password-box">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        value={settings.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                    />

                                </div>

                            </div>

                            {/* Password Strength */}

                            <div className="password-strength">

                                <div className="strength-text">

                                    Password Strength

                                    <span>

                                        Medium

                                    </span>

                                </div>

                                <div className="strength-bar">

                                    <div className="strength-fill"></div>

                                </div>

                            </div>

                            <button className="update-password-btn">

                                <FaLock />

                                Update Password

                            </button>

                        </div>

                    </div>

                    {/* ========================= */}
                    {/* SECOND ROW */}
                    {/* ========================= */}

                    <div className="settings-bottom-grid">
                        {/* ========================= */}
                        {/* PREFERENCES CARD */}
                        {/* ========================= */}

                        <div className="settings-card preferences-card">

                            <div className="card-title">

                                <FaBell />

                                <h3>Preferences</h3>

                            </div>

                            {/* Email Notification */}

                            <div className="preference-item">

                                <div>

                                    <h4>Email Notifications</h4>

                                    <p>
                                        Receive important updates through email
                                    </p>

                                </div>

                                <label className="switch">

                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotification}
                                        onChange={() =>
                                            toggleSwitch("emailNotification")
                                        }
                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            {/* Browser Notification */}

                            <div className="preference-item">

                                <div>

                                    <h4>Browser Notifications</h4>

                                    <p>
                                        Show browser alerts for new complaints
                                    </p>

                                </div>

                                <label className="switch">

                                    <input
                                        type="checkbox"
                                        checked={settings.browserNotification}
                                        onChange={() =>
                                            toggleSwitch("browserNotification")
                                        }
                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            {/* Dark Mode */}

                            <div className="preference-item">

                                <div>

                                    <h4>

                                        <FaMoon />

                                        &nbsp;Dark Mode

                                    </h4>

                                    <p>

                                        Enable dark theme for dashboard

                                    </p>

                                </div>

                                <label className="switch">

                                    <input
                                        type="checkbox"
                                        checked={settings.darkMode}
                                        onChange={() =>
                                            toggleSwitch("darkMode")
                                        }
                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            {/* Language */}

                            <div className="language-section">

                                <label>

                                    <FaGlobe />

                                    &nbsp;Language

                                </label>

                                <select
                                    name="language"
                                    value={settings.language}
                                    onChange={handleChange}
                                >

                                    <option>English</option>

                                    <option>Tamil</option>

                                    <option>Japanese</option>

                                </select>

                            </div>

                        </div>
                                                {/* ========================= */}
                        {/* SYSTEM SETTINGS */}
                        {/* ========================= */}

                        <div className="settings-card system-card">

                            <div className="card-title">

                                <FaDatabase />

                                <h3>System Settings</h3>

                            </div>

                            <div className="system-item">

                                <FaDatabase className="system-icon" />

                                <div>

                                    <h4>Database</h4>

                                    <p>MySQL Database Connected</p>

                                </div>

                                <span className="status-badge success">
                                    Active
                                </span>

                            </div>

                            <div className="system-item">

                                <FaUsersCog className="system-icon" />

                                <div>

                                    <h4>User Management</h4>

                                    <p>Manage Admins, Students & Workers</p>

                                </div>

                                <span className="status-badge success">
                                    Enabled
                                </span>

                            </div>

                            <div className="system-item">

                                <FaPaintBrush className="system-icon" />

                                <div>

                                    <h4>Theme</h4>

                                    <p>Brown & White Professional Theme</p>

                                </div>

                                <span className="status-badge">
                                    Default
                                </span>

                            </div>

                        </div>

                        {/* ========================= */}
                        {/* SECURITY STATUS */}
                        {/* ========================= */}

                        <div className="settings-card security-card">

                            <div className="card-title">

                                <FaShieldAlt />

                                <h3>Security Status</h3>

                            </div>

                            <div className="security-list">

                                <div className="security-item">

                                    <FaCheckCircle className="ok-icon" />

                                    <span>
                                        Account Verified
                                    </span>

                                </div>

                                <div className="security-item">

                                    <FaCheckCircle className="ok-icon" />

                                    <span>
                                        Strong Password Enabled
                                    </span>

                                </div>

                                <div className="security-item">

                                    <FaCheckCircle className="ok-icon" />

                                    <span>
                                        Secure Login Active
                                    </span>

                                </div>

                                <div className="security-item">

                                    <FaInfoCircle className="info-icon" />

                                    <span>
                                        Last Login : Today, 09:15 AM
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ========================= */}
                    {/* ACTION BUTTONS */}
                    {/* ========================= */}

                    <div className="settings-actions">

                        <button
                            className="save-btn"
                            onClick={saveSettings}
                        >

                            <FaSave />

                            Save Changes

                        </button>

                        <button
                            className="reset-btn"
                            onClick={resetSettings}
                        >

                            <FaUndo />

                            Reset

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminSettingsPage;