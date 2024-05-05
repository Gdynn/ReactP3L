import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { DeleteKaryawan, GetAllKaryawan } from "../../../api/apiKaryawan";
import "../css/ShowDataUser.css";
import UpdateDatakaryawan from "./updateDataKaryawan";
import { useNavigate } from "react-router-dom";

const ShowDataKaryawan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [karyawanList, setKaryawanList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const navigate = useNavigate();

  const deleteKaryawan = (id) => {
    setIsPending(true);
    DeleteKaryawan(id)
      .then((response) => {
        toast.success(response.message);
        showKaryawan();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        showKaryawan();
      });
  };
  const showKaryawan = () => {
    setIsLoading(true);
    GetAllKaryawan()
      .then((response) => {
        setKaryawanList(response);
        setOriginalData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    showKaryawan();
  }, []);
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSearch = () => {
    setIsLoading(true);
    if (searchInput === "") {
      setKaryawanList(originalData);
    } else {
      const filteredData = originalData.filter((karyawan) =>
        karyawan.NAMA_PEGAWAI.toLowerCase().includes(searchInput.toLowerCase())
      );
      setKaryawanList(filteredData);
    }
    setIsLoading(false);
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
              Show Data Karyawan
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
              <div className="col-4 d-flex justify-content-end">
                <Button
                  variant="success"
                  onClick={() => navigate("/mo/createDataKaryawan")}
                  style={{ width: "100px" }}
                >
                  Create
                </Button>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Pegawai</th>
                      <th scope="col">Email</th>
                      <th scope="col">No Telp</th>
                      <th scope="col">Alamat</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {karyawanList.map((karyawan, index) => (
                      <tr key={karyawan.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{karyawan.NAMA_PEGAWAI}</td>
                        <td>{karyawan.EMAIL}</td>
                        <td>{karyawan.NOTELP_PEGAWAI}</td>
                        <td>{karyawan.ALAMAT}</td>
                        <td>
                          <UpdateDatakaryawan
                            karyawan={karyawan}
                            onClose={showKaryawan}
                          />
                        </td>
                        <td className="delete-col">
                          {isPending ? (
                            <Button
                              variant="danger"
                              disabled
                              style={{ width: "70px" }}
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
                              variant="danger"
                              onClick={() =>
                                deleteKaryawan(karyawan.ID_PEGAWAI)
                              }
                              style={{ marginRight: "7px", width: "70px" }}
                            >
                              Hapus
                            </Button>
                          )}
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
    </AdminPageBackground>
  );
};

export default ShowDataKaryawan;
