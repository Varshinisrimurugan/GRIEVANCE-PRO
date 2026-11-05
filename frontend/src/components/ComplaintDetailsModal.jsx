import React from "react";
import {
    FaTimes,
    FaMapMarkerAlt,
    FaUser,
    FaClipboardList,
    FaFlag,
    FaLayerGroup,
    FaCalendarAlt,
    FaUserCog
} from "react-icons/fa";

import "../styles/ComplaintDetailsModal.css";

function ComplaintDetailsModal({

    complaint,

    onClose,

    onAssign

}) {

    if (!complaint) return null;

    return (

        <div className="complaint-modal-overlay">

            <div className="complaint-modal">

                {/* ================= HEADER ================= */}

                <div className="modal-header">

                    <div>

                        <h2>Complaint Details</h2>

                        <p>View complete complaint information</p>

                    </div>

                    <button

                        className="close-btn"

                        onClick={onClose}

                    >

                        <FaTimes />

                    </button>

                </div>

                {/* ================= BODY ================= */}

                <div className="modal-body">

                    {/* LEFT */}

                    <div className="left-panel">

                        <img

                            className="complaint-image"

                            src={

                                complaint.photoUrl ||

                                "https://placehold.co/500x300?text=Complaint"

                            }

                            alt="Complaint"

                        />

                        <div className="student-card">

                            <div className="student-avatar">

                                <FaUser />

                            </div>

                            <div>

                                <h3>

                                    {complaint.user?.name || "Student"}

                                </h3>

                                <span>

                                    Hostel Student

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="right-panel">

                        <div className="detail-item">

                            <FaClipboardList />

                            <div>

                                <label>

                                    Complaint ID

                                </label>

                                <p>

                                    {

                                        complaint.compilantCode ||

                                        `CMP${complaint.id}`

                                    }

                                </p>

                            </div>

                        </div>

                        <div className="detail-item">

                            <FaLayerGroup />

                            <div>

                                <label>

                                    Complaint Title

                                </label>

                                <p>

                                    {

                                        complaint.compilantTitle ||

                                        "-"

                                    }

                                </p>

                            </div>

                        </div>
                                              {/* CATEGORY */}

                        <div className="detail-item">

                            <FaLayerGroup />

                            <div>

                                <label>

                                    Category

                                </label>

                                <p>

                                    {complaint.category || "-"}

                                </p>

                            </div>

                        </div>

                        {/* LOCATION */}

                        <div className="detail-item">

                            <FaMapMarkerAlt />

                            <div>

                                <label>

                                    Location

                                </label>

                                <p>

                                    {complaint.location || "-"}

                                </p>

                            </div>

                        </div>

                        {/* PRIORITY */}

                        <div className="detail-item">

                            <FaFlag />

                            <div>

                                <label>

                                    Priority

                                </label>

                                <span
                                    className={`priority ${(complaint.priority || "").toLowerCase()}`}
                                >

                                    {complaint.priority || "-"}

                                </span>

                            </div>

                        </div>

                        {/* STATUS */}

                        <div className="detail-item">

                            <FaCalendarAlt />

                            <div>

                                <label>

                                    Status

                                </label>

                                <span
                                    className={`status ${String(complaint.status || "")
                                        .toLowerCase()
                                        .replace(/\s+/g, "_")}`}
                                >

                                    {complaint.status || "-"}

                                </span>

                            </div>

                        </div>

                        {/* DATE */}

                        <div className="detail-item">

                            <FaCalendarAlt />

                            <div>

                                <label>

                                    Submitted Date

                                </label>

                                <p>

                                    {complaint.createdAt || complaint.created_at || "-"}

                                </p>

                            </div>

                        </div>

                        {/* DESCRIPTION */}

                        <div className="description-card">

                            <h3>

                                Description

                            </h3>

                            <p>

                                {complaint.description || "No description available."}

                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div className="modal-footer">

                    <button

                        className="close-button"

                        onClick={onClose}

                    >

                        Close

                    </button>

                    <button

                        className="assign-button"

                        onClick={() => onAssign(complaint)}

                    >

                        <FaUserCog />

                        Assign Worker

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ComplaintDetailsModal;