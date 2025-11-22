import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Build the chart data
  const data = {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Product Quantity",
        data: products.map((p) => p.quantity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="col-md-8">
      <h3>Dashboard</h3>
      <p className="text-muted">Product Quantity Overview</p>

      <div className="card p-3 mt-3">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
