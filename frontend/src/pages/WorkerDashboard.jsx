import React, { useState } from "react";

import {
  FaClipboardList,
  FaClock,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHistory,
  FaCamera,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/WorkerDashboard.css";

const WorkerDashboard = () => {

  const [stats] = useState({
    totalAssigned: 12,
    pending: 5,
    inProgress: 4,
    resolved: 3,
    highPriority: 2,
  });

  const complaints = [

    {
      id: "CMP-101",
      title: "Water Leakage in Bathroom",
      location: "Block A • Floor 2 • Room 203",
      priority: "High",
      status: "Pending",
      date: "07 Jul 2026",
      icon: "💧",
    },

    {
      id: "CMP-102",
      title: "Electricity Not Working",
      location: "Block B • Floor 1 • Room 102",
      priority: "Medium",
      status: "In Progress",
      date: "06 Jul 2026",
      icon: "⚡",
    },

    {
      id: "CMP-103",
      title: "Internet Connection Issue",
      location: "Block C • Floor 3 • Room 301",
      priority: "Medium",
      status: "In Progress",
      date: "06 Jul 2026",
      icon: "📶",
    },

    {
      id: "CMP-104",
      title: "Cleaning Required",
      location: "Block A • Floor 1 • Corridor",
      priority: "Low",
      status: "Resolved",
      date: "05 Jul 2026",
      icon: "🧹",
    },

    {
      id: "CMP-105",
      title: "Mess Food Issue",
      location: "Block D • Mess Hall",
      priority: "High",
      status: "Pending",
      date: "04 Jul 2026",
      icon: "🍽️",
    },

  ];

  return (

    <div className="worker-dashboard">

      <WorkerSidebar />

      <main className="worker-main">

        <WorkerHeader />

        {/* ================= WELCOME CARD ================= */}

        <div className="welcome-card">

          <div>

            <h2>👷 Welcome Back!</h2>

            <p>

              You have <b>{stats.pending}</b> pending complaints.

              Complete today's assigned tasks to improve hostel services.

            </p>

          </div>

          <button>

            View Tasks

          </button>

        </div>
                {/* ================= DASHBOARD CARDS ================= */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon brown">
              <FaClipboardList />
            </div>

            <div className="card-content">

              <h5>Total Assigned</h5>

              <h2>{stats.totalAssigned}</h2>

              <p>Assigned Complaints</p>

            </div>

            <span className="card-menu">⋮</span>

          </div>

          <div className="dashboard-card">

            <div className="card-icon orange">
              <FaClock />
            </div>

            <div className="card-content">

              <h5>Pending</h5>

              <h2>{stats.pending}</h2>

              <p>Awaiting Action</p>

            </div>

            <span className="card-menu">⋮</span>

          </div>

          <div className="dashboard-card">

            <div className="card-icon blue">
              <FaTools />
            </div>

            <div className="card-content">

              <h5>In Progress</h5>

              <h2>{stats.inProgress}</h2>

              <p>Currently Working</p>

            </div>

            <span className="card-menu">⋮</span>

          </div>

          <div className="dashboard-card">

            <div className="card-icon green">
              <FaCheckCircle />
            </div>

            <div className="card-content">

              <h5>Resolved</h5>

              <h2>{stats.resolved}</h2>

              <p>Successfully Completed</p>

            </div>

            <span className="card-menu">⋮</span>

          </div>

          <div className="dashboard-card">

            <div className="card-icon red">
              <FaExclamationTriangle />
            </div>

            <div className="card-content">

              <h5>High Priority</h5>

              <h2>{stats.highPriority}</h2>

              <p>Needs Immediate Action</p>

            </div>

            <span className="card-menu">⋮</span>

          </div>

        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="worker-content">

          {/* ================= LEFT SIDE ================= */}

          <div className="complaints-section">

            <div className="section-header">

              <h2>Assigned Complaints</h2>

              <button className="view-btn">

                View All

              </button>

            </div>

            <div className="complaint-list">

                           {complaints.map((item) => (

                <div
                  key={item.id}
                  className="complaint-card"
                >

                  <div className="complaint-left">

                    <div className="complaint-icon">

                      {item.icon}

                    </div>

                    <div>

                      <h4>{item.title}</h4>

                      <span className="cmp-id">

                        {item.id}

                      </span>

                      <p>{item.location}</p>

                    </div>

                  </div>

                  <div className="complaint-middle">

                    <span
                      className={`priority ${item.priority.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>

                    <span
                      className={`status ${item.status
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <div className="complaint-right">

                    <small>{item.date}</small>

                    <button>

                      Update Status

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ================= RIGHT PANEL ================= */}

          <div className="worker-right">

            {/* Progress */}

            <div className="progress-card">

              <h3>Today's Progress</h3>

              <div className="progress-circle">

                <div className="circle">

                  <h2>80%</h2>

                </div>

                <div className="progress-info">

                  <h4>8 / 10 Tasks Completed</h4>

                  <p>

                    Complete the remaining complaints before the end of the day.

                  </p>

                </div>

              </div>

              <div className="progress-bar">

                <div className="progress-fill"></div>

              </div>

            </div>

            {/* Quick Actions */}

            <div className="quick-actions">

              <h3>Quick Actions</h3>

              <div className="action-grid">

                <button>

                  <FaTools />

                  <span>Update Status</span>

                </button>

                <button>

                  <FaCamera />

                  <span>Upload Photo</span>

                </button>

                <button>

                  <FaHistory />

                  <span>History</span>

                </button>

                <button>

                  <FaMapMarkerAlt />

                  <span>Location</span>

                </button>

                <button>

                  <FaPhoneAlt />

                  <span>Call Student</span>

                </button>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="activity-card">

              <div className="section-header">

                <h3>Recent Activity</h3>

                <button className="view-btn">

                  View All

                </button>

              </div>

              <ul>

                <li>

                  ✅ Complaint CMP-101 marked as Resolved

                  <span>2 hrs ago</span>

                </li>

                <li>

                  🔧 Complaint CMP-102 moved to In Progress

                  <span>4 hrs ago</span>

                </li>

                <li>

                  📸 Uploaded photo for CMP-103

                  <span>Yesterday</span>

                </li>

                <li>

                  📍 Location updated for CMP-105

                  <span>Yesterday</span>

                </li>

              </ul>

            </div>

          </div>

        </div>
                {/* ================= BOTTOM CARDS ================= */}

        <div className="bottom-cards">

          <div className="bottom-card">

            <h3>Completed This Week</h3>

            <h1>18</h1>

            <p>Complaints Successfully Completed</p>

          </div>

          <div className="bottom-card">

            <h3>Average Resolution Time</h3>

            <h1>2.4 hrs</h1>

            <p>Average Completion Time</p>

          </div>

          <div className="bottom-card">

            <h3>Worker Rating</h3>

            <h1>4.8 ⭐</h1>

            <p>Based on Student Feedback</p>

          </div>

        </div>

      </main>

    </div>

  );

};

export default WorkerDashboard;