import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../context/AdminContext";
import Sidebar from "../Sidebar/Sidebar";
import ShopItem from "../../Shop/ShopItem";
import raju from "../../../images/raju.jpg"
const Store = () => {
  const navigate = useNavigate();
  const { clicked, setClicked,getUserInfoAdmin,userInfo,products,getProducts } = useContext(AdminContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };
  useEffect(
    () => {
      if (localStorage.getItem("admintoken")) {
        getUserInfoAdmin();
        getProducts();
        navigate("/store");
      } else {
        navigate("/adminlogin");
      }
    }, // eslint-disable-next-line
    []
  );

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.store === selectedCategory);
  
      const ReverseArray=[];
      const length=filteredProducts.length;
      for (let index = length-1; index >=0; index--) {
        ReverseArray.push(filteredProducts[index]);   
      }

  const handleClick = () => {
    setClicked(!clicked);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setSearchResults(
      products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  return (
    <>
      <Sidebar />
      {/* <!-- CONTENT --> */}
      <section id="content" style={{ marginTop: "-5rem" }}>
        {/* <!-- NAVBAR --> */}
        <nav>
          <i className="bx bx-menu" onClick={handleClick}></i>
          <form action="/">
            <div className="form-input">
              <input
                type="text"
                placeholder="Search"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <div className="profile">
            <img src={raju} alt="profile"/>
          </div>
          <span>Hello, <b>{userInfo.name}!!</b></span>
        </nav>
        <main>
          <div className="head-title">
            <div className="left">
              <h1
                style={{
                  marginLeft: "5%",
                  marginTop: "3%",
                  marginBottom: "-2%",
                }}
              >
                Categories
              </h1>
            </div>
          </div>
        </main>
        <main>
          <div className="left">
            <section
              className="section collection"
              style={{ marginRight: "" }}
            >
              <div className="filters d-flex">
                <div
                  data-filter="All"
                  className={selectedCategory === "All" ? "active" : ""}
                  onClick={() => handleFilterClick("All")}
                >
                  All
                </div>
                <div
                  data-filter="1"
                  className={selectedCategory === "1" ? "active" : ""}
                  onClick={() => handleFilterClick("1")}
                >
                  Store 1
                </div>
                <div
                  data-filter="2"
                  className={selectedCategory === "2" ? "active" : ""}
                  onClick={() => handleFilterClick("2")}
                >
                  Store 2
                </div>
                {/* <div
                  data-filter="Pesticides"
                  className={selectedCategory === "Pesticides" ? "active" : ""}
                  onClick={() => handleFilterClick("Pesticides")}
                >
                  Pesticides
                </div>
                <div
                  data-filter="Machinery"
                  className={selectedCategory === "Machinery" ? "active" : ""}
                  onClick={() => handleFilterClick("Machinery")}
                >
                  Machinery
                </div> */}
              </div>
              <div className="container section" style={{ marginTop: "-3%" }}>
                <div className="title">
                  <span>All Products</span>
                </div>
                <div className="row2" style={{ marginTop: "-5%" }}>
                  <div className="container3">
                    {products.length === 0 && "No products to display"}
                  </div>
                  {searchTerm === ""
                    ? ReverseArray.map((item) => {
                        return <ShopItem key={item.id} item={item} />;
                      })
                    : searchResults.map((item) => {
                        return <ShopItem key={item.id} item={item} />;
                      })}
                </div>
              </div>
            </section>
          </div>
        </main>
      </section>
    </>
  );
};

export default Store;
