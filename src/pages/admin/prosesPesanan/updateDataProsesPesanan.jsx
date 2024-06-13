import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Form, Modal } from "react-bootstrap";
import { UpdateProsesPesanan } from "../../../api/apiProsesPesanan";
import { toast } from "react-toastify";

const UpdateDataProsesPesanan = ({ pemesanan, onClose }) => {
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
    UpdateProsesPesanan(data.ID_PEMESANAN, data)
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
            <h1 className="mb-3 text-center">Update Status</h1>
            <div className="row mb-2"></div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nama</label>
                <input
                  type="text"
                  label="Nama"
                  name="username"
                  onChange={handleChange}
                  placeholder="Masukkan Nama"
                  className="form-control"
                  value={data?.user?.username}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Status</label>
                <select
                  name="STATUS"
                  onChange={handleChange}
                  value={data?.STATUS}
                  className="form-control"
                >
                  <option value="">Pilih Status</option>
                  <option value="siap di pick up">Siap di Pick Up</option>
                  <option value="sedang dikirim">Sedang dikirim</option>
                </select>
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

export default UpdateDataProsesPesanan;
