import React, { useState, useRef } from "react";
import loader from "../../images/buttonloader.gif";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Seller.css";

function Form1() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const [imageFile1, setImageFile1] = useState("");
  const [signupCredential, setSignupCredential] = useState({
    phone_number: "",
    citizenship_id_number: "",
    payment: "",
    delivery: "",
    store: "",
  });

  const handleSubmit = async (event) => {
    const token =
    localStorage.getItem("normaltoken");
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile_image", imageFile);
    formData.append("phone_number", signupCredential.phone_number);
    formData.append("citizenship_image", imageFile1);
    formData.append(
      "citizenship_id_number",
      signupCredential.citizenship_id_number
    );
    formData.append("payment", signupCredential.payment);
    formData.append("delivery", signupCredential.delivery);
    formData.append("store", signupCredential.store);
    setLoading(true);
    const response1 = await fetch(`http://127.0.0.1:8000/api/update/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json1 = await response1.json();
    setLoading(false);
    console.log(json1);
    if (json1.msg === "User Updated Successfully") {
      toast.success(
        "Request for Farmer has been submitted successfully! Will hear soon from us",
        {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        }
      );
    } else {
      toast.error("Request Submission Failed", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    setSignupCredential({
      phone_number: "",
      citizenship_id_number: "",
      payment: "",
      delivery: "",
      store: "",
    });
    inputRef.current.value = "";
    inputRef1.current.value = "";
  };
  const handleChange1 = (e) => {
    setSignupCredential({
      ...signupCredential,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleImageChange1 = (e) => {
    setImageFile1(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form2 sign-up-form1">
        <div className="section" style={{ marginBottom: "-3%" }}>
          <div className="title">
            <span>Become a Consumer</span>
          </div>
        </div>

        <label
          htmlFor="profile_image"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Upload Your Image:
        </label>

        <div className="input-field1">
          <i className="bx bxs-image"></i>
          <input
            ref={inputRef1}
            style={{ border: "none" }}
            type="file"
            placeholder="upload your image"
            id="profile_image"
            name="profile_image"
            onChange={handleImageChange}
          />
        </div>
        <label
          htmlFor="phone_number"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Your Phone Number:
        </label>
        <div className="input-field1">
          <i className="bx bxs-phone"></i>

          <input
            type="text"
            id="phone_number"
            placeholder="+977"
            name="phone_number"
            value={signupCredential.phone_number}
            onChange={handleChange1}
          />
        </div>
        <label
          htmlFor="citizenship_image"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Upload Your ID Image:
        </label>
        <div className="input-field1">
          <i className="bx bxs-id-card"></i>

          <input
            ref={inputRef}
            style={{ border: "none" }}
            type="file"
            placeholder="Your Id Pic"
            id="citizenship_image"
            name="citizenship_image"
            onChange={handleImageChange1}
          />
        </div>
        <label
          htmlFor="citizenship_id_number"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Upload Your Id Number:
        </label>
        <div className="input-field1">
          <i className="bx bxs-data"></i>

          <input
            type="text"
            placeholder="Id Number"
            id="citizenship_id_number"
            name="citizenship_id_number"
            value={signupCredential.citizenship_id_number}
            onChange={handleChange1}
          />
        </div>
        <label
          htmlFor="category"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Select Your Payment Schedule:
        </label>
        <div className="input-field1">
          <i className="bx bxs-cube"></i>

          <select
            id="payment"
            name="payment"
            value={signupCredential.payment}
            onChange={handleChange1}
          >
            <option value="">Select Schedule</option>
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
        <label
          htmlFor="category"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Select Your Delivery Time:
        </label>
        <div className="input-field1">
          <i className="bx bxs-cube"></i>

          <select
            id="delivery"
            name="delivery"
            value={signupCredential.delivery}
            onChange={handleChange1}
          >
            <option value="">Delivery Time</option>
            <option value="Morning">Morning(4-8)</option>
            <option value="AfterNoon">AfterNoon(12-2)</option>
            <option value="Evening">Evening(4-7)</option>
          </select>
        </div>
        <label
          htmlFor="store"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Select Your Nearby Store:
        </label>
        <div className="input-field1">
          <i className="bx bxs-cube"></i>

          <select
            name="store"
            value={signupCredential.store}
            onChange={handleChange1}
          >
            <option value="">Nearby Store</option>
            <option value="1">Store 1 - Nawalpur,Sarlahi</option>
            <option value="2">Store 2 - Kathmandu</option>
          </select>
        </div>
        {loading ? (
          <button disabled type="submit" className="btn">
            <span className="loader-container">
              <img src={loader} alt="loading" />
            </span>
          </button>
        ) : (
          <button type="submit" className="btn solid">
            Submit
          </button>
        )}
      </form>
    </>
  );
}

export default Form1;
