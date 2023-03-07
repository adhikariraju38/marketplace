import React, { useState, useEffect, useContext } from "react";
import loader from "../../../images/buttonloader.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";
import AdminContext from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminSIgnup = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const token = localStorage.getItem("admintoken")
    const response = await fetch(`http://localhost:8000/api/createsuperuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    setloading(false);
    if (json.msg === "Admin Created Successfully") {
      toast.success("Admin Added Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    else {
        toast.error("Email Already Exist!",{
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
        })
    }
    setCredential({
        name: "",
        email: "",
        password: "",
    })
  };
  useEffect(
    () => {
      if (localStorage.getItem("admintoken")) {
        navigate("/adminsignup");
      } else {
        navigate("/adminlogin");
      }
    }, // eslint-disable-next-line
    []
  );
  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const { clicked, setClicked } = useContext(AdminContext);

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <ToastContainer />
      <Sidebar />
      {/* <!-- CONTENT --> */}
      <section id="content" style={{ marginTop: "-5rem" }}>
        {/* <!-- NAVBAR --> */}
        <nav>
          <i className="bx bx-menu" onClick={handleClick}></i>
          <form action="/"></form>
          <span>
            Hello, <b>Admin!!</b>
          </span>
        </nav>
        <div className="container" style={{ marginTop: "15%" }}>
          <form onSubmit={handleSubmit} className="form2 sign-up-form1">
            <h1 className="title1">Add New Admin</h1>
            <div className="input-field1">
              <i className="bx bxs-user"></i>

              <input
                type="text"
                className="form-control"
                placeholder="FULL NAME"
                id="name"
                onChange={handleChange}
                value={credential.name}
                name="name"
              />
            </div>
            <div className="input-field1">
              <i className="bx bxs-user"></i>

              <input
                type="email"
                className="form-control"
                placeholder="EMAIL"
                id="email"
                onChange={handleChange}
                value={credential.email}
                name="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="input-field">
              <i className="bx bxs-lock"></i>
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={handleChange}
                className="form-control"
                value={credential.password}
                id="password"
                name="password"
                required
                minLength={5}
              />
            </div>
            {loading ? (
              <button disabled type="submit" className="btn">
                <span className="loader-container">
                  <img src={loader} alt="loading" />
                </span>
              </button>
            ) : (
              <button type="submit" className="btn solid">
                Login
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default AdminSIgnup;
