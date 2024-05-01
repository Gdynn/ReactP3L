import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { UpdateItem } from "../../../apiExample/apiItem";


const UpdateItemLaundry = ({ item, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(item);
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
    console.log("tes id: ", data.id_item);
    UpdateItem(data.id_item, data)
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
            <h1 className="mb-3 text-center">Update Item</h1>
            <div className="row mb-2"></div>
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
                  value={data?.nama_item}
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
                  value={data?.harga}
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
                  value={data?.deskripsi}
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

export default UpdateItemLaundry;
