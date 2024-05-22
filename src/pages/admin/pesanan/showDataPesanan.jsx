import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetAllPesanan } from "../../../api/apiPesanan";
import { GetAllUser } from "../../../api/apiUsers";
import "../css/ShowDataUser.css";
import { useNavigate } from "react-router-dom";
import { STATUS } from "rsuite/esm/utils/constants";

const ShowDataPesanan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pesananList, setPesananList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const showPesanan = () => {
    setIsLoading(true);
    GetAllPesanan()
      .then((response) => {
        const updatedPesanan = response.map((pemesanan) => {
          const { totalWithDelivery, additionalFee } =
            calculateTotalWithDelivery(pemesanan);
          return {
            ...pemesanan,
            totalWithDelivery,
            additionalFee, // Menambahkan biaya tambahan ke setiap pemesanan
          };
        });
        setPesananList(updatedPesanan);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const calculateTotalWithDelivery = (pemesanan) => {
    let additionalFee = 0;
    if (pemesanan.JARAK <= 5) {
      additionalFee = 10000;
    } else if (pemesanan.JARAK > 5 && pemesanan.JARAK <= 10) {
      additionalFee = 15000;
    } else if (pemesanan.JARAK > 10 && pemesanan.JARAK <= 15) {
      additionalFee = 20000;
    } else if (pemesanan.JARAK > 15) {
      additionalFee = 25000;
    }
    return {
      totalWithDelivery: pemesanan.TOTAL + additionalFee,
      additionalFee,
    };
  };

  useEffect(() => {
    showPesanan();
  }, []);

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
              Show Data Pesanan
            </h1>
            <div className="row">
              <div className="col-8">
                <div className="input-group">
                  <input
                    className="form-control rounded border-1 py-1"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <div className="input-group-append mx-2">
                    <button
                      className="btn btn-outline-secondary py-1"
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ cursor: "pointer" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Tanggal Pesanan</th>
                      <th scope="col">Tanggal Ambil</th>
                      <th scope="col">Status</th>
                      <th scope="col">Jarak</th>
                      <th scope="col">Ongkir</th>
                      <th scope="col">Delivery</th>
                      <th scope="col">Total Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pesananList.map((pemesanan, index) => (
                      <tr key={pemesanan.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{pemesanan.user?.username}</td>
                        <td>{pemesanan.TANGGAL_PESAN}</td>
                        <td>{pemesanan.TANGGAL_AMBIL}</td>
                        <td>{pemesanan.STATUS}</td>
                        <td>{pemesanan.JARAK}</td>
                        <td>Rp. {pemesanan.additionalFee}</td>
                        <td>{pemesanan.DELIVERY}</td>
                        <td>Rp. {pemesanan.TOTAL}</td>
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

export default ShowDataPesanan;
