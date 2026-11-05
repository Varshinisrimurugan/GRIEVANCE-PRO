import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";

import "../styles/AssignWorkerPage.css";

function AssignWorkerPage() {

    const navigate = useNavigate();

    const location = useLocation();

    const complaint = location.state?.complaint;

    const [workers, setWorkers] = useState([]);

    const [workerId, setWorkerId] = useState("");

    // ==========================================
    // GET COMPLAINT ID
    // ==========================================

    const complaintId =
        complaint?.complaintId ||
        complaint?.id ||
        complaint?.compilantId;

    // ==========================================
    // LOAD WORKERS
    // ==========================================

    useEffect(() => {

        if (!complaint) {

            Swal.fire({

                icon: "warning",

                title: "No Complaint Selected",

                text: "Please select a complaint first.",

                confirmButtonColor: "#8B5A2B"

            }).then(() => {

                navigate("/pending-complaints");

            });

            return;

        }

        loadWorkers();

    }, [complaint, navigate]);

    // ==========================================
    // LOAD WORKER LIST
    // ==========================================

    const loadWorkers = async () => {

        try {

            const response = await api.get(
                "/compilants/workers/dropdown"
            );

            console.log("Workers :", response.data);

            setWorkers(response.data);

        }

        catch (error) {

            console.error("Worker Loading Error :", error);

            Swal.fire({

                icon: "error",

                title: "Failed",

                text: "Unable to load workers.",

                confirmButtonColor: "#DC2626"

            });

        }

    };
        // ==========================================
    // ASSIGN WORKER
    // ==========================================

    const assignWorker = async () => {

        // Check Complaint

        if (!complaintId) {

            Swal.fire({

                icon: "error",

                title: "Invalid Complaint",

                text: "Complaint ID not found.",

                confirmButtonColor: "#DC2626"

            });

            return;

        }

        // Check Worker

        if (!workerId) {

            Swal.fire({

                icon: "warning",

                title: "Select Worker",

                text: "Please select a worker.",

                confirmButtonColor: "#8B5A2B"

            });

            return;

        }

        try {

            console.log("Complaint ID :", complaintId);

            console.log("Worker ID :", workerId);

            await api.put(

                `/compilants/${complaintId}/assign-worker/${workerId}`

            );

            await Swal.fire({

                icon: "success",

                title: "Worker Assigned Successfully",

                text: "Complaint has been assigned successfully.",

                confirmButtonColor: "#8B5A2B"

            });

            // Go back to Pending Complaints page

            navigate("/pending-complaints");

        }

        catch (error) {

            console.error("Assignment Error :", error);

            Swal.fire({

                icon: "error",

                title: "Assignment Failed",

                text:
                    error.response?.data ||
                    "Unable to assign worker.",

                confirmButtonColor: "#DC2626"

            });

        }

    };

    // ==========================================
    // DEBUG
    // ==========================================

    console.log("Complaint :", complaint);

    console.log("Complaint ID :", complaintId);

    console.log("Workers :", workers);
        return (

        <div className="assign-worker-page">

            <div className="assign-card">

                <h2>

                    Assign Worker

                </h2>

                <p>

                    Select a worker to handle this complaint.

                </p>

                {/* ==========================================
                    COMPLAINT DETAILS
                ========================================== */}

                <div className="complaint-details">

                    <div className="detail-box">

                        <label>

                            Complaint ID

                        </label>

                        <span>

                            {complaintId || "-"}

                        </span>

                    </div>

                    <div className="detail-box">

                        <label>

                            Complaint Title

                        </label>

                        <span>

                            {

                                complaint?.compilantTitle ||

                                complaint?.complaintTitle ||

                                complaint?.title ||

                                "-"

                            }

                        </span>

                    </div>

                    <div className="detail-box">

                        <label>

                            Student

                        </label>

                        <span>

                            {

                                complaint?.user?.name ||

                                complaint?.studentName ||

                                "-"

                            }

                        </span>

                    </div>

                    <div className="detail-box">

                        <label>

                            Category

                        </label>

                        <span>

                            {complaint?.category || "-"}

                        </span>

                    </div>

                    <div className="detail-box">

                        <label>

                            Priority

                        </label>

                        <span>

                            {complaint?.priority || "-"}

                        </span>

                    </div>

                    <div className="detail-box">

                        <label>

                            Status

                        </label>

                        <span>

                            {complaint?.status || "-"}

                        </span>

                    </div>

                    <div className="detail-box">

                        <label>

                            Location

                        </label>

                        <span>

                            {complaint?.location || "-"}

                        </span>

                    </div>

                </div>

                {/* ==========================================
                    WORKER DROPDOWN
                ========================================== */}

                <div className="form-group">

                    <label>

                        Select Worker

                    </label>

                    <select

                        value={workerId}

                        onChange={(e) =>

                            setWorkerId(e.target.value)

                        }

                    >

                        <option value="">

                            Choose Worker

                        </option>

                        {

                            workers.map((worker) => (

                                <option

                                    key={

                                        worker.workerId ||

                                        worker.id

                                    }

                                    value={

                                        worker.workerId ||

                                        worker.id

                                    }

                                >

                                    {

                                        worker.workerName ||

                                        worker.name ||

                                        worker.userName ||

                                        "Worker"

                                    }

                                </option>

                            ))

                        }

                    </select>

                </div>

                {/* ==========================================
                    BUTTONS
                ========================================== */}

                <div className="button-group">

                    <button

                        className="cancel-btn"

                        onClick={() =>

                            navigate("/pending-complaints")

                        }

                    >

                        Cancel

                    </button>

                    <button

                        className="assign-btn"

                        onClick={assignWorker}

                    >

                        Assign Worker

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AssignWorkerPage;