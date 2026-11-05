import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaClipboardList,
    FaClock,
    FaTools,
    FaCheckCircle,
    FaUserCheck,
    FaEllipsisV,
    FaArrowUp
} from "react-icons/fa";

import "../styles/DashboardCards.css";

const DashboardCards = ({
    total,
    pending,
    assigned,
    inProgress,
    resolved
}) => {

    const navigate = useNavigate();

    const cards = [

        {
            title: "Total Complaints",
            value: total,
            subtitle: "Overall Complaints",
            icon: <FaClipboardList />,
            color: "brown",
            growth: "+18%",
            path: "/admin-complaints"
        },

        {
            title: "Pending",
            value: pending,
            subtitle: "Awaiting Action",
            icon: <FaClock />,
            color: "orange",
            growth: "+6%",
            path: "/admin-complaints?status=PENDING"
        },

        {
            title: "Assigned",
            value: assigned,
            subtitle: "Assigned to Worker",
            icon: <FaUserCheck />,
            color: "blue",
            growth: "+11%",
            path: "/admin-complaints?status=ASSIGNED"
        },
        {
    title: "In Progress",
    value: inProgress,
    subtitle: "Currently Working",
    icon: <FaTools />,
    color: "purple",
    growth: "+9%",
    path: "/admin-complaints?status=IN_PROGRESS"
},
    
        {
            title: "Resolved",
            value: resolved,
            subtitle: "Successfully Completed",
            icon: <FaCheckCircle />,
            color: "green",
            growth: "+23%",
            path: "/admin-complaints?status=RESOLVED"
        }

    ];

    return (

        <div className="dashboard-cards">

            {

                cards.map((card, index) => (

                    <div
                        key={index}
                        className="dashboard-card"
                        onClick={() => navigate(card.path)}
                    >

                                       

                        <div className="card-header">

                            <div className={`card-icon ${card.color}`}>

                                {card.icon}

                            </div>

                            <FaEllipsisV className="card-menu" />

                        </div>

                        <h5>

                            {card.title}

                        </h5>

                        <h1>

                            {card.value}

                        </h1>

                        <p>

                            {card.subtitle}

                        </p>

                        <div className="card-footer">

                            <div className="growth">

                                <FaArrowUp />

                                <span>

                                    {card.growth}

                                </span>

                            </div>

                            <small>

                                Compared to yesterday

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default DashboardCards;