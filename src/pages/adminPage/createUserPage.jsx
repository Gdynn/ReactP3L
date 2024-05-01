import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CreateUser = () => {
  return (
    <div className="container px-4 py-2">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="row">
            <div className="col-8">
              <div className="input-group">
                <input
                  className="form-control rounded border-1 py-1"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <div className="input-group-append mx-2">
                  <button
                    className="btn btn-outline-secondary py-1"
                    type="button"
                    id="search-addon"
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container px-4 py-3 my-4 rounded"
        style={{
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "10px",
        }}
      >
        <h1>Create User</h1>
        <div className="row my-2">
          <label className="text-start">Nama</label>
          <div className="col-8 col-md-8 col-lg-9">
            <input
              className="w-100 form-control"
              type="text"
              placeholder="First name"
            />
          </div>
          <div className="col-4 col-md-4 col-lg-3">
            <input
              className="w-100 form-control"
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="row my-2">
          <label className="text-start">Email</label>
          <div className="col-12 col-md-6">
            <input
              type="email"
              className="w-100 form-control"
              id="email"
              placeholder="user@email.com"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="jenisKelamin" className="text-start">
              Jenis Kelamin
            </label>
            <div className="d-flex align-items-center mt-2">
              <input type="radio" id="laki" name="jk" value="Laki-laki" />
              <label className="mx-2" htmlFor="laki">
                Laki-laki
              </label>
              <input
                className="mx-2"
                type="radio"
                id="perempuan"
                name="jk"
                value="Perempuan"
              />
              <label htmlFor="perempuan">Perempuan</label>
            </div>
          </div>
        </div>
        <div className="row my-2">
          <label htmlFor="nomorTelepon" className="text-start">
            Nomor Telepon
          </label>
          <div className="col">
            <input
              type="number"
              className="w-100 form-control"
              id="nomorTelepon"
              placeholder="0813xxxxxxx"
            />
          </div>
        </div>
        <div className="row my-2 mb-3">
          <label htmlFor="password" className="text-start">
            Password
          </label>
          <div className="col">
            <input
              type="password"
              className="w-100 form-control"
              id="password"
              placeholder="********"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-warning btn-block mb-4 btn-custom px-3"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
