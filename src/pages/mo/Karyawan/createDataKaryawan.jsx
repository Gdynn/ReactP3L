import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { AddKaryawan } from "../../../api/apiKaryawan";
import { toast } from "react-toastify";

const CreateDataKaryawan = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    NAMA_PEGAWAI: "",
    EMAIL: "",
    NO_TELP: "",
    ALAMAT: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const tambahKaryawan = (event) => {
    setIsPending(true);
    event.preventDefault();
    AddKaryawan(data)
      .then((res) => {
        toast.success(res.message);
        setIsPending(false);
        navigate("/admin/showDataKaryawan");
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
            <Form onSubmit={tambahKaryawan}>
              <div
                className="container px-4 py-3 my-4 rounded"
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "10px",
                }}
              >
                <h1>Create Resep</h1>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Nama Karyawan</label>
                    <input
                      type="text"
                      label="Nama Karyawan"
                      name="NAMA_PEGAWAI"
                      onChange={handleChange}
                      placeholder="Masukkan Nama Pegawai"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Email</label>
                    <input
                      type="text"
                      label="Email"
                      name="EMAIL"
                      onChange={handleChange}
                      placeholder="Masukkan Email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">No Telp</label>
                    <input
                      type="text"
                      label="No Telp Pegawai"
                      name="NOTELP_PEGAWAI"
                      onChange={handleChange}
                      placeholder="Masukkan No Telp Pegawai"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Alamat</label>
                    <input
                      type="text"
                      label="Alamat"
                      name="ALAMAT"
                      onChange={handleChange}
                      placeholder="Masukkan Alamat"
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

export default CreateDataKaryawan;
