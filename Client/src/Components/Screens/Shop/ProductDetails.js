import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import AdminContext from "../Admin/context/AdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-rating-stars-component";
import loader from "../../images/buttonloader.gif";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [rating1, setRating1] = useState(5);
  const myNumber = parseFloat(id);
  const { products, getProducts } = useContext(AdminContext);
  const [comment, setcomment] = useState({
    body: "",
  });
  const [rating, setRating] = useState({ rating: 0 });

const handleRatingChange = (newRating) => {
  setRating({ rating: newRating });
};

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_id", product.id);
    formData.append("rating", rating.rating);
    formData.append("body", comment.body);
    setLoading(true);
    const token = localStorage.getItem("farmertoken") || localStorage.getItem("normaltoken");
    const response1 = await fetch(`http://127.0.0.1:8000/product/addcomment/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json1 = await response1.json();
    if (json1.success){
      toast.success("Comment Added Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
      else {
        toast.error("Comment Adding Failed! Try Again in few minutes",{
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
          })
    }
    setLoading(false);
    console.log(json1);
    setcomment({
      body:""
    })
    setRating({rating:0})
  };
  const handleChange = (e) => {
    setcomment({
      ...comment,
      [e.target.name]: e.target.value,
    });
    
  };
  useEffect(
    () => {
      getProducts();
      averageRating();
    }, // eslint-disable-next-line
    []
  );

  const product = products.find((product) => product.id === myNumber);
  // const product = products[14]
  const navigate = useNavigate();

  const handlebutton = () => {
    navigate("/shop");
  };

  const sentences = product.description.split(/\.|\?|!/);
  const midIndex = Math.ceil(sentences.length / 2);
  const firstHalf = sentences.slice(0, midIndex);
  const listItems1 = firstHalf.map((sentence, index) => (
    <li style={{ fontSize: "100%" }} key={index}>
      {sentence.trim()}
    </li>
  ));
  const secondHalf = sentences.slice(midIndex);
  const listItems2 = secondHalf.map((sentence, index) => (
    <li style={{ fontSize: "100%" }} key={index}>
      {sentence.trim()}
    </li>
  ));

  const averageRating = () => {
    const totalReview = product.comments.length;
    const totalRating = product.comments.reduce(
      (acc, cur) => acc + cur.rating,
      0
    );
    const averageRating = (totalRating / totalReview).toFixed(1);
    setRating1(averageRating);
  };
  const [quantity1, setQuantity1] = useState(1);

  const handleIncrease = () => {
    if (quantity1<product.quantity){setQuantity1(quantity1 + 1);}
    
    else {
      toast.error("Maximum Quantity Reached!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
  }

  const handleDecrease = () => {
    if (quantity1 > 1) {
      setQuantity1(quantity1 - 1);
    }
    else {
      toast.error("Minimum Quantity Reached!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
  }
  const handleAddToCart =async(id,quantity)=>{
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("quantity", quantity);
    setLoading(true);
    const token = localStorage.getItem("farmertoken") || localStorage.getItem("normaltoken")
    const response = await fetch(`http://localhost:8000/product/cart/add/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json = await response.json();
    console.log(json)
    setLoading(false);
    if (json.msg==="Added to Cart"){
      toast.success("Checkout In Cart", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    else {
      toast.error("Please Login First",{
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
        })
    }
  }
  const imageurl =(url)=>{
    const image = `http://localhost:8000${url}`;
    return image
  }
  // const handlebuyclick =()=>{
  //   localStorage.removeItem("normaltoken")
  // }
  
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <div className="container3">
        <div className="row2 product">
          <div className="col-md-5">
            <div className="product">
              <div className="top">
                <img
                  src={imageurl(product.image)}
                  style={{ width: "100%", padding: "5%" }}
                  alt="alt"
                />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="product" style={{ padding: "5%" }}>
              <h1 style={{ marginLeft: "15%", fontSize: "200%" }}>
                {product.title}
              </h1>
              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "15%" }} className="rating">
                  {Array(5)
                    .fill(0)
                    .map((_, index) =>
                      index < Math.floor(rating1) ? (
                        <i key={index} className="bx bxs-star" />
                      ) : index < rating1 ? (
                        <i key={index} className="bx bxs-star-half" />
                      ) : (
                        <i key={index} className="bx bxs-star-empty" />
                      )
                    )}
                </div>
                <div>{product.comments.length} Ratings</div>
              </div>
              <hr className="horizontal-line"></hr>
              {product.category === "Vegetables" ||
              product.category === "Fruits" ? (
                <div
                  className="price"
                  style={{
                    marginLeft: "15%",
                    fontSize: "300%",
                    color: "#4ca771",
                  }}
                >
                  Rate. {product.price}kg
                </div>
              ) : product.category === "Machinery" ? (
                <div
                  className="price"
                  style={{
                    marginLeft: "15%",
                    fontSize: "300%",
                    color: "#4ca771",
                  }}
                >
                  Rate. {product.price}/hour
                </div>
              ) : (
                <div
                  className="price"
                  style={{
                    marginLeft: "15%",
                    fontSize: "300%",
                    color: "#4ca771",
                  }}
                >
                  Rate. {product.price}/bottle
                </div>
              )}
              <div className="row2 " style={{ marginLeft: "13%" }}>
                <div className="col-md-5">Quantity</div>
                <div className="col-md-7">
                  <FontAwesomeIcon
                  onClick={handleDecrease}
                    icon={faMinus}
                    size="2x"
                    border
                    style={{
                      marginRight: "15%",
                      borderRadius: "20%",
                      borderColor: "black",
                      cursor: "pointer",
                      
                    }}
                  />
                  <span style={{ fontSize: "300%" }}>{quantity1}</span>
                  <FontAwesomeIcon
                  onClick={handleIncrease}
                    icon={faPlus}
                    border
                    style={{
                      marginLeft: "15%",
                      borderRadius: "20%",
                      borderColor: "black",
                      cursor: "pointer",
                    }}
                    size="2x"
                  />
                </div>
              </div>
              <div
                className="row2 "
                style={{ display: "flex", marginLeft: "13%" }}
              >
                <div className="col-md-6 detail">Buy Now</div>
                <div className="col-md-6 detail" onClick={() => handleAddToCart(product.id,quantity1)}>Add To Cart</div>
              </div>
              <div style={{ marginLeft: "13%", marginTop: "2%" }}>
                <span>
                  Quantity Available: <b>{product.quantity}</b>{" "}
                </span>
              </div>
              <div style={{ marginLeft: "13%", marginTop: "2%" }}>
                <span>
                  Uploaded By: <b>{product.uploaded_by}</b>{" "}
                </span>
              </div>
              <button
                className="detailbutton"
                onClick={handlebutton}
                style={{ marginTop: "2%" }}
                type="submit"
              >
                Return to shop
              </button>
            </div>
          </div>
        </div>
        <div className="product" style={{ marginTop: "2%" }}>
          <div style={{ padding: "1%" }}>
            <h3>Product Details of {product.title} </h3>
            <hr className="horizontal-line"></hr>
            <div className="row2 " style={{ display: "flex" }}>
              <div className="col-md-6">{listItems1}</div>
              <div className="col-md-6">{listItems2}</div>
            </div>
          </div>
        </div>
        <div className="product" style={{ marginTop: "2%" }}>
          <div style={{ padding: "1%" }}>
            <h3>Rating and Reviews of {product.title} </h3>
            <hr className="horizontal-line"></hr>
            <center>
              <div style={{ padding: "1%" }}>
                <h3>
                  <b style={{ fontSize: "500%" }}>{rating1}</b>/5
                </h3>
                <div className="rating">
                  {Array(5)
                    .fill(0)
                    .map((_, index) =>
                      index < Math.floor(rating1) ? (
                        <i key={index} className="bx bxs-star" />
                      ) : index < rating1 ? (
                        <i key={index} className="bx bxs-star-half" />
                      ) : (
                        <i key={index} className="bx bxs-star-empty" />
                      )
                    )}
                </div>
                <h3>{product.comments.length} Ratings</h3>
              </div>
            </center>
            <hr className="horizontal-line"></hr>
            <h3>Rate And Comment About The Products </h3>
            <hr className="horizontal-line1"></hr>
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  Rate the Products:
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    id="rating"
                    name="rating"
                    value={comment.rating}
                    onChange={handleRatingChange}
                    emptyIcon={<i className="bx bxs-star-half" />}
                    filledIcon={<i className="bx bxs-star" />}
                  />
                </label>
                <br />
                <label>
                  Comment:
                  <br></br>
                  <textarea
                    className="textarea-class"
                    id="body"
                    name="body"
                    value={comment.body}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                </label>
                <br />
                {loading ? (
                  <button disabled type="submit" className="btn">
                    <span className="loader-container">
                      <img src={loader} alt="loading" />
                    </span>
                  </button>
                ) : (
                  <button
                    disabled={!comment}
                    type="submit"
                    className="btn solid"
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>

            <hr className="horizontal-line"></hr>
            <h3>Product Reviews </h3>
            <hr className="horizontal-line1"></hr>

            <div>
              {product.comments.map((comment, index) => (
                <div key={index}>
                  <div className="rating">
                    {Array(5)
                      .fill(0)
                      .map((_, index) =>
                        index < Math.floor(comment.rating) ? (
                          <i key={index} className="bx bxs-star" />
                        ) : index < product.rating ? (
                          <i key={index} className="bx bxs-star-half" />
                        ) : (
                          <i key={index} className="bx bxs-star-empty" />
                        )
                      )}
                  </div>
                  <span style={{ fontSize: "70%" }}>
                    by <b>{comment.name}</b>
                  </span>
                  <p style={{ fontSize: "70%" }}>{comment.body}</p>
                  <hr className="horizontal-line1"></hr>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
