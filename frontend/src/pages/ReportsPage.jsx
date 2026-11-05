import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import "../styles/ReportsPage.css";

import {
    FaCalendarAlt,
    FaDownload,
    FaClipboardList,
    FaClock,
    FaTools,
    FaCheckCircle
} from "react-icons/fa";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function ReportsPage() {

    const [counts, setCounts] = useState({
        total: 0,
        pending: 0,
        inprogress: 0,
        resolved: 0
    });

    const [displayCounts, setDisplayCounts] = useState({
        total: 0,
        pending: 0,
        inprogress: 0,
        resolved: 0
    });

    const [loading, setLoading] = useState(true);

    /* ==========================================
       LOAD DASHBOARD DATA
    ========================================== */

    const animateCounts = (target) => {

        let step = 0;

        const interval = setInterval(() => {

            step++;

            setDisplayCounts({
                total: Math.min(step, target.total),
                pending: Math.min(step, target.pending),
                inprogress: Math.min(step, target.inprogress),
                resolved: Math.min(step, target.resolved)
            });

            if (
                step >= Math.max(
                    target.total,
                    target.pending,
                    target.inprogress,
                    target.resolved
                )
            ) {
                clearInterval(interval);
            }

        }, 25);

    };

    const loadDashboard = useCallback(async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/compilants"
            );

            const complaints = response.data;

            const pending = complaints.filter(
                complaint =>
                    (complaint.status || "")
                        .toLowerCase()
                        .trim() === "pending"
            ).length;

            const inprogress = complaints.filter(
                complaint =>
                    (complaint.status || "")
                        .toLowerCase()
                        .trim() === "in_progress"
            ).length;

            const resolved = complaints.filter(
                complaint =>
                    (complaint.status || "")
                        .toLowerCase()
                        .trim() === "resolved"
            ).length;

            const newCounts = {
                total: complaints.length,
                pending,
                inprogress,
                resolved
            };

            setCounts(newCounts);

            animateCounts(newCounts);

        } catch (error) {

            console.error("Dashboard Load Error:", error);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);
        /* ==========================================
       EXPORT REPORT
    ========================================== */

    const exportReport = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("GrievancePro Report", 20, 20);

        doc.setFontSize(12);

        doc.text(`Total Complaints : ${counts.total}`, 20, 40);
        doc.text(`Pending          : ${counts.pending}`, 20, 50);
        doc.text(`In Progress      : ${counts.inprogress}`, 20, 60);
        doc.text(`Resolved         : ${counts.resolved}`, 20, 70);

        doc.save("Grievance_Report.pdf");

    };

    /* ==========================================
       LOADING
    ========================================== */

    if (loading) {

        return (
            <div className="loading">
                Loading Reports...
            </div>
        );

    }

    /* ==========================================
       UI
    ========================================== */

    return (

        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="reports-page">

                    {/* Header */}

                    <div className="reports-header">

                        <div>

                            <h2>Reports & Analytics</h2>

                            <p>Hostel Complaint Summary</p>

                        </div>

                        <div className="report-actions">

                            <button className="date-btn">

                                <FaCalendarAlt />

                                July 2026

                            </button>

                            <button
                                className="download-btn"
                                onClick={exportReport}
                            >

                                <FaDownload />

                                Export Report

                            </button>

                        </div>

                    </div>

                    {/* Report Cards */}

                    <div className="report-cards">

                        <div className="report-card total">

                            <FaClipboardList />

                            <div>

                                <h3>{displayCounts.total}</h3>

                                <p>Total Complaints</p>

                            </div>

                        </div>

                        <div className="report-card pending">

                            <FaClock />

                            <div>

                                <h3>{displayCounts.pending}</h3>

                                <p>Pending</p>

                            </div>

                        </div>

                        <div className="report-card progress">

                            <FaTools />

                            <div>

                                <h3>{displayCounts.inprogress}</h3>

                                <p>In Progress</p>

                            </div>

                        </div>

                        <div className="report-card resolved">

                            <FaCheckCircle />

                            <div>

                                <h3>{displayCounts.resolved}</h3>

                                <p>Resolved</p>

                            </div>

                        </div>

                    </div>

                    {/* Charts */}

                    <div className="reports-grid">
                                            {/* Doughnut Chart */}

                        <div className="chart-card">

                            <h3>Complaint Status</h3>

                            <Doughnut
                                data={{
                                    labels: [
                                        "Pending",
                                        "In Progress",
                                        "Resolved"
                                    ],
                                    datasets: [
                                        {
                                            data: [
                                                counts.pending,
                                                counts.inprogress,
                                                counts.resolved
                                            ],
                                            backgroundColor: [
                                                "#F5B041",
                                                "#4A90E2",
                                                "#2ECC71"
                                            ],
                                            borderWidth: 2
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "bottom"
                                        }
                                    }
                                }}
                            />

                        </div>

                        {/* Line Chart */}

                        <div className="chart-card">

                            <h3>Complaint Trend</h3>

                            <Line
                                data={{
                                    labels: [
                                        "Jan",
                                        "Feb",
                                        "Mar",
                                        "Apr",
                                        "May",
                                        "Jun"
                                    ],
                                    datasets: [
                                        {
                                            label: "Complaints",
                                            data: [
                                                10,
                                                20,
                                                30,
                                                25,
                                                40,
                                                counts.total
                                            ],
                                            borderColor: "#8B5E3C",
                                            backgroundColor: "rgba(139,94,60,0.15)",
                                            fill: true,
                                            tension: 0.4,
                                            pointRadius: 4,
                                            pointHoverRadius: 6
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: "bottom"
                                        }
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }}
                            />

                        </div>

                    </div>
                                    </div>

            </div>

        </div>

    );

}

export default ReportsPage;
                   