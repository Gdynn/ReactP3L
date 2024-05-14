import React from "react";

const Footer = () => {
  return (
    <div className="container mt-5">
      <footer className="py-5">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5>Atma Kitchen</h5>
            <ul className="list-unstyled mt-4">
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Atma Kitchen</h5>
            <ul className="list-unstyled mt-4">
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  Our Teams
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-3">
            <h5>Atma Kitchen</h5>
            <ul className="list-unstyled mt-4">
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-body-secondary">
                  
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-3 d-flex align-items-center justify-content-center">
            <img
              style={{ height: "80px" }}
              src="{asset('assets/images/logo_horizontal.png')}"
              alt=""
            />
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p className="text-muted">
            © 2024 Atma Kitchen.
          </p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
