import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaBell,
  FaStar,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import "../styles/Sidebar.css";

const Sidebar = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <aside className="sidebar">

      {/* ================= LOGO ================= */}

      <div className="logo">

        <div className="logo-icon">

          <FaClipboardCheck />

        </div>

        <div className="logo-text">

          <h2>GrievancePro</h2>

          <p>Student Portal</p>

        </div>

      </div>

      {/* ================= MENU ================= */}

      <ul className="menu">

        <li>
          <NavLink
            to="/student-dashboard"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaHome className="icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/raise-complaint"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaPlusCircle className="icon" />
            <span>Raise Complaint</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/my-complaints"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaClipboardList className="icon" />
            <span>My Complaints</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaBell className="icon" />
            <span>Notifications</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaStar className="icon" />
            <span>Feedback</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaUser className="icon" />
            <span>Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            <FaCog className="icon" />
            <span>Settings</span>
          </NavLink>
        </li>

        <li onClick={logout} className="logout-item">

          <FaSignOutAlt className="icon" />

          <span>Logout</span>

        </li>

      </ul>

      {/* ================= FOOTER ================= */}

      <div className="sidebar-footer">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3063/3063828.png"
          alt="Hostel"
        />

      </div>

    </aside>

  );

};

export default Sidebar;
