import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { UpdateProduk } from "../../../api/apiProduk";


const UpdateProdukPage = ({ produk, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(produk);
  const [isPending, setIsPending] = useState(false);

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  const handleShow = () => {
    setShow(true);
    console.log("tes: ", data);
  };
  // const handleChange = (event) => {
  //   setData({ ...data, [event.target.name]: event.target.value });
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    console.log("tes: ", data);
    console.log("tes id: ", data.ID_PRODUK);
    UpdateProduk(data.ID_PRODUK, data)
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
            <h1 className="mb-3 text-center">Update Produk</h1>
            <div className="row mb-2"></div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nama Produk</label>
                <input
                  type="text"
                  label="Nama Produk"
                  name="NAMA_PRODUK"
                  onChange={handleChange}
                  placeholder="Masukkan Nama Produk"
                  className="form-control"
                  value={data?.NAMA_PRODUK}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">KUANTITAS</label>
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
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Harga</label>
                <input
                  type="number"
                  label="Harga"
                  name="HARGA"
                  onChange={handleChange}
                  placeholder="Masukkan Harga"
                  className="form-control"
                  value={data?.HARGA}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Jenis Produk</label>
                {/* <input
                  type="text"
                  label="Jenis Produk"
                  name="JENIS_PRODUK"
                  onChange={handleChange}
                  placeholder="Masukkan Note"
                  className="form-control"
                  value={data?.JENIS_PRODUK}
                /> */}
                <select
                  name="JENIS_PRODUK"
                  onChange={handleChange}
                  className="form-control"
                  value={data?.JENIS_PRODUK}
                >
                  <option value="">Pilih Jenis Produk</option>
                  <option value="Titipan">Titipan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Cake">Cake</option>
                  <option value="Roti">Roti</option>
                  <option value="Produk Lain">Produk Lain</option>
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
                cancel
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProdukPage;
