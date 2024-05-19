import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Container, Spinner, Button } from "react-bootstrap";
import { Steps } from "rsuite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PilihLayanan.css";
import { GetAllProduk } from "../../api/apiProduk";
import { GetAllHampers } from "../../api/apiHampers";
import { AddOrderan } from "../../api/apiPemesanan";
import { GetUserByLogin } from "../../api/apiUsers"; // Update this import

const Order = () => {
    const [pemesananProducts, setPemesananProducts] = useState([{ ID_PRODUK: "", KUANTITAS: 1, HARGA: 0, JENIS_PRODUK: "" }]);
    const [pemesananHampers, setPemesananHampers] = useState([{ ID_HAMPERS: "", KUANTITAS: 1, HARGA: 0, KETERANGAN: "" }]);
    const [produks, setProduk] = useState([]);
    const [hampers, setHampers] = useState([]);
    const [user, setUser] = useState(null); // Inisialisasi dengan null
    const [order, setOrder] = useState({ tanggal_pengambilan: null, delivery: "", alamat: "" });
    const [isPending, setIsPending] = useState(false);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();

    useEffect(() => {
        // Set default date for tanggal_pengambilan to 2 days after today
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 2);
        setOrder(prevOrder => ({ ...prevOrder, tanggal_pengambilan: defaultDate }));

        showDropdown();
    }, []);

    useEffect(() => {
        // Debug log to verify user data
        console.log('User data updated:', user);
    }, [user]);

    useEffect(() => {
        // Calculate total order price whenever pemesananProducts or pemesananHampers changes
        const totalProductPrice = pemesananProducts.reduce((total, product) => total + (product.HARGA * product.KUANTITAS), 0);
        const totalHamperPrice = pemesananHampers.reduce((total, hamper) => total + (hamper.HARGA * hamper.KUANTITAS), 0);
        setTotalOrderPrice(totalProductPrice + totalHamperPrice);
    }, [pemesananProducts, pemesananHampers]);

    const handleInputChange = (index, event, type) => {
        const { name, value } = event.target;
        console.log(`handleInputChange called with index: ${index}, name: ${name}, value: ${value}, type: ${type}`); // Debug log

        if (type === "produk") {
            const newProducts = [...pemesananProducts];
            newProducts[index][name] = value;
            console.log('Current products:', newProducts); // Debug log

            if (name === "ID_PRODUK") {
                const selectedProduct = produks.find(produk => produk.ID_PRODUK === Number(value));
                console.log('Selected product:', selectedProduct); // Debug log

                if (selectedProduct) {
                    newProducts[index] = {
                        ...newProducts[index],
                        HARGA: selectedProduct.HARGA,
                        totalPrice: selectedProduct.HARGA * newProducts[index].KUANTITAS,
                        JENIS_PRODUK: selectedProduct.JENIS_PRODUK
                    };
                    console.log(`Product selected: ${selectedProduct.NAMA_PRODUK}, Harga: ${selectedProduct.HARGA}, Jenis: ${selectedProduct.JENIS_PRODUK}`); // Debug log
                } else {
                    console.error(`Product with ID_PRODUK ${value} not found`); // Debug log
                }
            }
            if (name === "KUANTITAS") {
                newProducts[index].KUANTITAS = Math.max(1, Number(value));
                newProducts[index].totalPrice = newProducts[index].HARGA * newProducts[index].KUANTITAS;
            }
            setPemesananProducts(newProducts);
            console.log('Updated products:', newProducts); // Debug log
        } else if (type === "hamper") {
            const newHampers = [...pemesananHampers];
            newHampers[index][name] = value;

            if (name === "ID_HAMPERS") {
                const selectedHamper = hampers.find(hamper => hamper.ID_HAMPERS === Number(value));
                console.log('Selected hamper:', selectedHamper); // Debug log

                if (selectedHamper) {
                    newHampers[index] = {
                        ...newHampers[index],
                        HARGA: selectedHamper.HARGA,
                        totalPrice: selectedHamper.HARGA * newHampers[index].KUANTITAS,
                        KETERANGAN: selectedHamper.KETERANGAN
                    };
                    console.log(`Hamper selected: ${selectedHamper.NAMA_HAMPERS}, Harga: ${selectedHamper.HARGA}`); // Debug log
                } else {
                    console.error(`Hamper with ID_HAMPERS ${value} not found`); // Debug log
                }
            }
            if (name === "KUANTITAS") {
                newHampers[index].KUANTITAS = Math.max(1, Number(value));
                newHampers[index].totalPrice = newHampers[index].HARGA * newHampers[index].KUANTITAS;
            }
            setPemesananHampers(newHampers);
            console.log('Updated hampers:', newHampers); // Debug log
        }
    };

    const addProductField = () => {
        setPemesananProducts([...pemesananProducts, { ID_PRODUK: "", KUANTITAS: 1, HARGA: 0, JENIS_PRODUK: "" }]);
    };

    const addHampersField = () => {
        setPemesananHampers([...pemesananHampers, { ID_HAMPERS: "", KUANTITAS: 1, HARGA: 0, KETERANGAN: "" }]);
    };

    const removeProductField = () => {
        if (pemesananProducts.length > 1) {
            setPemesananProducts(prevState => prevState.slice(0, -1));
            console.log('Removed product field: ', pemesananProducts); // Debug log
        }
    };

    const removeHampersField = () => {
        if (pemesananHampers.length > 1) {
            setPemesananHampers(prevState => prevState.slice(0, -1));
            console.log('Removed hamper field: ', pemesananHampers); // Debug log
        }
    };

    const showDropdown = async () => {
        try {
            setLoading(true);
            const produkData = await GetAllProduk();
            console.log('Produk data:', produkData); // Log the produk data
            setProduk(produkData);

            const hampersData = await GetAllHampers();
            console.log('Hampers data:', hampersData); // Log the hampers data
            setHampers(hampersData);

            const userLogin = await GetUserByLogin();
            console.log('User data:', userLogin); // Log the user data
            setUser(userLogin); // Update to access the data correctly
        } catch (err) {
            console.error('Error loading data:', err);
            setError(err.message || 'Error loading data');
        } finally {
            setLoading(false);
        }
    };

    const submitData = async (event) => {
        event.preventDefault();
        setIsPending(true);

        if (!user) {
            console.error('User data is not loaded');
            setIsPending(false);
            return;
        }

        console.log('User data:', user); // Debug log

        // Check if at least one product or hamper is selected
        if (pemesananProducts.length === 1 && !pemesananProducts[0].ID_PRODUK && pemesananHampers.length === 1 && !pemesananHampers[0].ID_HAMPERS) {
            toast.error('Please select at least one product or hamper');
            setIsPending(false);
            return;
        }

        const pemesananData = {
            ID_USER: user.ID_USER, // Ganti dengan ID_USER yang benar
            TANGGAL_AMBIL: order.tanggal_pengambilan.toISOString().split('T')[0],
            TOTAL: pemesananProducts.reduce((total, product) => total + (product.HARGA * product.KUANTITAS), 0) + pemesananHampers.reduce((total, hamper) => total + (hamper.HARGA * hamper.KUANTITAS), 0),
            DELIVERY: order.delivery,
            ALAMAT: order.alamat,
            products: pemesananProducts.filter(product => product.ID_PRODUK).map(product => ({
                ID_PRODUK: product.ID_PRODUK,
                KUANTITAS: product.KUANTITAS,
                HARGA: product.HARGA,
            })),
            hampers: pemesananHampers.filter(hamper => hamper.ID_HAMPERS).map(hamper => ({
                ID_HAMPERS: hamper.ID_HAMPERS,
                KUANTITAS: hamper.KUANTITAS,
                HARGA: hamper.HARGA,
            })),
        };

        try {
            const response = await AddOrderan(pemesananData);

            if (response.status === 201) {
                toast.success('Pemesanan berhasil disimpan');
                navigate('/user/history');
            } else {
                toast.error(`Gagal menyimpan pemesanan: ${response.data.message}`);
                console.error('Failed to save order:', response.data);
            }
        } catch (error) {
            toast.error('Gagal menyimpan pemesanan');
            console.error('Error:', error);
        } finally {
            setIsPending(false);
        }
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <p>Error: {error}</p>
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
                                    name="ID_PRODUK"
                                    value={product.ID_PRODUK}
                                    onChange={(e) => handleInputChange(index, e, "produk")}
                                >
                                    <option selected disabled value="">
                                        Pilih Produk
                                    </option>
                                    {produks && produks.length > 0 && produks.map((produk) => (
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
                                    name="KUANTITAS"
                                    value={product.KUANTITAS}
                                    onChange={(e) => handleInputChange(index, e, "produk")}
                                    placeholder="Jumlah produk"
                                    required
                                    min={1}
                                />
                            </div>
                            <div className="col-2">
                                <span className="d-flex justify-content-start">
                                    <strong>Harga Produk: Rp{product.totalPrice},00</strong>
                                </span>
                            </div>
                            <div className="col-4">
                                <span className="d-flex justify-content-start">
                                    <strong>Jenis Produk: {product.JENIS_PRODUK}</strong>
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
                                    name="ID_HAMPERS"
                                    value={hamper.ID_HAMPERS}
                                    onChange={(e) => handleInputChange(index, e, "hamper")}
                                >
                                    <option selected disabled value="">
                                        Pilih Hampers
                                    </option>
                                    {hampers && hampers.length > 0 && hampers.map((h) => (
                                        <option key={h.ID_HAMPERS} value={h.ID_HAMPERS}>
                                            {h.NAMA_HAMPERS}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-2">
                                <input
                                    className="form-control"
                                    type="number"
                                    name="KUANTITAS"
                                    value={hamper.KUANTITAS}
                                    onChange={(e) => handleInputChange(index, e, "hamper")}
                                    placeholder="Jumlah hampers"
                                    required
                                    min={1}
                                />
                            </div>
                            <div className="col-2">
                                <span className="d-flex justify-content-start">
                                    <strong>Harga Hampers: Rp{hamper.totalPrice},00</strong>
                                </span>
                            </div>
                            <div className="col-4">
                                <span className="d-flex justify-content-start">
                                    <strong>Keterangan: {hamper.KETERANGAN}</strong>
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
                    <div className="row mt-5">
                        <div className="col-6">
                            <select
                                className="form-select"
                                id="pengambilan"
                                onChange={(e) => setOrder({ ...order, delivery: e.target.value })}
                                required
                            >
                                <option selected disabled value="">
                                    Pilih Pengambilan
                                </option>
                                <option value="Delivery">Delivery</option>
                                <option value="Pickup">Pickup</option>
                                <option value="Ojol">Ojol</option>
                            </select>
                        </div>
                        {order.delivery === 'Delivery' && user && user.ALAMAT && (
                            <div className="col-6 d-flex justify-content-start">
                                <select
                                    className="form-select"
                                    id="alamat"
                                    onChange={(e) => setOrder({ ...order, alamat: e.target.value })}
                                    required
                                >
                                    <option selected disabled value="">
                                        Pilih Alamat
                                    </option>
                                    {user.ALAMAT.map((alamat) => (
                                        <option key={alamat.ID_ALAMAT} value={alamat.ALAMAT}>
                                            {alamat.NAMA_ALAMAT} - {alamat.ALAMAT}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="row mt-5">
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
                                minDate={minDate}
                                required
                            />
                        </div>
                        <div className="col-6">
                            <span className="d-flex justify-content-end" style={{ marginRight: "250px" }}>
                                <strong style={{ color: "green" }}>Total: Rp{totalOrderPrice},00</strong>
                            </span>
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
        </>
    );
};

export default Order;
