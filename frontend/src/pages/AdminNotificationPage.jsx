import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import "../styles/AdminNotificationPage.css";

function AdminNotificationPage() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const role = "ADMIN";

    useEffect(() => {
        loadNotifications();
    }, []);

    /* =====================================
       LOAD NOTIFICATIONS
    ===================================== */

    const loadNotifications = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/notifications"
            );

            const allNotifications = response.data || [];

            // FILTER ONLY ADMIN NOTIFICATIONS
            const adminNotifications = allNotifications.filter(
                (n) => n.role === role
            );

            setNotifications(adminNotifications);

        } catch (error) {
            console.log("Error loading notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    /* =====================================
       LOADING UI
    ===================================== */

    if (loading) {
        return (
            <div className="loading">
                Loading Notifications...
            </div>
        );
    }

    return (
        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="admin-notification-page">

                    {/* HEADER */}
                    <div className="page-header">
                        <h2>Admin Notifications</h2>
                        <p>System alerts and complaint updates</p>
                    </div>

                    {/* LIST WILL COME IN PART 2 */}
                    <div className="notification-container">

    {notifications.length === 0 ? (
        <div className="empty-box">
            <h3>No Notifications Found</h3>
            <p>System notifications will appear here</p>
        </div>
    ) : (

        notifications.map((item, index) => (

            <div
                key={index}
                className={`notification-card ${item.type || "info"}`}
            >

                {/* TOP SECTION */}
                <div className="notification-header">

                    <h4>{item.title}</h4>

                    <span className="time">
                        {item.time || "Just now"}
                    </span>

                </div>

                {/* MESSAGE */}
                <p className="message">
                    {item.message}
                </p>

                {/* FOOTER */}
                <div className="notification-footer">

                    <span className="role-badge">
                        {item.role}
                    </span>

                    <button className="mark-btn">
                        Mark as Read
                    </button>

                </div>

            </div>

        ))

    )}

</div>

                </div>

            </div>

        </div>
    );
}

export default AdminNotificationPage;