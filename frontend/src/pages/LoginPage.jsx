import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";
import "../styles/LoginPage.css";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const selectedRole = localStorage.getItem("selectedRole");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {

                email,
                password

            });

            const data = response.data;

            const selectedRole = localStorage.getItem("selectedRole");

            let backendRole = "";

            if (data.roles && data.roles.length > 0) {

                if (typeof data.roles[0] === "string") {

                    backendRole = data.roles[0];

                }

                else {

                    backendRole =
                        data.roles[0].roleName ||
                        data.roles[0].name ||
                        "";

                }

            }

            else if (data.role) {

                backendRole = data.role;

            }

            backendRole = backendRole.toUpperCase();

            // Validate Role

            if (selectedRole && selectedRole !== backendRole) {

                await Swal.fire({

                    icon: "error",

                    title: "Access Denied",

                    html: `
                        <b>You selected ${selectedRole}</b><br><br>
                        This account belongs to
                        <b>${backendRole}</b>
                    `,

                    confirmButtonColor: "#ef4444"

                });

                localStorage.clear();

                return;

            }

            // Save User Details

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("role", backendRole);

            // Premium Login Popup

            await Swal.fire({

                width: 430,

                background: "#0B1120",

                color: "#ffffff",

                showConfirmButton: false,

                timer: 2400,

                timerProgressBar: false,

                html: `

                <div style="padding:12px">

                    <div style="
                        width:70px;
                        height:70px;
                        margin:auto;
                        border-radius:50%;
                        background:linear-gradient(135deg,#22c55e,#16a34a);
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        font-size:38px;
                        color:white;
                        box-shadow:0 0 20px rgba(34,197,94,.6);
                    ">
                        ✓
                    </div>

                    <h2 style="
                        margin-top:18px;
                        font-size:30px;
                        font-weight:bold;
                        color:white;
                    ">
                        Access Granted
                    </h2>

                    <p style="
                        color:#9ca3af;
                        margin-top:8px;
                        font-size:15px;
                    ">
                        Successfully signed in to
                    </p>

                    <h3 style="
                        color:#fbbf24;
                        margin-top:6px;
                        font-size:24px;
                    ">
                        GrievancePro
                    </h3>

                    <div style="
                        margin-top:18px;
                        background:#111827;
                        border-radius:10px;
                        padding:12px;
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                    ">

                        <div>

                            <div style="
                                color:#9ca3af;
                                font-size:13px;
                            ">
                                Welcome Back
                            </div>

                            <div style="
                                color:#4ade80;
                                font-size:22px;
                                font-weight:bold;
                            ">
                                ${data.name}
                            </div>

                        </div>

                        <div style="
                            border:2px solid #22c55e;
                            color:#22c55e;
                            padding:6px 12px;
                            border-radius:8px;
                            font-weight:bold;
                            font-size:14px;
                        ">
                            ${backendRole}
                        </div>

                    </div>

                    <p style="
                        margin-top:18px;
                        color:#d1d5db;
                        font-size:16px;
                    ">
                        Preparing your dashboard...
                    </p>

                    <div style="
                        width:100%;
                        height:6px;
                        background:#1f2937;
                        border-radius:20px;
                        overflow:hidden;
                    ">

                        <div style="
                            width:100%;
                            height:100%;
                            background:linear-gradient(90deg,#22c55e,#4ade80);
                            animation:loading 2.3s linear;
                        ">
                        </div>

                    </div>

                    <style>

                    @keyframes loading{

                        from{

                            width:0%;

                        }

                        to{

                            width:100%;

                        }

                    }

                    </style>

                </div>

                `

            });

            // Continue in Part 2...
                        // Navigate to Dashboard

            if (backendRole === "STUDENT") {

                navigate("/student-dashboard");

            }

            else if (backendRole === "ADMIN") {

                navigate("/admin-dashboard");

            }

            else if (backendRole === "WORKER") {

                navigate("/worker-dashboard");

            }

            else {

                await Swal.fire({

                    icon: "warning",

                    title: "Unknown Role",

                    text: "Unknown role received from server.",

                    confirmButtonColor: "#f59e0b"

                });

            }

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                await Swal.fire({

                    icon: "error",

                    title: "Login Failed",

                    text: error.response.data,

                    confirmButtonColor: "#ef4444"

                });

            }

            else if (error.request) {

                await Swal.fire({

                    icon: "error",

                    title: "Server Error",

                    text: "Cannot connect to Spring Boot backend.",

                    confirmButtonColor: "#ef4444"

                });

            }

            else {

                await Swal.fire({

                    icon: "error",

                    title: "Error",

                    text: error.message,

                    confirmButtonColor: "#ef4444"

                });

            }

        }

    };

    return (

        <div className="login-wrapper">

            <div className="card login-card shadow">

                <h2 className="login-title">

                    GrievancePro Login

                </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>
                 
                  {
    selectedRole?.toUpperCase() === "STUDENT" && (

        <p className="register-link">

            Don't have an account?{" "}

            <span
                onClick={() => navigate("/student-register")}
            >
                Create Account
            </span>

        </p>

    )
}
                </form>

            </div>

        </div>

    );

}

export default LoginPage;