import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UpdateUser } from "../../../api/apiUsers";
import { toast } from "react-toastify";

const UpdateUserAccount = ({ user, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(user);
  const [isPending, setIsPending] = useState(false);

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleShow = () => {
    setShow(true);
    console.log("tes: ", data);
  }
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    console.log("tes: ", data);
    console.log("tes id: ", data.id_user);
    UpdateUser(data)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(err.message);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ marginRight: '8px'}}>
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
            <h1 className="mb-3 text-center">Update User</h1>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nama Lengkap</label>
                <input
                  type="text"
                  label="Fullname"
                  name="fullname"
                  onChange={handleChange}
                  placeholder="Masukkan Nama"
                  className="form-control"
                  value={data?.fullname}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Username</label>
                <input
                  type="text"
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  placeholder="Masukkan Username"
                  className="form-control"
                  value={data?.username}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Email</label>
                <input
                  type="email"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Masukkan Email"
                  className="form-control"
                  value={data?.email}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nomor Telepon</label>
                <input
                  type="number"
                  label="Nomor Telepon"
                  name="no_telp"
                  onChange={handleChange}
                  placeholder="Nomor Telepon"
                  className="form-control"
                  value={data?.no_telp}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Alamat</label>
                <input
                  type="text"
                  label="alamat"
                  name="alamat"
                  onChange={handleChange}
                  placeholder="Masukkan Alamat"
                  className="form-control"
                  value={data?.alamat}
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
                cancel
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateUserAccount;
