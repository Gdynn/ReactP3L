// src/pages/adminPage/createUserPage.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
// import SidenavCustom from "../admin/sideNav";
// import CustomNavbar from "../admin/topNav";
// import { Row, Col } from "rsuite";
import { AddJenisPengambilan } from "../../../apiExample/apiJenisPengambilan";
import { useNavigate } from "react-router-dom";

const CreateJenisPengambilanPage = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        AddJenisPengambilan(data)
            .then((response) => {
                console.log(response);
                //tambahin toastify success coo
                navigate("/admin/showDataJenisPengambilan");
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <AdminPageBackground>
            <div className="row d-flex">
                <div className="col">
                    <div className="container-fluid px-4 py-2">
                        <div
                            className="container px-4 py-3 my-4 rounded"
                            style={{
                                color: "white",
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                borderRadius: "10px",
                            }}
                        >
                            <h1>Create Jenis Pengambilan</h1>
                            <Form onSubmit={handleSubmit}>
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <label className="d-flex">Nama Jenis Pengambilan</label>
                                        <input
                                            type="text"
                                            label="Nama Jenis Pengambilan"
                                            name="nama_jenis_pengambilan"
                                            onChange={handleChange}
                                            placeholder="Masukkan Nama Jenis Pengambilan"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <label className="d-flex">Harga</label>
                                        <input
                                            type="text"
                                            label="Harga"
                                            name="harga"
                                            onChange={handleChange}
                                            placeholder="Masukkan Harga"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-3 w-100 border-0 buttonSubmit btn-lg"
                                >
                                    Register
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPageBackground>
    );
};

export default CreateJenisPengambilanPage;
