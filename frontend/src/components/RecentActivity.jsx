import React from "react";
import {
  FiClock,
  FiCheckCircle,
  FiTool,
  FiAlertCircle,
} from "react-icons/fi";

export default function RecentActivity({ complaints }) {
  return (
    <div className="activity-card">
      <h3>Recent Activity</h3>

      {complaints.length === 0 ? (
        <p className="empty-text">No recent activity</p>
      ) : (
        complaints.slice(0, 5).map((item) => (
          <div
            className="activity-item"
            key={item.complaint_id}
          >
            <div className="activity-icon">
              {item.status === "PENDING" && <FiAlertCircle />}
              {item.status === "IN_PROGRESS" && <FiTool />}
              {item.status === "RESOLVED" && <FiCheckCircle />}
            </div>

            <div className="activity-content">
              <h4>{item.complaint_title}</h4>
              <p>{item.category}</p>
            </div>

            <span>
              <FiClock />
            </span>
          </div>
        ))
      )}
    </div>
  );
}