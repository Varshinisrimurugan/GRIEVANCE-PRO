import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiBell,
    FiSearch,
    FiCalendar,
    FiClock
} from "react-icons/fi";

import "../styles/AdminHeader.css";

function AdminHeader() {

    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const adminName =
        localStorage.getItem("name") || "Admin";

    useEffect(() => {

        const updateDateTime = () => {

            const now = new Date();

            setDate(
                now.toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            );

            setTime(
                now.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                })
            );

        };

        updateDateTime();

        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="admin-header">

            {/* Left */}

            <div className="header-left">

                <h1>
                    Admin Dashboard
                </h1>

                <p>
                    Welcome back,
                    <span> {adminName}</span>
                </p>

            </div>

            {/* Center */}

            <div className="header-search">

                <FiSearch />

                <input
                    type="text"
                    placeholder="Search complaints..."
                />

            </div>

            {/* Right */}

            <div className="header-right">

                <div className="date-box">

                    <FiCalendar />

                    {date}

                </div>

                <div className="time-box">

                    <FiClock />

                    {time}

                </div>

                {/* Notification */}

                <div
                    className="notification"
                    onClick={() => navigate("/admin-notifications")}
                    title="Admin Notifications"
                    style={{ cursor: "pointer" }}
                >

                    <FiBell />

                    <span className="notification-count">
                        3
                    </span>

                </div>

                {/* Profile */}

                <div className="profile-box">

                    <img
                        src="https://ui-avatars.com/api/?name=Admin&background=8B5A2B&color=fff"
                        alt="Admin"
                    />

                    <div>

                        <h4>
                            {adminName}
                        </h4>

                        <p>
                            Administrator
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminHeader;