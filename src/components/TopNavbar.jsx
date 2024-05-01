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
  useEffect(() => {
    var token = sessionStorage.getItem("token");
    // console.log(`token ${token}`);
    if (token !== null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

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

      {isLogin ? (
        <Navbar fixed="top" collapseOnSelect expand="lg" className="topNav">
          <Container>
            <Navbar.Brand>
              <img src={logo} alt="" style={{ height: "40px" }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav className="d-flex align-items-center">
                <Nav.Link
                  onClick={() => navigate("/register")}
                  className="align-middle"
                  href="#deets"
                >
                  {" "}
                  Sign Up
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  <Button onClick={() => navigate("/login")} variant="danger">
                    Get Started
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar fixed="top" collapseOnSelect expand="lg" className="topNav">
          <Container>
            <Navbar.Brand onClick={() => navigate('/')}>
              <img src={logo} alt="" style={{ height: "40px" }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate('/user/order')}>Order</Nav.Link>
                <Nav.Link onClick={() => navigate('/user/history')} >History</Nav.Link>
                <Nav.Link onClick={() => navigate('/about')} >About</Nav.Link>
              </Nav>
              <Nav>
        
                <Nav.Link onClick={() => ProfilePop()} >
                  Profile
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};
export default TopNavbar;
