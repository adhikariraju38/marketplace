import React, { useState ,useEffect} from "react";
import Logo from "../../images/Logo.png";
import "../../Style/style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FarmerNavbar = () => {
  const navigate = useNavigate();
  const host = "http://localhost:8000";
  const [isNavListVisible, setIsNavListVisible] = useState(false);
  const detailInitial=[]
  const[detail,setDetail]=useState(detailInitial)
  const toggleNavList = () => {
    setIsNavListVisible(!isNavListVisible);
  };
  useEffect(
    () => {
     const fetchuser = async (e) => {
       const usertoken = localStorage.getItem("farmertoken");
       const response1 = await fetch(`${host}/api/profile/`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${usertoken}`,
         },
       });
       const json2 = await response1.json();
       setDetail(json2);
     }

   fetchuser();}, // eslint-disable-next-line
   []
 );
  const handleClick = () => {
    navigate("/");
  };
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const handleLogout = () => {
    localStorage.removeItem("farmertoken");
    toast.success("Logout Successful", {
      autoClose: 1000, // set autoClose to 1000ms (1 second)
    });
    
    navigate("/");
  };
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
            <Link
              to="/yourdashboard"
              onClick={() => setActivePath("/yourdashboard")}
            >
              <span
                className={`link ${
                  activePath === "/yourdashboard" ? "active" : ""
                }`}
              >
                Dashboard
              </span>
            </Link>

            <Link
              to="/addproducts"
              onClick={() => setActivePath("/addproducts")}
            >
              <span
                className={`link ${
                  activePath === "/addproducts" ? "active" : ""
                }`}
              >
                Add Products
              </span>
            </Link>
            <Link
              to="/updatedeleteproducts"
              onClick={() => setActivePath("/updatedeleteproducts")}
            >
              <span
                className={`link ${
                  activePath === "/updatedeleteproducts" ? "active" : ""
                }`}
              >
                Update/Delete Products
              </span>
            </Link>
            <div className="close" onClick={toggleNavList}>
              <i className="bx bx-x" style={{ cursor: "pointer" }}></i>
            </div>
          </div>

          <div className="icons d-flex">
            <div className="icon user-icon d-flex">
              <Link to="/cart">
                <i className="bx bx-cart"></i>
              </Link>
            </div>
            <div
              className="icon user-icon d-flex"
              style={{ marginRight: "-2%" }}
            >
              <img className="profile" src={imageurl(detail.profile_image)} alt="profile" />
              <br></br>
              <p style={{ fontSize: "50%", margin: "0 0 0 5px" }}>
                Hello,<b> {detail.name}!</b>
              </p>
            </div>
            <div
              className="icon user-icon d-flex"
              style={{ marginRight: "-2%" }}
            >
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

export default FarmerNavbar;
