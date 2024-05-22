import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Form, Modal } from "react-bootstrap";
import { UpdateDaftarPesanan } from "../../../api/apiDaftarPesanan";
import { toast } from "react-toastify";

const UpdateDataDaftarPesanan = ({ pemesanan, onClose }) => {
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
    const { name, value } = event.target;

    // Update nilai input saat ini
    const updatedData = { ...data, [name]: value };

    // Cek jika yang diubah adalah JUMLAH_BAYAR atau TOTAL
    if (name === "JUMLAH_BAYAR" || name === "TOTAL") {
      // Pastikan keduanya adalah numerik sebelum menghitung Tip
      if (!isNaN(updatedData.JUMLAH_BAYAR) && !isNaN(updatedData.TOTAL)) {
        // Hitung tip
        const tip =
          parseFloat(updatedData.JUMLAH_BAYAR) - parseFloat(updatedData.TOTAL);
        updatedData["TIP"] = tip; // Simpan hasil perhitungan ke state
      }
    }

    // Set state dengan data terbaru
    setData(updatedData);
  };

  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    console.log("tes: ", data);
    console.log("tes: ", data.ID_PEMESANAN);
    UpdateDaftarPesanan(data.ID_PEMESANAN, data)
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
        Konfirmasi
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
            <h1 className="mb-3 text-center">Konfirmasi Pemesanan</h1>
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
                <label className="d-flex">Tanggal Pesan</label>
                <input
                  type="text"
                  label="Tanggal Pesan"
                  name="TANGGALL_PESAN"
                  onChange={handleChange}
                  placeholder="Masukkan Tanggal Pemesanan"
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
                  label="Tanggal ambil"
                  name="TANGGAL_AMBIL"
                  onChange={handleChange}
                  placeholder="Masukkan Tanggal Ambil"
                  className="form-control"
                  value={data?.TANGGAL_AMBIL}
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
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Total</label>
                <input
                  type="number"
                  label="Total"
                  name="TOTAL"
                  onChange={handleChange}
                  placeholder="Masukkan Total"
                  className="form-control"
                  value={data?.TOTAL}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Jumlah Pembayaran</label>
                <input
                  type="number"
                  label="Jumlah Bayar"
                  name="JUMLAH_BAYAR"
                  onChange={handleChange}
                  placeholder="Masukkan Jumlah Bayar"
                  className="form-control"
                  value={data?.JUMLAH_BAYAR}
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

export default UpdateDataDaftarPesanan;
