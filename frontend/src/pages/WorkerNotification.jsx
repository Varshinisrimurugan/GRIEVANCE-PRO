import React, { useState } from "react";

import {
  FaBell,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/WorkerNotification.css";

const WorkerNotification = () => {

  const [notifications] = useState([

    {
      id: 1,
      title: "New Complaint Assigned",
      message: "Water leakage complaint assigned to you.",
      time: "10 mins ago",
      type: "new",
    },

    {
      id: 2,
      title: "Complaint Updated",
      message: "Complaint CMP-102 moved to In Progress.",
      time: "1 hour ago",
      type: "progress",
    },

    {
      id: 3,
      title: "Complaint Resolved",
      message: "CMP-103 successfully resolved.",
      time: "Yesterday",
      type: "success",
    },

    {
      id: 4,
      title: "High Priority Alert",
      message: "Electricity complaint requires immediate attention.",
      time: "Today",
      type: "warning",
    },

  ]);

  return (

    <div className="notification-page">

      <WorkerSidebar />

      <main className="notification-main">

        <WorkerHeader />

        <div className="notification-header">

          <h2>Notifications</h2>

          <p>

            Stay updated with your assigned complaints.

          </p>

        </div>
                {/* ================= NOTIFICATION LIST ================= */}

        <div className="notification-list">

          {notifications.map((item) => (

            <div
              key={item.id}
              className={`notification-card ${item.type}`}
            >

              <div className="notification-icon">

                {item.type === "new" && <FaBell />}

                {item.type === "progress" && <FaClock />}

                {item.type === "success" && <FaCheckCircle />}

                {item.type === "warning" && <FaExclamationTriangle />}

              </div>

              <div className="notification-content">

                <h3>{item.title}</h3>

                <p>{item.message}</p>

              </div>

              <div className="notification-time">

                <span>{item.time}</span>

              </div>

            </div>

          ))}

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="notification-summary">

          <div className="summary-card">

            <h2>4</h2>

            <p>Total Notifications</p>

          </div>

          <div className="summary-card">

            <h2>2</h2>

            <p>Unread</p>

          </div>

          <div className="summary-card">

            <h2>1</h2>

            <p>High Priority</p>

          </div>

        </div>
                  </main>

    </div>

  );

};

export default WorkerNotification;