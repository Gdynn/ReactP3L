import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Form, Modal } from "react-bootstrap";
import { UpdatePemesanan } from "../../../api/apiPemesanan";
import { toast } from "react-toastify";

const UpdateDataPemesanan = ({ pemesanan, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(pemesanan);
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
    console.log("tes: ", data.ID_PEMESANAN);
    UpdatePemesanan(data.ID_PEMESANAN, data)
      .then((response) => {
        setIsPending(false);
        console.log(response);
        toast.success(response.message || "Update Successfully ");
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.error(err.message || "Update Failed ");
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
            <h1 className="mb-3 text-center">Update Pemesanan</h1>
            <div className="row mb-2"></div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Tanggal Pesan</label>
                <input
                  type="text"
                  label="Tanggal Pesan"
                  name="TANGGAL_PESAN"
                  onChange={handleChange}
                  placeholder="Masukkan Tanggal Pesan"
                  className="form-control"
                  value={data?.TANGGAL_PESAN}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Tanggal Ambil</label>
                <input
                  type="text"
                  label="Tanggal Ambil"
                  name="TANGGAL_AMBIL"
                  onChange={handleChange}
                  placeholder="Masukkan Tanggal Pengambilan"
                  className="form-control"
                  value={data?.TANGGAL_AMBIL}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Status</label>
                <input
                  type="text"
                  label="Status"
                  name="STATUS"
                  onChange={handleChange}
                  placeholder="Masukkan Status"
                  className="form-control"
                  value={data?.STATUS}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Jarak</label>
                <input
                  type="number"
                  label="Jarak"
                  name="JARAK"
                  onChange={handleChange}
                  placeholder="Masukkan Jarak"
                  className="form-control"
                  value={data?.JARAK}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Delivery</label>
                <input
                  type="text"
                  label="Delivery"
                  name="DELIVERY"
                  onChange={handleChange}
                  placeholder="Masukkan Delivery"
                  className="form-control"
                  value={data?.DELIVERY}
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

export default UpdateDataPemesanan;
