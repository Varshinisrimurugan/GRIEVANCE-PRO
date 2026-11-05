import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ComplaintChart({ counts }) {

  const values = [
    counts.pending,
    counts.progress,
    counts.resolved,
  ];

  // எல்லாமே 0 இருந்தா sample values use பண்ணு
  const chartValues =
    values.every(v => v === 0)
      ? [1, 1, 1]
      : values;

  const data = {
    labels: [
      "Pending",
      "In Progress",
      "Resolved",
    ],
    datasets: [
      {
        data: chartValues,
        backgroundColor: [
          "#E4B363",
          "#B67A4A",
          "#6BA368",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div
      style={{
        width: "260px",
        height: "260px",
        margin: "0 auto",
      }}
    >
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}