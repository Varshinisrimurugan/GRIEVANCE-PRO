import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";

import "../styles/FeedbackPage.css";
import "../styles/StudentDashboard.css";

import {
  FiMenu,
  FiChevronRight,
  FiSend,
} from "react-icons/fi";

export default function FeedbackPage() {

  const userId = localStorage.getItem("userId");

  const [student, setStudent] = useState({

    name: "",

    department: "",

    email: "",

  });

  const [feedback, setFeedback] = useState({

    complaintId: "",

    rating: 0,

    comments: "",

  });

  const loadProfile = useCallback(async () => {

    try {

      const res = await api.get(`/users/${userId}`);

      setStudent({

        name: res.data.name || "Student",

        department:
          res.data.department ||
          "Information Technology",

        email:
          res.data.email ||
          "student@gmail.com",

      });

    } catch (err) {

      console.log(err);

    }

  }, [userId]);

  useEffect(() => {

    loadProfile();

  }, [loadProfile]);

  const submitFeedback = (e) => {

    e.preventDefault();

    alert("Feedback Submitted Successfully");

  };

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

              <h1>Student Feedback</h1>

              <p>
                Share your hostel service experience
              </p>

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

                <p>
                  {student.department || "B.Tech IT"}
                </p>

              </div>

              <FiChevronRight />

            </div>

          </div>


        </header>

        {/* ======================
            FEEDBACK CARD
        ====================== */}

        <section className="feedback-card">

          <div className="feedback-header">
          
                    <div>

            <span className="feedback-badge">
              STUDENT FEEDBACK
            </span>

            <h2>
              Share Your <span>Experience</span>
            </h2>

            <p>
              Help us improve our hostel services by sharing your
              valuable feedback.
            </p>

          </div>

          <div className="feedback-image">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt="Feedback"
            />

          </div>

        </div>

        <form
          className="feedback-form"
          onSubmit={submitFeedback}
        >

          {/* ======================
              COMPLAINT ID
          ====================== */}

          <div className="form-group">

            <label>Complaint ID</label>

            <input
              type="text"
              placeholder="Enter Complaint ID"
              value={feedback.complaintId}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  complaintId: e.target.value,
                })
              }
            />

          </div>

          {/* ======================
              RATING
          ====================== */}

          <div className="form-group">

            <label>Overall Rating</label>

            <div className="rating-stars">

              {[1, 2, 3, 4, 5].map((star) => (

                <span
                  key={star}
                  className={
                    star <= feedback.rating
                      ? "star active"
                      : "star"
                  }
                  onClick={() =>
                    setFeedback({
                      ...feedback,
                      rating: star,
                    })
                  }
                >
                  ★
                </span>

              ))}

            </div>

          </div>

          {/* ======================
              COMMENTS
          ====================== */}

          <div className="form-group">

            <label>Comments</label>

            <textarea
              rows="5"
              placeholder="Write your feedback here..."
              value={feedback.comments}
              onChange={(e) =>
                setFeedback({
                  ...feedback,
                  comments: e.target.value,
                })
              }
            />
                      </div>

          {/* ======================
              SUBMIT BUTTON
          ====================== */}

          <button
            type="submit"
            className="submit-btn"
          >

            <FiSend />

            <span>Submit Feedback</span>

          </button>

        </form>

      </section>

    </main>

  </div>

);

}
