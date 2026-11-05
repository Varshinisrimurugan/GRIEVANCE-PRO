import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import ComplaintDetailsModal from "../components/ComplaintDetailsModal";

import {
    FaSearch,
    FaEye,
    FaUserCog
} from "react-icons/fa";

import "../styles/PendingComplaintsPage.css";

function PendingComplaintsPage() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedComplaint, setSelectedComplaint] = useState(null);

    useEffect(() => {

        loadPendingComplaints();

    }, []);

    // ==========================================
    // LOAD PENDING COMPLAINTS
    // ==========================================

    const loadPendingComplaints = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/compilants"
            );

            const pendingComplaints = response.data.filter((item) => {

                return (item.status || "")
                    .trim()
                    .toLowerCase() === "pending";

            });

            setComplaints(pendingComplaints);

        }

        catch (error) {

            console.error("Error loading complaints :", error);

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // SEARCH FILTER
    // ==========================================

    const filteredComplaints = complaints.filter((item) =>

        (item.compilantTitle || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (item.category || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (item.user?.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    // ==========================================
    // VIEW COMPLAINT
    // ==========================================

    const handleView = (item) => {

        setSelectedComplaint(item);

    };

    // ==========================================
    // CLOSE MODAL
    // ==========================================

    const handleCloseModal = () => {

        setSelectedComplaint(null);

    };

    // ==========================================
    // ASSIGN WORKER
    // ==========================================

    const handleAssign = (item) => {

        navigate("/assign-worker", {

            state: {

                complaint: item

            }

        });

    };
        // ==========================================
    // UI
    // ==========================================

    return (

        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="pending-page">

                    <div className="pending-header">

                        <div>

                            <h2>

                                Pending Complaints

                            </h2>

                            <p>

                                View all pending hostel complaints

                            </p>

                        </div>

                        <div className="search-box">

                            <FaSearch />

                            <input
                                type="text"
                                placeholder="Search by Title, Student or Category..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    {

                        loading ?

                        (

                            <div className="loading">

                                Loading Pending Complaints...

                            </div>

                        )

                        :

                        (

                            <table className="pending-table">

                                <thead>

                                    <tr>

                                        <th className="id-col">

                                            Complaint ID

                                        </th>

                                        <th className="title-col">

                                            Complaint Title

                                        </th>

                                        <th className="student-col">

                                            Student

                                        </th>

                                        <th className="category-col">

                                            Category

                                        </th>

                                        <th className="priority-col">

                                            Priority

                                        </th>

                                        <th className="status-col">

                                            Status

                                        </th>

                                        <th className="action-col">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredComplaints.length === 0 ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="7"

                                                    className="no-data"

                                                >

                                                    No Pending Complaints Found

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            filteredComplaints.map((item) => (

                                                <tr key={item.id}>

                                                                                                {/* Complaint ID */}

                                                <td className="id-col">

                                                    {

                                                        item.compilantCode ||

                                                        `CMP${String(item.id).padStart(3, "0")}`

                                                    }

                                                </td>

                                                {/* Complaint Title */}

                                                <td className="title-col">

                                                    {

                                                        item.compilantTitle ||

                                                        "-"

                                                    }

                                                </td>

                                                {/* Student */}

                                                <td className="student-col">

                                                    {

                                                        item.user?.name ||

                                                        "-"

                                                    }

                                                </td>

                                                {/* Category */}

                                                <td className="category-col">

                                                    {

                                                        item.category ||

                                                        "-"

                                                    }

                                                </td>

                                                {/* Priority */}

                                                <td className="priority-col">

                                                    <span
                                                        className={`priority ${(item.priority || "").toLowerCase()}`}
                                                    >

                                                        {

                                                            item.priority ||

                                                            "-"

                                                        }

                                                    </span>

                                                </td>

                                                {/* Status */}

                                                <td className="status-col">

                                                    <span
                                                        className={`status ${(item.status || "").toLowerCase()}`}
                                                    >

                                                        {

                                                            item.status ||

                                                            "-"

                                                        }

                                                    </span>

                                                </td>

                                                {/* Actions */}

                                                <td className="action-col">

                                                    <div className="table-actions">

                                                        <button

                                                            className="view-btn"

                                                            title="View Complaint"

                                                            onClick={() =>

                                                                handleView(item)

                                                            }

                                                        >

                                                            <FaEye />

                                                        </button>

                                                        <button

                                                            className="assign-btn"

                                                            title="Assign Worker"

                                                            onClick={() =>

                                                                handleAssign(item)

                                                            }

                                                        >

                                                            <FaUserCog />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    )

                                }

                            </tbody>

                        </table>

                    )

                }
                {/* ==========================================
                    COMPLAINT DETAILS MODAL
                ========================================== */}

                <ComplaintDetailsModal

                    complaint={selectedComplaint}

                    onClose={handleCloseModal}

                    onAssign={handleAssign}

                />

            </div>

        </div>

    </div>
        );

}

export default PendingComplaintsPage;