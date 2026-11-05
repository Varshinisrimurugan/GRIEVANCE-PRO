import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import "../styles/MyComplaintsPage.css";

const MyComplaintsPage = () => {

  const [complaints] = useState([
    {
      id: "C101",
      category: "Water",
      issue: "Water Leakage",
      location: "A Block / Room 101",
      date: "03 Jul 2026",
      priority: "High",
      status: "Pending",
    },
    {
      id: "C102",
      category: "Electricity",
      issue: "Fan Not Working",
      location: "B Block / Room 204",
      date: "02 Jul 2026",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: "C103",
      category: "Internet",
      issue: "Wi-Fi Slow",
      location: "A Block / Room 305",
      date: "01 Jul 2026",
      priority: "Low",
      status: "Resolved",
    },
    {
      id: "C104",
      category: "Cleaning",
      issue: "Room Cleaning",
      location: "C Block / Room 110",
      date: "30 Jun 2026",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "C105",
      category: "Electricity",
      issue: "Tube Light",
      location: "A Block / Room 210",
      date: "28 Jun 2026",
      priority: "Low",
      status: "Resolved",
    },
  ]);

  /* Pagination */

  const complaintsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * complaintsPerPage;
  const firstIndex = lastIndex - complaintsPerPage;

  const currentComplaints = complaints.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(
    complaints.length / complaintsPerPage
  );

  /* View Modal */

  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const handleView = (complaint) => {
  setSelectedComplaint(complaint);
  setShowModal(true);
};

 
  const closeModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <div className="mycomplaints-page">

          <div className="page-header">

            <div>
              <h2>My Complaints</h2>
              <p>View and track all your submitted complaints.</p>
            </div>

            <div className="search-filter">

              <div className="search-box">
                <FaSearch />

                <input
                  type="text"
                  placeholder="Search Complaint ID, Issue..."
                />

              </div>

              <button className="filter-btn">
                <FaFilter />
                Filter
              </button>

            </div>

          </div>

          {/* Summary Cards */}

          <div className="summary-cards">

            <div className="summary-card">
              <FaClipboardList className="card-icon blue" />
              <div>
                <h3>{complaints.length}</h3>
                <p>Total Complaints</p>
              </div>
            </div>

            <div className="summary-card">
              <FaClock className="card-icon orange" />
              <div>
                <h3>2</h3>
                <p>Pending</p>
              </div>
            </div>

            <div className="summary-card">
              <FaSpinner className="card-icon purple" />
              <div>
                <h3>1</h3>
                <p>In Progress</p>
              </div>
            </div>

            <div className="summary-card">
              <FaCheckCircle className="card-icon green" />
              <div>
                <h3>2</h3>
                <p>Resolved</p>
              </div>
            </div>

          </div>
                    {/* Complaints Table */}

          <div className="complaints-table-container">

            <table className="complaints-table">

              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Category</th>
                  <th>Issue Type</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {currentComplaints.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.category}</td>

                    <td>{item.issue}</td>

                    <td>{item.location}</td>

                    <td>{item.date}</td>

                    <td>
                      <span
                        className={`priority ${item.priority.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${item.status
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleView(item)}
                      >
                        <FaEye />
                        View
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Pagination */}

          <div className="pagination">

            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, index) => (

              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "active-page"
                    : "page-btn"
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>

            ))}

            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>

          </div>

          {/* Complaint Details Modal */}

          {showModal && selectedComplaint && (

            <div className="modal-overlay">

              <div className="modal">

                <h2>Complaint Details</h2>

                <div className="detail-row">
                  <strong>Complaint ID</strong>
                  <span>{selectedComplaint.id}</span>
                </div>

                <div className="detail-row">
                  <strong>Category</strong>
                  <span>{selectedComplaint.category}</span>
                </div>

                <div className="detail-row">
                  <strong>Issue Type</strong>
                  <span>{selectedComplaint.issue}</span>
                </div>

                <div className="detail-row">
                  <strong>Location</strong>
                  <span>{selectedComplaint.location}</span>
                </div>

                <div className="detail-row">
                  <strong>Date</strong>
                  <span>{selectedComplaint.date}</span>
                </div>

                <div className="detail-row">
                  <strong>Priority</strong>
                  <span>{selectedComplaint.priority}</span>
                </div>

                <div className="detail-row">
                  <strong>Status</strong>
                  <span>{selectedComplaint.status}</span>
                </div>

                <button
                  className="close-btn"
                  onClick={closeModal}
                >
                  Close
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default MyComplaintsPage;