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
import { GetAllLaporanBahan } from "../../../api/apiLaporanBahanBaku"; // Sesuaikan path sesuai struktur proyek Anda

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

const PengeluaranBahanBaku = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pengeluaranData, setPengeluaranData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchPengeluaran();
  }, [startDate, endDate]);

  const fetchPengeluaran = async () => {
    setIsLoading(true);
    try {
      const data = await GetAllLaporanBahan(startDate, endDate);
      console.log("Data received from API:", data); // Log data untuk debugging
      setPengeluaranData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching pengeluaran data:", error);
      setIsLoading(false);
    }
  };

  const salesData = {
    labels: pengeluaranData.map((item) => item.tanggal),
    datasets: [
      {
        label: "Total Pengeluaran",
        data: pengeluaranData.map((item) => item.total_pengeluaran),
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
    <div className="pengeluaran-bahan-baku">
      <h1>Pengeluaran Bahan Baku</h1>
      <div className="filters">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchPengeluaran}>Filter</button>
      </div>
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
                <th>Nama Bahan Baku</th>
                <th>Tanggal</th>
                <th>Total Pengeluaran</th>
              </tr>
            </thead>
            <tbody>
              {pengeluaranData.map((item, index) => (
                <tr key={index}>
                  <td>{item.NAMA_BAHAN_BAKU}</td>
                  <td>{item.tanggal}</td>
                  <td>{item.total_pengeluaran}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default PengeluaranBahanBaku;
