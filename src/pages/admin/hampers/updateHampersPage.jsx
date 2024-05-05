import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { UpdateHampers } from "../../../api/apiHampers";
import { UpdateDetailHampers } from "../../../api/apiDetailHampers";
import { GetAllProduk } from "../../../api/apiProduk";

const UpdateHampersPage = ({ detail, onClose }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    hampers: detail || {},
    products: detail.products || [],
  });
  const [produks, setProduk] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const showProduk = () => {
    GetAllProduk()
      .then((response) => {
        console.log("Produk data: ", response); // Check the structure and content of response
        setProduk(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  
  const handleShow = () => {
    if (data && data.hampers) {
      console.log("Test hampers: ", data.hampers);
      console.log("Test produk: ", data.products);
    } else {
      console.log("Data or hampers is undefined");
    }
    setShow(true);
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (name.startsWith('ID_PRODUK')) {
      let updatedProducts = [...data.products];
      updatedProducts[index] = { ...updatedProducts[index], ID_PRODUK: value };
      setData(prevData => ({ ...prevData, products: updatedProducts }));
    } else {
      setData(prevData => ({
        ...prevData,
        hampers: { ...prevData.hampers, [name]: value }
      }));
    }
  };

  const submitData = (event) => {
    event.preventDefault();
    setIsPending(true);
    console.log("tes: ", data);
    console.log("tes id: ", data.hampers.ID_HAMPERS);
    UpdateHampers(data.hampers.ID_HAMPERS, data)
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

  useEffect(() => {
    console.log("Detail prop received:", detail);
    if (detail) {
      setData({
        hampers: detail || {},
        products: detail.products || [],
      });
    }
    showProduk();
  }, [detail]);

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
            <h1 className="mb-3 text-center">Update Hampers</h1>
            <div className="row mb-2"></div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Nama Hampers</label>
                <input
                  type="text"
                  label="Nama Hampers"
                  name="NAMA_HAMPERS"
                  onChange={handleChange}
                  placeholder="Masukkan Nama Hampers"
                  className="form-control"
                  value={data.hampers.NAMA_HAMPERS || ''}
                />
              </div>
            </div>
            <div className="row mb-2">
              {data.products.map((product, index) => (
                <div key={index} className="col-md-6">
                  <label className="d-flex">Nama Produk {index + 1}</label>
                  <select
                    name={`ID_PRODUK_${index}`}
                    onChange={(e) => handleChange(e, index)}
                    className="form-control"
                    value={product.ID_PRODUK}
                  >
                    <option value="">Select Produk {index + 1}</option>
                    {produks.map((p) => (
                      <option key={p.ID_PRODUK} value={p.ID_PRODUK}>
                        {p.NAMA_PRODUK}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
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
                  value={data.hampers.HARGA || ''}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-12">
                <label className="d-flex">Keterangan</label>
                <textarea
                  label="Keterangan"
                  name="KETERANGAN"
                  onChange={handleChange}
                  placeholder="Masukkan Keterangan"
                  className="form-control"
                  value={data.hampers.KETERANGAN || ''}
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

export default UpdateHampersPage;