// src/pages/adminPage/createUserPage.jsx
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { AddHampers } from "../../../api/apiHampers";
import { toast } from "react-toastify";

const CreateHampers = () => {
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        NAMA_HAMPERS: "",
        KETERANGAN: "",
        HARGA: "",
    });
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    const tambahHampers = (event) => {
        setIsPending(true);
        event.preventDefault();
        AddHampers(data)
            .then((res) => {
                toast.success(res.message);
                setIsPending(false);
                navigate("/admin/showDataHampers");
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
                        <Form onSubmit={tambahHampers}>
                            <div
                                className="container px-4 py-3 my-4 rounded"
                                style={{
                                    color: "white",
                                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                                    borderRadius: "10px",
                                }}
                            >
                                <h1>Create Hampers</h1>
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <label className="d-flex">Nama Hampers</label>
                                        <input
                                            type="text"
                                            label="Nama_hampers"
                                            name="NAMA_HAMPERS"
                                            onChange={handleChange}
                                            placeholder="Masukkan Nama Hampers"
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
                                        <label className="d-flex">Keterangan</label>
                                        <textarea
                                            label="Keterangan"
                                            name="KETERANGAN"
                                            onChange={handleChange}
                                            placeholder="Masukkan Keterangan"
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

export default CreateHampers;
