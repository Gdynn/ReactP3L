import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { DeleteHampers, GetAllHampers } from "../../../api/apiHampers";
import "../css/ShowDataUser.css";
import { useNavigate } from "react-router-dom";
import UpdateHampersPage from "./updateHampersPage";


const ShowDataHampers = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hampersd, setHampers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);

  const deleteHampers = (id) => {
    setIsPending(true);
    DeleteHampers(id)
      .then((response) => {
        // setIsPending(false);
        toast.success(response.message);
        showHampers();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        showHampers();
      });
  };
  const showHampers = () => {
    setIsLoading(true);
    GetAllHampers()
      .then((response) => {
        setHampers(response);
        setOriginalData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    showHampers();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    if (searchInput === "") {
      setHampers(originalData);
    } else {
      const filteredData = originalData.filter((hampers) =>
        hampers.NAMA_HAMPERS
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
      setHampers(filteredData);
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
              Show Data Hampers
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
                  onClick={() => navigate("/admin/createHampers")}
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
                      <th scope="col">Nama Hampers</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hampersd.map((hampers, index) => (
                      <tr key={hampers.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{hampers.NAMA_HAMPERS}</td>
                        <td>{hampers.KETERANGAN}</td>
                        <td>{hampers.HARGA}</td>
                        <td>
                          <UpdateHampersPage
                            hampers={hampers}
                            onClose={showHampers}
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
                              onClick={() => deleteHampers(hampers.ID_HAMPERS)}
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

export default ShowDataHampers;
