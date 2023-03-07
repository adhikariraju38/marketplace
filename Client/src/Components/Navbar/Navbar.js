import React, { useState, useEffect} from "react";
import "../Style/style.css";
import Logo from "../images/Logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const host = "http://localhost:8000";
  const [isNavListVisible, setIsNavListVisible] = useState(false);
  // const [status,setStatus]=useState(false)
  const [logged,setLogged]=useState(false)
  const detailInitial=[]
  const[detail,setDetail]=useState(detailInitial)
  const toggleNavList = () => {
    setIsNavListVisible(!isNavListVisible);
  };
  const handleClick = () => {
    navigate("/");
  };

  useEffect(
     () => {
      const fetchuser = async (e) => {
      if (!localStorage.getItem("consumertoken")){
        setLogged(false)
      }
      if (localStorage.getItem("consumertoken"))
      {
        const usertoken = localStorage.getItem("consumertoken");
        const response1 = await fetch(`${host}/api/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usertoken}`,
          },
        });
        const json2 = await response1.json();
        setDetail(json2);
        // setStatus(true)
        setLogged(true)
      }

      else if (localStorage.getItem("normaltoken")){
        const usertoken = localStorage.getItem("normaltoken");
        const response1 = await fetch(`${host}/api/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usertoken}`,
          },
        });
        const json2 = await response1.json();
        setDetail(json2);
        // setStatus(false)
        setLogged(true)
      }
    }
    fetchuser();}, // eslint-disable-next-line
    []
  );

  const handleLogout = (e) => {
    e.preventDefault()
    setDetail({})
    toast.success("Logout Successful", {
      autoClose: 1000, // set autoClose to 1000ms (1 second)
    });
    if (localStorage.getItem("consumertoken"))
    {
      localStorage.removeItem("consumertoken")
      setLogged(false)
      // setStatus(false)
    }
    else if (localStorage.getItem("normaltoken")){
      localStorage.removeItem("normaltoken")
      setLogged(false)
    }
    navigate("/");
  };
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const imageurl =(url)=>{
    const image = `http://localhost:8000${url}`;
    return image
  }
  return (
    <>
      <ToastContainer />
      <nav className="navbar">
        <div className="row container d-flex">
          <div className="logo">
            <center>
              <img
                onClick={handleClick}
                src={Logo}
                style={{ height: "40px", width: "40px", cursor: "pointer" }}
                alt=""
              />
            </center>{" "}
            <center>
              <b>Nepali</b>&nbsp;Harvest
            </center>
          </div>

          <div className={`nav-list d-flex ${isNavListVisible ? "show" : ""}`}>
            <Link to="/" onClick={() => setActivePath("/")}>
              <span className={`link ${activePath === "/" ? "active" : ""}`}>
                Home
              </span>
            </Link>

            <Link to="/shop" onClick={() => setActivePath("/shop")}>
              <span
                className={`link ${activePath === "/shop" ? "active" : ""}`}
              >
                Shop
              </span>
            </Link>

            {/* {!status?<Link
              to="/becomeafarmer"
              onClick={() => setActivePath("/becomeafarmer")}
            >
              <span
                className={`link ${
                  activePath === "/becomeafarmer" ? "active" : ""
                }`}
              >
                Become a Consumer
              </span>
            </Link>:null} */}
{/*             
            {!status ? (
              ""
            ) : (
              <Link
                to="/yourdashboard"
                onClick={() => setActivePath("/yourdashboard")}
              >
                <span
                  className={`link ${
                    activePath === "/yourdashboard" ? "active" : ""
                  }`}
                >
                  Your Dashboard
                </span>
              </Link>
            )} */}

            {/* <Link to="/admin">Admin</Link> */}

            {!isNavListVisible ? (
              ""
            ) : (
              <>
                <Link to="/cart">Cart</Link>
                {!(localStorage.getItem("consumertoken") || localStorage.getItem("normaltoken")) ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                )}
              </>
            )}

            <div className="close" onClick={toggleNavList}>
              <i className="bx bx-x" style={{ cursor: "pointer" }}></i>
            </div>
          </div>

          <div className="icons d-flex" >
            <div className="icon user-icon d-flex" style={{marginRight:"1%"}}>
              <Link to="/cart">
                <i className="bx bx-cart"></i>
              </Link>
            </div>
            <div className="icon user-icon d-flex" style={{marginRight:"-2%"}}>
              <img className="profile" src={imageurl(detail.profile_image)} alt="profile" /><br></br>
              <p style={{fontSize:"50%", margin: "0 0 0 5px"}}>Hello,<b> {detail.name}!</b></p>
            </div>
            <div className="icon user-icon d-flex">
              {!logged ? (
                <Link to="/login">
                  <button
                    type="submit"
                    style={{
                      height: "30px",
                      width: "70px",
                      fontWeight: "400",
                    }}
                    className="btn solid"
                  >
                    Login
                  </button>
                </Link>
              ) : (
                <Link to="/" onClick={handleLogout}>
                  <button
                    type="submit"
                    style={{
                      height: "30px",
                      width: "70px",
                      fontWeight: "400",
                    }}
                    className="btn solid"
                  >
                    Logout
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="hamburger" onClick={toggleNavList}>
            <i
              className="bx bx-menu-alt-right"
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
