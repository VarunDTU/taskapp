import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const tasks = useSelector((state) => state.tasks);
  const data = {
    labels: ["Red", "Blue", "Yellow"],

    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
        legend: {
          display: false,
        },
      },
    ],
  };
  return <Pie data={data} />;
}
