import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/style.css";
import veg from "../images/veg.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/shop");
  };
  const handleClick1 = () => {
    if(localStorage.getItem('normaltoken')){
      navigate("/becomeaconsumer");
    }
    else{
      toast.error("Register/Login First!!", {
        autoClose: 1000, // set autoClose to 1000ms (1 second)
      });
      // navigate("/login")
    }
    
    
  };

  return (
    <div className="hero">
      <div className="row container d-flex">
        <div className="col">
          <span className="subtitle">Bumper Offer Sell Vegetables &</span>
          <h1>
            fru<span className="i">i</span>ts
          </h1>
          <p>FROM FARMER TO OUR STORE TO YOUR HOME</p>
          {localStorage.getItem("consumertoken") ? (
            <>
            <p style={{marginTop:"-5%"}}>
              You’ve made a <b>smart choice</b> by subscribing to our service.<br></br> We hope
              you love your <b>seasonal and exotic vegetables</b>!
            </p>
            <button
            style={{ cursor: "pointer" }}
            onClick={handleClick}
            className="btn2"
          >
            Explore Now!
          </button>
          </>
          ) : (
            <>
            <p style={{marginTop:"-7%"}}>Currently, We are only available at <b>Nawalpur, Sarlahi</b> and <b>Kathmandu</b>. Near to it?</p>
            <p style={{marginTop:"-7%"}}>
              Enjoy a variety of <b>seasonal and exotic vegetables</b> with our
              flexible<br></br> and convenient <b>subscription plans</b>.<br></br> Order now and get 10%
              off your first month!<br></br>
            </p>
            <button
            style={{ cursor: "pointer", marginTop:"-7%" }}
            onClick={handleClick1}
            className="btn2"
          >
            Subscribe Now!
          </button>
          </>
          )}
          
        </div>
        <div className="col">
          <img src={veg} alt="" style={{ height: "100%", width: "40%" }} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
