import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { DeleteResep, GetAllResep } from "../../../api/apiResep";
import "../css/ShowDataUser.css";
import UpdateDataResep from "./updateDataResep";
import { useNavigate } from "react-router-dom";

const ShowDataResep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resepList, setResepList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const navigate = useNavigate();

  const deleteResep = (id) => {
    setIsPending(true);
    DeleteResep(id)
      .then((response) => {
        toast.success(response.message);
        showResep();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        showResep();
      });
  };
  const showResep = () => {
    setIsLoading(true);
    GetAllResep()
      .then((response) => {
        setResepList(response);
        setOriginalData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    showResep();
  }, []);
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSearch = () => {
    setIsLoading(true);
    if (searchInput === "") {
      setResepList(originalData);
    } else {
      const filteredData = originalData.filter((resep) =>
        resep.nama_resep.toLowerCase().includes(searchInput.toLowerCase())
      );
      setResepList(filteredData);
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
              Show Data Resep
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
                  onClick={() => navigate("/admin/CreateDataResep")}
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
                      <th scope="col">Nama Resep</th>
                      <th scope="col">Kuantitas</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resepList.map((resep, index) => (
                      <tr key={resep.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{resep.NAMA_RESEP}</td>
                        <td>{resep.KUANTITAS}</td>
                        <td>
                          <UpdateDataResep resep={resep} onClose={showResep} />
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
                              onClick={() => deleteResep(resep.ID_RESEP)}
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

export default ShowDataResep;
