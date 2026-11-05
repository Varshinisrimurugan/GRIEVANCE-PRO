import React, { useMemo, useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import "../styles/AdminFeedbackPage.css";

import {
    FaStar,
    FaSearch,
    FaComments,
    FaSmile,
    FaExclamationTriangle,
    FaChartLine
} from "react-icons/fa";

function AdminFeedbackPage() {

    const [searchTerm, setSearchTerm] = useState("");

    /* ==========================================
       SAMPLE FEEDBACK DATA
       (Replace with API later)
    ========================================== */

    const [feedbacks] = useState([

        {
            id: 101,
            student: "Rahul",
            worker: "Kumar",
            complaint: "Water Leakage",
            rating: 5,
            comment: "Excellent service. Issue fixed quickly.",
            date: "07 Jul 2026"
        },

        {
            id: 102,
            student: "Priya",
            worker: "Suresh",
            complaint: "Internet Issue",
            rating: 4,
            comment: "Problem resolved within one day.",
            date: "06 Jul 2026"
        },

        {
            id: 103,
            student: "Arun",
            worker: "Ramesh",
            complaint: "Electricity",
            rating: 5,
            comment: "Very polite and professional worker.",
            date: "05 Jul 2026"
        },

        {
            id: 104,
            student: "Divya",
            worker: "Karthik",
            complaint: "Cleaning",
            rating: 3,
            comment: "Resolved, but took longer than expected.",
            date: "04 Jul 2026"
        },

        {
            id: 105,
            student: "Meena",
            worker: "Vignesh",
            complaint: "Mess Food",
            rating: 2,
            comment: "Needs improvement in response time.",
            date: "03 Jul 2026"
        }

    ]);

    /* ==========================================
       FILTER SEARCH
    ========================================== */

    const filteredFeedback = useMemo(() => {

        return feedbacks.filter((item) => {

            const keyword = searchTerm.toLowerCase();

            return (

                item.student.toLowerCase().includes(keyword) ||

                item.worker.toLowerCase().includes(keyword) ||

                item.comment.toLowerCase().includes(keyword) ||

                item.complaint.toLowerCase().includes(keyword)

            );

        });

    }, [feedbacks, searchTerm]);

    /* ==========================================
       SUMMARY
    ========================================== */

    const totalFeedback = filteredFeedback.length;

    const averageRating = totalFeedback
        ? (
              filteredFeedback.reduce(
                  (sum, item) => sum + item.rating,
                  0
              ) / totalFeedback
          ).toFixed(1)
        : "0.0";

    const fiveStar = filteredFeedback.filter(
        item => item.rating === 5
    ).length;

    const needsImprovement = filteredFeedback.filter(
        item => item.rating <= 3
    ).length;

    const renderStars = (rating) => {

        return [...Array(5)].map((_, index) => (

            <FaStar
                key={index}
                className={
                    index < rating
                        ? "star filled"
                        : "star"
                }
            />

        ));

    };
        return (

        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="admin-feedback-page">

                    {/* ===========================
                        PAGE HEADER
                    =========================== */}

                    <div className="feedback-header">

                        <div>

                            <h2>Student Feedback</h2>

                            <p>
                                Review student ratings and comments for completed complaints.
                            </p>

                        </div>

                    </div>

                    {/* ===========================
                        SUMMARY CARDS
                    =========================== */}

                    <div className="feedback-summary">

                        <div className="summary-card total">

                            <div className="summary-icon">
                                <FaComments />
                            </div>

                            <div>

                                <h3>{totalFeedback}</h3>

                                <p>Total Feedback</p>

                            </div>

                        </div>

                        <div className="summary-card average">

                            <div className="summary-icon">
                                <FaChartLine />
                            </div>

                            <div>

                                <h3>{averageRating}</h3>

                                <p>Average Rating</p>

                            </div>

                        </div>

                        <div className="summary-card excellent">

                            <div className="summary-icon">
                                <FaSmile />
                            </div>

                            <div>

                                <h3>{fiveStar}</h3>

                                <p>5 Star Reviews</p>

                            </div>

                        </div>

                        <div className="summary-card warning">

                            <div className="summary-icon">
                                <FaExclamationTriangle />
                            </div>

                            <div>

                                <h3>{needsImprovement}</h3>

                                <p>Needs Improvement</p>

                            </div>

                        </div>

                    </div>

                    {/* ===========================
                        SEARCH BAR
                    =========================== */}

                    <div className="feedback-toolbar">

                        <div className="search-box">

                            <FaSearch className="search-icon" />

                            <input
                                type="text"
                                placeholder="Search by Student, Worker, Complaint or Feedback..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {/* ===========================
                        FEEDBACK TABLE
                    =========================== */}

                    <div className="feedback-table-container">

                        <table className="feedback-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Student</th>

                                    <th>Worker</th>

                                    <th>Complaint</th>

                                    <th>Rating</th>

                                    <th>Feedback</th>

                                    <th>Date</th>

                                </tr>

                            </thead>

                            <tbody>

                                                       {filteredFeedback.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-feedback"
                                    >
                                        No feedback found.
                                    </td>

                                </tr>

                            ) : (

                                filteredFeedback.map((item) => (

                                    <tr key={item.id}>

                                        <td>#{item.id}</td>

                                        <td>{item.student}</td>

                                        <td>{item.worker}</td>

                                        <td>{item.complaint}</td>

                                        <td>

                                            <div className="rating-stars">

                                                {renderStars(item.rating)}

                                                <span className="rating-value">

                                                    {item.rating}/5

                                                </span>

                                            </div>

                                        </td>

                                        <td className="feedback-comment">

                                            {item.comment}

                                        </td>

                                        <td>{item.date}</td>

                                    </tr>

                                ))

                            )}

                            </tbody>

                        </table>

                    </div>
                                        {/* End Feedback Table */}

                </div>

            </div>

        </div>

    );

}

export default AdminFeedbackPage;