import React, { useState } from "react";
import loader from "../../images/buttonloader.gif";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateForm = ({ selectedProductId }) => {
  const [loading, setloading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    quantityAvailable: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const token = localStorage.getItem("admintoken");
    const response = await fetch(
      `http://localhost:8000/product/${selectedProductId}/update/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: product.title,
          quantityAvailable: product.quantityAvailable,
          price: product.price,
          description: product.description,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setloading(false);
    if (json.message === "Product Updated successfully.") {
      toast.success("Product Updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    } else {
      toast.error("Product Updating Failed", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    setProduct({
      title: "",
      price: "",
      quantityAvailable: "",
      description: "",
    });
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form2 sign-up-form1">
        <div className="section" style={{ marginBottom: "-3%" }}>
          <div className="title">
            <span>Update Your Products</span>
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
            Update Product
          </button>
        )}
      </form>
    </>
  );
};

export default UpdateForm;
