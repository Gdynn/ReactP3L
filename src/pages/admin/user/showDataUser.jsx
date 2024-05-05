import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminPageBackground from "../adminPageBackground";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { DeleteUser, GetAllUser } from "../../../api/apiUsers";
import "../css/ShowDataUser.css";
import UpdateUserAccount from "./updateUserPage";

const ShowDataUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [originalUsers, setOriginalUsers] = useState([]);

  const deleteUser = (id) => {
    setIsPending(true);
    DeleteUser(id)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        showUser();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.error(err.message);
      });
  };

  const showUser = () => {
    setIsLoading(true);
    GetAllUser()
      .then((response) => {
        setUsers(response);
        setOriginalUsers(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    setIsLoading(true);
    if (searchInput === "") {
      setUsers(originalUsers);
    } else {
      const filteredUsers = originalUsers.filter((user) =>
        user.username.toLowerCase().includes(searchInput.toLowerCase())
      );

      setUsers(filteredUsers);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    showUser();
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
              Show Data User
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
                      <th scope="col">Username</th>
                      <th scope="col">Password</th>
                      <th scope="col">Email</th>
                      <th scope="col">Nomor Telepon</th>
                      <th scope="col">Type Pengguna</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.email}</td>
                        <td>{user.notelp}</td>
                        <td>{user.type_pengguna}</td>
                        <td>
                          <UpdateUserAccount user={user} onClose={showUser} />
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
                              onClick={() => deleteUser(user.id_user)}
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

export default ShowDataUser;
