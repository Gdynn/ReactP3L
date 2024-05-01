import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./css/ShowDataUser.css";

const ShowDataUser = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [userData, setUserData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      gender: "Male",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      gender: "Female",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "5556667777",
      gender: "Male",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      phone: "9998887777",
      gender: "Female",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "3332221111",
      gender: "Male",
    },
  ]);

  return (
    <div className="container px-4 py-2">
      <h1 className="mt-3 mb-4" id="accountTitle" style={{ color: "white" }}>
        Show Data User
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
            />
            <div className="input-group-append mx-2">
              <button
                className="btn btn-outline-secondary py-1"
                type="button"
                id="search-addon"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ cursor: "pointer" }}
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
              <th scope="col">Nama</th>
              <th scope="col">Email</th>
              <th scope="col">Nomor Telepon</th>
              <th scope="col">Jenis Kelamin</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td className="edit-col">Edit</td>
                <td className="delete-col">Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowDataUser;
