import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { DeletePembelianBahanBaku, GetAllPembelianBahanBaku, UpdatePembelianBahanBaku } from "../../../api/apiPembelianBahanBaku";
import { DeleteDetailPengeluaran, GetAllDetailPengeluaran } from "../../../api/apiDetailPengeluaran";
import { DeleteBahanBaku, GetAllBahanBaku } from "../../../api/apiBahanBaku";
import "../css/ShowDataUser.css";
import { useNavigate } from "react-router-dom";
import UpdatePembelianBahanBakuPage from "./updatePembelianBahanBakuPage";
// import UpdateLayananLaundry from "./updateLayananPage";


const ShowDataPembelianBahanBaku = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [pembelian_bahan_baku, setPembelian] = useState([]);
    const [pengeluarans, setPengeluaran] = useState([]);
    const [bahan_baku, setBahan] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [originalData, setOriginalData] = useState([]);

    const deletePengeluaran = async (id, idPembelian) => {
        setIsPending(true);
        try {
            await DeleteDetailPengeluaran(id);
            await deletePembelian(idPembelian);
    
            showPengeluaran(); 
            showPembelian(); 
        } catch (err) {
            console.error("Delete operation failed:", err);
            toast.error(err.message || "Failed to delete data.");
        }
        setIsPending(false);
    };
    const deletePembelian = async (id) => {
        try {
            const response = await DeletePembelianBahanBaku(id);
            return response;
        } catch (err) {
            throw new Error("Failed to delete pembelian: " + err.message); 
        }
    };

    const showPembelian = () => {
        setIsLoading(true);
        GetAllPembelianBahanBaku()
            .then((response) => {
                setPembelian(response);
                setOriginalData(response);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };
    const showPengeluaran = () => {
        setIsLoading(true);
        GetAllDetailPengeluaran()
            .then((response) => {
                setPengeluaran(response);
                setOriginalData(response);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };
    const showBahan = () => {
        setIsLoading(true);
        GetAllBahanBaku()
            .then((response) => {
                setBahan(response);
                setOriginalData(response);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        showPembelian();
        showPengeluaran();
        showBahan();
    }, []);

    const handleSearch = () => {
        setIsLoading(true);
        if (searchInput === "") {
            setPembelian(originalData);
        } else {
            const filteredData = originalData.filter((pengeluaran) =>
                pengeluaran.bahan_baku.NAMA_BAHAN_BAKU
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
            );
            setPembelian(filteredData);
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
                            Show Data Pembelian Bahan Baku
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
                                    onClick={() => navigate("/mo/createPembelianBahanBaku")}
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
                                            <th scope="col">Nama Bahan Baku</th>
                                            <th scope="col">Kuantitas Beli (Kg)</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col">Tanggal Beli</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pengeluarans.map((pengeluaran, index) => (
                                            <tr key={pengeluaran.ID_DETAIL_PENGELUARAN}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{pengeluaran.bahan_baku.NAMA_BAHAN_BAKU}</td>
                                                <td>{pengeluaran.pembelian_bahan_baku.KUANTITAS}</td>
                                                <td>{pengeluaran.pembelian_bahan_baku.HARGA}</td>
                                                <td>{pengeluaran.pembelian_bahan_baku.TANGGAL}</td>
                                                <td>
                                                    <UpdatePembelianBahanBakuPage
                                                        pengeluaran={pengeluaran}
                                                        onClose={showPengeluaran}
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
                                                            onClick={() => deletePengeluaran(pengeluaran.ID_DETAIL_PENGELUARAN, pengeluaran.ID_PEMBELIAN)}
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

export default ShowDataPembelianBahanBaku;
