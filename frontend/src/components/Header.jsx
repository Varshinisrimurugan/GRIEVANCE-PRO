import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">

      <div className="header-left">

        <h1>
          Welcome Back,
          <span> Varshini 👋</span>
        </h1>

        <p>
          Manage your hostel complaints easily.
        </p>

      </div>

      <div className="header-right">

        <div className="search-box">

          <FaSearch className="search-icon"/>

          <input
            type="text"
            placeholder="Search complaint..."
          />

        </div>

        <div className="notification">

          <FaBell/>

          <span>3</span>

        </div>

        <div className="profile">

          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
          />

          <div>

            <h4>Varshini Sri</h4>

            <p>Student</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Header;