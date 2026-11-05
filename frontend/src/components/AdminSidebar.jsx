import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiClipboard,
  FiClock,
  FiTool,
  FiCheckCircle,
  FiUsers,
  FiFileText,
  FiBell,
  FiStar,
  FiSettings,
  FiLogOut,
  FiUserPlus
} from "react-icons/fi";

import "../styles/AdminSidebar.css";

function AdminSidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();
    navigate("/");

  };

  const menuItems = [

    {
      title: "Dashboard",
      icon: <FiHome />,
      path: "/admin-dashboard"
    },

    {
      title: "All Complaints",
      icon: <FiClipboard />,
      path: "/admin-complaints"
    },

    {
      title: "Pending Complaints",
      icon: <FiClock />,
      path: "/pending-complaints"
    },

    {
      title: "In Progress",
      icon: <FiTool />,
      path: "/inprogress-complaints"
    },

    {
      title: "Resolved Complaints",
      icon: <FiCheckCircle />,
      path: "/resolved-complaints"
    },

    {
      title: "Assign Worker",
      icon: <FiUserPlus />,
      path: "/assign-worker"
    },

    {
      title: "Manage Workers",
      icon: <FiUsers />,
      path: "/manage-workers"
    },

    {
      title: "Reports",
      icon: <FiFileText />,
      path: "/reports"
    },

    {
      title: "Notifications",
      icon: <FiBell />,
      path: "/admin-notifications"
    },

    {
      title: "Feedback",
      icon: <FiStar />,
      path: "/admin-feedback"
    },

    {
      title: "Settings",
      icon: <FiSettings />,
      path: "/admin-settings"
    }

  ];

  return (

    <div className="admin-sidebar">

      {/* Logo */}

      <div className="admin-logo">

        <div className="logo-icon">

          🛡️

        </div>

        <div>

          <h2>GrievancePro</h2>

          <span>Admin Panel</span>

        </div>

      </div>

      {/* Menu */}

      <div className="admin-menu">

        {

          menuItems.map((item, index) => (

            <Link

              key={index}

              to={item.path}

              className={
                location.pathname === item.path
                  ? "menu-item active"
                  : "menu-item"
              }

            >

              <span className="menu-icon">

                {item.icon}

              </span>

              <span>

                {item.title}

              </span>

            </Link>

          ))

        }

      </div>

      {/* Logout */}

      <button

        className="logout-btn"

        onClick={logout}

      >

        <FiLogOut />

        <span style={{ marginLeft: "8px" }}>

          Logout

        </span>

      </button>

    </div>

  );

}

export default AdminSidebar;