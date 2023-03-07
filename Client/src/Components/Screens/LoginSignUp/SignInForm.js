import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewForm.css";
import Logo from "../../images/Logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../../images/buttonloader.gif";

const SignInForm = () => {
  const [loading, setloading] = useState(false);
  const containerRef = useRef(null);

  const handleSignUpClick = () => {
    containerRef.current.classList.add("sign-up-mode");
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("sign-up-mode");
  };
  const [signupCredential, setSignupCredential] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = signupCredential;
    setloading(true);
    const response1 = await fetch(`http://localhost:8000/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, password2 }),
    });
    const json1 = await response1.json();
    setloading(false);
    console.log(json1);
    if (json1.msg === "registration success") {
      //save the auth token and redirect
      toast.success("Registration Successful! Now you can login through your credential");
    } else {
      toast.error(json1.errors.email[0] || json1.errors.password[0], {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSignupCredential({
      name:"",
      email:"",
      password:"",
      password2:""
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const response = await fetch(`http://localhost:8000/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    setloading(false);
    if (json.msg==="Login Success") {
      const token = json.token.access;
      const response1 = await fetch(`http://127.0.0.1:8000/api/profile/`, {method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const json1 =await response1.json();
   
 if(!json1.is_admin && json1.status==="active"){
        localStorage.setItem("consumertoken", token)
        toast.success("Subscribed Consumer Login Successful!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
        });
        navigate("/", setTimeout(2000));
      } 
      else if (json1.is_admin) {
        localStorage.setItem("admintoken", token)
        toast.error("Not a user", {
          className: "toast-message",
          timeOut: "2000",
        });
        navigate("/login", setTimeout(2000));
      }
      else {
        toast.success("Login in Success", {
          className: "toast-message",
          timeOut: "2000",
        });
        navigate("/", setTimeout(2000));
      }
      } else {
        toast.error("You are not a user. Please Signup First", {
          className: "toast-message",
          timeOut: "2000",
        });
      }
      
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleChange1 = (e) => {
    setSignupCredential({
      ...signupCredential,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(
    () => {
      if ( localStorage.getItem("consumertoken") || localStorage.getItem("normaltoken")) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }, // eslint-disable-next-line
    []
  );

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      {/* <Alert alert={alert} /> */}
      <div className="container1" ref={containerRef}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleSubmit} className="sign-in-form form1">
              <div style={{ marginTop: "4rem" }}>
                <img
                  onClick={handleClick}
                  src={Logo}
                  alt=""
                  style={{
                    height: "60px",
                    width: "60px",
                    cursor: "pointer",
                    marginLeft: "2rem",
                  }}
                ></img>
                <p onClick={handleClick}>
                  <b>Nepali</b> Harvest
                </p>
              </div>
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                <i className="bx bxs-user"></i>
                <input
                  type="email"
                  className="form-control"
                  placeholder="EMAIL"
                  id="email"
                  onChange={handleChange}
                  value={credential.email}
                  name="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="input-field">
                <i className="bx bxs-lock"></i>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  onChange={handleChange}
                  className="form-control"
                  value={credential.password}
                  id="password"
                  name="password"
                  required
                  minLength={5}
                />
              </div>
              {/* <input type="submit" value="Login" className="btn solid" /> */}
              {loading ? (
                <button disabled type="submit" className="btn">
                  <span className="loader-container">
                    <img src={loader} alt="loading" />
                  </span>
                </button>
              ) : (
                <button type="submit" className="btn solid">
                  Login
                </button>
              )}
            </form>
            <form onSubmit={handleSubmit1} className="form1 sign-up-form">
              <div style={{ marginTop: "4rem" }}>
                <img
                  onClick={handleClick}
                  src={Logo}
                  alt=""
                  style={{
                    height: "60px",
                    width: "60px",
                    cursor: "pointer",
                    marginLeft: "2rem",
                  }}
                ></img>
                <p onClick={handleClick}>
                  <b>Nepali</b> Harvest
                </p>
              </div>
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  placeholder="FULL NAME"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange1}
                  value={signupCredential.name}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="input-field">
                <i className="bx bxs-envelope"></i>
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange1}
                  value={signupCredential.email}
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="input-field">
                <i className="bx bxs-lock"></i>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange1}
                  value={signupCredential.password}
                  required
                  minLength={5}
                />
              </div>
              <div className="input-field">
                <i className="bx bxs-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  onChange={handleChange1}
                  value={signupCredential.password2}
                  required
                  minLength={5}
                />
              </div>
              {loading ? (
                <button disabled type="submit" className="btn">
                  <span className="loader-container">
                    <img src={loader} alt="loading" />
                  </span>
                </button>
              ) : (
                <button type="submit" className="btn">
                  Signup
                </button>
              )}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3 style={{ fontSize: "3rem" }}>New here ?</h3>
              <p style={{ fontSize: "1.2rem" }}>
                Click On Below Signup button to register quick and have the
                advantage of this beautiful system!!!
              </p>
              <input
                type="submit"
                value="Sign Up"
                onClick={handleSignUpClick}
                id="sign-up-btn"
                className="btn solid"
              />
              <br></br>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3 style={{ fontSize: "3rem" }}>Already Registered ?</h3>
              <p style={{ fontSize: "1.2rem" }}>
                Click on Below Signin button and put your correct credential and
                have the advantage of this beautiful system!!!
              </p>
              <input
                type="submit"
                value="Sign In"
                onClick={handleSignInClick}
                id="sign-in-btn"
                className="btn solid"
              />
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
