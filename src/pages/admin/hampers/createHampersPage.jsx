// src/pages/adminPage/createUserPage.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { AddHampers } from "../../../api/apiHampers";
import { AddDetailHampers } from "../../../api/apiDetailHampers";
import { GetAllProduk } from "../../../api/apiProduk";
import { toast } from "react-toastify";

const CreateHampers = () => {
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const [produks1, setProduk1] = useState([]);
    const [produks2, setProduk2] = useState([]);

    const [dataHampers, setDataHampers] = useState({
        NAMA_HAMPERS: "",
        KETERANGAN: "",
        HARGA: "",
    });
    const [dataDetail1, setDataDetail1] = useState({
        ID_PRODUK: "",
        ID_HAMPERS: "",
    });
    const [dataDetail2, setDataDetail2] = useState({
        ID_PRODUK: "",
        ID_HAMPERS: "",
    });

    const showProduk = () => {
        GetAllProduk()
            .then((response) => {
                setProduk1(response);
                setProduk2(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const handleChange = (event) => {
    //     setDataHampers({ ...dataHampers, [event.target.name]: event.target.value });
    //     setDataDetail1({ ...dataDetail1, [event.target.name]: event.target.value });
    //     setDataDetail2({ ...dataDetail2, [event.target.name]: event.target.value });
    // };
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "ID_PRODUK1") {
            setDataDetail1(prevDetail => ({
                ...prevDetail,
                ID_PRODUK: value
            }));
        } else if (name === "ID_PRODUK2") {
            setDataDetail2(prevDetail => ({
                ...prevDetail,
                ID_PRODUK: value
            }));
        } else {
            setDataHampers(prevHampers => ({
                ...prevHampers,
                [name]: value
            }));
        }
    };
    

    const tambahHampers = async (event) => {
        setIsPending(true);
        event.preventDefault();
        await AddHampers(dataHampers)
            .then((res) => {
                if (res && res.ID_HAMPERS) {
                    const idHampers = res.ID_HAMPERS;
                    const detail1 = { ...dataDetail1, ID_HAMPERS: idHampers };
                    const detail2 = { ...dataDetail2, ID_HAMPERS: idHampers };
                    setDataDetail1({detail1});
                    setDataDetail2({detail2});
                    AddDetailHampers(detail1);
                    AddDetailHampers(detail2);
                    return res;
                } else {
                    throw new Error('Failed to create hampers.');
                }
            })
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

    useEffect(() => {
        showProduk();
    }, []);

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
                                    <div className="col-md-6">
                                        <label className="d-flex">Nama Produk 1</label>
                                        <select
                                            name="ID_PRODUK1"
                                            onChange={handleChange}
                                            className="form-control"
                                            value={dataDetail1.ID_PRODUK}
                                        >
                                            <option value="">Select Produk 1</option>
                                            {produks1.map((produk1) => (
                                                <option key={produk1.ID_PRODUK} value={produk1.ID_PRODUK}>
                                                    {produk1.NAMA_PRODUK}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="d-flex">Nama Produk 2</label>
                                        <select
                                            name="ID_PRODUK2"
                                            onChange={handleChange}
                                            className="form-control"
                                            value={dataDetail2.ID_PRODUK}
                                        >
                                            <option value="">Select Produk 2</option>
                                            {produks2.map((produk2) => (
                                                <option key={produk2.ID_PRODUK} value={produk2.ID_PRODUK}>
                                                    {produk2.NAMA_PRODUK}
                                                </option>
                                            ))}
                                        </select>
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
