import React from "react";
import { FaUsers, FaBuilding, FaUserCheck } from "react-icons/fa";

function DashboardCard() {
  return (
    <div className="dashboard-container">

      <div className="card">
        <FaUsers size={45} color="#2563eb" />
        <h3>Total Employees</h3>
        <h1>25</h1>
      </div>

      <div className="card">
        <FaBuilding size={45} color="#16a34a" />
        <h3>Departments</h3>
        <h1>5</h1>
      </div>

      <div className="card">
        <FaUserCheck size={45} color="#f59e0b" />
        <h3>Active Employees</h3>
        <h1>22</h1>
      </div>

    </div>
  );
}

export default DashboardCard;