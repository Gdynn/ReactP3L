import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Form, Modal } from "react-bootstrap";
import { UpdateResep } from "../../../api/apiResep";
import { toast } from "react-toastify";

const UpdateDataResep = ({ resep, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(resep);
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
    console.log("tes id: ", data.ID_RESEP);
    UpdateResep(data.ID_RESEP, data)
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
            <h1 className="mb-3 text-center">Update Resep</h1>
            <div className="row mb-2"></div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nama Resep</label>
                <input
                  type="text"
                  label="Nama Resep"
                  name="NAMA_RESEP"
                  onChange={handleChange}
                  placeholder="Masukkan Nama Resep"
                  className="form-control"
                  value={data?.NAMA_RESEP}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Kuantitas</label>
                <input
                  type="number"
                  label="Kuantitas"
                  name="KUANTITAS"
                  onChange={handleChange}
                  placeholder="Masukkan Kuantitas"
                  className="form-control"
                  value={data?.KUANTITAS}
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

export default UpdateDataResep;
