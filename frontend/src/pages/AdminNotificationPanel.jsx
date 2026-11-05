import React from "react";

import {
    FaBell,
    FaClipboardCheck,
    FaUserCog,
    FaTools,
    FaCheckCircle,
    FaStar
} from "react-icons/fa";

import "../styles/AdminNotificationPanel.css";

function AdminNotificationPanel() {

    const notifications = [

        {

            icon: <FaClipboardCheck />,

            title: "New Complaint",

            message: "Complaint #102 has been raised.",

            time: "2 mins ago",

            color: "orange"

        },

        {

            icon: <FaUserCog />,

            title: "Worker Assigned",

            message: "Worker Kumar assigned to Complaint #97.",

            time: "15 mins ago",

            color: "blue"

        },

        {

            icon: <FaTools />,

            title: "In Progress",

            message: "Complaint #88 is currently in progress.",

            time: "30 mins ago",

            color: "purple"

        },

        {

            icon: <FaCheckCircle />,

            title: "Complaint Resolved",

            message: "Complaint #81 has been resolved.",

            time: "1 hour ago",

            color: "green"

        },

        {

            icon: <FaStar />,

            title: "New Feedback",

            message: "Student rated Complaint #81 with 5 stars.",

            time: "3 hours ago",

            color: "brown"

        }

    ];
        return (

        <div className="admin-notification-panel">

            {/* Header */}

            <div className="notification-header">

                <div className="notification-title">

                    <FaBell />

                    <h2>Notifications</h2>

                </div>

                <span className="notification-count">

                    {notifications.length}

                </span>

            </div>

            {/* Notification List */}

            <div className="notification-list">

                {

                    notifications.map((item, index) => (

                        <div
                            className="notification-card"
                            key={index}
                        >

                            <div className={`notification-icon ${item.color}`}>

                                {item.icon}

                            </div>

                            <div className="notification-content">

                                <h4>

                                    {item.title}

                                </h4>

                                <p>

                                    {item.message}

                                </p>

                                <small>

                                    {item.time}

                                </small>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default AdminNotificationPanel;