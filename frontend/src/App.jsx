import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

/* ==========================================
   Landing & Login
========================================== */

import RoleSelectionPage from "./pages/RoleSelectionPage";
import LoginPage from "./pages/LoginPage";

/* ==========================================
   Student Pages
========================================== */

import StudentDashboard from "./pages/StudentDashboard";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import RaiseComplaintPage from "./pages/RaiseComplaintPage";
import MyComplaintsPage from "./pages/MyComplaintsPage";
import NotificationPage from "./pages/NotificationPage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

/* ==========================================
   Worker Pages
========================================== */

import WorkerDashboard from "./pages/WorkerDashboard";
import AssignedComplaints from "./pages/AssignedComplaints";
import UpdateStatus from "./pages/UpdateStatus";
import WorkerProfile from "./pages/WorkerProfile";
import WorkerNotification from "./pages/WorkerNotification";
import WorkerInProgress from "./pages/WorkerInProgress";
import WorkerResolved from "./pages/WorkerResolved";
import WorkerSettings from "./pages/WorkerSettings";

/* ==========================================
   Admin Pages
========================================== */

import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaintsPage from "./pages/AdminComplaintsPage";
import PendingComplaintsPage from "./pages/PendingComplaintsPage";
import InProgressComplaintsPage from "./pages/InProgressComplaintsPage";
import ResolvedComplaintsPage from "./pages/ResolvedComplaintsPage";
import AssignWorkerPage from "./pages/AssignWorkerPage";
import ManageWorkersPage from "./pages/ManageWorkersPage";
import ReportsPage from "./pages/ReportsPage";
import AdminNotificationPanel from "./components/AdminNotificationPanel";
import AdminFeedbackPage from "./pages/AdminFeedbackPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";

function App() {
  return (
    <Router>
      <div className="app-wrapper">

        <Routes>

          {/* ==========================================
              Landing
          ========================================== */}

          <Route path="/" element={<RoleSelectionPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ==========================================
              Student
          ========================================== */}

          <Route
            path="/student-register"
            element={<StudentRegisterPage />}
          />

          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/raise-complaint"
            element={<RaiseComplaintPage />}
          />

          <Route
            path="/my-complaints"
            element={<MyComplaintsPage />}
          />

          <Route
            path="/notifications"
            element={<NotificationPage />}
          />

          <Route
            path="/feedback"
            element={<FeedbackPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
                    {/* ==========================================
              Worker
          ========================================== */}

          <Route
            path="/worker-dashboard"
            element={<WorkerDashboard />}
          />

          <Route
            path="/assigned-complaints"
            element={<AssignedComplaints />}
          />

          <Route
            path="/update-status"
            element={<UpdateStatus />}
          />

          <Route
            path="/worker-inprogress"
            element={<WorkerInProgress />}
          />

          <Route
            path="/worker-resolved"
            element={<WorkerResolved />}
          />

          <Route
            path="/worker-notifications"
            element={<WorkerNotification />}
          />

          <Route
            path="/worker-profile"
            element={<WorkerProfile />}
          />

          <Route
            path="/worker-settings"
            element={<WorkerSettings />}
          />
         
          {/* ==========================================
              Admin
          ========================================== */}

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin-complaints"
            element={<AdminComplaintsPage />}
          />

          <Route
            path="/pending-complaints"
            element={<PendingComplaintsPage />}
          />

          <Route
            path="/inprogress-complaints"
            element={<InProgressComplaintsPage />}
          />

          <Route
            path="/resolved-complaints"
            element={<ResolvedComplaintsPage />}
          />

          <Route
            path="/assign-worker"
            element={<AssignWorkerPage />}
          />

          <Route
            path="/manage-workers"
            element={<ManageWorkersPage />}
          />

          <Route
            path="/reports"
            element={<ReportsPage />}
          />

          <Route
            path="/admin-notifications"
            element={<AdminNotificationPanel />}
          />

          <Route
            path="/admin-feedback"
            element={<AdminFeedbackPage />}
          />

          <Route
            path="/admin-settings"
            element={<AdminSettingsPage />}
          />

        </Routes>

      </div>
    </Router>
  );
}

export default App;