// src/pages/adminPage/createUserPage.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { UpdateStokBahanBaku, GetAllBahanBaku, GetBahanBakuById } from "../../../api/apiBahanBaku";
import { AddPembelianBahanBaku } from "../../../api/apiPembelianBahanBaku";
import { AddDetailPengeluaran } from "../../../api/apiDetailPengeluaran";
import { toast } from "react-toastify";

const CreatePembelianBahanBaku = () => {
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const [bahan_baku, setBahan] = useState([]);

    const [dataPembelian, setDataPembelian] = useState({
        KUANTITAS: "",
        HARGA: "",
        TANGGAL: "",
    });
    const [dataPengeluaran, setDataPengeluaran] = useState({
        ID_PEMBELIAN: "",
        ID_BAHAN_BAKU: "",
    });

    const showBahan = () => {
        GetAllBahanBaku()
            .then((response) => {
                setBahan(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (event) => {
        setDataPembelian({ ...dataPembelian, [event.target.name]: event.target.value });
        setDataPengeluaran({ ...dataPengeluaran, [event.target.name]: event.target.value });
    };

    const updateStok = async () => {
        try {
            const bahan = await GetBahanBakuById(dataPengeluaran.ID_BAHAN_BAKU);
            if (!bahan || bahan.STOK === undefined) {
                throw new Error('Failed to fetch bahan baku or STOK is undefined.');
            }
            const stok = bahan.STOK;
            const kuantitas = parseInt(dataPembelian.KUANTITAS, 10);
            if (isNaN(kuantitas)) {
                throw new Error('Invalid quantity provided.');
            }
            const newStok = stok + kuantitas;
            const updatedBahan = { ...bahan, STOK: newStok };
            await UpdateStokBahanBaku(dataPengeluaran.ID_BAHAN_BAKU, updatedBahan);
            console.log('Stock updated successfully');
        } catch (error) {
            console.error('Error updating stock:', error.message);
        }
    };

    const tambahPembelian = async (event) => {
        setIsPending(true);
        event.preventDefault();
        await AddPembelianBahanBaku(dataPembelian).then((res) => {
                console.log(`data: ${res.data}`);
                // Check if res contains ID_PEMBELIAN
                if (res && res.ID_PEMBELIAN) {
                    // Extract the ID_PEMBELIAN from the response
                    const ID_PEMBELIAN = res.ID_PEMBELIAN;
                    const updatedDataPengeluaran = { ...dataPengeluaran, ID_PEMBELIAN };
                    // Set the ID_PEMBELIAN in dataPengeluaran
                    setDataPengeluaran({updatedDataPengeluaran});
                    // Proceed to add detail pengeluaran
                    console.log(updatedDataPengeluaran);
                    return AddDetailPengeluaran(updatedDataPengeluaran);
                } else {
                    // Handle the case where res is undefined or does not contain ID_PEMBELIAN
                    throw new Error("Invalid response from server");
                }
            })
            .then((res) => {
                updateStok();
                toast.success(res.message);
                setIsPending(false);
                navigate("/mo/showDataPembelianBahanBaku");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    useEffect(() => {
        showBahan();
    }, []);
    return (
        <AdminPageBackground>
            <div className="row d-flex">
                <div className="col">
                    <div className="container-fluid px-4 py-2">
                        <Form onSubmit={tambahPembelian}>
                            <div
                                className="container px-4 py-3 my-4 rounded"
                                style={{
                                    color: "white",
                                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                                    borderRadius: "10px",
                                }}
                            >
                                <h1>Create Pembelian Bahan Baku</h1>
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <label className="d-flex">Nama Bahan Baku</label>
                                        <select
                                            name="ID_BAHAN_BAKU"
                                            onChange={handleChange}
                                            className="form-control"
                                            value={dataPengeluaran.ID_BAHAN_BAKU}
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
                                        <label className="d-flex">Kuantitas (Kg)</label>
                                        <input
                                            type="number"
                                            label="Kuantitas"
                                            name="KUANTITAS"
                                            onChange={handleChange}
                                            placeholder="Masukkan Kuantitas"
                                            className="form-control"
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
                                        />
                                    </div>
                                </div>
                                {isPending ? (
                                    <Button
                                        type="submit"
                                        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
                                    >
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="mt-3 w-100 border-0 buttonSubmit btn-lg"
                                    >
                                        Create
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </AdminPageBackground>
    );
};

export default CreatePembelianBahanBaku;
