import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Container, Spinner, Button, Modal } from "react-bootstrap";
import { Steps } from "rsuite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PilihLayanan.css";
import { GetAllProduk } from "../../api/apiProduk";
import { GetAllHampers } from "../../api/apiHampers";

const Order = () => {
    const [showJumlahLayanan, setShowJumlahLayanan] = useState({});
    const [items, setItems] = useState([]);
    const [jenisPengambilan, setJenisPengambilan] = useState([]);
    const [layanan, setLayanan] = useState([]);
    const [ukuran, setUkuran] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [idCreatedTransaksi, setIdCreatedTransaksi] = useState();
    const [isPending, setIsPending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pemesananProducts, setPemesananProducts] = useState([{ id_layanan: "", jumlah: "" }]);
    const [pemesananHampers, setPemesananHampers] = useState([{ id_layanan: "", jumlah: "" }]);
    const [produks, setProduk] = useState([]);
    const [hampers, setHampers] = useState([]);
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
        showDropdown();
    }, []);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newProducts = [...pemesananProducts];
        newProducts[index][name] = value;
        setPemesananProducts(newProducts);
    };

    const addProductField = () => {
        setPemesananProducts([...pemesananProducts, { ID_PRODUK: "", KUANTITAS: "" }]);
    };

    const addHampersField = () => {
        setPemesananHampers([...pemesananHampers, { ID_HAMPERS: "", KUANTITAS: "" }]);
    };

    const removeProductField = () => {
        if (pemesananProducts.length > 1) {
            setPemesananProducts(pemesananProducts.slice(0, -1));
        }
    };

    const removeHampersField = () => {
        if (pemesananHampers.length > 1) {
            setPemesananHampers(pemesananHampers.slice(0, -1));
        }
    };

    const showDropdown = () => {
        GetAllProduk()
            .then((response) => {
                console.log("Produk data: ", response); // Check the structure and content of response
                setProduk(response);
            })
            .catch((err) => {
                console.log(err);
            });

        GetAllHampers()
            .then((response) => {
                console.log("Produk data: ", response); // Check the structure and content of response
                setHampers(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
                    {pemesananProducts.map((product, index) => (
                        <div className="row mt-5" key={index}>
                            <div className="col-4 cont-input-layanan">
                                <select
                                    className="form-select"
                                    name="id_layanan"
                                    value={product.ID_PRODUK}
                                    onChange={(e) => handleInputChange(index, e)}
                                    required
                                >
                                    <option selected disabled value="">
                                        Pilih Produk
                                    </option>
                                    {produks.map((produk) => (
                                        <option key={produk.ID_PRODUK} value={produk.ID_PRODUK}>
                                            {produk.NAMA_PRODUK}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-2">
                                <input
                                    className="form-control"
                                    type="number"
                                    name="jumlahProduk"
                                    value={product.KUANTITAS}
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
                        {pemesananProducts.length > 1 && (
                            <div className="col-3 d-flex justify-content-end">
                                <Button type="button" className="btn btn-danger" onClick={removeProductField}>
                                    <span>Gajadi Tambah Produk</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    {pemesananHampers.map((hamper, index) => (
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
                                    {hampers.map((hamper) => (
                                        <option key={hamper.ID_HAMPERS} value={hamper.ID_HAMPERS}>
                                            {hamper.NAMA_HAMPERS}
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
                                    placeholder="Jumlah pemesananHampers"
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
                        {pemesananHampers.length > 1 && (
                            <div className="col-3 d-flex justify-content-end">
                                <Button type="button" className="btn btn-danger" onClick={removeHampersField}>
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
                        <div className="col-6 d-flex justify-content-start">
                            <label htmlFor="tanggalPengambilan" style={{ marginRight: "25px" }}><strong>Tanggal Pengambilan</strong></label>
                            <DatePicker
                                className="form-control"
                                style={{ cursor: "pointer" }}
                                name="tanggalPengambilan"
                                selected={order.tanggal_pengambilan}
                                onChange={(date) => setOrder({ ...order, tanggal_pengambilan: date })}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Tanggal Pengambilan"
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