import React, { useState } from "react";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserGraduate,
  FaPhoneAlt,
  FaCamera,
  FaSave,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/UpdateStatus.css";

const UpdateStatus = () => {

  const navigate = useNavigate();

  const [status, setStatus] = useState("Pending");

  const [remarks, setRemarks] = useState("");

  const [photo, setPhoto] = useState(null);

  const complaint = {

    id: "CMP-101",

    title: "Water Leakage in Bathroom",

    category: "Water",

    location: "Block A • Floor 2 • Room 203",

    student: "Varshini Sri",

    phone: "+91 9876543210",

    priority: "High",

    createdDate: "07 Jul 2026",

    description:
      "Water leakage has been continuously occurring near the wash basin causing inconvenience to students.",

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Complaint status updated successfully!");

  };

  return (

    <div className="update-page">

      <WorkerSidebar />

      <main className="update-main">

        <WorkerHeader />

        {/* Page Header */}

        <div className="update-header">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            Back

          </button>

          <div>

            <h2>Update Complaint Status</h2>

            <p>

              View complaint details and update the current status.

            </p>

          </div>

        </div>

        <form
          className="update-form"
          onSubmit={handleSubmit}
        >

                  {/* ================= COMPLAINT DETAILS ================= */}

          <div className="update-grid">

            {/* Left Side */}

            <div className="details-card">

              <h3>Complaint Details</h3>

              <div className="detail-row">

                <label>Complaint ID</label>

                <span>{complaint.id}</span>

              </div>

              <div className="detail-row">

                <label>Title</label>

                <span>{complaint.title}</span>

              </div>

              <div className="detail-row">

                <label>Category</label>

                <span>{complaint.category}</span>

              </div>

              <div className="detail-row">

                <label>

                  <FaMapMarkerAlt />

                  Location

                </label>

                <span>{complaint.location}</span>

              </div>

              <div className="detail-row">

                <label>

                  <FaCalendarAlt />

                  Raised On

                </label>

                <span>{complaint.createdDate}</span>

              </div>

              <div className="detail-row">

                <label>Priority</label>

                <span className="priority high">

                  {complaint.priority}

                </span>

              </div>

              <div className="description-box">

                <label>Description</label>

                <p>

                  {complaint.description}

                </p>

              </div>

            </div>

            {/* Right Side */}

            <div className="student-card">

              <h3>Student Details</h3>

              <div className="student-profile">

                <div className="student-avatar">

                  <FaUserGraduate />

                </div>

                <div>

                  <h4>{complaint.student}</h4>

                  <p>Hostel Student</p>

                </div>

              </div>

              <div className="detail-row">

                <label>

                  <FaPhoneAlt />

                  Contact

                </label>

                <span>{complaint.phone}</span>

              </div>

              <div className="detail-row">

                <label>Current Status</label>

                <span className="status pending">

                  {status}

                </span>

              </div>

            </div>

          </div>

          {/* ================= UPDATE FORM ================= */}

          <div className="status-card">

            <h3>Update Complaint

            </h3>
                        <div className="form-group">

              <label>Update Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >

                <option value="Pending">Pending</option>

                <option value="In Progress">In Progress</option>

                <option value="Resolved">Resolved</option>

              </select>

            </div>

            <div className="form-group">

              <label>Worker Remarks</label>

              <textarea
                rows="5"
                placeholder="Enter remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>

                <FaCamera />

                Upload Completion Photo

              </label>

              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />

              {photo && (

                <p className="file-name">

                  Selected File : {photo.name}

                </p>

              )}

            </div>

            <div className="button-group">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
              >

                Cancel

              </button>

              <button
                type="submit"
                className="save-btn"
              >

                <FaSave />

                Save Changes

              </button>

            </div>

          </div>

        </form>

      </main>

    </div>

  );

};

export default UpdateStatus;