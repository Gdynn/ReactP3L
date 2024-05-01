import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { DeleteLayanan, GetAllLayanan } from "../../../apiExample/apiLayanan";
import "../css/ShowDataUser.css";
import UpdateLayananLaundry from "./updateLayananPage";

const ShowDataLayanan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [layanans, setLayanan] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);

  const deleteLayanan = (id) => {
    setIsPending(true);
    DeleteLayanan(id)
      .then((response) => {
        // setIsPending(false);
        toast.success(response.message);
        showLayanan();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        showLayanan();
      });
  };
  const showLayanan = () => {
    setIsLoading(true);
    GetAllLayanan()
      .then((response) => {
        setLayanan(response);
        setOriginalData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    showLayanan();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    if (searchInput === "") {
      setLayanan(originalData);
    } else {
      const filteredData = originalData.filter((layanan) =>
        layanan.nama_layanan
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
      setLayanan(filteredData);
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
              Show Data Layanan
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
                      <th scope="col">Nama Layanan</th>
                      <th scope="col">Durasi</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Note</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {layanans.map((layanan, index) => (
                      <tr key={layanan.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{layanan.nama_layanan}</td>
                        <td>{layanan.durasi}</td>
                        <td>{layanan.harga}</td>
                        <td>{layanan.note}</td>
                        <td>
                          <UpdateLayananLaundry
                            layanan={layanan}
                            onClose={showLayanan}
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
                              onClick={() => deleteLayanan(layanan.id_layanan)}
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

export default ShowDataLayanan;
