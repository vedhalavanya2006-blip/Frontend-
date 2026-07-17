import React from "react";
import {
  FaUsers,
  FaBuilding,
  FaUserCheck,
  FaUserTimes,
  FaMoneyBillWave,
  FaUserPlus,
} from "react-icons/fa";

function DashboardCard() {
  return (
    <div className="dashboard-container">

      {/* Total Employees */}
      <div className="card">
        <FaUsers size={45} color="#2563eb" />
        <h3>Total Employees</h3>
        <h1>25</h1>
      </div>

      {/* Departments */}
      <div className="card">
        <FaBuilding size={45} color="#16a34a" />
        <h3>Departments</h3>
        <h1>5</h1>
      </div>

      {/* Active Employees */}
      <div className="card">
        <FaUserCheck size={45} color="#f59e0b" />
        <h3>Active Employees</h3>
        <h1>22</h1>
      </div>

      {/* Inactive Employees */}
      <div className="card">
        <FaUserTimes size={45} color="#ef4444" />
        <h3>Inactive Employees</h3>
        <h1>3</h1>
      </div>

      {/* Average Salary */}
      <div className="card">
        <FaMoneyBillWave size={45} color="#10b981" />
        <h3>Average Salary</h3>
        <h1>₹45K</h1>
      </div>

      {/* New Joinees */}
      <div className="card">
        <FaUserPlus size={45} color="#8b5cf6" />
        <h3>New Joinees</h3>
        <h1>4</h1>
      </div>

    </div>
  );
}

export default DashboardCard;