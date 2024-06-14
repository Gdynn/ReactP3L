import {
  GetAllProsesPesanan,
  UpdateDiprosesPesanan,
} from "./../../api/apiStatusSelesai"; // Ensure the path is correct
import React, { useEffect, useState } from "react";
import { Spinner, Button, Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ShowDataDiprosesPesanan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prosesPesananList, setProsesPesananList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);
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

  const handleComplete = async (id) => {
    setIsPending(true);
    console.log("Updating order ID:", id); // Debug log
    try {
      const updatedData = { STATUS: "Selesai" };
      await UpdateDiprosesPesanan(id, updatedData);
      toast.success("Status updated to Selesai");
      fetchData(); // Refresh the data
      setIsPending(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
      setIsPending(false);
    }
  };

  return (
    <Container>
      <div className="container steps" style={{ maxWidth: "30%" }}>
        <h3 style={{ color: "#014E87", textAlign: "center" }}>
          <strong>Orders Being Processed</strong>
        </h3>
      </div>
      <Container className="cont cont-input mt-5">
        <div className="row mb-3">
          <div className="col-8">
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
                  className="btn btn-outline-secondary py-1"
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
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table responsive className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Tanggal Pesan</th>
                <th scope="col">Status</th>
                <th scope="col">Total</th>
                <th scope="col">Selesaikan</th>
              </tr>
            </thead>
            <tbody>
              {prosesPesananList.map((pemesanan, index) => (
                <tr key={pemesanan.id || pemesanan.ID_PEMESANAN}>
                  <th scope="row">{index + 1}</th>
                  <td>{pemesanan.user?.username}</td>
                  <td>{pemesanan.TANGGAL_PESAN}</td>
                  <td>{pemesanan.STATUS}</td>
                  <td>Rp. {pemesanan.TOTAL}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() =>
                        handleComplete(pemesanan.id || pemesanan.ID_PEMESANAN)
                      }
                      disabled={isPending}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </Container>
  );
};

export default ShowDataDiprosesPesanan;
