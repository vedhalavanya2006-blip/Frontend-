import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <h2>Employee Management System</h2>

      <p>
        Manage Employees Easily & Efficiently
      </p>

      <div className="social-icons">
        <FaFacebook size={24} />
        <FaInstagram size={24} />
        <FaLinkedin size={24} />
        <FaEnvelope size={24} />
      </div>

      <hr />

      <p>
        © 2026 Employee Management System. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;