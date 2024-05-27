import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetAllPemesanan } from "../../../api/apiPemesanan";
import "../css/ShowDataUser.css";
import UpdateDataPemesanan from "./updateDataPemesanan";
import { useNavigate } from "react-router-dom";

const ShowDataPemesanan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pemesananList, setPemesananList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const navigate = useNavigate();

  const showPemesanan = () => {
    setIsLoading(true);
    GetAllPemesanan()
      .then((response) => {
        setPemesananList(response);
        setOriginalData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    showPemesanan();
  }, []);
  const [selectedOption, setSelectedOption] = useState("option1");

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
              Show Data Pemesanan
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
              <div className="col-4 d-flex justify-content-end"></div>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Tanggal Pesan</th>
                      <th scope="col">Tanggal Ambil</th>
                      <th scope="col">Status</th>
                      <th scope="col">Jarak</th>
                      <th scope="col">Delivery</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pemesananList.map((pemesanan, index) => (
                      <tr key={pemesanan.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{pemesanan.user?.username}</td>
                        <td>{pemesanan.TANGGAL_PESAN}</td>
                        <td>{pemesanan.TANGGAL_AMBIL}</td>
                        <td>{pemesanan.STATUS}</td>
                        <td>{pemesanan.JARAK}</td>
                        <td>{pemesanan.DELIVERY}</td>
                        <td>
                          <UpdateDataPemesanan
                            pemesanan={pemesanan}
                            onClose={showPemesanan}
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
                            <span
                              style={{ marginRight: "7px", width: "70px" }}
                            />
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

export default ShowDataPemesanan;
