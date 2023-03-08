import React, { useState,useRef } from "react";
import loader from "../../../images/buttonloader.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFarmerForm = () => {
    const [loading, setloading] = useState(false);
    const [imageFile, setImageFile] = useState("");
    const inputRef1 = useRef(null);
  const [farmer, setFarmer] = useState({
    name: "",
    age: "",
    address: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", farmer.name);
    formData.append("age", farmer.age);
    formData.append("address", farmer.address);
    formData.append("profile_image",imageFile );
    setloading(true);
    const token = localStorage.getItem("admintoken");
    const response = await fetch(
      `http://127.0.0.1:8000/farmerdetails/farmers/new/`,
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
      toast.success("Farmer Added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    } else {
      toast.error("Farmer Adding Failed", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    setFarmer({
        name: "",
        age: "",
        address: "",
    });
    inputRef1.current.value = "";
  };
  const handleChange = (e) => {
    setFarmer({ ...farmer, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  return (
<>
    <ToastContainer/>
      <form onSubmit={handleSubmit} className="form2 sign-up-form1">
        <div className="section" style={{ marginBottom: "-3%" }}>
          <div className="title">
            <span>Add New Farmer</span>
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
              htmlFor="name"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Name:
            </label>
            <div className="input-field2">
              <i className="bx bxs-cube"></i>

              <input
                style={{ width: "300px" }}
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                value={farmer.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ marginRight: "6%" }}>
            <label
              htmlFor="age"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Age:
            </label>
            <div className="input-field2">
              <i className="bx bx-dollar"></i>
              <input
                style={{ width: "300px", border: "none" }}
                type="number"
                placeholder="Age"
                value={farmer.age}
                id="age"
                name="age"
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
              htmlFor="address"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Address:
            </label>
            <div className="input-field2">
              <i className="bx bx-package"></i>
              <input
                style={{ width: "300px" }}
                type="text"
                id="address"
                placeholder="For eg: Kathmandu,Nepal"
                name="address"
                value={farmer.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ marginRight: "6%" }}>
            <label
              htmlFor="profile_image"
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Profile Image:
            </label>
            <div className="input-field1">
          <i className="bx bxs-image"></i>
          <input
            ref={inputRef1}
            style={{ border: "none",width:"300px" }}
            type="file"
            placeholder="upload your image"
            id="profile_image"
            name="profile_image"
            onChange={handleImageChange}
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
  )
}

export default AddFarmerForm
