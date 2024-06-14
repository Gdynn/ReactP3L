import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { GetAllLaporan } from "../../../api/apiLaporan"; // Sesuaikan path sesuai struktur proyek Anda

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlySales = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  const fetchMonthlySales = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllLaporan();
      console.log("Response from API:", response); // Log response for debugging

      // Pastikan respons berbentuk data JSON
      const data = response.data || response;
      console.log("Data received from API:", data); // Log data for debugging

      if (Array.isArray(data)) {
        // Convert total_sales to numeric
        const salesData = data.map((sale) => ({
          ...sale,
          total_sales: Number(sale.total_sales),
        }));
        console.log("Processed sales data:", salesData); // Log data yang sudah diproses
        setMonthlySales(salesData);
      } else {
        console.error("Data received is not an array", data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching monthly sales data", error);
      setIsLoading(false);
    }
  };

  const salesData = {
    labels: monthlySales.map(
      (sale) => `${sale.year}-${sale.month}-${sale.day}`
    ),
    datasets: [
      {
        label: "Total Sales",
        data: monthlySales.map((sale) => sale.total_sales),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="monthly-sales">
      <h1>Monthly Sales</h1>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <div className="chart-container">
            <Line data={salesData} options={options} />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Tanggal</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {monthlySales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.year}</td>
                  <td>{sale.month}</td>
                  <td>{sale.day}</td>
                  <td>{sale.total_sales}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default MonthlySales;
