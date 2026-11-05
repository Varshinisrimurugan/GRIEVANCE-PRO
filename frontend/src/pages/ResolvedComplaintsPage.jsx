import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import ComplaintDetailsModal from "../components/ComplaintDetailsModal";

import {
    FaSearch,
    FaEye
} from "react-icons/fa";

import "../styles/ResolvedComplaintsPage.css";

function ResolvedComplaintsPage() {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    useEffect(() => {

        loadResolvedComplaints();

    }, []);

    /*==================================
        LOAD RESOLVED COMPLAINTS
    ==================================*/

    const loadResolvedComplaints = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/compilants"
            );

            const resolvedComplaints = response.data.filter((item) => {

                const status = (item.status || "")
                    .trim()
                    .toLowerCase();

                return status === "resolved";

            });

            setComplaints(resolvedComplaints);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    /*==================================
        SEARCH
    ==================================*/

    const filteredComplaints = complaints.filter((item) =>

        item.compilantTitle
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.category
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        item.user?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    /*==================================
        VIEW COMPLAINT
    ==================================*/

    const handleView = (complaint) => {

        setSelectedComplaint(complaint);

    };

    /*==================================
        CLOSE MODAL
    ==================================*/

    const handleCloseModal = () => {

        setSelectedComplaint(null);

    };

    return (

        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="resolved-page">

                    <div className="resolved-header">

                        <div>

                            <h2>Resolved Complaints</h2>

                            <p>
                                Successfully completed hostel complaints
                            </p>

                        </div>

                        <div className="search-box">

                            <FaSearch />

                            <input
                                type="text"
                                placeholder="Search Complaint..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                    </div>
                                        {loading ? (

                        <div className="loading">

                            Loading Resolved Complaints...

                        </div>

                    ) : (

                        <table className="resolved-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Complaint</th>

                                    <th>Student</th>

                                    <th>Category</th>

                                    <th>Priority</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredComplaints.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="no-data"
                                        >

                                            No Resolved Complaints Found

                                        </td>

                                    </tr>

                                ) : (

                                    filteredComplaints.map((item) => (

                                        <tr key={item.id}>

                                            {/* Complaint ID */}

                                            <td>

                                                {item.compilantCode ||

                                                    `CMP${String(item.id).padStart(3, "0")}`}

                                            </td>

                                            {/* Complaint Title */}

                                            <td>

                                                {item.compilantTitle || "-"}

                                            </td>

                                            {/* Student */}

                                            <td>

                                                {item.user?.name || "-"}

                                            </td>

                                            {/* Category */}

                                            <td>

                                                {item.category || "-"}

                                            </td>

                                            {/* Priority */}

                                            <td>

                                                <span
                                                    className={`priority ${(item.priority || "").toLowerCase()}`}
                                                >

                                                    {item.priority || "-"}

                                                </span>

                                            </td>
                                                                                        {/* Status */}

                                            <td>

                                                <span
                                                    className="status resolved"
                                                >

                                                    {item.status || "Resolved"}

                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td>

                                                <div className="table-actions">

                                                    <button
                                                        className="view-btn"
                                                        title="View Complaint"
                                                        onClick={() => handleView(item)}
                                                    >

                                                        <FaEye />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    )}

                    {/*==================================
                        COMPLAINT DETAILS MODAL
                    ==================================*/}

                    <ComplaintDetailsModal
                        complaint={selectedComplaint}
                        onClose={handleCloseModal}
                        onAssign={() => {}}
                    />
                                    

                </div>

            </div>

        </div>

    );

}

export default ResolvedComplaintsPage;