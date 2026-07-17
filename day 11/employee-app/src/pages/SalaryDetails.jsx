import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEmployees } from "../services/employeeService";

function SalaryDetails() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await getEmployees();

      const loginId = localStorage.getItem("employeeId");

      const emp = response.data.find(
        (item) => String(item.id) === String(loginId)
      );

      setEmployee(emp);
    } catch (error) {
      console.log(error);
    }
  };

  if (!employee) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h2>Salary Details Not Found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fc",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "30px",
          }}
        >
          💰 Salary Details
        </h1>

        <div
          style={{
            maxWidth: "700px",
            margin: "auto",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#fff",
              textAlign: "center",
              padding: "30px",
            }}
          >
            <h2>{employee.name}</h2>
            <p>{employee.department}</p>
          </div>

          <div style={{ padding: "30px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                <tr>
                  <td><b>Employee ID</b></td>
                  <td>{employee.id}</td>
                </tr>

                <tr>
                  <td><b>Name</b></td>
                  <td>{employee.name}</td>
                </tr>

                <tr>
                  <td><b>Department</b></td>
                  <td>{employee.department}</td>
                </tr>

                <tr>
                  <td><b>Monthly Salary</b></td>
                  <td>₹ {employee.salary}</td>
                </tr>

                <tr>
                  <td><b>Bonus</b></td>
                  <td>₹ 5,000</td>
                </tr>

                <tr>
                  <td><b>Total Salary</b></td>
                  <td>
                    ₹ {Number(employee.salary) + 5000}
                  </td>
                </tr>

                <tr>
                  <td><b>Salary Status</b></td>
                  <td>
                    <span
                      style={{
                        background: "#16a34a",
                        color: "#fff",
                        padding: "5px 15px",
                        borderRadius: "20px",
                      }}
                    >
                      Credited
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                style={{
                  padding: "12px 30px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                📄 Download Salary Slip
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SalaryDetails;