import { useState, useContext, useEffect } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import "./Sidebar.css";
import AdminContext from "../context/AdminContext";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AdminContext);
  const { clicked } = context;
  const [activeItem, setActiveItem] = useState(null);

  const sideMenuItems = [
    {
      text: "Dashboard",
      icon: "bx bxs-dashboard",
      url: "/admin",
    },
    {
      text: "Store",
      icon: "bx bxs-shopping-bag-alt",
      url: "/store",
    },
    {
      text: "Consumer List",
      icon: "bx bxs-doughnut-chart",
      url: "/farmerlist",
    },
    {
      text: "Farmers Connected",
      icon: "bx bxs-user",
      url: "/farmerconnected",
    },
    {
      text: "Approve Consumer",
      icon: "bx bxs-message-dots",
      url: "/approvefarmer",
    },
    {
      text: "Add New Admin",
      icon: "bx bxs-user",
      url: "/adminsignup",
    },
    {
      text: "Add New Product",
      icon: "bx bxs-cube",
      url: "/addproducts",
    },
    {
      text: "Update/Delete Products",
      icon: "bx bxs-cube",
      url: "/updatedeleteproducts",
    },
   

  ];
  useEffect(() => {
    const activeIndex = sideMenuItems.findIndex(
      (item) => item.url === location.pathname
    );
    setActiveItem(activeIndex);
  }, [location.pathname, sideMenuItems]);

  const handlelogoutClick =()=>{
    localStorage.removeItem("admintoken");
    navigate("/adminlogin");
  }
  return (
    <section id="sidebar" className={clicked ? "hide" : ""}>
      <Link to="/admin" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">Admin</span>
      </Link>
      <ul className="side-menu top">
        {sideMenuItems.map((item, index) => (
          <li
            key={index}
            className={index === activeItem ? "active" : ""}
            onClick={() => setActiveItem(index)}
          >
            <Link to={item.url}>
              <i className={item.icon}></i>
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        {localStorage.getItem("admintoken")?<li style={{cursor:"pointer"}}>
            <i className="bx bxs-log-out-circle"></i>
            <span className="text" onClick={handlelogoutClick} style={{color:"danger"}}>Logout</span>
        </li>:<li style={{cursor:"pointer"}}>
            <i className="bx bxs-log-in-circle"></i>
            <span className="text" onClick={handlelogoutClick} style={{color:"success"}}>Login</span>
        </li>}
        
      </ul>
    </section>
  );
}

export default Sidebar;
