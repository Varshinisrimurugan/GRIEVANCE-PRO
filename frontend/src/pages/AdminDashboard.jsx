import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import DashboardCards from "../components/DashboardCards";
import AdminComplaintChart from "../components/AdminComplaintChart";
import ComplaintTable from "../components/ComplaintTable";
import QuickActions from "../components/QuickActions";
import AdminNotificationPanel from "../components/AdminNotificationPanel";

import "../styles/AdminDashboard.css";
import "../styles/AdminComplaintChart.css";

function AdminDashboard() {

    // ===========================
    // Dashboard State
    // ===========================

    const [dashboardData, setDashboardData] = useState({

        total: 0,

        pending: 0,

        assigned: 0,

        inProgress: 0,

        resolved: 0,

        availableWorkers: 0,

        busyWorkers: 0,

        onLeaveWorkers: 0

    });

    // ===========================
    // Load Dashboard
    // ===========================

    useEffect(() => {

        loadDashboard();

    }, []);

    // ===========================
    // Dashboard API
    // ===========================

    const loadDashboard = async () => {

        try {

            const [

                total,

                pending,

                assigned,

                progress,

                resolved,

                available,

                busy,

                onLeave

            ] = await Promise.all([

                axios.get("http://localhost:8081/dashboard/total"),

                axios.get("http://localhost:8081/dashboard/pending"),

                axios.get("http://localhost:8081/dashboard/assigned"),

                axios.get("http://localhost:8081/dashboard/in-progress"),

                axios.get("http://localhost:8081/dashboard/resolved"),

                axios.get("http://localhost:8081/workers/available/count"),

                axios.get("http://localhost:8081/workers/busy/count"),

                axios.get("http://localhost:8081/workers/onleave/count")

            ]);

            setDashboardData({

                total: total.data,

                pending: pending.data,

                assigned: assigned.data,

                inProgress: progress.data,

                resolved: resolved.data,

                availableWorkers: available.data,

                busyWorkers: busy.data,

                onLeaveWorkers: onLeave.data

            });

        }

        catch (error) {

            console.log("Dashboard Error :", error);

        }

    };

    // ===========================
    // UI
    // ===========================

    return (

        <div className="admin-dashboard">

            {/* ================= SIDEBAR ================= */}

            <AdminSidebar />

            {/* ================= MAIN ================= */}

            <div className="admin-main">

                {/* Header */}

                <AdminHeader />

                {/* Dashboard Cards */}

                <DashboardCards

                    total={dashboardData.total}

                    pending={dashboardData.pending}

                    assigned={dashboardData.assigned}

                    inProgress={dashboardData.inProgress}

                    resolved={dashboardData.resolved}

                />
                                {/* ================= WORKER STATUS ================= */}

                <div className="worker-status-cards">

                    <div className="worker-card available-card">

                        <h3>

                            Available Workers

                        </h3>

                        <h1>

                            {dashboardData.availableWorkers}

                        </h1>

                    </div>

                    <div className="worker-card busy-card">

                        <h3>

                            Busy Workers

                        </h3>

                        <h1>

                            {dashboardData.busyWorkers}

                        </h1>

                    </div>

                    <div className="worker-card leave-card">

                        <h3>

                            On Leave Workers

                        </h3>

                        <h1>

                            {dashboardData.onLeaveWorkers}

                        </h1>

                    </div>

                </div>

                {/* ================= DASHBOARD CONTENT ================= */}

                <div className="admin-content">

                    {/* ================= LEFT PANEL ================= */}

                    <div className="chart-section">

                        <AdminComplaintChart

                            counts={{

                                pending: dashboardData.pending,

                                assigned: dashboardData.assigned,

                                progress: dashboardData.inProgress,

                                resolved: dashboardData.resolved

                            }}

                        />

                        <QuickActions />

                    </div>

                    {/* ================= RIGHT PANEL ================= */}

                    <div className="table-section">

                        {/* Complaint Priority */}

                        <ComplaintTable />
                                                {/* ================= NOTIFICATIONS ================= */}

                        <AdminNotificationPanel />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;