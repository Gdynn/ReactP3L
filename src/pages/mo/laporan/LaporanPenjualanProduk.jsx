import React, { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { format } from "date-fns";
import { GetPenjualanBulanan } from "../../../api/apiLaporan";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./LaporanPenjualan.css";

const LaporanPenjualanProduk = () => {
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bulan, setBulan] = useState(new Date().getMonth() + 1); // Bulan sekarang
    const [tahun, setTahun] = useState(new Date().getFullYear()); // Tahun sekarang

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await GetPenjualanBulanan(bulan, tahun);
            setProduk(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const calculateTotal = () => {
        return produk.reduce((total, item) => total + item.jumlah_uang, 0);
    };

    const handleCetak = () => {
        const doc = new jsPDF();

        doc.text("Atma Kitchen", 14, 10);
        doc.text("Jl. Centralpark No. 10 Yogyakarta", 14, 16);
        doc.text("LAPORAN Penjualan Bulanan", 14, 22);
        doc.text(`Bulan: ${new Date(0, bulan - 1).toLocaleString("id-ID", { month: "long" })}`, 14, 28);
        doc.text(`Tahun: ${tahun}`, 14, 34);
        doc.text(`Tanggal cetak: ${format(new Date(), "d MMMM yyyy")}`, 14, 40);

        const tableColumn = ["Produk", "Kuantitas", "Harga", "Jumlah Uang"];
        const tableRows = [];

        produk.forEach((item) => {
            tableRows.push([item.produk, item.kuantitas, item.harga.toLocaleString(), item.jumlah_uang.toLocaleString()]);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 46 });
        doc.text(`Total: ${calculateTotal().toLocaleString()}`, 14, doc.autoTable.previous.finalY + 10);

        doc.save(`Laporan_Penjualan_Bulanan_${new Date(0, bulan - 1).toLocaleString("id-ID", { month: "long" })}_${tahun}.pdf`);
    };

    return (
        <Container>
            <h2>Laporan Penjualan Bulanan</h2>
            <div className="row input-tahun">
                <div className="col-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBulan">
                            <Form.Label>Bulan</Form.Label>
                            <Form.Control as="select" value={bulan} onChange={(e) => setBulan(e.target.value)}>
                                {[...Array(12).keys()].map((m) => (
                                    <option key={m + 1} value={m + 1}>
                                        {new Date(0, m).toLocaleString("id-ID", { month: "long" })}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTahun">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control
                                type="text"
                                value={tahun}
                                pattern="[0-9]*"
                                min={2000}
                                max={2100}
                                onChange={(e) => setTahun(e.target.validity.valid ? e.target.value : tahun)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Tampilkan
                        </Button>
                    </Form>
                </div>
            </div>
            <div className="laporan-container mt-5">
                <div className="laporan-header mt-5">
                    <p className="yaa">Atma Kitchen</p>
                    <p className="yaa">Jl. Centralpark No. 10 Yogyakarta</p><br />
                    <p className="yaa">LAPORAN PENJUALAN BULANAN</p>
                    <p className="yaa">Bulan: <strong>{new Date(0, bulan - 1).toLocaleString("id-ID", { month: "long" })}</strong></p>
                    <p className="yaa">Tahun: <strong>{tahun}</strong></p>
                    <p className="yaa">Tanggal cetak: <strong>{format(new Date(), "d MMMM yyyy")}</strong></p>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Produk</th>
                                <th>Kuantitas</th>
                                <th>Harga</th>
                                <th>Jumlah Uang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produk.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.produk}</td>
                                    <td>{item.kuantitas}</td>
                                    <td>{item.harga.toLocaleString()}</td>
                                    <td>{item.jumlah_uang.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3">Total</td>
                                <td>{calculateTotal().toLocaleString()}</td>
                            </tr>
                        </tbody>
                        <Button variant="success" onClick={handleCetak} className="mt-3">
                            Cetak
                        </Button>
                    </Table>
                )}
            </div>
        </Container>
    );
};

export default LaporanPenjualanProduk;
