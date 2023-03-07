import React, { useState, useEffect,useContext } from "react";
import "../Style/style.css";
import AdminContext from "../Screens/Admin/context/AdminContext";


import Swiper from "swiper";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const navigate = useNavigate();
const [mySwiper, setMySwiper] = useState(null);
const { products, getProducts } = useContext(AdminContext);
const detailInitial=[]
const host = "http://localhost:8000";
  const[detail,setDetail]=useState(detailInitial)
useEffect(
  () => {
    getProducts();
    const fetchuser = async (e) => {
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
        setDetail(json2)
        console.log(json2)
      }
    }
    fetchuser();
  }, // eslint-disable-next-line
  []
);
  useEffect(() => {
    setMySwiper(
      new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: ".custom-pagination",
          clickable: true,
        },
      })
    );

    return () => {
      if (mySwiper !== null) {
        mySwiper.destroy();
      }
    };
  }, // eslint-disable-next-line
  []);
  const Redirectdetail = (id) => {
    navigate("/productdetails/"+id);
  };
  const [clicked, setClicked] = useState(false);
  const handleClick = (id) => {
    if(!clicked){
    setClicked(true);
    }
  };
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        : products.filter((product) => product.category === selectedCategory && product.store === detail.store);
  
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
      const imageurl =(url)=>{
        const image = `http://localhost:8000${url}`;
        return image
      }
  return (
    <>
    {localStorage.getItem("consumertoken")?(<section className="section collection">
      <div className="title">
        <span>NEW ARRIVAL</span>
        <h2>Our New Arrival</h2>
      </div>
      <div className="filters d-flex">
        <div data-filter="All" 
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => handleFilterClick("All")}>
          All
        </div>
        <div
          data-filter="Vegetables"
          className={selectedCategory === "Vegetables" ? "active" : ""}
          onClick={() => handleFilterClick("Vegetables")}
        >
          Vegetables
        </div>
        <div
          data-filter="Fruits"
          className={selectedCategory === "Fruits" ? "active" : ""}
          onClick={() => handleFilterClick("Fruits")}
        >
          Fruits
        </div>
        {/* <div data-filter="Pesticides" 
        className={selectedCategory === "Pesticides" ? "active" : ""}
        onClick={() => handleFilterClick("Pesticides")}>
          Pesticides
        </div>
        <div data-filter="Machinery" 
        className={selectedCategory === "Machinery" ? "active" : ""}
        onClick={() => handleFilterClick("Machinery")}>
          Machinery
        </div> */}
      </div>

      <div className="products container">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {ReverseArray1.map((product) => (
              <div className="swiper-slide" key={product.id}>
                <div className="product">
                  <div className="top d-flex">
                    <img style={{cursor:"pointer"}} src={imageurl(product.image)} alt={product.title} onClick={() => {
                  Redirectdetail(product.id);
                }} />
                    <div className="icon d-flex">
                      <i className="bx bxs-heart" onClick={() => handleClick(product.id)}>{product.count}</i>                   
                    </div>
                    
                  </div>
                  <div className="bottom">
                    <h4 style={{cursor:"pointer",marginBottom:"13px"}} onClick={() => {
                  Redirectdetail(product.id);
                }}>{product.title}</h4>
                    <div className="d-flex">
                    {product.category === "Vegetables" ||
                product.category === "Fruits" ? (
                  <div
                    className="price"
                  >
                    {product.price}kg
                  </div>
                ) : product.category === "Machinery" ? (
                  <div
                    className="price"
                  >
                   {product.price}/hour
                  </div>
                ) : (
                  <div
                    className="price"
                  >
                   {product.price}/bottle
                  </div>
                )}

                      <div className="rating">
                        {Array(5)
                          .fill(0)
                          .map((_, index) =>
                            index < Math.floor(product.rating) ? (
                              <i key={index} className="bx bxs-star" />
                            ) : index < product.rating ? (
                              <i key={index} className="bx bxs-star-half" />
                            ) : (
                              <i key={index} className="bx bxs-star-empty" />
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <div className="custom-pagination"></div>
        </div>
      </div>
    </section>):(<section className="section collection">
      <div className="title">
        <span>NEW ARRIVAL</span>
        <h2>Our New Arrival</h2>
      </div>
      <div className="filters d-flex">
        <div data-filter="All" 
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => handleFilterClick("All")}>
          All
        </div>
        <div
          data-filter="Vegetables"
          className={selectedCategory === "Vegetables" ? "active" : ""}
          onClick={() => handleFilterClick("Vegetables")}
        >
          Vegetables
        </div>
        <div
          data-filter="Fruits"
          className={selectedCategory === "Fruits" ? "active" : ""}
          onClick={() => handleFilterClick("Fruits")}
        >
          Fruits
        </div>
        {/* <div data-filter="Pesticides" 
        className={selectedCategory === "Pesticides" ? "active" : ""}
        onClick={() => handleFilterClick("Pesticides")}>
          Pesticides
        </div>
        <div data-filter="Machinery" 
        className={selectedCategory === "Machinery" ? "active" : ""}
        onClick={() => handleFilterClick("Machinery")}>
          Machinery
        </div> */}
      </div>

      <div className="products container">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {ReverseArray.map((product) => (
              <div className="swiper-slide" key={product.id}>
                <div className="product">
                  <div className="top d-flex">
                    <img style={{cursor:"pointer"}} src={imageurl(product.image)} alt={product.title} onClick={() => {
                  Redirectdetail(product.id);
                }} />
                    <div className="icon d-flex">
                      <i className="bx bxs-heart" onClick={() => handleClick(product.id)}>{product.count}</i>                   
                    </div>
                    
                  </div>
                  <div className="bottom">
                    <h4 style={{cursor:"pointer",marginBottom:"13px"}} onClick={() => {
                  Redirectdetail(product.id);
                }}>{product.title}</h4>
                    <div className="d-flex">
                    {product.category === "Vegetables" ||
                product.category === "Fruits" ? (
                  <div
                    className="price"
                  >
                    {product.price}kg
                  </div>
                ) : product.category === "Machinery" ? (
                  <div
                    className="price"
                  >
                   {product.price}/hour
                  </div>
                ) : (
                  <div
                    className="price"
                  >
                   {product.price}/bottle
                  </div>
                )}

                      <div className="rating">
                        {Array(5)
                          .fill(0)
                          .map((_, index) =>
                            index < Math.floor(product.rating) ? (
                              <i key={index} className="bx bxs-star" />
                            ) : index < product.rating ? (
                              <i key={index} className="bx bxs-star-half" />
                            ) : (
                              <i key={index} className="bx bxs-star-empty" />
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <div className="custom-pagination"></div>
        </div>
      </div>
    </section>)}
    
    </>
  );
};

export default Collection;
