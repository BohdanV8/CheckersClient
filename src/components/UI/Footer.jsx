import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="container py-5 fixed-bottom">
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© 2025 Company, Inc. All rights reserved.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <a className="link-body-emphasis" href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
          </li>
          <li className="ms-3">
            <a className="link-body-emphasis" href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
