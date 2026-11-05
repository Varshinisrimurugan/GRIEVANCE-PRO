import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserGraduate,
  FaTools,
  FaUserShield,
  FaClipboardList,
  FaClock,
  FaBell,
  FaUsers,
  FaChartBar
} from "react-icons/fa";

import "../styles/RoleSelectionPage.css";


function RoleSelectionPage(){

    const navigate = useNavigate();


    const selectRole = (role)=>{

        localStorage.setItem("selectedRole",role);

        navigate("/login");

    }


    const roles=[
        {
            title:"Student",
            desc:"Raise and track your complaints easily",
            icon:<FaUserGraduate/>,
            color:"student"
        },
        {
            title:"Worker",
            desc:"View and update assigned complaints",
            icon:<FaTools/>,
            color:"worker"
        },
        {
            title:"Admin",
            desc:"Manage complaints and system settings",
            icon:<FaUserShield/>,
            color:"admin"
        }
    ];


    const features=[
        {
            icon:<FaClipboardList/>,
            title:"Easy Complaint",
            text:"Raise complaints in just a few clicks."
        },
        {
            icon:<FaClock/>,
            title:"Real-time Tracking",
            text:"Track the status of your complaints in real-time."
        },
        {
            icon:<FaBell/>,
            title:"Instant Notifications",
            text:"Get instant updates on complaint progress."
        },
        {
            icon:<FaUsers/>,
            title:"Role-based Access",
            text:"Secure access for students, workers and admins."
        },
        {
            icon:<FaChartBar/>,
            title:"Reports & Analytics",
            text:"View insightful reports and analytics."
        }
    ]



return(

<div className="role-page">


<div className="brand">

<div className="logo">
🛡️
</div>

<div>
<h1>GrievancePro</h1>
<p>Smart Complaint Management System</p>
</div>

</div>



<h2>Select Your Role</h2>



<div className="role-container">


{
roles.map((role,index)=>(

<div 
className={`role-card ${role.color}`}
key={index}
>


<div className="role-icon">

{role.icon}

</div>


<h3>
{role.title}
</h3>


<p>
{role.desc}
</p>



<button
onClick={()=>selectRole(role.title)}
>

Select Role 
<span>›</span>

</button>


</div>


))
}


</div>




<div className="feature-box">


{
features.map((item,index)=>(

<div className="feature" key={index}>


<div className="feature-icon">
{item.icon}
</div>


<div>

<h4>{item.title}</h4>

<p>{item.text}</p>

</div>


</div>

))

}



</div>




<footer>

🛡️ GrievancePro © 2025 | All Rights Reserved

</footer>



</div>

)

}


export default RoleSelectionPage;