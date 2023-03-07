import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../../images/buttonloader.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";
import AdminContext from "../context/AdminContext";

const AdminLogin = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const response = await fetch(`http://localhost:8000/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    setloading(false);
    if (json.msg==="Login Success") {
    const token = json.token.access;
    const response1 = await fetch(`http://127.0.0.1:8000/api/profile/`, {method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  const json1 =await response1.json();
 
    if (json1.is_admin) {
      //save the auth token and redirect
      localStorage.setItem("admintoken", token);
      toast.success("Admin Login Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
        navigate("/admin", setTimeout(2000));
    }
    else {
      toast.error("You dont have access for admin Page", {
        className: "toast-message",
        timeOut: "2000",
      });
    }
    } else {
      toast.error("You are not a user. Please Signup First", {
        className: "toast-message",
        timeOut: "2000",
      });
    }
    
  };
  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  useEffect(
    () => {
      if (localStorage.getItem("admintoken")) {
        navigate("/admin");
      } else {
        navigate("/adminlogin");
      }
    }, // eslint-disable-next-line
    []
  );
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
          <span>Hello, <b>Admin!!</b></span>
        </nav>
        <div className="container" style={{marginTop:"15%"}}>
        <form onSubmit={handleSubmit} className="form2 sign-up-form1">
          <h1 className="title1">Admin Login</h1>
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

export default AdminLogin;
