import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    alert("Password Changed Successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f4f6f9",
        }}
      >
        <div
          style={{
            width: "400px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#2563eb",
              marginBottom: "20px",
            }}
          >
            Change Password
          </h1>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
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
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ChangePassword;