import React, { useState, useEffect } from "react";
import { Button, Form, Modal, ListGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetPemesananBahanBaku, ProsesPemesanan } from "../../../api/apiPemesanan";

const ModalProsesPesanan = ({ show, handleClose, handleProcessClick, selectedOrder }) => {
    const [bahanBakuUsage, setBahanBakuUsage] = useState([]);
    const [produkList, setProdukList] = useState([]);
    const [hampersList, setHampersList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchBahanBakuUsage = async () => {
            if (!selectedOrder) return;
            console.log("Selected order ID:", selectedOrder.ID_PEMESANAN); // Log selectedOrder ID
            try {
                setLoading(true);
                const response = await GetPemesananBahanBaku(selectedOrder.ID_PEMESANAN);
                console.log("API response:", response);
                if (response) {
                    setBahanBakuUsage(response.bahan_baku);
                    setProdukList(response.produk);
                    setHampersList(response.hampers);
                } else {
                    toast.error("Failed to fetch bahan baku usage");
                }
            } catch (error) {
                console.error("Error fetching bahan baku usage:", error);
                toast.error("Failed to fetch bahan baku usage");
            } finally {
                setLoading(false);
            }
        };

        if (show && selectedOrder) {
            fetchBahanBakuUsage();
        }
    }, [show, selectedOrder]);

    const handleConfirmProcess = async () => {
        if (!selectedOrder) return;
        setProcessing(true);
        try {
            const response = await ProsesPemesanan(selectedOrder.ID_PEMESANAN);
            console.log("Process order response:", response);
            if (response) {
                toast.success(`Order ${selectedOrder.ID_PEMESANAN} processed successfully`);
                handleClose(); // Close modal on success
                handleProcessClick(); // Refresh the list or any other action needed
            } else {
                toast.error(`Failed to process order ${selectedOrder.ID_PEMESANAN}`);
            }
        } catch (error) {
            console.error("Error processing order:", error);
            toast.error(`Failed to process order ${selectedOrder.ID_PEMESANAN}`);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Proses Pesanan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Apakah Anda yakin ingin memproses pesanan ini?</Form.Label>
                    </Form.Group>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <>
                            <Form.Label>Bahan Baku yang digunakan:</Form.Label>
                            <ListGroup>
                                {bahanBakuUsage.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        {item.NAMA_BAHAN_BAKU}: {item.TOTAL_PENGGUNAAN}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Form.Label className="mt-3">Produk:</Form.Label>
                            <ListGroup>
                                {produkList.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        {item.NAMA_PRODUK} - Kuantitas: {item.KUANTITAS}, Harga: Rp {item.HARGA},00
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Form.Label className="mt-3">Hampers:</Form.Label>
                            <ListGroup>
                                {hampersList.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        {item.NAMA_HAMPERS} - Kuantitas: {item.KUANTITAS}, Harga: Rp {item.HARGA},00
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Batal
                </Button>
                <Button variant="primary" onClick={handleConfirmProcess} disabled={processing}>
                    {processing ? <Spinner animation="border" size="sm" /> : "Proses"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalProsesPesanan;
