import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function EmployeeList({ employees, deleteEmployee }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      (emp.designation || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (emp.employeeId || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="employee-list">

      <h2>Employee List</h2>

      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <FaSearch style={{ marginRight: "10px" }} />

          <input
            type="text"
            placeholder="Search by ID, Name, Department or Designation"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
            }}
          />
        </div>
      </div>

      <table className="employee-table">

        <thead>
          <tr>
            <th>Profile</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                No Employees Found
              </td>
            </tr>
          ) : (
            filteredEmployees.map((emp) => (
              <tr key={emp.id}>

                <td>
                  <img
                    src={
                      emp.image ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                    width="50"
                    height="50"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>

                <td>{emp.employeeId || emp.id}</td>

                <td>{emp.name}</td>

                <td>{emp.department}</td>

                <td>{emp.email}</td>

                <td>{emp.phone}</td>

                <td>₹ {emp.salary}</td>

                <td>{emp.joiningDate}</td>

                <td>
                  <span
                    style={{
                      color:
                        emp.status === "Active"
                          ? "green"
                          : emp.status === "Inactive"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {emp.status}
                  </span>
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${emp.id}`)}
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this employee?"
                        )
                      ) {
                        deleteEmployee(emp.id);
                      }
                    }}
                  >
                    <FaTrash /> Delete
                  </button>

                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}

export default EmployeeList;