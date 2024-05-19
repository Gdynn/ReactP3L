import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Spinner, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetUserUnpaidOrder } from "../../api/apiUsers";
import { format } from "date-fns";
import "./Payment.css";

const History = () => {
    const [pemesanan, setPemesanan] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const showUnpaidOrder = async () => {
        try {
            setLoading(true);
            const unpaidOrder = await GetUserUnpaidOrder();
            console.log("Fetched unpaid orders:", unpaidOrder);
            setPemesanan(unpaidOrder); // Assuming the API returns the data in `data` field
        } catch (error) {
            console.error("Error fetching unpaid orders:", error);
            toast.error("Failed to fetch unpaid orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        showUnpaidOrder();
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

    const handlePaymentClick = (idPemesanan) => {
        navigate(`/user/payment/${idPemesanan}`);
    };

    return (
        <Container>
            <div className="payment-container">
                <h2>History Pemesanan</h2>
                <div className="payment-content">
                    <div className="payment-content-header">
                        <h3>History Pemesanan Belum Bayar</h3>
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
                                                    <Card.Subtitle className="mb-2 mt-2">Tanggal Pemesanan: {format(new Date(order.TANGGAL_PESAN), 'dd/MM/yyyy')}</Card.Subtitle>
                                                    <p>Total: Rp {order.TOTAL},00</p>
                                                    <Card.Subtitle style={{ color: "red" }} className="mb-2 mt-2">Belum Bayar</Card.Subtitle>
                                                    <Button className="mt-3" variant="primary" onClick={() => handlePaymentClick(order.ID_PEMESANAN)}>Bayar</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ))
                        ) : (
                            <p>No unpaid orders found</p>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default History;
