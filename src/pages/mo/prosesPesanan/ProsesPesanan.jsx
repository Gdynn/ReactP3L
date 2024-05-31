import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Spinner, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetPemesananDiterima } from "../../../api/apiPemesanan";
import { format } from "date-fns";
import ModalProsesPesanan from "./ModalProsesPesanan";
import "./Payment.css";

const ProsesPesanan = () => {
    const [pemesanan, setPemesanan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const showUnprocessedOrder = async () => {
        try {
            setLoading(true);
            const unpaidOrder = await GetPemesananDiterima();
            console.log("Fetched unpaid orders:", unpaidOrder);
            setPemesanan(unpaidOrder);
        } catch (error) {
            console.error("Error fetching unpaid orders:", error);
            toast.error("Failed to fetch unpaid orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        showUnprocessedOrder();
    }, []);

    useEffect(() => {
        console.log("Updated pemesanan state:", pemesanan);
    }, [pemesanan]);

    // Helper function to chunk array into smaller arrays of a specific size
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const pemesananChunks = chunkArray(pemesanan, 4);

    const handleProcessClick = (order) => {
        console.log("Selected order for processing:", order); // Log selected order
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const handleConfirmProcess = async () => {
        try {
            // Call API to process the order here
            console.log("Processing order:", selectedOrder);
            toast.success(`Order ${selectedOrder.ID_PEMESANAN} processed successfully`);
            setShowModal(false);
            showUnprocessedOrder(); // Refresh the list after processing
        } catch (error) {
            console.error("Error processing order:", error);
            toast.error("Failed to process order");
        }
    };

    return (
        <Container>
            <div className="payment-container">
                <h2>Pemrosesan Pesanan</h2>
                <div className="payment-content">
                    <div className="payment-content-header">
                        <h3>Pesanan Belum Diproses</h3>
                    </div>
                    <div className="payment-content-body">
                        {loading ? (
                            <Spinner animation="border" variant="primary" />
                        ) : pemesanan && pemesanan.length > 0 ? (
                            pemesananChunks.map((chunk, chunkIndex) => (
                                <Row className="mt-5" key={chunkIndex}>
                                    {chunk.map((order) => (
                                        <Col md={3} key={order.ID_PEMESANAN}>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <Card.Title>ID Pemesanan: {order.ID_PEMESANAN}</Card.Title>
                                                    <Card.Subtitle className="mb-2 mt-2">Tanggal Pemesanan: <strong>{format(new Date(order.TANGGAL_PESAN), 'dd/MM/yyyy')}</strong></Card.Subtitle>
                                                    <Card.Subtitle className="mb-2 mt-2">Tanggal Ambil: <strong>{format(new Date(order.TANGGAL_AMBIL), 'dd/MM/yyyy')}</strong></Card.Subtitle>
                                                    <p>Total: Rp {order.TOTAL},00</p>
                                                    <Card.Subtitle style={{ color: "red" }} className="mb-2 mt-2">Belum Diproses</Card.Subtitle>
                                                    <Button className="mt-3" variant="primary" onClick={() => handleProcessClick(order)}>Proses</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ))
                        ) : (
                            <p>No unprocessed orders found</p>
                        )}
                    </div>
                </div>
            </div>
            <ModalProsesPesanan
                show={showModal}
                handleClose={handleCloseModal}
                handleProcessClick={handleConfirmProcess}
                selectedOrder={selectedOrder}
            />
        </Container>
    );
};

export default ProsesPesanan;
