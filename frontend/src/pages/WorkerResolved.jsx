import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/WorkerResolved.css";

const WorkerResolved = () => {

  const [search, setSearch] = useState("");

  const [complaints] = useState([

    {
      id: "CMP-101",
      category: "Electricity",
      title: "Fan Repaired",
      location: "Block A • Room 203",
      priority: "High",
      status: "Resolved",
      resolvedDate: "10 Jul 2026",
    },

    {
      id: "CMP-102",
      category: "Water",
      title: "Pipe Leakage Fixed",
      location: "Block B • Room 115",
      priority: "Medium",
      status: "Resolved",
      resolvedDate: "09 Jul 2026",
    },

    {
      id: "CMP-103",
      category: "Internet",
      title: "WiFi Restored",
      location: "Block C • Room 302",
      priority: "Low",
      status: "Resolved",
      resolvedDate: "08 Jul 2026",
    },

    {
      id: "CMP-104",
      category: "Cleaning",
      title: "Room Cleaned",
      location: "Block D • Room 118",
      priority: "Medium",
      status: "Resolved",
      resolvedDate: "07 Jul 2026",
    },

    {
      id: "CMP-105",
      category: "Mess",
      title: "Food Issue Solved",
      location: "Mess Hall",
      priority: "High",
      status: "Resolved",
      resolvedDate: "06 Jul 2026",
    },

    {
      id: "CMP-106",
      category: "Electricity",
      title: "Light Replaced",
      location: "Block A • Room 210",
      priority: "Medium",
      status: "Resolved",
      resolvedDate: "05 Jul 2026",
    },

    {
      id: "CMP-107",
      category: "Water",
      title: "Motor Repaired",
      location: "Ground Floor",
      priority: "High",
      status: "Resolved",
      resolvedDate: "04 Jul 2026",
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

  const indexOfLastComplaint =
    currentPage * complaintsPerPage;

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
      View
  ========================== */

  const handleView = (id) => {

    console.log("View Complaint :", id);

  };

  return (

    <div className="assigned-page">

      <WorkerSidebar />

      <main className="assigned-main">

        <WorkerHeader />

        <div className="assigned-header">

          <h2>Resolved Complaints</h2>

          <p>
            View all complaints that have been successfully resolved.
          </p>

        </div>

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
                <th>Resolved Date</th>
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

                    <span className="status resolved">

                      <FaCheckCircle
                        style={{ marginRight: "6px" }}
                      />

                      {item.status}

                    </span>

                  </td>

                  <td>{item.resolvedDate}</td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="view-btn"
                        title="View Complaint"
                        onClick={() => handleView(item.id)}
                      >

                        <FaEye />

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

              <h3>No Resolved Complaints</h3>

              <p>

                There are currently no resolved complaints.

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

        </div>
              </main>

    </div>

  );

};

export default WorkerResolved;