import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { UpdatePembelianBahanBaku } from "../../../api/apiPembelianBahanBaku";
import { UpdateDetailPengeluaran } from "../../../api/apiDetailPengeluaran";
import { GetAllBahanBaku } from "../../../api/apiBahanBaku";

const UpdatePembelianBahanBakuPage = ({ pengeluaran, onClose }) => {
    const [show, setShow] = useState(false);
    // const [data, setData] = useState(pengeluaran);
    const [data, setData] = useState({
        bahan_baku: pengeluaran.bahan_baku || {},
        pembelian_bahan_baku: pengeluaran.pembelian_bahan_baku || {},
        ID_DETAIL_PENGELUARAN: pengeluaran.ID_DETAIL_PENGELUARAN || ""
    });
    const [bahan_baku, setBahan] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const showBahan = () => {
        GetAllBahanBaku()
            .then((response) => {
                console.log("Bahan Baku data: ", response); // Check the structure and content of response
                setBahan(response);
            })
            .catch((err) => {
                console.log(err);
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
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "ID_BAHAN_BAKU") {
            // Assuming ID_BAHAN_BAKU needs to update bahan_baku sub-object
            setData(prevData => ({
                ...prevData,
                bahan_baku: {
                    ...prevData.bahan_baku,
                    ID_BAHAN_BAKU: value
                }
            }));
        } else {
            // Assuming these belong to pembelian_bahan_baku sub-object
            setData(prevData => ({
                ...prevData,
                pembelian_bahan_baku: {
                    ...prevData.pembelian_bahan_baku,
                    [name]: value
                }
            }));
        }
    };

    const submitData = async (event) => {
        event.preventDefault();
        setIsPending(true);
    
        const updatedData = {
            ...data.pembelian_bahan_baku,
            ID_BAHAN_BAKU: data.bahan_baku.ID_BAHAN_BAKU,  // Ensure this is included
        };
    
        try {
            await UpdatePembelianBahanBaku(data.pembelian_bahan_baku.ID_PEMBELIAN, updatedData);
            await UpdateDetailPengeluaran(data.ID_DETAIL_PENGELUARAN, updatedData);
            toast.success("Update successful");
            handleClose();
        } catch (err) {
            console.error(err);
            toast.error("Update failed: " + err.message);
        } finally {
            setIsPending(false);
        }
    };
    
    useEffect(() => {
        showBahan();
        setData({
            bahan_baku: pengeluaran.bahan_baku || {},
            pembelian_bahan_baku: pengeluaran.pembelian_bahan_baku || {},
            ID_DETAIL_PENGELUARAN: pengeluaran.ID_DETAIL_PENGELUARAN || ""
        });
    }, [pengeluaran]);
    
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
