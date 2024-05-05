import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { AddKaryawan } from "../../../api/apiKaryawan";
import { toast } from "react-toastify";
import { AddJabatan } from "../../../api/apiJabatan";

const CreateDataKaryawan = () => {
  const [isPending, setIsPending] = useState(false);
  const [jabatanList, setJabatanList] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    NAMA_PEGAWAI: "",
    EMAIL: "",
    NOTELP_PEGAWAI: "",
    ALAMAT: "",
    // ID_JABATAN: "",
  });

  // useEffect(() => {
  //   const fetchJabatan = async () => {
  //     try {
  //       const response = await fetch("/api/jabatan"); // Ganti URL API sesuai dengan backend Anda
  //       if (!response.ok) {
  //         throw new Error("Gagal mendapatkan data jabatan");
  //       }
  //       const jabatanData = await response.json();
  //       setJabatanList(jabatanData);
  //     } catch (error) {
  //       console.error("Error fetching jabatan:", error);
  //       toast.error("Error fetching jabatan data");
  //     }
  //   };
  //   fetchJabatan();
  // }, []);

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
        navigate("/mo/showDataKaryawan");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setIsPending(false);
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
                <h1>Create Karyawan</h1>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Nama Karyawan</label>
                    <input
                      type="text"
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
                      name="ALAMAT"
                      onChange={handleChange}
                      placeholder="Masukkan Alamat"
                      className="form-control"
                    />
                  </div>
                </div>
                {/* <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Jabatan</label>
                    <select
                      name="ID_JABATAN"
                      onChange={handleChange}
                      className="form-control"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pilih Jabatan
                      </option>
                      {jabatanList.map((jabatan) => (
                        <option
                          key={jabatan.ID_JABATAN}
                          value={jabatan.ID_JABATAN}
                        >
                          {jabatan.NAMA_JABATAN}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}
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
