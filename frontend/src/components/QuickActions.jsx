import React from "react";
import {
    FaUserCog,
    FaUsers,
    FaFileAlt,
    FaBell,
    FaClipboardList,
    FaTags
} from "react-icons/fa";

import "../styles/QuickActions.css";

function QuickActions() {

    const actions = [

        {
            title: "Assign Worker",
            icon: <FaUserCog />,
            color: "brown",
            action: () => alert("Assign Worker")
        },

        {
            title: "Add Worker",
            icon: <FaUsers />,
            color: "blue",
            action: () => alert("Add Worker")
        },

        {
            title: "Generate Report",
            icon: <FaFileAlt />,
            color: "green",
            action: () => alert("Generate Report")
        },

        {
            title: "Notifications",
            icon: <FaBell />,
            color: "orange",
            action: () => alert("Notifications")
        },

        {
            title: "View Complaints",
            icon: <FaClipboardList />,
            color: "purple",
            action: () => alert("View Complaints")
        },

        {
            title: "Categories",
            icon: <FaTags />,
            color: "red",
            action: () => alert("Manage Categories")
        }

    ];
        return (

        <div className="quick-actions">

            <div className="quick-header">

                <h2>

                    Quick Actions

                </h2>

                <p>

                    Frequently used admin operations

                </p>

            </div>

            <div className="quick-grid">

                {

                    actions.map((item, index) => (

                        <div

                            key={index}

                            className={`quick-card ${item.color}`}

                            onClick={item.action}

                        >

                            <div className="quick-icon">

                                {item.icon}

                            </div>

                            <h4>

                                {item.title}

                            </h4>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default QuickActions;