import React, { useContext,useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminContext from "../context/AdminContext";
import Main from "../Main/Main";
import { useNavigate } from "react-router-dom";
import raju from "../../../images/raju.jpg"

const Dashboard = () => {
  const { clicked, setClicked,getUserInfoAdmin,userInfo } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(
    () => {
      if (localStorage.getItem("admintoken")) {
        getUserInfoAdmin();
        navigate("/admin");
      } else {
        navigate("/adminlogin");
      }
    }, // eslint-disable-next-line
    []
  );
  return (
    <>
      <Sidebar />
      {/* <!-- CONTENT --> */}
      <section id="content" style={{ marginTop: "-5rem" }}>
        {/* <!-- NAVBAR --> */}
        <nav>
          <i className="bx bx-menu" onClick={handleClick}></i>
          <form action="/">      
          </form>
          <div className="profile">
            <img src={raju} alt="profile"/>
          </div>
          <span>Hello, <b>{userInfo.name}!!</b></span>
        </nav>
        <Main/>
      </section>
    </>
  );
};

export default Dashboard;
