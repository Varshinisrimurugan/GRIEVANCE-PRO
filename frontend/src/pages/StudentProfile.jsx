import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaDoorOpen,
  FaGraduationCap,
  FaUserEdit,
  FaLock,
  FaSave,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import API from "../services/complaintService";
import "./StudentProfile.css";

const StudentProfile = () => {
  const userId = localStorage.getItem("userId") || 1;

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone_number: "",
    department: "Information Technology",
    year: "IV",
    hostel_block: "",
    room_number: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await API.get(`/users/${userId}`);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    if (e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveProfile = async () => {
    try {
      await API.put(`/users/${userId}`, student);
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Unable to Update Profile");
    }
  };

  return (
    <div className="profile-wrapper">
      <Sidebar />

      <div className="profile-main">
        <div className="profile-title">
          <h2>Student Profile</h2>
          <p>Manage your personal information</p>
        </div>

        <div className="profile-card">

          {/* Left Side */}

          <div className="profile-left">

            <div className="image-box">
              {image ? (
                <img src={image} alt="Profile" />
              ) : (
                <FaUserCircle className="default-image" />
              )}

              <label className="camera-btn">
                <FaCamera />

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            </div>

            <h3>{student.name || "Student Name"}</h3>

            <p>{student.department}</p>

            <div className="student-id">
              Student ID : {userId}
            </div>

          </div>

          {/* Right Side */}

          <div className="profile-right">

            <div className="profile-grid">

              <div>
                <label>Full Name</label>

                <div className="input-icon">
                  <FaUserEdit />

                  <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Email</label>

                <div className="input-icon">
                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Phone Number</label>

                <div className="input-icon">
                  <FaPhone />

                  <input
                    type="text"
                    name="phone_number"
                    value={student.phone_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Department</label>

                <div className="input-icon">
                  <FaGraduationCap />

                  <input
                    type="text"
                    name="department"
                    value={student.department}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Hostel Block</label>

                <div className="input-icon">
                  <FaBuilding />

                  <input
                    type="text"
                    name="hostel_block"
                    value={student.hostel_block}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Room Number</label>

                <div className="input-icon">
                  <FaDoorOpen />

                  <input
                    type="text"
                    name="room_number"
                    value={student.room_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>

            <div className="button-group">

              <button
                className="save-btn"
                onClick={saveProfile}
              >
                <FaSave />

                Save Changes
              </button>

              <button className="password-btn">
                <FaLock />

                Change Password
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentProfile;