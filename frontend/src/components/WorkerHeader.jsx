import React from "react";
import {
  FaSearch,
  FaBell,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";

import "../styles/WorkerHeader.css";

function WorkerHeader() {

  return (

    <div className="worker-header">

      <div className="header-left">

        <h1>Worker Dashboard</h1>

        <p>
          Welcome back! Manage your assigned complaints efficiently.
        </p>

      </div>

      <div className="header-right">

        {/* Search */}

        <div className="header-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search complaints..."
          />

        </div>

        {/* Date */}

        <div className="header-date">

          <FaCalendarAlt />

          <span>07 July 2026</span>

        </div>

        {/* Notification */}

        <div className="header-notification">

          <FaBell />

          <span>3</span>

        </div>

        {/* Profile */}

        <div className="header-profile">

          <FaUserCircle />

          <div>

            <h4>Worker</h4>

            <p>Maintenance Staff</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default WorkerHeader;