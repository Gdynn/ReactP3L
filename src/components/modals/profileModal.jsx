import "./modal.css";
import { Spinner, Button } from "react-bootstrap";

import { useNavigate, useLocation } from "react-router-dom";
import imgProfile from "../../assets/images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { GetUserByLogin } from "../../api/apiUsers";
import { getImage } from "../../api";

const ProfileModal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(Object);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log(`isLoading ${sessionStorage.getItem("user")}`);

    var temp = sessionStorage.getItem("user");
    setUser(JSON.parse(temp));
    GetUserByLogin().then((value) => {
      setImage(getImage(value.image_profile));
    });
    setIsLoading(false);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  const test = () => {
    console.log(`ini : ${image}`);
    console.log(`sudah : ${user.fullname}`);
  };

  return (
    <>
      <div className="modalProfile">
        <div className="h-100 container-fluid d-flex flex-column justify-content-between">
          <div className="row">
            <div className="col">
              {isLoading ? (
                <Button variant="danger" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <div className="row modal-profile">
                  <div
                    className=" col-3 d-flex align-items-center "
                    style={{ height: "80px" }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Thumbnail"
                        className="rounded-circle img-profile"
                        style={{ width: "130%", aspectRatio: "1/1" }}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUser} size="2x" />
                    )}
                  </div>
                  <div
                    className="col d-flex flex-column justify-content-center align-items-start"
                    style={{ height: "80px" }}
                  >
                    <div style={{ fontSize: "16px" }}>{user.fullname}</div>
                    <div style={{ fontSize: "13px" }}>{user.email}</div>
                  </div>
                </div>
              )}

              <div className="col d-flex  flex-column justify-content-center align-items-start">
                <div className="row mb-2 w-100">
                  <div className="col-3 ">
                    <span style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </div>
                  <div className="col-9 " style={{ textAlign: "start" }}>
                    <a onClick={() => navigate("/user/profile")}>
                      Edit Profile
                    </a>
                  </div>
                </div>
                <div className="row mb-2 w-100">
                  <div className="col-3 ">
                    <span style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </div>
                  <div className="col-9 " style={{ textAlign: "start" }}>
                    <a onClick={() => navigate("/user/wallet")}>Wallet</a>
                  </div>
                </div>
                <div className="row mb-2 w-100">
                  <div className="col-3 ">
                    <span style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </div>
                  <div className="col-9 " style={{ textAlign: "start" }}>
                    <a onClick={() => navigate("/ourteam")}>Our Team</a>
                  </div>
                </div>
                <div className="row mb-2 w-100">
                  <div className="col-3 ">
                    <span style={{ marginRight: "10px" }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </div>
                  <div className="col-9 " style={{ textAlign: "start" }}>
                    <a onClick={() => navigate("/about")}>About</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row"></div>
          <div className="row">
            <Button variant="danger" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
