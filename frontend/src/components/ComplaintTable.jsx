import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaArrowRight,
    FaExclamationCircle
} from "react-icons/fa";

import "../styles/ComplaintTable.css";

function ComplaintTable() {
   const navigate = useNavigate();
    const [counts, setCounts] = useState({

        high: 0,

        medium: 0,

        low: 0

    });

    useEffect(() => {

        loadPriorityCounts();

    }, []);

    const loadPriorityCounts = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/compilants"
            );

            const complaints = response.data;

            const high = complaints.filter(
                c => c.priority?.toUpperCase() === "HIGH"
            ).length;

            const medium = complaints.filter(
                c => c.priority?.toUpperCase() === "MEDIUM"
            ).length;

            const low = complaints.filter(
                c => c.priority?.toUpperCase() === "LOW"
            ).length;

            setCounts({

                high,

                medium,

                low

            });

        }

        catch (error) {

            console.log(error);

        }

    };

    const total = counts.high + counts.medium + counts.low;

    const highPercent =
        total === 0 ? 0 : Math.round((counts.high / total) * 100);

    const mediumPercent =
        total === 0 ? 0 : Math.round((counts.medium / total) * 100);

    const lowPercent =
        total === 0 ? 0 : Math.round((counts.low / total) * 100);

    return (

        <div className="complaint-table-container">

            <div className="priority-header">

                <h2>

    Complaint Priority

</h2>

                    

              <button
    className="view-all-btn"
    onClick={() => navigate("/admin-complaints")}
>

    View All Complaints

    <FaArrowRight />

</button> 

            </div>

            <div className="priority-grid">
                            {/* High Priority */}

                <div className="priority-card high-card">

                    <div className="priority-icon high-icon">

                        <FaExclamationCircle />

                    </div>

                    <h4>High Priority</h4>

                    <h1>

                        {String(counts.high).padStart(2, "0")}

                    </h1>

                    <span>

                        ({highPercent}%)

                    </span>

                    <div className="progress-bar">

                        <div
                            className="progress-fill high-fill"
                            style={{
                                width: `${highPercent}%`
                            }}
                        ></div>

                    </div>

                </div>

                {/* Medium Priority */}

                <div className="priority-card medium-card">

                    <div className="priority-icon medium-icon">

                        <FaExclamationCircle />

                    </div>

                    <h4>Medium Priority</h4>

                    <h1>

                        {String(counts.medium).padStart(2, "0")}

                    </h1>

                    <span>

                        ({mediumPercent}%)

                    </span>

                    <div className="progress-bar">

                        <div
                            className="progress-fill medium-fill"
                            style={{
                                width: `${mediumPercent}%`
                            }}
                        ></div>

                    </div>

                </div>

                {/* Low Priority */}

                <div className="priority-card low-card">

                    <div className="priority-icon low-icon">

                        <FaExclamationCircle />

                    </div>

                    <h4>Low Priority</h4>

                    <h1>

                        {String(counts.low).padStart(2, "0")}

                    </h1>

                    <span>

                        ({lowPercent}%)

                    </span>

                    <div className="progress-bar">

                        <div
                            className="progress-fill low-fill"
                            style={{
                                width: `${lowPercent}%`
                            }}
                        ></div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ComplaintTable;
         