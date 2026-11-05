import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../styles/AdminComplaintsPage.css";

function AdminComplaintsPage() {

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const statusFilter = new URLSearchParams(
        location.search
    ).get("status");

    useEffect(() => {

        loadComplaints();

    }, []);

    // ======================================
    // Load Complaints
    // ======================================

    const loadComplaints = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/compilants"
            );

            setComplaints(response.data);

        }

        catch (error) {

            console.log("Error loading complaints :", error);

        }

        finally {

            setLoading(false);

        }

    };

    // ======================================
    // Filter
    // ======================================

    const filteredComplaints = statusFilter

        ? complaints.filter(

            (item) =>

                item.status?.toUpperCase() ===

                statusFilter.toUpperCase()

        )

        : complaints;

    return (

        <div className="admin-complaints-page">

            <div className="page-header">

                <h1>

                    {

                        statusFilter

                            ? `${statusFilter} Complaints`

                            : "All Complaints"

                    }

                </h1>

                <p>

                    View and manage hostel complaints.

                </p>

            </div>

            {

                loading ?

                (

                    <div className="loading">

                        Loading Complaints...

                    </div>

                )

                :

                (

                    <table className="complaints-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Title</th>

                                <th>Category</th>

                                <th>Location</th>

                                <th>Priority</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                                              {

                                filteredComplaints.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="no-data"
                                        >

                                            No Complaints Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredComplaints.map((item) => (

                                        <tr
                                            key={
                                                item.complaint_id ||
                                                item.id
                                            }
                                        >

                                            {/* Complaint ID */}

                                            <td>

                                                {item.complaint_id || item.id}

                                            </td>

                                            {/* Complaint Title */}

                                            <td>

                                                {
                                                    item.complaint_title ||

                                                    item.compilantTitle ||

                                                    item.issueType ||

                                                    "-"
                                                }

                                            </td>

                                            {/* Category */}

                                            <td>

                                                {item.category || "-"}

                                            </td>

                                            {/* Location */}

                                            <td>

                                                {item.location || "-"}

                                            </td>

                                            {/* Priority */}

                                            <td>

                                                <span
                                                    className={`priority ${item.priority?.toLowerCase()}`}
                                                >

                                                    {item.priority || "-"}

                                                </span>

                                            </td>

                                            {/* Status */}

                                            <td>

                                                <span
                                                    className={`status ${item.status?.toLowerCase().replace(/\s+/g, "-")}`}
                                                >

                                                    {item.status || "-"}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                )

            }

        </div>

    );

}

export default AdminComplaintsPage;