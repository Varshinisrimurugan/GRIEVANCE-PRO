import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import ComplaintChart from "../components/ComplaintChart";

import "../styles/StudentDashboard.css";

import {
  FiBell,
  FiMenu,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiTool,
  FiChevronRight,
  FiPlusCircle,
  FiFileText,
  FiStar,
} from "react-icons/fi";

import {
  FaClipboardList,
  FaHourglassHalf,
  FaTools,
  FaCheckDouble,
} from "react-icons/fa";

export default function StudentDashboard() {

  const navigate = useNavigate();

  /* ===============================
     STUDENT INFO
  =============================== */

  const [student, setStudent] = useState({
    name: "",
    department: "",
    room: "",
    email: "",
    id: "",
  });

  /* ===============================
     COUNTS
  =============================== */

  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    resolved: 0,
  });

  /* ===============================
     RECENT COMPLAINTS
  =============================== */

  const [recentComplaints, setRecentComplaints] = useState([]);

  const userId = localStorage.getItem("userId");

  /* ===============================
     LOAD DASHBOARD
  =============================== */

  const loadDashboard = useCallback(async () => {
    try {

      const [
        totalRes,
        pendingRes,
        progressRes,
        resolvedRes,
        complaintsRes,
        profileRes,
      ] = await Promise.all([
        api.get(`/compilants/user/${userId}/count/total`),
        api.get(`/compilants/user/${userId}/count/pending`),
        api.get(`/compilants/user/${userId}/count/in-progress`),
        api.get(`/compilants/user/${userId}/count/resolved`),
        api.get(`/compilants/user/${userId}`),
        api.get(`/users/${userId}`),
      ]);

      setCounts({
        total: totalRes.data,
        pending: pendingRes.data,
        progress: progressRes.data,
        resolved: resolvedRes.data,
      });

      setRecentComplaints(complaintsRes.data.slice(0, 5));

      setStudent({
        name: profileRes.data.name,
        department: profileRes.data.department,
        room: profileRes.data.roomNumber,
        email: profileRes.data.email,
        id: profileRes.data.userId,
      });

    } catch (err) {
      console.error(err);
    }

  }, [userId]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (

    <div className="student-dashboard">

      <Sidebar />

      <main className="main-content">
         {/* ==========================================
                    TOP BAR
        ========================================== */}

        <header className="topbar">

          <div className="top-left">

            <button className="menu-btn">
              <FiMenu />
            </button>

            <div>

              <h1>
                Welcome back,
                <span> {student.name || "Student"}</span> 👋
              </h1>

              <p>
                Smart Hostel Complaint Management System
              </p>

            </div>

          </div>

          <div className="top-right">

            <div className="notification">

              <FiBell />

              <span>3</span>

            </div>

            <div className="profile-box">

              <img
                src={`https://ui-avatars.com/api/?background=c89a6b&color=fff&name=${student.name}`}
                alt="Student"
              />

              <div>

                <h4>{student.name || "Student"}</h4>

                <p>{student.department || "B.Tech IT"}</p>

              </div>

              <FiChevronRight />

            </div>

          </div>

        </header>

        {/* ==========================================
                  HERO BANNER
        ========================================== */}

        <section className="hero-banner">

          <div className="hero-left">

            <h1>

              Welcome back,

              <span> {student.name || "Student"}</span> 👋

            </h1>

            <p>

              Manage your hostel complaints, track their progress,
              receive instant updates from the administration,
              and monitor every complaint in one place.

            </p>

            <button
              className="hero-btn"
              onClick={() => navigate("/raise-complaint")}
            >

              Raise New Complaint

            </button>

          </div>

          <div className="hero-right">

            <img
              src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
              alt="Complaint Banner"
            />

          </div>

        </section>

        {/* ==========================================
                DASHBOARD CARDS
        ========================================== */}

        <section className="stats-grid">

              {/* ===========================
                  TOTAL
          =========================== */}

          <div className="stat-card">

            <div className="stat-icon total">
              <FaClipboardList />
            </div>

            <div>

              <h5>Total Complaints</h5>

              <h2>{counts.total}</h2>

              <p>All complaints submitted</p>

            </div>

          </div>

          {/* ===========================
                  PENDING
          =========================== */}

          <div className="stat-card">

            <div className="stat-icon pending">
              <FaHourglassHalf />
            </div>

            <div>

              <h5>Pending</h5>

              <h2>{counts.pending}</h2>

              <p>Waiting for action</p>

            </div>

          </div>

          {/* ===========================
               IN PROGRESS
          =========================== */}

          <div className="stat-card">

            <div className="stat-icon progress">
              <FaTools />
            </div>

            <div>

              <h5>In Progress</h5>

              <h2>{counts.progress}</h2>

              <p>Repair is ongoing</p>

            </div>

          </div>

          {/* ===========================
                 RESOLVED
          =========================== */}

          <div className="stat-card">

            <div className="stat-icon resolved">
              <FaCheckDouble />
            </div>

            <div>

              <h5>Resolved</h5>

              <h2>{counts.resolved}</h2>

              <p>Completed complaints</p>

            </div>

          </div>

        </section>

        {/* ======================================
                ANALYTICS SECTION
        ====================================== */}

        <section className="analytics-grid">

           {/* ======================================
                    LEFT : CHART
          ====================================== */}

          <div className="glass-card chart-panel">

            <div className="card-header">

              <h3>Complaint Status</h3>

              <p>Overview of all complaints</p>

            </div>

            <div className="chart-body">

              <ComplaintChart counts={counts} />

            </div>

          </div>

          {/* ======================================
                 CENTER : RECENT COMPLAINTS
          ====================================== */}

          <div className="glass-card complaint-panel">

            <div className="card-header">

              <h3>Recent Complaints</h3>

              <button
                className="view-all-btn"
                onClick={() => navigate("/my-complaints")}
              >
                View All
              </button>

            </div>

            <div className="complaint-list">

              {recentComplaints.length > 0 ? (

                recentComplaints.map((item) => (

                  <div
                    key={item.complaint_id}
                    className="complaint-item"
                  >

                    <div className="complaint-left">

                      <div className="complaint-icon">

                        <FiAlertCircle />

                      </div>

                      <div>

                        <h4>{item.complaint_title}</h4>

                        <p>

                          <FiMapPin />

                          {" "}

                          {item.location}

                        </p>

                      </div>

                    </div>

                    <span
                      className={`status-chip ${item.status
                        ?.toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {item.status}
                    </span>

                  </div>

                ))

              ) : (

                <div className="empty-box">

                  No Complaints Found

                </div>

              )}

            </div>

          </div>

          {/* ======================================
                    RIGHT : QUICK ACTIONS
          ====================================== */}

          <div className="glass-card action-panel">

            <h3>Quick Actions</h3>

            <div
              className="action-box"
              onClick={() => navigate("/raise-complaint")}
            >

              <FiPlusCircle />

              <div>

                <h4>Raise Complaint</h4>

                <p>Create a new complaint</p>

              </div>

            </div>

            <div
              className="action-box"
              onClick={() => navigate("/my-complaints")}
            >

              <FiFileText />

              <div>

                <h4>My Complaints</h4>

                <p>Track complaint status</p>

              </div>

            </div>

            <div
              className="action-box"
              onClick={() => navigate("/feedback")}
            >

              <FiStar />

              <div>

                <h4>Feedback</h4>

                <p>Rate completed work</p>

              </div>

            </div>

          </div>

        </section>

        {/* ======================================
                BOTTOM SECTION
        ====================================== */}

        <section className="bottom-layout">

                  {/* ===========================
              LEFT SIDE
          =========================== */}

          <div className="bottom-left">

            {/* Recent Activity */}

            <div className="glass-card">

              <div className="card-header">
                <h3>Recent Activity</h3>
              </div>

              <div className="activity-list">

                {recentComplaints.length > 0 ? (

                  recentComplaints.slice(0, 4).map((item, index) => (

                    <div
                      className="activity-item"
                      key={index}
                    >

                      <div className="activity-circle">
                        <FiClock />
                      </div>

                      <div>

                        <h4>{item.complaint_title}</h4>

                        <p>{item.status}</p>

                      </div>

                    </div>

                  ))

                ) : (

                  <p>No Recent Activity</p>

                )}

              </div>

            </div>

            {/* Student Profile */}

            <div className="glass-card">

              <div className="card-header">
                <h3>Student Profile</h3>
              </div>

              <div className="student-profile">

                <div className="profile-avatar-large">

                  {student.name
                    ? student.name.charAt(0).toUpperCase()
                    : "S"}

                </div>

                <div className="profile-details">

                  <p><strong>Name :</strong> {student.name}</p>

                  <p><strong>Email :</strong> {student.email}</p>

                  <p><strong>Department :</strong> {student.department}</p>

                  <p><strong>Room :</strong> {student.room}</p>

                </div>

              </div>

            </div>

          </div>

          {/* ===========================
              RIGHT SIDE
          =========================== */}

          <div className="bottom-right">

            {/* Notifications */}

            <div className="glass-card">

              <div className="card-header">
                <h3>Notifications</h3>
              </div>

              <div className="notification-list">

                <div className="notification-box">

                  <FiBell />

                  <div>

                    <h4>Complaint Assigned</h4>

                    <p>Your complaint has been assigned.</p>

                  </div>

                </div>

                <div className="notification-box">

                  <FiTool />

                  <div>

                    <h4>Repair Started</h4>

                    <p>Worker has started the repair.</p>

                  </div>

                </div>

                <div className="notification-box">

                  <FiCheckCircle />

                  <div>

                    <h4>Complaint Resolved</h4>

                    <p>Your issue has been resolved.</p>

                  </div>

                </div>

              </div>

            </div>

            {/* Summary */}

            <div className="glass-card">

              <div className="card-header">

                <h3>Complaint Summary</h3>

              </div>

              <div className="summary-grid">

                <div className="summary-box">

                  <FaClipboardList />

                  <h2>{counts.total}</h2>

                  <p>Total</p>

                </div>

                <div className="summary-box">

                  <FaHourglassHalf />

                  <h2>{counts.pending}</h2>

                  <p>Pending</p>

                </div>

                <div className="summary-box">

                  <FaTools />

                  <h2>{counts.progress}</h2>

                  <p>Progress</p>

                </div>

                <div className="summary-box">

                  <FaCheckDouble />

                  <h2>{counts.resolved}</h2>

                  <p>Resolved</p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ===========================
             FOOTER
        =========================== */}

        <footer className="dashboard-footer">

          <div>

            <FiClock />

            <span>

              {new Date().toLocaleDateString()} |{" "}
              {new Date().toLocaleTimeString()}

            </span>

          </div>

          <p>© 2026 GrievancePro • Student Dashboard</p>

        </footer>

      </main>

    </div>

  );

}
