import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaClipboardList,
  FaTools,
  FaCheckCircle,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/WorkerSidebar.css";

function WorkerSidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <aside className="worker-sidebar">

      {/* Logo */}

      <div className="worker-sidebar-logo">

        <h2>GrievancePro</h2>

        <p>Worker Portal</p>

      </div>

      {/* Navigation */}

      <nav>

        <NavLink
          to="/worker-dashboard"
          className="sidebar-link"
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/assigned-complaints"
          className="sidebar-link"
        >
          <FaClipboardList />
          <span>Assigned Complaints</span>
        </NavLink>

        <NavLink
          to="/worker-inprogress"
          className="sidebar-link"
        >
          <FaTools />
          <span>In Progress</span>
        </NavLink>

        <NavLink
          to="/worker-resolved"
          className="sidebar-link"
        >
          <FaCheckCircle />
          <span>Resolved</span>
        </NavLink>

        <NavLink
          to="/worker-notifications"
          className="sidebar-link"
        >
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/worker-profile"
          className="sidebar-link"
        >
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/worker-settings"
          className="sidebar-link"
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={logout}
      >

        <FaSignOutAlt />

        <span>Logout</span>

      </button>

    </aside>

  );

}

export default WorkerSidebar;