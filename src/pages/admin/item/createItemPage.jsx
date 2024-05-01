// src/pages/adminPage/createUserPage.jsx
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddItem } from "../../../apiExample/apiItem";

const CreateItem = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    nama_item: "",
    harga: "",
    deskripsi: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const tambahItem = (event) => {
    setIsPending(true);
    event.preventDefault();
    AddItem(data)
      .then((res) => {
        toast.success(res.message);
        setIsPending(false);
        navigate("/admin/showDataItem");
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
            <Form onSubmit={tambahItem}>
              <div
                className="container px-4 py-3 my-4 rounded"
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "10px",
                }}
              >
                <h1>Create Item</h1>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Nama Item</label>
                    <input
                      type="text"
                      label="Nama Item"
                      name="nama_item"
                      onChange={handleChange}
                      placeholder="Masukkan Nama Item"
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
                    <label className="d-flex">Deskripsi</label>
                    <input
                      type="text"
                      label="Deskripsi"
                      name="deskripsi"
                      onChange={handleChange}
                      placeholder="Masukkan Deskripsi"
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

export default CreateItem;
