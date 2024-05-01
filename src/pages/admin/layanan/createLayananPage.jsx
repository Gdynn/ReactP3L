// src/pages/adminPage/createUserPage.jsx
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { AddLayanan } from "../../../apiExample/apiLayanan";
import { toast } from "react-toastify";

const CreateLayanan = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama_layanan: "",
    durasi: "",
    harga: "",
    note: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const tambahLayanan = (event) => {
    setIsPending(true);
    event.preventDefault();
    AddLayanan(data)
      .then((res) => {
        toast.success(res.message);
        setIsPending(false);
        navigate("/admin/showDataLayanan");
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
            <Form onSubmit={tambahLayanan}>
              <div
                className="container px-4 py-3 my-4 rounded"
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "10px",
                }}
              >
                <h1>Create Layanan</h1>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Nama Layanan</label>
                    <input
                      type="text"
                      label="Nama_layanan"
                      name="nama_layanan"
                      onChange={handleChange}
                      placeholder="Masukkan Nama Layanan"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Durasi</label>
                    <input
                      type="number"
                      label="Durasi"
                      name="durasi"
                      onChange={handleChange}
                      placeholder="Masukkan Durasi"
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
                      name="harga"
                      onChange={handleChange}
                      placeholder="Masukkan Harga"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Note</label>
                    <input
                      type="text"
                      label="Note"
                      name="note"
                      onChange={handleChange}
                      placeholder="Masukkan Note"
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

export default CreateLayanan;
