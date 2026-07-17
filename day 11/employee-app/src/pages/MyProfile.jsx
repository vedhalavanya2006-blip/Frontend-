import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEmployees } from "../services/employeeService";

function MyProfile() {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await getEmployees();

      // Employee ID stored during login
      const loginId = localStorage.getItem("employeeId");

      // Search using MockAPI id
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
          <h2>Employee Details Not Found</h2>
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
          👤 My Profile
        </h1>

        <div
          style={{
            maxWidth: "800px",
            margin: "auto",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "#fff",
              textAlign: "center",
              padding: "30px",
            }}
          >
            <img
              src={
                employee.image ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "4px solid white",
              }}
            />

            <h2>{employee.name}</h2>
            <p>{employee.department}</p>
          </div>

          <div style={{ padding: "30px" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td><b>ID</b></td>
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
                  <td><b>Email</b></td>
                  <td>{employee.email}</td>
                </tr>

                <tr>
                  <td><b>Phone</b></td>
                  <td>{employee.phone}</td>
                </tr>

                <tr>
                  <td><b>Address</b></td>
                  <td>{employee.address}</td>
                </tr>

                <tr>
                  <td><b>Joining Date</b></td>
                  <td>{employee.joiningDate}</td>
                </tr>

                <tr>
                  <td><b>Salary</b></td>
                  <td>₹{employee.salary}</td>
                </tr>

                <tr>
                  <td><b>Status</b></td>
                  <td>{employee.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MyProfile;