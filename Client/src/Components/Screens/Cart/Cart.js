import React, { useContext, useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import "./Cart.css";
import "../../Style/style.css";
import AdminContext from "../Admin/context/AdminContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const host = "http://localhost:8000";
  const cartInitial = [];
  const [cart, setCart] = useState(cartInitial);
  const { getProducts, products } = useContext(AdminContext);

  useEffect(
    () => {
      const getCartItem = async () => {
        //API call
        const token =
          localStorage.getItem("normaltoken") ||
          localStorage.getItem("farmertoken");
        const response1 = await fetch(`${host}/product/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json1 = await response1.json();
        console.log(json1);
        setCart(json1);
      };
      getCartItem();
      getProducts();
    }, // eslint-disable-next-line
    []
  );
  const ReverseArray = [];
  const length = cart.length;
  for (let index = length - 1; index >= 0; index--) {
    ReverseArray.push(cart[index]);
  }
  const cartProductDetails = cart.map(item => {
    const product = products.find(product => product.id === item.product);
    return {
      ...product,
      quantity: item.quantity,
      cartItemId:item.id,
    };
  });
  const totalPrice = cartProductDetails.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleDeleteYesClick = async(id) => {
    const token =
          localStorage.getItem("normaltoken") ||
          localStorage.getItem("farmertoken");
        const response1 = await fetch(`${host}/product/cart/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json1 = await response1.json();
        console.log(json1);
        if (json1.message==="Item deleted successfully from the cart."){
          toast.success("Item Removed Successful!", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
          });
        }
        else {
          toast.error("Item Removing Failed! Wait For a moment",{
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
            })
        }
        window.location.reload();
      };
      const imageurl =(url)=>{
        const image = `http://localhost:8000${url}`;
        return image
      }
  return (
    <>
    <ToastContainer/>
      <header className="header">
        <Navbar />
      </header>
      <div className="collection section">
        <div className="title">
          <span style={{ marginRight: "2rem" }}>Your Cart</span>
        </div>
      </div>
      {cartProductDetails.map((item,index) => {
        return (
          <div className="container-cart" key={index}>
            <div className="cart-cart">
              <div className="products-cart" style={{ margin: "0 auto" }}>
                <div className="product-cart">
                  <img src={imageurl(item.image)} alt={item.title} />
                  <div className="product-info-cart">
                    <h3 className="product-name-cart">{item.title}</h3>
                    <h4 className="product-price-cart">Rs. {item.price}</h4>
                    <p className="product-quantity-cart">
                      <b>Qnt: </b>{item.quantity}
                    </p>
                    <p className="product-remove-cart">
                      <i className="bx bxs-trash" aria-hidden="true"></i>
                      <span
                        className="remove-cart"
                        onClick={() => handleDeleteYesClick(item.cartItemId)}
                      >
                        Remove
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="cart-total-cart"
        style={{ width: "50%", margin: "0 auto" }}
      >
        <p>
          <span>Total Price</span>
          <span>Rs. {totalPrice}</span>
        </p>
        <p>
          <span>Number of Items</span>
          <span>{cartProductDetails.length}</span>
        </p>
        <hr className="hr-cart"></hr>
        <a href="/">Proceed to Checkout</a>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
