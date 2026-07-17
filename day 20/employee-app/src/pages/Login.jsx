import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../services/employeeService";

function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const id = userId.trim();
    const pass = password.trim();

    if (!id || !pass) {
      alert("Please enter ID/Username and Password");
      return;
    }

    // Admin Login
    if (id.toLowerCase() === "admin" && pass === "admin123") {
      localStorage.setItem("role", "admin");
      alert("Admin Login Successful");
      navigate("/admin");
      return;
    }

    // Employee Login
    if (pass === "emp123") {
      try {
        const response = await getEmployees();

        const employee = response.data.find(
          (emp) => String(emp.id) === id
        );

        if (employee) {
          localStorage.setItem("role", "employee");
          localStorage.setItem("employeeId", employee.id);

          alert("Employee Login Successful");
          navigate("/employee");
        } else {
          alert("Employee ID Not Found");
        }
      } catch (error) {
        console.log(error);
        alert("Unable to Login");
      }

      return;
    }

    alert("Invalid Username or Password");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#4f46e5,#2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "380px",
          background: "#fff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#2563eb" }}>Employee Management</h1>

        <p style={{ color: "#666", marginBottom: "25px" }}>
          Login to Continue
        </p>

        <input
          type="text"
          placeholder="Admin Username / Employee ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;