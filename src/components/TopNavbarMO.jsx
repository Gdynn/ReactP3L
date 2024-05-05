import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import imgAH from "../assets/images/atmahub-white.png";
import logo from "../assets/images/logo01.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState, useEffect } from "react";
import "./styleTopNavBar.css";
import ProfileModal from "./modals/profileModal";
import Overly from "./other/overly";

const TopNavbar = ({ routes }) => {
  const [isPopNavBar, setIsPopNavBar] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopProfile, setIsPopProfile] = useState(false);
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {}, []);

  const ProfilePop = () => {
    setIsPopProfile(isPopProfile == true ? false : true);
  };

  return (
    <>
      {isPopProfile ? (
        <div className="">
          <a type="hidden" onClick={() => ProfilePop()}>
            <Overly></Overly>
          </a>
          <ProfileModal></ProfileModal>
        </div>
      ) : (
        <div></div>
      )}

      <Navbar fixed="top" collapseOnSelect expand="lg" className="topNav mb-0">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            {/* <img src={logo} alt="" style={{ height: "40px" }} /> */}
            <h3>ATMA KITCHEN</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link
              className="mx-2"
              onClick={() => navigate("/mo/showDataUser")}
            >
              Data User
            </Nav.Link>
            <Nav.Link
              className="mx-2"
              onClick={() => navigate("/mo/showDataPembelianBahanBaku")}
            >
              Data Pembelian Bahan Baku
            </Nav.Link>
            <Nav.Link
              className="mx-2"
              onClick={() => navigate("/mo/showDataKaryawan")}
            >
              Data Karyawan
            </Nav.Link>
            <Nav className="me-auto"></Nav>
            <div className="d-flex align-items-end text-end ms-auto justify-content-center">
              <strong>Manager Operasional</strong>
            </div>
            <Button
              className="mx-2"
              variant="danger"
              onClick={logout}
              style={{ maxWidth: "90px" }}
            >
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default TopNavbar;
