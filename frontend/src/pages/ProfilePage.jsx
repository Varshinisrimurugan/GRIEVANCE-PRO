import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";

import "../styles/ProfilePage.css";

import {
  FiMenu,
  FiChevronRight,
  FiArrowLeft,
  FiEdit,
} from "react-icons/fi";

export default function ProfilePage() {

  const userId = localStorage.getItem("userId");

  const [student, setStudent] = useState({

    id: "",

    name: "",

    department: "",

    email: "",

    phone: "",

    hostelBlock: "",

    roomNumber: "",

  });

  const loadProfile = useCallback(async () => {

    try {

      const res = await api.get(`/users/${userId}`);

      const data = res.data;

      setStudent({

        id: data.userId || data.id || "",

        name: data.name || "Student",

        department:
          data.department ||
          "Information Technology",

        email:
          data.email ||
          "student@gmail.com",

        phone:
          data.phone ||
          data.phone_number ||
          "9876543210",

        hostelBlock:
          data.hostelBlock ||
          data.hostel_block ||
          "A Block",

        roomNumber:
          data.roomNumber ||
          data.room_number ||
          "101",

      });

    } catch (err) {

      console.log(err);

    }

  }, [userId]);

  useEffect(() => {

    loadProfile();

  }, [loadProfile]);

  return (

    <div className="student-dashboard">

      <Sidebar />

      <main className="main-content">

        {/* ======================
            TOPBAR
        ====================== */}
                <header className="topbar">

          <div className="top-left">

            <button className="menu-btn">

              <FiMenu />

            </button>

            <div>

              <h1>Student Profile</h1>

              <p>View your personal information</p>

            </div>

          </div>

          <div className="top-right">

            <div className="profile-box">

              <img
                src={`https://ui-avatars.com/api/?background=c89a6b&color=fff&name=${student.name}`}
                alt="student"
              />

              <div>

                <h4>{student.name || "Student"}</h4>

                <p>{student.department || "B.Tech IT"}</p>

              </div>

              <FiChevronRight />

            </div>

          </div>

        </header>

        {/* ======================
            PROFILE CARD
        ====================== */}

        <section className="profile-card">

          <div className="profile-header-card">

            <img
              src={`https://ui-avatars.com/api/?background=8B5E3C&color=fff&size=256&name=${student.name}`}
              alt="student"
            />

            <div>

              <h2>{student.name}</h2>

              <p>Hostel Student</p>

              <button className="edit-btn">

                <FiEdit />

                Edit Profile

              </button>

            </div>

          </div>

          <div className="profile-info-grid">
                        {/* ======================
                STUDENT ID
            ====================== */}

            <div className="info-item">

              <span>Student ID</span>

              <h4>{student.id || "IT2025001"}</h4>

            </div>

            {/* ======================
                DEPARTMENT
            ====================== */}

            <div className="info-item">

              <span>Department</span>

              <h4>{student.department || "Information Technology"}</h4>

            </div>

            {/* ======================
                HOSTEL BLOCK
            ====================== */}

            <div className="info-item">

              <span>Hostel Block</span>

              <h4>{student.hostelBlock || "A Block"}</h4>

            </div>

            {/* ======================
                ROOM NUMBER
            ====================== */}

            <div className="info-item">

              <span>Room Number</span>

              <h4>{student.roomNumber || "101"}</h4>

            </div>

            {/* ======================
                EMAIL
            ====================== */}

            <div className="info-item">

              <span>Email</span>

              <h4>{student.email || "student@gmail.com"}</h4>

            </div>

            {/* ======================
                PHONE NUMBER
            ====================== */}

            <div className="info-item">

              <span>Phone Number</span>

              <h4>{student.phone || "9876543210"}</h4>

            </div>

          </div>

          {/* ======================
              FOOTER
          ====================== */}

          <div className="profile-footer">

            <button
              className="back-dashboard-btn"
              onClick={() => window.location.href = "/student-dashboard"}
            >

              <FiArrowLeft />

              <span>Back to Dashboard</span>

            </button>

          </div>

        </section>

      </main>

    </div>

  );

}
         