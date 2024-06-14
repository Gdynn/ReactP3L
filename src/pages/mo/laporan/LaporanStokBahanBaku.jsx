import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { format } from "date-fns";
import { GetAllBahanBaku } from "../../../api/apiBahanBaku";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./LaporanPenjualan.css";

const LaporanStokBahanBaku = () => {
    const [bahanbaku, setBahanBaku] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await GetAllBahanBaku();
            setBahanBaku(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getSatuan = (namaBahan) => {
        const satuanMapping = {
            'butir telur': 'butir',
            'minyak goreng': 'ml',
            'susu cair': 'ml',
            'whipped cream': 'ml',
            'susu full cream': 'ml',
            'sosis blackpapper': 'buah',
            'box 20x20 cm': 'pcs',
            'box 20x10 cm': 'pcs',
            'box premium': 'pcs',
            'botol 1 liter': 'pcs',
            'tas spunbond': 'pcs',
            'kartu ucapan': 'pcs',
        };
        return satuanMapping[namaBahan.toLowerCase()] || 'gram';
    };

    const handleCetak = () => {
        const doc = new jsPDF();

        doc.text("Atma Kitchen", 14, 10);
        doc.text("Jl. Centralpark No. 10 Yogyakarta", 14, 16);
        doc.text("LAPORAN Stok Bahan Baku", 14, 22);
        doc.text(`Tanggal cetak: ${format(new Date(), "d MMMM yyyy")}`, 14, 28);

        const tableColumn = ["Nama Bahan", "Satuan", "Stok"];
        const tableRows = [];

        bahanbaku.forEach(item => {
            const rowData = [
                item.NAMA_BAHAN_BAKU,
                getSatuan(item.NAMA_BAHAN_BAKU),
                item.STOK.toLocaleString()
            ];
            tableRows.push(rowData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 32 });
        doc.save(`Laporan_Stok_Bahan_Baku_${format(new Date(), "d_MMMM_yyyy")}.pdf`);
    };

    return (
        <Container>
            <h2>Laporan Stok Bahan Baku</h2>
            <div className="laporan-container mt-5">
                <div className="laporan-header mt-5">
                    <p className="yaa">Atma Kitchen</p>
                    <p className="yaa">Jl. Centralpark No. 10 Yogyakarta</p><br />
                    <p className="yaa">LAPORAN Stok Bahan Baku</p>
                    <p className="yaa">Tanggal cetak: <strong>{format(new Date(), "d MMMM yyyy")}</strong></p>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nama Bahan</th>
                                    <th>Satuan</th>
                                    <th>Stok</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bahanbaku.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.NAMA_BAHAN_BAKU}</td>
                                        <td>{getSatuan(item.NAMA_BAHAN_BAKU)}</td>
                                        <td>{item.STOK.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button variant="success" onClick={handleCetak} className="mt-3">
                            Cetak
                        </Button>
                    </>
                )}
            </div>
        </Container>
    );
};

export default LaporanStokBahanBaku;
