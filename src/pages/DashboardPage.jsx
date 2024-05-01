import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
  Button,
} from "react-bootstrap";
import { getImage } from "../api";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "./dashboard.css";

import h1Img from "../assets/images/homepage/img_home1.png";
import h2Img from "../assets/images/homepage/img_home2.png";
import h3Img from "../assets/images/homepage/img_home3.png";
import layanan1Img from "../assets/images/homepage/imgly1.png";
import layanan2Img from "../assets/images/homepage/imgly2.png";
import layanan3Img from "../assets/images/homepage/imgly3.png";
import logo1 from "../assets/images/logo_horisontal.png";
import logo2 from "../assets/images/logo_normal.png";
import logo3 from "../assets/images/logo_vertikal.png";
import { GetAllLayanan } from "../apiExample/apiLayanan";

const DashboardPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [layanan, setLayanan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  var index = 0;

  useEffect(() => {
    setIsLoading(true);
    var token = sessionStorage.getItem("token");
    if (token != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    GetAllLayanan()
      .then((value) => {
        setLayanan(value);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, []);

  return (
    <>
      <div
        className="p-0 container-fluid"
        style={{ height: "auto", position: "relative" }}
      >
        <div className="p-0 container-fluid bg-1 bg-color-blue1"></div>
        <div
          className="container-fluid isi-content text-center"
          style={{ width: "100%", height: "auto", paddingBottom: "50px" }}
        >
          {/* Row 1 */}
          <Row className="r-1">
            <Col sm={12} md={6} lg={6} xl={6} xxl={5} className="col c-1">
              <div className="home-content1">
                <h2 style={{ paddingRight: "15%" }}>
                  <strong className="text-red1 t1">Laundry</strong> jadi lebih{" "}
                  <strong className="text-blue3">Bersih</strong> dan{" "}
                  <strong className="text-blue3">Wangi</strong>
                </h2>
                <p className="p1">
                  Selalu mencari tempat laundry yang tidak hanya menjaga pakaian
                  bersih dan harum, tetapi juga menawarkan pelayanan yang mudah?
                  Bergabunglah dengan kami di Laundry Space, di mana kebersihan
                  adalah prioritas utama. Kami berkomitmen untuk memberikan
                  pengalaman laundry yang tak tertandingi, dengan pakaian yang
                  tetap bersih dan wangi sepanjang hari. Temukan kenyamanan dan
                  kelembutan layanan kami, dan nikmati pakaian yang selalu siap
                  untuk digunakan
                </p>

                {isLogin ? (
                  <a href="/user/order" className="button">
                    <Button variant="danger" className="btn-get-started mt-4" style={{width: '120px'}}>
                      Order
                    </Button>
                  </a>
                ) : (
                  <a href="/login" className="button">
                    <Button variant="danger" className="btn-get-started">
                      Get Started
                    </Button>
                  </a>
                )}
              </div>
            </Col>
            <Col xxl={7} className="col c-2">
              <h2
                className="t2"
                style={{ paddingRight: "15%", display: "none" }}
              >
                <strong className="text-red1">Laundry</strong> jadi lebih{" "}
                <strong className="text-blue3">Bersih</strong> dan{" "}
                <strong className="text-blue3">Wangi</strong>
              </h2>
              <div className="img-home1">
                {" "}
                <img className="img-1" src={h1Img} alt="" />{" "}
              </div>
            </Col>
          </Row>

          {/* Row 2 */}
          <Row className="r-2">
            <Col>
              <div className="home-content2">
                <h3 className="text-center">Cari Dengan Mudah</h3>
                <p>
                  Jika Anda mencari cara untuk menemukan layanan laundry yang
                  tepat dengan mudah, Anda berada di tempat yang tepat! Dalam
                  dunia yang semakin sibuk, mencuci pakaian bisa menjadi tugas
                  yang memakan waktu. Namun, dengan beberapa langkah sederhana,
                  Anda dapat dengan mudah menemukan layanan laundry yang sesuai
                  dengan kebutuhan Anda.
                </p>
              </div>
            </Col>
          </Row>

          {/* Row 3 */}
          <Row style={{ height: "100px" }}>
            <Col>
              <div className="home-content3" style={{ marginTop: "35px" }}>
                <h3>Layanan Layanan</h3>
              </div>
            </Col>
          </Row>

          {/* Row 4 (Desktop) */}
          {isLoading ? (
            <div className="text-center">
              <Spinner
                as="span"
                animation="border"
                variant="primary"
                size="lg"
                role="status"
                aria-hidden="true"
              />
              <h6 className="mt-2 mb-0">Loading...</h6>
            </div>
          ) : (
            <Row>
              {layanan?.map((item, index) => (
                <Col>
                  <div className="home-content4 mt-5 mb-5">
                    <div className="img-ly1">
                      <img
                        src={layanan1Img}
                        alt=""
                        style={{ height: "130px" }}
                      />
                    </div>
                    <div>
                      <h4>{item.nama_layanan}</h4>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {/* Row 4 (Mobile) */}
          <Row className="d-flex row d-sm-none" style={{ height: "400px" }}>
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="home-content4">
                    <div className="img-ly1">
                      <img
                        src={layanan1Img}
                        alt=""
                        style={{ height: "150px" }}
                      />
                    </div>
                    <div>
                      <h4>Antar Jemput</h4>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="home-content4">
                    <div className="img-ly2">
                      <img
                        src={layanan2Img}
                        alt=""
                        style={{ height: "150px" }}
                      />
                    </div>
                    <div>
                      <h4>Antar Jemput</h4>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="home-content4">
                    <div className="img-ly3">
                      <img
                        src={layanan3Img}
                        alt=""
                        style={{ height: "150px" }}
                      />
                    </div>
                    <div>
                      <h4>Antar Jemput</h4>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  style={{ fill: "black" }}
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </Row>

          {/* Row 5 */}
          <Row className="row r-5" style={{ height: "auto" }}>
            <Col xxl={6} sm={6} className="c-1">
              <div className="img-home2">
                <img src={h2Img} alt="" />
              </div>
            </Col>
            <Col sm={6} xxl={6} className="col-12 c-2">
              <div>
                <img className="img-logo1" src={logo2} alt="" />
              </div>
              <h4 style={{ marginTop: "20px" }}>
                <strong className="text-blue3">Laundry</strong>{" "}
                <strong className="text-red1">Space</strong>
              </h4>
              <p className="p2">
                "Laundry Space, adalah lebih dari sekadar perusahaan laundry.
                Kami adalah mitra andal Anda dalam menjaga pakaian dan tekstil
                Anda tetap bersih, rapi, dan segar. Dengan komitmen kami untuk
                kualitas dan keamanan, kami menawarkan layanan laundry yang
                efisien dan praktis untuk memenuhi berbagai kebutuhan Anda.
              </p>
              <div
                className="btn-start"
                style={{ textAlign: "left", marginTop: "20px" }}
              >
                {isLogin ? (
                  <a href="/user/order" className="button">
                    <Button variant="danger" className="btn-get-started">
                      Order
                    </Button>
                  </a>
                ) : (
                  <a href="/login" className="button">
                    <Button variant="danger" className="btn-get-started">
                      Get Started
                    </Button>
                  </a>
                )}
              </div>
            </Col>
          </Row>

          {/* Row 6 */}
          <Row className="row r-6" style={{ height: "auto" }}>
            <Col
              sm={6}
              className="col-12 c-1"
              style={{ alignItems: "flex-start", border: "1px" }}
            >
              <div>
                <img className="img-logo1" src={logo2} alt="" />
              </div>
              <h4 style={{ marginTop: "20px" }}>
                <strong className="text-blue3">Tunggu Apa Lagi</strong>{" "}
              </h4>
              <p className="">
                Dengan set sat set, baju akan segera menjadi bersih, memastikan
                kebersihan optimal setiap kali dicuci. Proses yang efisien ini
                memungkinkan Anda menikmati pakaian yang segar dan terawat
                dengan cepat setiap harinya.
              </p>
              <div
                className="btn-start"
                style={{ textAlign: "left", marginTop: "20px" }}
              >
                {isLogin ? (
                  <a href="/user/order" className="button">
                    <Button variant="danger" className="btn-get-started">
                      Order
                    </Button>
                  </a>
                ) : (
                  <a href="/login" className="button">
                    <Button variant="danger" className="btn-get-started">
                      Get Started
                    </Button>
                  </a>
                )}
              </div>
            </Col>
            <Col sm={6} className="c-2" style={{ height: "0px" }}>
              <div className="img-home3">
                <img src={h3Img} alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
