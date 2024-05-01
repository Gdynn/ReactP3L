import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
// import SidenavCustom from "../admin/sideNav";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
// import { DeleteUser, GetAllUser } from "../../api/apiUsers";
import {
  GetAllJenisPengambilan,
  DeleteJenisPengambilan,
  UpdateJenisPengambilan,
} from "../../../apiExample/apiJenisPengambilan";
import { Link } from "react-router-dom";
import "../css/ShowDataUser.css";
import UpdateJenisPengambilanPage from "./UpdateJenisPengambilan";
// import UpdateUserAccount from "./updateUserPage";

const ShowDataJenisPengambilan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jenisPengambilans, setJenisPengambilans] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);

  const deleteJenisPengambilan = (id) => {
    setIsPending(true);
    // toast.success(response);
    DeleteJenisPengambilan(id)
      .then((response) => {
        setIsPending(false);
        // toast.success(response.message);
        showJenisPengambilan();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.dark(err.message);
      });
  };
  const showJenisPengambilan = () => {
    setIsLoading(true);
    GetAllJenisPengambilan()
      .then((response) => {
        setJenisPengambilans(response);
        setOriginalData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setOriginalData(response);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    showJenisPengambilan();
  }, []);
  const [selectedOption, setSelectedOption] = useState("option1");

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = () => {
    setIsLoading(true);
    if (searchInput === "") {
      setJenisPengambilans(originalData);
    } else {
      const filteredData = originalData.filter((jenisPengambilan) =>
        jenisPengambilan.nama_jenis_pengambilan
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
      setJenisPengambilans(filteredData);
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
              Show Data Jenis Pengambilan
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

              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Jenis Pengambilan</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jenisPengambilans.map((jenisPengambilan, index) => (
                      <tr key={jenisPengambilan.id_jenis_pengambilan}>
                        <th scope="row">{index + 1}</th>
                        <td>{jenisPengambilan.nama_jenis_pengambilan}</td>
                        <td>{jenisPengambilan.harga}</td>
                        <td>
                          <UpdateJenisPengambilanPage
                            jenisPengambilan={jenisPengambilan}
                            onClose={showJenisPengambilan}
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
                                deleteJenisPengambilan(
                                  jenisPengambilan.id_jenis_pengambilan
                                )
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

export default ShowDataJenisPengambilan;
