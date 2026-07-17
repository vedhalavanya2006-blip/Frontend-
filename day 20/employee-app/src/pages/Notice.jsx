import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Notice() {
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
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          📢 Company Notice Board
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "35px",
            fontSize: "18px",
          }}
        >
          Stay updated with the latest company announcements.
        </p>

        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {/* Notice 1 */}
          <div
            style={{
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "#fff",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>📅 Team Meeting</h2>
            <hr />
            <p><b>Date:</b> Monday</p>
            <p><b>Time:</b> 10:00 AM</p>
            <p>All employees should attend the weekly meeting.</p>
          </div>

          {/* Notice 2 */}
          <div
            style={{
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#fff",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>🎉 Public Holiday</h2>
            <hr />
            <p><b>Date:</b> August 15</p>
            <p>Office will remain closed for Independence Day.</p>
          </div>

          {/* Notice 3 */}
          <div
            style={{
              background: "linear-gradient(135deg,#f59e0b,#f97316)",
              color: "#fff",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>💰 Salary Update</h2>
            <hr />
            <p>Salary will be credited on the 30th of every month.</p>
          </div>

          {/* Notice 4 */}
          <div
            style={{
              background: "linear-gradient(135deg,#ec4899,#db2777)",
              color: "#fff",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>🎂 Birthday Wishes</h2>
            <hr />
            <p>Happy Birthday to all employees celebrating this month.</p>
          </div>

          {/* Notice 5 */}
          <div
            style={{
              background: "linear-gradient(135deg,#06b6d4,#0284c7)",
              color: "#fff",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>📚 Training Program</h2>
            <hr />
            <p>React & Java Training starts from next Monday.</p>
          </div>

          {/* Notice 6 */}
          <div
            style={{
              background: "linear-gradient(135deg,#7c3aed,#9333ea)",
              color: "#fff",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>🏆 Employee of the Month</h2>
            <hr />
            <p>Congratulations to <b>John David</b> for outstanding performance.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Notice;