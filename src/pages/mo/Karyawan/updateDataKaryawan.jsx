import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Form, Modal } from "react-bootstrap";
import { UpdateKaryawan } from "../../../api/apiKaryawan";
import { toast } from "react-toastify";

const UpdateDataKaryawan = ({ karyawan, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(karyawan);
  const [isPending, setIsPending] = useState(false);

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleShow = () => {
    setShow(true);
    console.log("tes: ", data);
  };
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    console.log("tes: ", data);
    console.log("tes id: ", data.ID_PEGAWAI);
    UpdateKaryawan(data.ID_PEGAWAI, data)
      .then((response) => {
        setIsPending(false);
        console.log(response); // Debug response
        toast.success(response.message || "Updated Successfully");
        handleClose();
      })
      .catch((err) => {
        console.log(err); // Debug error
        setIsPending(false);
        toast.error(err.message || "Update Failed");
      });
  };

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
            <h1 className="mb-3 text-center">Update Karyawan</h1>
            <div className="row mb-2"></div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nama Karyawan</label>
                <input
                  type="text"
                  label="Nama Karyawan"
                  name="NAMA_PEGAWAI"
                  onChange={handleChange}
                  placeholder="Masukkan Nama Karyawan"
                  className="form-control"
                  value={data?.NAMA_PEGAWAI}
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
                  placeholder="Masukkan Kuantitas"
                  className="form-control"
                  value={data?.EMAIL}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">No Telp</label>
                <input
                  type="text"
                  label="NoTelp"
                  name="NOTELP_PEGAWAI"
                  onChange={handleChange}
                  placeholder="Masukkan No Telp Pegawai"
                  className="form-control"
                  value={data?.NOTELP_PEGAWAI}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Alamat</label>
                <input
                  type="text"
                  label="Alamt"
                  name="ALAMAT"
                  onChange={handleChange}
                  placeholder="Masukkan Alamat"
                  className="form-control"
                  value={data?.ALAMAT}
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
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateDataKaryawan;
