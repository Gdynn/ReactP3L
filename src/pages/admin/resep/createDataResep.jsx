import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { useNavigate } from "react-router-dom";
import { AddResep } from "../../../api/apiResep";
import { toast } from "react-toastify";

const CreateDataResep = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    NAMA_RESEP: "",
    KUANTITAS: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const tambahResep = (event) => {
    setIsPending(true);
    event.preventDefault();
    AddResep(data)
      .then((res) => {
        toast.success(res.message);
        setIsPending(false);
        navigate("/admin/showDataResep");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <AdminPageBackground>
      <div className="row d-flex">
        <div className="col">
          <div className="container-fluid px-4 py-2">
            <Form onSubmit={tambahResep}>
              <div
                className="container px-4 py-3 my-4 rounded"
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "10px",
                }}
              >
                <h1>Create Resep</h1>
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
                    />
                  </div>
                </div>
                {isPending ? (
                  <Button
                    type="submit"
                    className="mt-3 w-100 border-0 buttonSubmit btn-lg"
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="mt-3 w-100 border-0 buttonSubmit btn-lg"
                  >
                    Create
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </AdminPageBackground>
  );
};

export default CreateDataResep;
