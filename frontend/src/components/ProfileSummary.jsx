import React from "react";
import {
  FiMail,
  FiHome,
  FiBook,
  FiUser
} from "react-icons/fi";

export default function ProfileSummary({ student }) {

  return (

    <div className="profile-summary">

      <div className="profile-header">

        <img
          src="https://ui-avatars.com/api/?name=Student&background=8B5E3C&color=fff&size=128"
          alt="Student"
        />

        <h3>{student.name}</h3>

        <p>Hostel Student</p>

      </div>

      <div className="profile-details">

        <div className="detail">

          <FiBook />

          <span>{student.department}</span>

        </div>

        <div className="detail">

          <FiHome />

          <span>Room : {student.room}</span>

        </div>

        <div className="detail">

          <FiMail />

          <span>{student.email || "student@gmail.com"}</span>

        </div>

        <div className="detail">

          <FiUser />

          <span>ID : {student.id || "-"}</span>

        </div>

      </div>

    </div>

  );

}
