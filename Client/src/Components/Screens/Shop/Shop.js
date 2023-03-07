import React, { useState, useContext, useEffect } from "react";
import "../../Style/style.css";
import "./shop.css";
import AdminContext from "../Admin/context/AdminContext";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import ShopItem from "./ShopItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, getProducts } = useContext(AdminContext);
  const host = "http://localhost:8000";
  const detailInitial = [];
  const [detail, setDetail] = useState(detailInitial);

  useEffect(
    () => {
      getProducts();
      const fetchuser = async (e) => {
        if (localStorage.getItem("consumertoken")) {
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
          console.log(json2);
        }
      };
      fetchuser();
    }, // eslint-disable-next-line
    []
  );
  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const filteredProducts1 =
    selectedCategory === "All"
      ? products.filter((product) => product.store === detail.store)
      : products.filter(
          (product) =>
            product.category === selectedCategory &&
            product.store === detail.store
        );

  const ReverseArray = [];
  const length = filteredProducts.length;
  for (let index = length - 1; index >= 0; index--) {
    ReverseArray.push(filteredProducts[index]);
  }
  const ReverseArray1 = [];
  const length1 = filteredProducts1.length;
  for (let index = length1 - 1; index >= 0; index--) {
    ReverseArray1.push(filteredProducts1[index]);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResults1, setSearchResults1] = useState([]);
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setSearchResults(
      products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults1(
      products.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.store === detail.store
      )
    );
  };

  return (
    <>
      <ToastContainer />
      <header className="header">
        <Navbar />
      </header>
      <div className="container2">
        <div className="row2">
          <div className="col-md-2 collection section">
            <div className="title">
              <span>Search Your Item</span>
            </div>
            <div className="input-field1">
              <i className="bx bxs-search" style={{ color: "#c0e6ba" }}></i>
              <input
                type="text"
                placeholder="Search"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="title" style={{ marginTop: "25%" }}>
              <span>Categories</span>
            </div>
            <div className="filters">
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="All"
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => handleFilterClick("All")}
              >
                All
              </div>
              <div
                style={{ marginBottom: "1rem" }}
                data-filter="Vegetables"
                className={selectedCategory === "Vegetables" ? "active" : ""}
                onClick={() => handleFilterClick("Vegetables")}
              >
                Vegetables
              </div>
              <div
                style={{ marginBottom: "1rem", marginRight: "20%" }}
                data-filter="Fruits"
                className={selectedCategory === "Fruits" ? "active" : ""}
                onClick={() => handleFilterClick("Fruits")}
              >
                Fruits{" "}
              </div>
              {/* <div
                style={{ marginBottom: "1rem" }}
                data-filter="Pesticides"
                className={selectedCategory === "Pesticides" ? "active" : ""}
                onClick={() => handleFilterClick("Pesticides")}
              >
                Pesticides
              </div>
              <div
                style={{ marginBottom: "1rem", marginRight: "20%" }}
                data-filter="Machinery"
                className={selectedCategory === "Machinery" ? "active" : ""}
                onClick={() => handleFilterClick("Machinery")}
              >
                Machinery
              </div> */}
            </div>
          </div>
          {localStorage.getItem("consumertoken") ? (
            <div className="col-md-10 section">
              <div className="title">
                <span>Products Stored In Your Subscribed Store</span>
              </div>
              <div className="row2">
                <div className="container3">
                  {products.length === 0 && "No products to display"}
                </div>

                {searchTerm === ""
                  ? ReverseArray1.map((item) => {
                      return <ShopItem key={item.id} item={item} />;
                    })
                  : searchResults1.map((item) => {
                      return <ShopItem key={item.id} item={item} />;
                    })}
              </div>
            </div>
          ) : (
            <div className="col-md-10 section">
              <div className="title">
                <span>All Products</span>
              </div>
              <div className="row2">
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
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
