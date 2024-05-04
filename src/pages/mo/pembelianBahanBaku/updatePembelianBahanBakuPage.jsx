import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { UpdatePembelianBahanBaku } from "../../../api/apiPembelianBahanBaku";
import { UpdateDetailPengeluaran } from "../../../api/apiDetailPengeluaran";
import { GetAllBahanBaku } from "../../../api/apiBahanBaku";


const UpdatePembelianBahanBakuPage = ({ pengeluaran, onClose }) => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(pengeluaran);
    const [bahan_baku, setBahan] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const showBahan = () => {
        GetAllBahanBaku()
            .then((response) => {
                setBahan(response);
            })
            .catch((err) => {
                console.log(err);
                // setIsLoading(false);
            });
    };

    const handleClose = () => {
        setShow(false);
        onClose();
    };
    const handleShow = () => {
        setShow(true);
        console.log("tes: ", data);
    };
    // const handleChange = (event) => {
    //   setData({ ...data, [event.target.name]: event.target.value });
    // };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };
    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);
        console.log("tes: ", data);
        console.log("tes id: ", data.ID_PRODUK);
        UpdatePembelianBahanBaku(data.pembelian_bahan_baku.ID_PEMBELIAN, data)
        UpdateDetailPengeluaran(data.ID_DETAIL_PENGELUARAN, data)
            .then((response) => {
                setIsPending(false);
                toast.success(response.message);
                handleClose();
            })
            .catch((err) => {
                console.log(err);
                setIsPending(false);
                toast.dark(err.message);
            });
    };
    useEffect(() => {
        showBahan();
    }, []);

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShow}
                style={{ marginRight: "8px" }}
            >
                Update
            </Button>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                style={{ backgroundColor: "transparent" }}
            >
                <Form onSubmit={submitData}>
                    <div
                        className="container px-4 py-3 rounded"
                        style={{
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            borderRadius: "10px",
                        }}
                    >
                        <h1 className="mb-3 text-center">Update Pembelian Bahan Baku</h1>
                        <div className="row mb-2"></div>
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <label className="d-flex">Nama Bahan Baku</label>
                                {/* <input
                  type="text"
                  label="Nama Bahan Baku"
                  name="NAMA_BAHAN_BAKU"
                  onChange={handleChange}
                  placeholder="Masukkan Nama Bahan Baku"
                  className="form-control"
                  value={data.bahan_baku?.NAMA_BAHAN_BAKU}
                /> */}
                                <select
                                    name="ID_BAHAN_BAKU"
                                    onChange={handleChange}
                                    className="form-control"
                                    value={data.bahan_baku?.ID_BAHAN_BAKU}
                                >
                                    <option value="">Select Bahan Baku</option>
                                    {bahan_baku.map((bahan) => (
                                        <option key={bahan.ID_BAHAN_BAKU} value={bahan.ID_BAHAN_BAKU}>
                                            {bahan.NAMA_BAHAN_BAKU}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <label className="d-flex">Kuantitas</label>
                                <input
                                    type="number"
                                    label="Kuantitas"
                                    name="KUANTITAS"
                                    onChange={handleChange}
                                    placeholder="Masukkan Kuantitas"
                                    className="form-control"
                                    value={data.pembelian_bahan_baku?.KUANTITAS}
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-12">
                                <label className="d-flex">Harga</label>
                                <input
                                    type="number"
                                    label="Harga"
                                    name="HARGA"
                                    onChange={handleChange}
                                    placeholder="Masukkan Harga"
                                    className="form-control"
                                    value={data.pembelian_bahan_baku?.HARGA}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <Button
                                type="submit"
                                className="mt-3 mx-2 border-0 button btn-primary"
                                style={{ maxWidth: "100px" }}
                            >
                                Save
                            </Button>
                            <Button
                                className="mt-3 mx-2 border-0 button btn-danger"
                                onClick={handleClose}
                                style={{ maxWidth: "100px" }}
                            >
                                cancel
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default UpdatePembelianBahanBakuPage;
