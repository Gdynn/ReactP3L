import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
// import SidenavCustom from "../admin/sideNav";
import { Button, Form, Modal } from "react-bootstrap";
// import { UpdateUser } from "../../api/apiUsers";
import { UpdateJenisPengambilan } from "../../../apiExample/apiJenisPengambilan";
import { toast } from "react-toastify";

const UpdateJenisPengambilanPage = ({ jenisPengambilan, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(jenisPengambilan);
  const [isPending, setIsPending] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("jenisPengambilan");
    navigate("/");
  };
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
    UpdateJenisPengambilan(data)
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
            <h1 className="mb-3 text-center">Update Jenis Pengambilan</h1>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nama Jenis Pengambilan</label>
                <input
                  type="text"
                  label="Nama Jenis Pengambilan"
                  name="nama_jenis_pengambilan"
                  onChange={handleChange}
                  placeholder="Masukkan Nama Jenis Pengambilan"
                  className="form-control"
                  value={data?.nama_jenis_pengambilan}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Harga</label>
                <input
                  type="text"
                  label="Harga"
                  name="harga"
                  onChange={handleChange}
                  placeholder="Masukkan Harga"
                  className="form-control"
                  value={data?.harga}
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

export default UpdateJenisPengambilanPage;
