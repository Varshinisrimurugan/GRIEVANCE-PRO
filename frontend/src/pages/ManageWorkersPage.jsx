import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import {
    FaUsers,
    FaUserCheck,
    FaUserClock,
    FaUserSlash,
    FaSearch
} from "react-icons/fa";

import "../styles/ManageWorkersPage.css";

function ManageWorkersPage() {

    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("");

    useEffect(() => {

        loadWorkers();

    }, []);

    // ==========================================
    // LOAD WORKERS
    // ==========================================

    const loadWorkers = async () => {

        try {

            const response = await api.get("/workers");

            setWorkers(response.data);

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Unable to load workers"

            });

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const updateStatus = async (workerId, workerStatus) => {

        try {

            await api.put(

                `/workers/${workerId}/status?workerStatus=${workerStatus}`

            );

            Swal.fire({

                icon: "success",

                title: "Worker Status Updated",

                timer: 1200,

                showConfirmButton: false

            });

            loadWorkers();

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Unable to update worker"

            });

        }

    };

    // ==========================================
    // DASHBOARD COUNTS
    // ==========================================

    const totalWorkers = workers.length;

    const availableWorkers = workers.filter(
        w => w.workerStatus === "AVAILABLE"
    ).length;

    const busyWorkers = workers.filter(
        w => w.workerStatus === "BUSY"
    ).length;

    const leaveWorkers = workers.filter(
        w => w.workerStatus === "ON_LEAVE"
    ).length;
        // ==========================================
    // SEARCH + FILTER
    // ==========================================

    const filteredWorkers = workers.filter((worker) => {

        const matchesSearch =

            worker.worker_name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            worker.email
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            worker.phone_number
                ?.includes(search);

        const matchesSpecialization =

            specialization === "" ||

            worker.specialization === specialization;

        return matchesSearch && matchesSpecialization;

    });

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="loading">

                Loading Workers...

            </div>

        );

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="admin-dashboard">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="manage-workers-page">

                    {/* Page Header */}

                    <div className="workers-header">

                        <div>

                            <h2>Manage Workers</h2>

                            <p>

                                Manage worker availability, assignments and performance.

                            </p>

                        </div>

                    </div>

                    {/* Dashboard Cards */}

                    <div className="worker-cards">

                        <div className="worker-card">

                            <FaUsers className="card-icon total" />

                            <h3>{totalWorkers}</h3>

                            <span>Total Workers</span>

                        </div>

                        <div className="worker-card">

                            <FaUserCheck className="card-icon available" />

                            <h3>{availableWorkers}</h3>

                            <span>Available</span>

                        </div>

                        <div className="worker-card">

                            <FaUserClock className="card-icon busy" />

                            <h3>{busyWorkers}</h3>

                            <span>Busy</span>

                        </div>

                        <div className="worker-card">

                            <FaUserSlash className="card-icon leave" />

                            <h3>{leaveWorkers}</h3>

                            <span>On Leave</span>

                        </div>

                    </div>

                    {/* Search & Filter */}

                    <div className="top-controls">

                        <div className="search-box">

                            <FaSearch />

                            <input

                                type="text"

                                placeholder="Search worker..."

                                value={search}

                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }

                            />

                        </div>

                        <select

                            value={specialization}

                            onChange={(e) =>
                                setSpecialization(e.target.value)
                            }

                        >

                            <option value="">
                                All Specializations
                            </option>

                            <option value="Electrician">
                                Electrician
                            </option>

                            <option value="Plumber">
                                Plumber
                            </option>

                            <option value="Cleaner">
                                Cleaner
                            </option>

                            <option value="Carpenter">
                                Carpenter
                            </option>

                        </select>

                    </div>

                    {/* Workers Table */}

                    <table className="workers-table">
                        <thead>

    <tr>

        <th>ID</th>

        <th>Worker</th>

        <th>Specialization</th>

        <th>Phone</th>

        <th>Status</th>

        <th>Active Complaints</th>

        <th>Action</th>

    </tr>

</thead>

                  <tbody>

    {

        filteredWorkers.length === 0 ? (

            <tr>

                <td
                    colSpan="8"
                    className="no-data"
                >

                    No Workers Found

                </td>

            </tr>

        ) : (

            filteredWorkers.map((worker) => (

                <tr key={worker.worker_id}>

                    {/* Worker ID */}

                    <td>

                        WRK{String(worker.worker_id).padStart(3, "0")}

                    </td>

                    {/* Worker Name */}
<td>

    <div className="worker-info">

        <div className="worker-avatar">

            {(worker.worker_name || worker.email || "U").charAt(0).toUpperCase()}

        </div>

        <div>

            <h4>

                {worker.worker_name || "Unknown Worker"}

            </h4>

            <p>

                {worker.email || "No Email"}

            </p>

        </div>

    </div>

</td>

{/* Phone */}

<td>

    {worker.phone_number || "Not Available"}

</td>
                   
                    {/* Specialization */}

                    <td>

                        {worker.specialization}

                    </td>

                    {/* Phone */}

                    <td>

                        {worker.phone_number}

                    </td>

                    {/* Status */}

                    <td>

                        <span
                            className={`status-badge ${worker.workerStatus?.toLowerCase()}`}
                        >

                            {worker.workerStatus === "AVAILABLE" && "🟢 Available"}

                            {worker.workerStatus === "BUSY" && "🔴 Busy"}

                            {worker.workerStatus === "ON_LEAVE" && "🟡 On Leave"}

                        </span>

                    </td>

                    {/* Active Complaints */}

                    <td>

                        <span className="complaint-count">

                            {worker.activeComplaints || 0}

                        </span>

                    </td>

                    {/* Change Status */}

                    <td>

                        <select

                            className="status-select"

                            defaultValue={worker.workerStatus}

                            onChange={(e) =>

                                updateStatus(

                                    worker.worker_id,

                                    e.target.value

                                )

                            }

                        >

                            <option value="AVAILABLE">

                                AVAILABLE

                            </option>

                            <option value="BUSY">

                                BUSY

                            </option>

                            <option value="ON_LEAVE">

                                ON LEAVE

                            </option>

                        </select>

                    </td>

                </tr>

            ))

        )

    }

</tbody>

</table>

                </div>

            </div>

        </div>

    );

}

export default ManageWorkersPage;