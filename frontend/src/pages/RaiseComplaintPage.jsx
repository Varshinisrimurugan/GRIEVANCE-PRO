import React, { useState } from "react";
import axios from "axios";

import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaCloudUploadAlt,
  FaPaperPlane,
  FaThLarge,
  FaBuilding,
  FaLayerGroup,
  FaDoorOpen,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import "../styles/RaiseComplaintPage.css";

const RaiseComplaintPage = () => {

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({

    category: "",

    complaintTitle: "",

    description: "",

    block: "",

    floor: "",

    room: "",

    priority: "",

  });

  /* ==========================
      DROPDOWNS
  ========================== */

  const categories = [
    "Electricity",
    "Water",
    "Internet",
    "Cleaning",
    "Mess / Food",
    "Furniture",
    "Security",
    "Others",
  ];

  const hostelBlocks = [
    "A Block",
    "B Block",
    "C Block",
    "D Block",
  ];

  const floors = [
    "Ground Floor",
    "1st Floor",
    "2nd Floor",
    "3rd Floor",
    "4th Floor",
  ];

  const priorities = [
    "High",
    "Medium",
    "Low",
  ];

  /* ==========================
      HANDLE CHANGE
  ========================== */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

    setErrors({

      ...errors,

      [e.target.name]: "",

    });

  };

  /* ==========================
      IMAGE
  ========================== */

  const handleImage = (e) => {

    if (e.target.files.length > 0) {

      setImage(e.target.files[0]);

    }

  };

  /* ==========================
      VALIDATION
  ========================== */

  const validate = () => {

    let temp = {};

    if (!formData.category)
      temp.category = "Please select complaint category";

    if (!formData.complaintTitle.trim())
      temp.complaintTitle = "Complaint title is required";

    if (!formData.description.trim())
      temp.description = "Description is required";

    if (!formData.block)
      temp.block = "Hostel Block is required";

    if (!formData.floor)
      temp.floor = "Floor Number is required";

    if (!formData.room.trim())
      temp.room = "Room Number is required";

    if (!formData.priority)
      temp.priority = "Priority is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;

  };

  /* ==========================
      SUBMIT
  ========================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      const data = new FormData(); data.append("category", formData.category);
data.append("issue_type", formData.category);
data.append("block_name", formData.block);
data.append("floor_number", formData.floor);
data.append("room_number", formData.room);

data.append("compilant_title", formData.complaintTitle);

data.append(
  "location",
  `${formData.block}, ${formData.floor}, Room ${formData.room}`
);

data.append("description", formData.description);

data.append("priority", formData.priority);

data.append("user_id", 1); // Replace with logged-in user's ID later

if (image) {
  data.append("photo", image);
}
    

     await axios.post(
  "http://localhost:8081/compilants/upload",
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert("Complaint Submitted Successfully!");

      setFormData({
        category: "",
        complaintTitle: "",
        description: "",
        block: "",
        floor: "",
        room: "",
        priority: "",
      });

      setImage(null);

    } catch (err) {

      console.log(err);

      alert("Failed to submit complaint.");

    } finally {

      setLoading(false);

    }

  };
    return (
    <div className="raise-page">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}

      <div className="raise-content">

        {/* ================= HEADER ================= */}

        <div className="raise-header">

          <div className="header-left">

            <button className="menu-btn">

              <FaBars />

            </button>

            <div>

              <h2>Raise Complaint</h2>

              <p>
                Submit your hostel complaint quickly and easily.
              </p>

            </div>

          </div>

          <div className="header-right">

            <div className="notification-btn">

              <FaBell />

              <span>3</span>

            </div>

            <div className="profile-box">

              <FaUserCircle className="profile-icon" />

              <div>

                <h4>Student</h4>

                <p>Hosteller</p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= FORM CARD ================= */}

        <div className="complaint-card">

          <div className="card-title">

            <h2>Raise New Complaint</h2>

            <p>

              Fill in the required details below.

              <span className="required-note">

                * Mandatory Fields

              </span>

            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* ================= CATEGORY ================= */}

            <div className="form-row">

              <div className="form-group">

                <label>

                  Complaint Category

                  <span>*</span>

                </label>

                <div className="input-box">

                  <FaThLarge />

                  <select

                    name="category"

                    value={formData.category}

                    onChange={handleChange}

                  >

                    <option value="">

                      Select Category

                    </option>

                    {categories.map((item) => (

                      <option
                        key={item}
                        value={item}
                      >

                        {item}

                      </option>

                    ))}

                  </select>

                </div>

                {errors.category && (

                  <small>{errors.category}</small>

                )}

              </div>

              {/* ================= TITLE ================= */}

              <div className="form-group">

                <label>

                  Complaint Title

                  <span>*</span>

                </label>

                <input

                  type="text"

                  name="complaintTitle"

                  placeholder="Enter Complaint Title"

                  value={formData.complaintTitle}

                  onChange={handleChange}

                />

                {errors.complaintTitle && (

                  <small>{errors.complaintTitle}</small>

                )}

              </div>

            </div>

            {/* ================= DESCRIPTION ================= */}

            <div className="form-group">

              <label>

                Description

                <span>*</span>

              </label>

              <textarea

                rows="6"

                maxLength="500"

                name="description"

                placeholder="Describe your complaint..."

                value={formData.description}

                onChange={handleChange}

              />

              <div className="character-count">

                {formData.description.length}/500

              </div>

              {errors.description && (

                <small>{errors.description}</small>

              )}

            </div>
                        {/* ================= LOCATION ================= */}

            <div className="form-row-three">

              {/* HOSTEL BLOCK */}

              <div className="form-group">

                <label>
                  Hostel Block <span>*</span>
                </label>

                <div className="input-box">

                  <FaBuilding />

                  <select
                    name="block"
                    value={formData.block}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Hostel Block
                    </option>

                    {hostelBlocks.map((block) => (
                      <option
                        key={block}
                        value={block}
                      >
                        {block}
                      </option>
                    ))}

                  </select>

                </div>

                {errors.block && (
                  <small>{errors.block}</small>
                )}

              </div>

              {/* FLOOR */}

              <div className="form-group">

                <label>
                  Floor Number <span>*</span>
                </label>

                <div className="input-box">

                  <FaLayerGroup />

                  <select
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Floor
                    </option>

                    {floors.map((floor) => (
                      <option
                        key={floor}
                        value={floor}
                      >
                        {floor}
                      </option>
                    ))}

                  </select>

                </div>

                {errors.floor && (
                  <small>{errors.floor}</small>
                )}

              </div>

              {/* ROOM */}

              <div className="form-group">

                <label>
                  Room Number <span>*</span>
                </label>

                <div className="input-box">

                  <FaDoorOpen />

                  <input
                    type="text"
                    name="room"
                    placeholder="Enter Room Number"
                    value={formData.room}
                    onChange={handleChange}
                  />

                </div>

                {errors.room && (
                  <small>{errors.room}</small>
                )}

              </div>

            </div>

            {/* ================= PRIORITY ================= */}

            <div className="form-group">

              <label>
                Priority <span>*</span>
              </label>

              <select
                className="priority-select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option value="">
                  Select Priority
                </option>

                {priorities.map((priority) => (
                  <option
                    key={priority}
                    value={priority}
                  >
                    {priority}
                  </option>
                ))}

              </select>

              {errors.priority && (
                <small>{errors.priority}</small>
              )}

            </div>

            {/* ================= IMAGE ================= */}

            <div className="form-group">

              <label>
                Upload Image
              </label>

              <label className="upload-area">

                <FaCloudUploadAlt className="upload-icon" />

                <h3>Click to Upload Image</h3>

                <p>
                  JPG, PNG or JPEG (Maximum 5 MB)
                </p>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />

              </label>

              {image && (

                <div className="preview-card">

                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                  />

                  <h4>{image.name}</h4>

                </div>

              )}

            </div>
                        {/* ================= GUIDELINES ================= */}

            <div className="guidelines-card">

              <h3>Complaint Guidelines</h3>

              <ul>

                <li>
                  Provide accurate complaint details.
                </li>

                <li>
                  Mention the exact hostel block, floor and room.
                </li>

                <li>
                  Upload an image if available.
                </li>

                <li>
                  Avoid submitting duplicate complaints.
                </li>

              </ul>

            </div>

            {/* ================= SUBMIT BUTTON ================= */}

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >

              <FaPaperPlane />

              {loading
                ? "Submitting..."
                : "Submit Complaint"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default RaiseComplaintPage;

