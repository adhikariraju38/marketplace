import React, { useState, useEffect, useRef, useContext } from "react";
import loader from "../../images/buttonloader.gif";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminContext from "../Admin/context/AdminContext";
import raju from "../../images/raju.jpg";
import Sidebar from "../Admin/Sidebar/Sidebar";

function AddProducts() {
  const [loading, setloading] = useState(false);
  const context = useContext(AdminContext);
  const { clicked, setClicked, userInfo, getUserInfoAdmin } = context;
  const inputRef = useRef(null);
  const [imageFile, setImageFile] = useState("");
  const handleClick = () => {
    setClicked(!clicked);
  };
  const [product, setProduct] = useState({
    title: "",
    category: "",
    quantityAvailable: "",
    price: "",
    description: "",
    store: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("quantity", product.quantityAvailable);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("store", product.store);
    setloading(true);
    const token = localStorage.getItem("admintoken");
    const response = await fetch(`http://localhost:8000/product/add/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json = await response.json();
    console.log(json);
    setloading(false);
    if (json.success) {
      toast.success("Product Added Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    } else {
      toast.error("Product Adding Failed", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    setProduct({
      title: "",
      category: "",
      price: "",
      quantityAvailable: "",
      description: "",
      store: "",
    });
    inputRef.current.value = "";
  };

  const navigate = useNavigate();
  useEffect(
    () => {
      const fetchuser = async (e) => {
        if (localStorage.getItem("admintoken")) {
          navigate("/addproducts");
        } else {
          toast.error("You are Not authorized as an admin!", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
          });
        }
      };
      fetchuser();
      getUserInfoAdmin();
    }, // eslint-disable-next-line
    []
  );
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
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
          <div className="profile">
            <img src={raju} alt="profile" />
          </div>
          <span>
            Hello, <b>{userInfo.name}!!</b>
          </span>
        </nav>
      </section>
      <section id="content" style={{ marginTop: "-5%" }}>
        <main className="admin">
          <form onSubmit={handleSubmit} className="form2 sign-up-form1">
            <div className="section" style={{ marginBottom: "-3%" }}>
              <div className="title">
                <span>Add Products</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "6%" }}>
                <label
                  htmlFor="productTitle"
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  Product Name:
                </label>
                <div className="input-field2">
                  <i className="bx bxs-cube"></i>

                  <input
                    style={{ width: "300px" }}
                    type="text"
                    id="title"
                    placeholder="For eg: Cabbage"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  Product Category:
                </label>
                <div className="input-field2">
                  <i className="bx bxs-cube"></i>

                  <select
                    style={{ width: "300px" }}
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "6%" }}>
                <label
                  htmlFor="Price"
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Price:
                </label>
                <div className="input-field2">
                  <i className="bx bx-dollar"></i>
                  <input
                    style={{ width: "300px", border: "none" }}
                    type="number"
                    placeholder="Product Price"
                    value={product.price}
                    id="price"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="quantityAvailable"
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Quantity Available:
                </label>
                <div className="input-field2">
                  <i className="bx bx-package"></i>
                  <input
                    style={{ width: "300px" }}
                    type="number"
                    id="quantityAvailable"
                    placeholder="For eg: 10kg"
                    name="quantityAvailable"
                    value={product.quantityAvailable}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "6%" }}>
                <label
                  htmlFor="productimage"
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Upload Product Image:
                </label>
                <div className="input-field2">
                  <i className="bx bxs-image"></i>
                  <input
                    ref={inputRef}
                    style={{ width: "300px", border: "none" }}
                    type="file"
                    placeholder="upload product image"
                    id="productimage"
                    name="productimage"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="store"
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Select Store:
                </label>
                <div className="input-field2">
                  <i className="bx bx-package"></i>
                  <select
                  id="store"
                    style={{ width: "300px" }}
                    name="store"
                    value={product.store}
                    onChange={handleChange}
                  >
                    <option value="">Choose Store</option>
                    <option value="1">Store 1 - Nawalpur,Sarlahi</option>
                    <option value="2">Store 2 - Kathmandu</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "3%",
              }}
            >
              <div>
                <label
                  htmlFor="description"
                  style={{
                    fontSize: "20px",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  Product Description:
                </label>
                <div className="input-field2" style={{ height: "auto" }}>
                  <i className="bx bxs-cube"></i>

                  <textarea
                    style={{ width: "650px" }}
                    type="text"
                    id="description"
                    placeholder="For eg: It is fresh. Without any pesticides"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <button disabled type="submit" className="btn">
                <span className="loader-container">
                  <img src={loader} alt="loading" />
                </span>
              </button>
            ) : (
              <button type="submit" className="btn solid">
                Add Product
              </button>
            )}
          </form>
        </main>
      </section>
    </>
  );
}

export default AddProducts;
