import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function AdminComplaintChart({ counts }) {

    const values = [
        counts.pending || 0,
        counts.assigned || 0,
        counts.progress || 0,
        counts.resolved || 0
    ];

    // Show sample values if all are zero
    const chartValues =
        values.every(value => value === 0)
            ? [1, 1, 1, 1]
            : values;

    const data = {
        labels: [
            "Pending",
            "Assigned",
            "In Progress",
            "Resolved"
        ],
        datasets: [
            {
                data: chartValues,
                backgroundColor: [
                    "#D9A15C",
                    "#7B4B25",
                    "#B67A4A",
                    "#6BA368"
                ],
                borderColor: "#FFF8F1",
                borderWidth: 4,
                hoverOffset: 18
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#5A3214",
                    font: {
                        size: 14,
                        weight: "bold"
                    },
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: "#5A3214",
                titleColor: "#fff",
                bodyColor: "#fff",
                cornerRadius: 10,
                padding: 12
            }
        }
    };

    return (

        <div className="admin-chart-card">

            <div className="admin-chart-header">

                <h2>Complaint Overview</h2>

                <p>Complaint Status Distribution</p>

            </div>

            <div
                className="admin-chart"
                style={{
                    width: "330px",
                    height: "330px",
                    margin: "0 auto"
                }}
            >

                <Doughnut
                    data={data}
                    options={options}
                />

            </div>

            <div className="chart-summary">

                <div className="summary-item pending">

                    <span>Pending</span>

                    <strong>{counts.pending || 0}</strong>

                </div>

                <div className="summary-item assigned">

                    <span>Assigned</span>

                    <strong>{counts.assigned || 0}</strong>

                </div>

                <div className="summary-item progress">

                    <span>In Progress</span>

                    <strong>{counts.progress || 0}</strong>

                </div>

                <div className="summary-item resolved">

                    <span>Resolved</span>

                    <strong>{counts.resolved || 0}</strong>

                </div>

            </div>

        </div>

    );

}