import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Leave() {
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
            marginBottom: "10px",
            fontSize: "42px",
          }}
        >
          📝 Leave Management
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "35px",
          }}
        >
          Apply your leave request quickly and easily.
        </p>

        <div
          style={{
            maxWidth: "650px",
            margin: "auto",
            background: "#fff",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2563eb",
              marginBottom: "25px",
            }}
          >
            Leave Application Form
          </h2>

          <label><b>Leave Type</b></label>

          <select
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option>Select Leave Type</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Annual Leave</option>
            <option>Emergency Leave</option>
          </select>

          <label><b>From Date</b></label>

          <input
            type="date"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <label><b>To Date</b></label>

          <input
            type="date"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <label><b>Reason</b></label>

          <textarea
            rows="5"
            placeholder="Enter Leave Reason..."
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "25px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "none",
            }}
          ></textarea>

          <button
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(90deg,#2563eb,#4f46e5)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            📤 Apply Leave
          </button>
        </div>

        {/* Leave Status */}
        <div
          style={{
            maxWidth: "650px",
            margin: "35px auto",
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#16a34a",
              marginBottom: "20px",
            }}
          >
            📋 Leave Status
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#2563eb",
                  color: "#fff",
                }}
              >
                <th style={{ padding: "12px" }}>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ padding: "12px" }}>Casual Leave</td>
                <td>15-07-2026</td>
                <td>16-07-2026</td>
                <td style={{ color: "green", fontWeight: "bold" }}>
                  Approved
                </td>
              </tr>

              <tr>
                <td style={{ padding: "12px" }}>Sick Leave</td>
                <td>20-07-2026</td>
                <td>21-07-2026</td>
                <td style={{ color: "orange", fontWeight: "bold" }}>
                  Pending
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Leave;