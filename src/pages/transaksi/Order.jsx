import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Container, Spinner, Button, Modal } from "react-bootstrap";
import { Steps } from "rsuite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PilihLayanan.css";

const Order = () => {
    const [showJumlahLayanan, setShowJumlahLayanan] = useState({});
    const [items, setItems] = useState([]);
    const [jenisPengambilan, setJenisPengambilan] = useState([]);
    const [layanan, setLayanan] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [idCreatedTransaksi, setIdCreatedTransaksi] = useState();
    const [isPending, setIsPending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([{ id_layanan: "", jumlah: "" }]);
    const [hampers, setHampers] = useState([{ id_layanan: "", jumlah: "" }]);
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        id_layanan: "",
        id_jenis_pengambilan: "",
        berat: "",
    });

    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        // Fetch items, jenisPengambilan, layanan here
    }, []);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    const addProductField = () => {
        setProducts([...products, { id_layanan: "", jumlah: "" }]);
    };

    const addHampersField = () => {
        setHampers([...hampers, { id_layanan: "", jumlah: "" }]);
    };

    const removeProductField = () => {
        if (products.length > 1) {
            setProducts(products.slice(0, -1));
        }
    };

    const removeHampersField = () => {
        if (hampers.length > 1) {
            setHampers(hampers.slice(0, -1));
        }
    };

    const submitData = async (event) => {
        event.preventDefault();
        setIsPending(true);
        // Submit data logic here
        setIsPending(false);
        setShowModal(true);
    };

    const handleBerikutnyaClick = async () => {
        // Navigate to next page logic here
    };

    if (!items) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <>
            <div className="container steps" style={{ maxWidth: "30%" }}>
                <Steps current={0}>
                    <Steps.Item title="Order Page" />
                    <Steps.Item title="Payment Page" />
                </Steps>
            </div>
            <Container className="cont cont-input mt-5">
                <div style={{ textAlign: "center" }}>
                    <h3 style={{ color: "#014E87" }}>
                        <strong>Order Page</strong>
                    </h3>
                </div>
                <Form onSubmit={submitData}>
                    {products.map((product, index) => (
                        <div className="row mt-5" key={index}>
                            <div className="col-4 cont-input-layanan">
                                <select
                                    className="form-select"
                                    name="id_layanan"
                                    value={product.id_layanan}
                                    onChange={(e) => handleInputChange(index, e)}
                                    required
                                >
                                    <option selected disabled value="">
                                        Pilih Produk
                                    </option>
                                    {layanan.map((layanan) => (
                                        <option key={layanan.id_layanan} value={layanan.id_layanan}>
                                            {layanan.nama_layanan}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-2">
                                <input
                                    className="form-control"
                                    type="number"
                                    name="jumlahProduk"
                                    value={product.jumlah}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Jumlah produk"
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <span className="d-flex justify-content-start">
                                    <strong>Harga Produk:</strong>
                                </span>
                            </div>
                            <div className="col-4">
                                <span className="d-flex justify-content-start" >
                                    <strong>Jenis Produk:</strong>
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="row mt-3">
                        <div className="col-3">
                            <Button type="button" className="btn btn-success d-flex justify-content-start" onClick={addProductField}>
                                <span>Tambah Produk Lain</span>
                            </Button>
                        </div>
                        {products.length > 1 && (
                            <div className="col-3">
                                <Button type="button" className="btn btn-danger d-flex justify-content-end" onClick={removeProductField}>
                                    <span>Gajadi Tambah Produk</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    {hampers.map((hamper, index) => (
                        <div className="row mt-5" key={index}>
                            <div className="col-4 cont-input-layanan">
                                <select
                                    className="form-select"
                                    name="id_layanan"
                                    value={hamper.id_layanan}
                                    onChange={(e) => handleInputChange(index, e)}
                                    required
                                >
                                    <option selected disabled value="">
                                        Pilih Hampers
                                    </option>
                                    {layanan.map((layanan) => (
                                        <option key={layanan.id_layanan} value={layanan.id_layanan}>
                                            {layanan.nama_layanan}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-2">
                                <input
                                    className="form-control"
                                    type="number"
                                    name="jumlahHampers"
                                    value={hamper.jumlah}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Jumlah hampers"
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <span className="d-flex justify-content-start">
                                    <strong>Harga Hampers:</strong>
                                </span>
                            </div>
                            <div className="col-4">
                                <span className="d-flex justify-content-start" >
                                    <strong>Keterangan:</strong>
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="row mt-3">
                        <div className="col-3">
                            <Button type="button" className="btn btn-success d-flex justify-content-start" onClick={addHampersField}>
                                <span>Tambah Hampers Lain</span>
                            </Button>
                        </div>
                        {hampers.length > 1 && (
                            <div className="col-3">
                                <Button type="button" className="btn btn-danger d-flex justify-content-end" onClick={removeHampersField}>
                                    <span>Gajadi Tambah Hampers</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <select
                                className="form-select"
                                id="pengambilan"
                                onChange={handleInputChange}
                                required
                            >
                                <option selected disabled value="">
                                    Pilih Pengambilan
                                </option>
                                <option value="Delivery">Delivery</option>
                                <option value="Pickup">Pickup</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <DatePicker
                                className="form-control d-flex justify-content-start"
                                selected={order.tanggal_pengambilan}
                                onChange={(date) => setOrder({ ...order, tanggal_pengambilan: date })}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Date"
                                minDate={new Date()}
                                required
                            />
                        </div>

                    </div>
                    <div className="mt-4 d-flex justify-content-end">
                        <a href="" type="button" className="btn btn-back">
                            Kembali
                        </a>
                        <Button type="submit" className="btn btn-next" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Loading...
                                </>
                            ) : (
                                <span>Berikutnya</span>
                            )}
                        </Button>
                    </div>
                </Form>
            </Container>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Berhasil Menambahkan Data Order</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn-modal"
                        variant="success"
                        onClick={handleModalClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Order;
