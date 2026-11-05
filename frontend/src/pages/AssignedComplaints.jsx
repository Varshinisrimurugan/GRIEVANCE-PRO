import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTools,
  FaFilter,
  FaClock,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerHeader from "../components/WorkerHeader";

import "../styles/AssignedComplaints.css";

const AssignedComplaints = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [complaints] = useState([
    {
      id: "CMP-101",
      category: "Water",
      title: "Water Leakage in Bathroom",
      location: "Block A • Room 203",
      priority: "High",
      status: "Pending",
      assignedDate: "07 Jul 2026",
    },
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
      id: "CMP-103",
      category: "Internet",
      title: "WiFi Not Working",
      location: "Block C • Room 305",
      priority: "Low",
      status: "Resolved",
      assignedDate: "05 Jul 2026",
    },
    {
      id: "CMP-104",
      category: "Cleaning",
      title: "Room Cleaning Required",
      location: "Block D • Room 115",
      priority: "Medium",
      status: "Pending",
      assignedDate: "04 Jul 2026",
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
  ]);

  const filteredComplaints = complaints.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  return (

    <div className="assigned-page">

      <WorkerSidebar />

      <main className="assigned-main">

        <WorkerHeader />

        <div className="assigned-header">

          <h2>Assigned Complaints</h2>

          <p>
            View and manage all complaints assigned to you.
          </p>

        </div>
                <div className="assigned-toolbar">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search by Complaint ID or Title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="filter-box">

            <FaFilter />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >

              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>

            </select>

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

              {filteredComplaints.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.category}</td>

                  <td>{item.title}</td>

                  <td>{item.location}</td>

                  <td>

                    <span className={`priority ${item.priority.toLowerCase()}`}>

                      {item.priority}

                    </span>

                  </td>

                  <td>

                    <span
                      className={`status ${item.status
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >

                      {item.status}

                    </span>

                  </td>

                  <td>{item.assignedDate}</td>

                  <td>

                    <div className="action-buttons">

                      <button className="view-btn">

                        <FaEye />

                      </button>

                      <button
                        className="update-btn"
                        onClick={() => navigate("/update-status")}
                      >

                        <FaTools />

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

              <h3>No Complaints Found</h3>

              <p>

                There are no assigned complaints matching your search or filter.

              </p>

            </div>

          )}

        </div>

      </main>

    </div>

  );

};

export default AssignedComplaints;