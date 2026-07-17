import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>EMS</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/employees">Employees</Link>
        </li>

        <li>
          <Link to="/add">Add Employee</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;