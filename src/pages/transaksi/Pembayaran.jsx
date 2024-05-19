import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Spinner, Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetOrderanById, UploadBuktiBayar } from "../../api/apiPemesanan";
import { GetUserById, UpdatePoin } from "../../api/apiUsers";
import { format, differenceInCalendarDays } from "date-fns";
import "./Payment.css";

const Payment = () => {
    const { idPemesanan } = useParams();
    const [pemesanan, setPemesanan] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null); // State to store selected file
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderData = await GetOrderanById(idPemesanan);
                const userData = await GetUserById(orderData.ID_USER);
                setUser(userData);
                setPemesanan(orderData);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch order details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [idPemesanan]);

    const handlePayment = async () => {
        if (!file) {
            toast.error("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append("BUKTI_BAYAR", file);
        formData.append("TOTAL", finalAmount);

        // Logging form data for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await UploadBuktiBayar(idPemesanan, formData);

            if (response.status === 200) {
                toast.success("Payment proof uploaded successfully!");

                const updatedPoin = totalCustomerPoints + user.POIN;
                await UpdatePoin(user.ID_USER, { poin: updatedPoin });

                navigate("/user/history");
            } else {
                toast.error("Failed to upload payment proof");
            }
        } catch (error) {
            console.error("Error during file upload:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                if (errors.BUKTI_BAYAR) {
                    toast.error(errors.BUKTI_BAYAR[0]);
                }
                if (errors.TOTAL) {
                    toast.error(errors.TOTAL[0]);
                }
            } else {
                toast.error("Payment failed");
            }
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const calculatePoints = (totalAmount) => {
        let points = 0;
        points += Math.floor(totalAmount / 1000000) * 200;
        totalAmount %= 1000000;
        points += Math.floor(totalAmount / 500000) * 75;
        totalAmount %= 500000;
        points += Math.floor(totalAmount / 100000) * 15;
        totalAmount %= 100000;
        points += Math.floor(totalAmount / 10000) * 1;

        const today = new Date();
        const userBirthday = new Date(user.TANGGAL_LAHIR);
        userBirthday.setFullYear(today.getFullYear()); // Set the year to this year for comparison

        const daysDifference = differenceInCalendarDays(today, userBirthday);

        if (daysDifference >= -3 && daysDifference <= 3) {
            points *= 2;
        }

        return points;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!pemesanan) {
        return <p>No order details found</p>;
    }

    const formatDate = (date) => {
        return date ? format(new Date(date), 'dd/MM/yyyy HH:mm') : '-';
    };

    const totalOrderAmount = pemesanan.TOTAL;

    // Calculate delivery charge based on pemesanan.JARAK
    const deliveryCharge = pemesanan.JARAK < 5 ? 10000 : 10000 + (Math.floor(pemesanan.JARAK / 5) * 5000);

    const pointsDiscount = user.POIN * 100; // Assuming a fixed points discount
    const finalAmount = totalOrderAmount + deliveryCharge - pointsDiscount;
    const pointsEarned = calculatePoints(totalOrderAmount); // Calculate points earned
    const totalCustomerPoints = pointsEarned; // Update total points for the customer

    return (
        <>
            <Container>
                <div className="payment-container">
                    <h2>Payment Page</h2>
                    <Card style={{ width: '36rem', margin: 'auto' }}>
                        <Card.Body className="text-left">
                            <Card.Title>No Nota: {pemesanan.ID_PEMESANAN}</Card.Title>
                            <Card.Subtitle className="mb-2 mt-2">Tanggal Pemesanan: {formatDate(pemesanan.TANGGAL_PESAN)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 mt-2">Lunas Pada: {formatDate(pemesanan.TANGGAL_LUNAS)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 mt-2">Tanggal Ambil: {formatDate(pemesanan.TANGGAL_AMBIL)}</Card.Subtitle>
                            <Card.Text>
                                <strong>Customer:</strong> {user.EMAIL} / {user.NAMA_USER} <br />
                                {pemesanan.ALAMAT} <br />
                                <strong>Delivery:</strong> {pemesanan.DELIVERY}
                            </Card.Text>
                            <Card.Text>
                                <strong>Order Items:</strong>
                                <ul>
                                    {pemesanan.detail_pemesanan_hampers.map((item) => (
                                        <li key={item.ID_DETAIL_PEMESANAN_HAMPERS}>
                                            {item.KUANTITAS} {item.hampers.NAMA_HAMPERS} - Rp {item.HARGA * item.KUANTITAS},00
                                        </li>
                                    ))}
                                    {pemesanan.detail_pemesanan_produk.map((item) => (
                                        <li key={item.ID_DETAIL_PEMESANAN_PRODUK}>
                                            {item.KUANTITAS} {item.produk.NAMA_PRODUK} - Rp {item.HARGA * item.KUANTITAS},00
                                        </li>
                                    ))}
                                </ul>
                            </Card.Text>
                            <Card.Text>
                                <strong>Total:</strong> Rp {totalOrderAmount},00 <br />
                                <strong>Ongkos Kirim (rad. {pemesanan.JARAK}Km):</strong> Rp {deliveryCharge},00 <br />
                                <strong>Potongan {user.POIN} poin:</strong> - Rp {pointsDiscount},00 <br />
                                <strong>Total:</strong> Rp {finalAmount},00 <br />
                            </Card.Text>
                            <Card.Text>
                                <strong>Poin dari pesanan ini:</strong> {pointsEarned} <br />
                                <strong>Total poin customer:</strong> {totalCustomerPoints}
                            </Card.Text>
                            <Form.Group>
                                <Form.Label className="mt-3">Upload Bukti Bayar</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" onClick={handlePayment}>Kirim Bukti Bayar</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    );
};

export default Payment;
