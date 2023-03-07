import React, { useEffect,useState } from "react";
import FarmerFooter from "./FarmerFooter";
import FarmerNavbar from "./FarmerNavbar";
import "./Farmerstyle.css";
import YourProducts from "./YourProducts";
import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
  const host = "http://localhost:8000";
  const productInitial=[]
  const[products,setProducts]=useState(productInitial)

  function filterProductsByDate(product) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
    const filteredProducts = products.filter((product) => {
      const productDate = new Date(product.created_at);
      return productDate >= thirtyDaysAgo;
    });
  
    return filteredProducts.length;
  }
  useEffect(
    () => {
     const fetchfarmerproducts = async (e) => {
       const usertoken = localStorage.getItem("admintoken");
       const response1 = await fetch(`${host}/product/fetchfarmerproduct/`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${usertoken}`,
         },
       });
       const json2 = await response1.json();
       setProducts(json2)
     }
    
   fetchfarmerproducts();}, // eslint-disable-next-line
   []
 );
  const navigate = useNavigate();
  useEffect(
    () => {
      const fetchuser = async (e) => {
        if (localStorage.getItem("admintoken"))
        {
          navigate("/yourdashboard")
        }
        else{
          navigate("/becomeafarmer")
        }
      };
      fetchuser();
    }, // eslint-disable-next-line
    []
  );
  const totalProducts = products.length;
  
  
  return (
    <>
      <header className="header">
        <FarmerNavbar />
      </header>
      <section id="content" style={{ marginTop: "-7rem", marginLeft: "-10%" }}>
        <main className="farmer">
          <div className="head-title">
            <div className="left">
              <h1 style={{ fontSize: "120%" }}>Your Dashboard</h1>
            </div>
          </div>

          <ul className="box-info">
            <li>
              <i className="bx bxs-cube"></i>

              <span className="text">
                <h3>{totalProducts}</h3>
                <p>Total Products</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-cube"></i>
              <span className="text">
                <h3>{filterProductsByDate(products)}</h3>
                <p>Last 30 Days Products</p>
              </span>
            </li>
          </ul>
        </main>
      </section>
      <YourProducts />
      <FarmerFooter />
    </>
  );
};

export default FarmerDashboard;
