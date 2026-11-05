import React from "react";
import "./RecentComplaints.css";

const complaints = [
  {
    id: "#CMP001",
    category: "Electricity",
    location: "Block A - 101",
    priority: "High",
    status: "Pending",
  },
  {
    id: "#CMP002",
    category: "Water",
    location: "Block B - 204",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "#CMP003",
    category: "Internet",
    location: "Block C - 310",
    priority: "Low",
    status: "Resolved",
  },
];

const RecentComplaints = () => {
  return (
    <div className="recentComplaints">

      <div className="recentHeader">
        <h2>Recent Complaints</h2>
        <button>View All</button>
      </div>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Location</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {complaints.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.category}</td>

              <td>{item.location}</td>

              <td>

                <span className={`priority ${item.priority.toLowerCase()}`}>
                  {item.priority}
                </span>

              </td>

              <td>

                <span
                  className={`status ${item.status
                    .replace(" ", "")
                    .toLowerCase()}`}
                >
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentComplaints;