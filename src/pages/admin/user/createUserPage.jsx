// src/pages/adminPage/createUserPage.jsx
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import AdminPageBackground from "../adminPageBackground";
import { Register } from "../../../api/apiAuth";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    alamat: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const register = (event) => {
    setIsPending(true);
    event.preventDefault();
    Register(data)
      .then((res) => {
        toast.success(res.message);
        setIsPending(false);
        navigate("/admin/showDataUser");
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
            <Form onSubmit={register}>
              <div
                className="container px-4 py-3 my-4 rounded"
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  borderRadius: "10px",
                }}
              >
                <h1>Create User</h1>
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
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label className="d-flex">Password</label>
                    <input
                      type="password"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Masukkan Password"
                      className="form-control"
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

export default CreateUser;
