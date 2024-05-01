import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "../css/ShowDataUser.css";
import { DeleteItem, GetAllItems } from "../../../apiExample/apiItem";
import UpdateItemLaundry from "./updateItemPage";

const ShowDataItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalData, setOriginalData] = useState([]);

  const deleteItem = (id) => {
    setIsPending(true);
    DeleteItem(id)
      .then((response) => {
        // setIsPending(false);
        toast.success(response.message);
        showItem();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        showItem();
      });
  };
  const showItem = () => {
    setIsLoading(true);
    GetAllItems()
      .then((response) => {
        setItemList(response);
        setOriginalData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    showItem();
  }, []);
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSearch = () => {
    setIsLoading(true);
    if (searchInput === "") {
      setItemList(originalData);
    } else {
      const filteredData = originalData.filter((item) =>
        item.nama_item.toLowerCase().includes(searchInput.toLowerCase())
      );
      setItemList(filteredData);
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
              Show Data Item
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
                      <th scope="col">Nama Item</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Deskripsi</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemList.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.nama_item}</td>
                        <td>{item.harga}</td>
                        <td>{item.deskripsi}</td>
                        <td>
                          <UpdateItemLaundry
                            item={item}
                            onClose={showItem}
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
                              onClick={() => deleteItem(item.id_item)}
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

export default ShowDataItem;
