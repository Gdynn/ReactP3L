import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  GetAllProsesPesanan,
  UpdateDiprosesPesanan,
} from "../../../api/apiDiprosesPesanan";
import "../css/ShowDataUser.css";

const ShowDataDiprosesPesanan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prosesPesananList, setProsesPesananList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await GetAllProsesPesanan();
      setProsesPesananList(data);
      setOriginalData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredData = originalData.filter((item) =>
      item.user?.username.toLowerCase().includes(searchInput.toLowerCase())
    );
    setProsesPesananList(filteredData);
  };

  const handleUpdate = async (id, data) => {
    setIsPending(true);
    try {
      const response = await UpdateDiprosesPesanan(id, data);
      toast.success(response.message || "Update Successfully");
      fetchData();
      setShowModal(false);
      setIsPending(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Update Failed");
      setIsPending(false);
    }
  };

  const handleShowModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  return (
    <AdminPageBackground>
      <div className="row d-flex">
        <div className="col px-0 mx-0">
          <div className="container">
            <h1
              className="mt-0 mb-4 py-2"
              id="accountTitle"
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            >
              Show Pesanan yang sudah diproses
            </h1>
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="input-group">
                    <input
                      className="form-control rounded border-1 py-1"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      value={searchInput}
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                        handleSearch();
                      }}
                    />
                    <div className="input-group-append mx-2">
                      <button
                        className="btn btn-outline-secondary py-1 "
                        type="button"
                        id="search-addon"
                        onClick={handleSearch}
                      >
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{ cursor: "pointer", marginRight: "17px" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-end"></div>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Tanggal Pesan</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prosesPesananList.map((pemesanan, index) => (
                      <tr key={pemesanan.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{pemesanan.user?.username}</td>
                        <td>{pemesanan.TANGGAL_PESAN}</td>
                        <td>{pemesanan.STATUS}</td>
                        <td>Rp. {pemesanan.TOTAL}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleShowModal(pemesanan)}
                            style={{ marginRight: "8px" }}
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="lg"
        show={showModal}
        onHide={handleCloseModal}
        style={{ backgroundColor: "transparent" }}
      >
        {selectedData && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedData.ID_PEMESANAN, selectedData);
            }}
          >
            <div
              className="container px-4 py-3 rounded"
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: "10px",
              }}
            >
              <h1 className="mb-3 text-center">Update Status</h1>
              <div className="row mb-2">
                <div className="col-md-12">
                  <label className="d-flex">Nama</label>
                  <input
                    type="text"
                    name="username"
                    readOnly
                    value={selectedData.user?.username || ""}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-12">
                  <label className="d-flex">Status</label>
                  <select
                    name="STATUS"
                    onChange={(e) => {
                      setSelectedData({
                        ...selectedData,
                        STATUS: e.target.value,
                      });
                    }}
                    value={selectedData.STATUS}
                    className="form-control"
                  >
                    <option value="">Pilih Status</option>
                    <option value="Sudah di pick up">Sudah di Pick Up</option>
                    <option value="Diambil sendiri">Diambil sendiri</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  type="submit"
                  className="mt-3 mx-2 border-0 button btn-primary"
                  style={{ maxWidth: "100px" }}
                >
                  {isPending ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  className="mt-3 mx-2 border-0 button btn-danger"
                  onClick={handleCloseModal}
                  style={{ maxWidth: "100px" }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Modal>
    </AdminPageBackground>
  );
};

export default ShowDataDiprosesPesanan;
