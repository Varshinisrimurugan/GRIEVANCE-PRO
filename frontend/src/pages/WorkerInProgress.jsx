import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/WorkerInProgress.css";

const WorkerInProgress = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const [complaints, setComplaints] = useState([

    {
      id: "CMP-102",
      category: "Electricity",
      title: "Power Failure",
      location: "Block B • Room 102",
      priority: "Medium",
      status: "In Progress",
      assignedDate: "06 Jul 2026",
    },

    {
      id: "CMP-105",
      category: "Mess",
      title: "Food Quality Issue",
      location: "Mess Hall",
      priority: "High",
      status: "In Progress",
      assignedDate: "03 Jul 2026",
    },

    {
      id: "CMP-108",
      category: "Water",
      title: "Pipe Leakage",
      location: "Block A • Room 208",
      priority: "High",
      status: "In Progress",
      assignedDate: "02 Jul 2026",
    },

    {
      id: "CMP-110",
      category: "Cleaning",
      title: "Room Cleaning Required",
      location: "Block C • Room 301",
      priority: "Low",
      status: "In Progress",
      assignedDate: "01 Jul 2026",
    },

    {
      id: "CMP-112",
      category: "Internet",
      title: "WiFi Not Working",
      location: "Block D • Room 110",
      priority: "Medium",
      status: "In Progress",
      assignedDate: "30 Jun 2026",
    },

    {
      id: "CMP-115",
      category: "Electricity",
      title: "Tube Light Issue",
      location: "Block A • Room 210",
      priority: "High",
      status: "In Progress",
      assignedDate: "28 Jun 2026",
    },

    {
      id: "CMP-118",
      category: "Water",
      title: "Water Motor Failure",
      location: "Block B • Ground Floor",
      priority: "High",
      status: "In Progress",
      assignedDate: "27 Jun 2026",
    },

  ]);

  const filteredComplaints = complaints.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ==========================
      Pagination
  ========================== */

  const [currentPage, setCurrentPage] = useState(1);

  const complaintsPerPage = 5;

  const indexOfLastComplaint = currentPage * complaintsPerPage;

  const indexOfFirstComplaint =
    indexOfLastComplaint - complaintsPerPage;

  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  const totalPages = Math.ceil(
    filteredComplaints.length / complaintsPerPage
  );

  /* ==========================
      Buttons
  ========================== */

  const handleView = (id) => {

    console.log("View Complaint :", id);

  };

  const handleResolved = (id) => {

    setSelectedComplaint(id);

    setShowModal(true);

  };
const confirmResolved = () => {

  setComplaints((prev) =>
    prev.filter((item) => item.id !== selectedComplaint)
  );

  setShowModal(false);

  setSuccessMessage(
    `Complaint ${selectedComplaint} marked as Resolved successfully!`
  );

  setTimeout(() => {
    setSuccessMessage("");
    navigate("/worker-resolved");
  }, 1500);

};

  return (

    <div className="assigned-page">

      <WorkerSidebar />

      <main className="assigned-main">

        <WorkerHeader />

        <div className="assigned-header">

          <h2>In Progress Complaints</h2>

          <p>
            View all complaints currently under progress.
          </p>

        </div>

        {successMessage && (

          <div className="success-message">

            ✅ {successMessage}

          </div>

        )}

        <div className="assigned-toolbar">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search by Complaint ID or Title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

          </div>

        </div>
                <div className="assigned-table">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Category</th>
                <th>Complaint</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentComplaints.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.category}</td>

                  <td>{item.title}</td>

                  <td>{item.location}</td>

                  <td>

                    <span
                      className={`priority ${item.priority.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>

                  </td>

                  <td>

                    <span className="status inprogress">

                      {item.status}

                    </span>

                  </td>

                  <td>{item.assignedDate}</td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="view-btn"
                        onClick={() => handleView(item.id)}
                      >

                        <FaEye />

                      </button>

                      <button
                        className="resolve-btn"
                        onClick={() => handleResolved(item.id)}
                      >

                        <FaCheckCircle />

                        <span>Resolved</span>

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredComplaints.length === 0 && (

            <div className="no-data">

              <FaClock className="no-data-icon" />

              <h3>No In Progress Complaints</h3>

              <p>

                There are currently no complaints under progress.

              </p>

            </div>

          )}

          {filteredComplaints.length > 0 && (

            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                >
                  {index + 1}
                </button>

              ))}

              <button
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>

            </div>

          )}
                   </div> {/* assigned-table ends */}

        {showModal && (

          <div className="modal-overlay">

            <div className="confirm-modal">

              <h2>Confirm Resolution</h2>

              <p>
                Are you sure you want to mark this complaint as
                <strong> Resolved</strong>?
              </p>

              <div className="modal-buttons">

                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="confirm-btn"
                  onClick={confirmResolved}
                >
                  Confirm
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>

  );

};

export default WorkerInProgress;       