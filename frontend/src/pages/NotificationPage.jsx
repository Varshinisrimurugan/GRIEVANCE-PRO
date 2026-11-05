import React, { useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaTools,
  FaClock,
  FaInfoCircle,
  FaEnvelopeOpenText,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import "../styles/NotificationPage.css";

const NotificationPage = () => {

  const [notifications, setNotifications] = useState([

    {
      id: 1,
      title: "Complaint Status Updated",
      message:
        "Your complaint #C101 (Water Leakage) status has been updated to In Progress.",
      type: "update",
      status: "IN_PROGRESS",
      time: "2 min ago",
      read: false,
    },

    {
      id: 2,
      title: "New Assignment",
      message:
        "Worker has been assigned to Complaint #C102.",
      type: "assignment",
      status: "ASSIGNED",
      time: "15 min ago",
      read: false,
    },

    {
      id: 3,
      title: "Complaint Resolved",
      message:
        "Complaint #C103 has been successfully resolved.",
      type: "resolved",
      status: "RESOLVED",
      time: "1 hour ago",
      read: true,
    },

    {
      id: 4,
      title: "System Alert",
      message:
        "Hostel maintenance will be carried out tomorrow.",
      type: "alert",
      status: "PENDING",
      time: "3 hours ago",
      read: true,
    },

    {
      id: 5,
      title: "Thank You!",
      message:
        "Thank you for using GrievancePro. Please share your feedback.",
      type: "general",
      status: "GENERAL",
      time: "2 days ago",
      read: true,
    },

  ]);

  /* ================= ICON ================= */

  const getIcon = (type) => {

    switch(type){

      case "update":
        return <FaBell className="blue" />;

      case "assignment":
        return <FaTools className="green" />;

      case "resolved":
        return <FaCheckCircle className="green" />;

      case "alert":
        return <FaClock className="orange" />;

      default:
        return <FaInfoCircle className="purple" />;

    }

  };

  /* ================= MARK ALL ================= */

  const markAllAsRead = () => {

    setNotifications(

      notifications.map((item) => ({
        ...item,
        read: true,
      }))

    );

  };

  /* ================= DELETE ================= */

  const deleteNotification = (id) => {

    setNotifications(

      notifications.filter((item) => item.id !== id)

    );

  };
    return (

    <div className="student-dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <div className="notification-page">

          {/* ================= HEADER ================= */}

          <div className="notification-header">

            <div>

              <h2>
                <FaBell />
                Notifications
              </h2>

              <p>
                Stay updated with the latest complaint activities.
              </p>

            </div>

          </div>

          {/* ================= MAIN LAYOUT ================= */}

          <div className="notification-layout">

            {/* ================= LEFT PANEL ================= */}

            <div className="notification-sidebar">

              <h3>Notification Summary</h3>

              <div className="summary-item active">
                <span>All Notifications</span>
                <span>{notifications.length}</span>
              </div>

              <div className="summary-item">
                <span>Unread</span>
                <span>
                  {notifications.filter((n) => !n.read).length}
                </span>
              </div>

              <div className="summary-item">
                <span>Read</span>
                <span>
                  {notifications.filter((n) => n.read).length}
                </span>
              </div>

              {notifications.some((item) => !item.read) && (

                <button
                  className="mark-btn"
                  onClick={markAllAsRead}
                >
                  <FaEnvelopeOpenText />
                  Mark All as Read
                </button>

              )}

            </div>

            {/* ================= CENTER PANEL ================= */}

            <div className="notification-content">

              <div className="content-header">

                <h3>Recent Notifications</h3>

                <span>
                  {notifications.length} Notifications
                </span>

              </div>
                            {notifications.length === 0 ? (

                <div className="empty-notification">

                  <FaBell size={70} />

                  <h3>No Notifications</h3>

                  <p>You're all caught up!</p>

                </div>

              ) : (

                notifications.map((item) => (

                  <div
                    className={`notification-card ${
                      item.read ? "read" : "unread"
                    }`}
                    key={item.id}
                  >

                    <div className="notification-icon">

                      {getIcon(item.type)}

                    </div>

                    <div className="notification-body">

                      <h4>{item.title}</h4>

                      <p>{item.message}</p>

                    </div>

                    <div className="notification-right">

                      <span>{item.time}</span>

                      {!item.read && (

                        <div className="dot"></div>

                      )}

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteNotification(item.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

            {/* ================= RIGHT INFO PANEL ================= */}

            <div className="notification-info">

              <h3>Information</h3>

              <div className="info-card">

                <FaInfoCircle className="info-icon" />

                <h4>Stay Updated</h4>

                <p>
                  All complaint updates, worker assignments,
                  and announcements will appear here.
                </p>

              </div>

              <div className="info-card">

                <FaBell className="info-icon" />

                <h4>Notifications</h4>

                <p>
                  Notifications are stored for the last
                  <strong> 30 days </strong>
                  and older messages are removed automatically.
                </p>

              </div>

            </div>

          </div>
                    {/* ================= FOOTER ================= */}

          <div className="notification-footer">

            <FaInfoCircle />

            <span>
              Notifications are stored for the last 30 days.
            </span>

          </div>

        </div>

      </div>

    </div>

  );

};

export default NotificationPage;