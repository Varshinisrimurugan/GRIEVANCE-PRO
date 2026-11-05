import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import ComplaintDetailsModal from "../components/ComplaintDetailsModal";

import {
    FaSearch,
    FaEye,
    FaCheckCircle
} from "react-icons/fa";

import Swal from "sweetalert2";

import "../styles/InProgressComplaintsPage.css";

function InProgressComplaintsPage() {

    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedComplaint, setSelectedComplaint] = useState(null);

    useEffect(() => {

        loadInProgressComplaints();

    }, []);

    /*==================================
        LOAD IN PROGRESS COMPLAINTS
    ==================================*/

    const loadInProgressComplaints = async () => {

        try {

            const response = await axios.get(

                "http://localhost:8081/compilants"

            );

            const filtered = response.data.filter((item) => {

                const status = (item.status || "")
                    .trim()
                    .toLowerCase();

                return (

                    status === "in progress" ||

                    status === "in_progress"

                );

            });

            setComplaints(filtered);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    /*==================================
        SEARCH
    ==================================*/

    const filteredComplaints = complaints.filter((item) =>

        item.compilantTitle
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        item.category
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

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

    /*==================================
        MARK AS RESOLVED
    ==================================*/

    const markAsResolved = async (complaintId) => {

        const result = await Swal.fire({

            title: "Mark as Resolved?",

            text: "This complaint will be moved to Resolved.",

            icon: "question",

            showCancelButton: true,

            confirmButtonColor: "#8B5A2B",

            cancelButtonColor: "#d33",

            confirmButtonText: "Yes"

        });

        if (!result.isConfirmed) return;

        try {

            await axios.patch(

                `http://localhost:8081/compilants/${complaintId}/status?status=Resolved`

            );

            Swal.fire({

                icon: "success",

                title: "Updated",

                text: "Complaint marked as Resolved.",

                confirmButtonColor: "#8B5A2B"

            });

            loadInProgressComplaints();

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Failed",

                text: "Unable to update complaint."

            });

        }

    };

    /*==================================
        UI
    ==================================*/

    return (

        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="inprogress-page">

                    <div className="inprogress-header">

                        <div>

                            <h2>

                                In Progress Complaints

                            </h2>

                            <p>

                                Complaints currently handled by workers

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

                    {

                        loading ?

                        (

                            <div className="loading">

                                Loading Complaints...

                            </div>

                        )

                        :

                        (

                            <table className="inprogress-table">

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

                                                               {

                                    filteredComplaints.length === 0 ?

                                    (

                                        <tr>

                                            <td

                                                colSpan="7"

                                                className="no-data"

                                            >

                                                No In Progress Complaints Found

                                            </td>

                                        </tr>

                                    )

                                    :

                                    (

                                        filteredComplaints.map((item) => (

                                            <tr key={item.id}>

                                                {/* ID */}

                                                <td>

                                                    {

                                                        item.compilantCode ||

                                                        `CMP${String(item.id).padStart(3, "0")}`

                                                    }

                                                </td>

                                                {/* Complaint */}

                                                <td>

                                                    {

                                                        item.compilantTitle ||

                                                        "-"

                                                    }

                                                </td>

                                                {/* Student */}

                                                <td>

                                                    {

                                                        item.user?.name ||

                                                        "-"

                                                    }

                                                </td>

                                                {/* Category */}

                                                <td>

                                                    {

                                                        item.category ||

                                                        "-"

                                                    }

                                                </td>

                                                {/* Priority */}

                                                <td>

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

                                                <td>

                                                    <span

                                                        className="status in_progress"

                                                    >

                                                        {

                                                            item.status

                                                        }

                                                    </span>

                                                </td>

                                                {/* Actions */}

                                                <td>

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

                                                            className="resolve-btn"

                                                            title="Mark as Resolved"

                                                            onClick={() =>

                                                                markAsResolved(item.id)

                                                            }

                                                        >

                                                            <FaCheckCircle />

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
                                    {/* =========================
                    COMPLAINT DETAILS MODAL
                ========================== */}

                <ComplaintDetailsModal

                    complaint={selectedComplaint}

                    onClose={handleCloseModal}

                    onAssign={() => navigate("/assign-worker")}

                />

            </div>

        </div>

    </div>

);

}

export default InProgressComplaintsPage;