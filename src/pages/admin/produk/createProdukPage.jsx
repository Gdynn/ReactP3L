// src/pages/adminPage/createUserPage.jsx
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { AddProduk } from "../../../api/apiProduk";
import { toast } from "react-toastify";

const CreateProduk = () => {
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        NAMA_PRODUK: "",
        HARGA: "",
        JENIS_PRODUK: "",
    });
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    const tambahProduk = (event) => {
        setIsPending(true);
        event.preventDefault();
        AddProduk(data)
            .then((res) => {
                toast.success(res.message);
                setIsPending(false);
                navigate("/admin/showDataProduk");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };
    return (
        <AdminPageBackground>
            <div className="row d-flex">
                <div className="col">
                    <div className="container-fluid px-4 py-2">
                        <Form onSubmit={tambahProduk}>
                            <div
                                className="container px-4 py-3 my-4 rounded"
                                style={{
                                    color: "white",
                                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                                    borderRadius: "10px",
                                }}
                            >
                                <h1>Create Produk</h1>
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <label className="d-flex">Nama Produk</label>
                                        <input
                                            type="text"
                                            label="Nama_produk"
                                            name="NAMA_PRODUK"
                                            onChange={handleChange}
                                            placeholder="Masukkan Nama Produk"
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
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <label className="d-flex">Jenis Produk</label>
                                        <select
                                            name="JENIS_PRODUK"
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Pilih Jenis Produk</option>
                                            <option value="Titipan">Titipan</option>
                                            <option value="Minuman">Minuman</option>
                                            <option value="Cake">Cake</option>
                                            <option value="Roti">Roti</option>
                                            <option value="Produk Lain">Produk Lain</option>
                                        </select>
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

export default CreateProduk;
