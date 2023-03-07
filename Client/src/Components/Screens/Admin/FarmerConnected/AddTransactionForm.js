import React, { useState } from "react";
import loader from "../../../images/buttonloader.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTransactionForm = ({ selectedProductId }) => {
  const [loading, setloading] = useState(false);
  const [transaction, setTransaction] = useState({
    product_received: "",
    payment_done: "",
    product_sold: "",
    product_remaining: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_received", transaction.product_received);
    formData.append("payment_done", transaction.payment_done);
    formData.append("product_sold", transaction.product_sold);
    formData.append("product_remaining", transaction.product_remaining);
    setloading(true);
    const token = localStorage.getItem("admintoken");
    const response = await fetch(
      `http://localhost:8000/farmerdetails/farmer/${selectedProductId}/farming_details/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const json = await response.json();
    console.log(json);
    setloading(false);
    if (json.success) {
      toast.success("Transaction Added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    } else {
      toast.error("Transaction Adding Failed", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    setTransaction({
      product_received: "",
      payment_done: "",
      product_sold: "",
      product_remaining: "",
    });
  };
  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  return (
    <>
    <ToastContainer/>
      <form onSubmit={handleSubmit} className="form2 sign-up-form1">
        <div className="section" style={{ marginBottom: "-3%" }}>
          <div className="title">
            <span>Add Transaction</span>
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
              htmlFor="product_received"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Product Received:
            </label>
            <div className="input-field2">
              <i className="bx bxs-cube"></i>

              <input
                style={{ width: "300px" }}
                type="text"
                id="product_received"
                placeholder="For eg: Cabbage 50kg"
                name="product_received"
                value={transaction.product_received}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ marginRight: "6%" }}>
            <label
              htmlFor="payment_done"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Payment Done:
            </label>
            <div className="input-field2">
              <i className="bx bx-dollar"></i>
              <input
                style={{ width: "300px", border: "none" }}
                type="text"
                placeholder="For eg: 1000 paid"
                value={transaction.payment_done}
                id="payment_done"
                name="payment_done"
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
              htmlFor="product_sold"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Product Sold:
            </label>
            <div className="input-field2">
              <i className="bx bx-package"></i>
              <input
                style={{ width: "300px" }}
                type="text"
                id="product_sold"
                placeholder="For eg: 10kg"
                name="product_sold"
                value={transaction.product_sold}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ marginRight: "6%" }}>
            <label
              htmlFor="product_remaining"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Product Remaining:
            </label>
            <div className="input-field2">
              <i className="bx bx-package"></i>
              <input
                style={{ width: "300px" }}
                type="text"
                id="product_remaining"
                placeholder="For eg: 10kg"
                name="product_remaining"
                value={transaction.product_remaining}
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
            Add
          </button>
        )}
      </form>
    </>
  );
};

export default AddTransactionForm;
