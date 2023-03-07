import React, { useState } from "react";
import AdminContext from "./AdminContext";

const AdminState = (props) => {
  const host = "http://localhost:8000";
  const [clicked, setClicked] = useState(false);
  const usersInitial = [];
  const userInfoInitial = [];
  const farmerReqInitial = [];
  const testFarmerInitial = [];
  const productInitial = [];
  const farmerProductInitial = [];
  const cartInitial = [];
  const orderInitial = [];
  const [order, setOrder] = useState(orderInitial);
  const farmerConnectedInitial = [];
  const [farmerConnected, setFarmerConnected] = useState(
    farmerConnectedInitial
  );
  const [cart, setCart] = useState(cartInitial);
  const [farmerProducts, setFarmerProducts] = useState(farmerProductInitial);
  const [products, setProducts] = useState(productInitial);
  const [users, setUsers] = useState(usersInitial);
  const [userInfo, setuserInfo] = useState(userInfoInitial);
  const [farmerReq, setFarmerReq] = useState(farmerReqInitial);
  const [testFarmer, setTestFarmer] = useState(testFarmerInitial);
  const [productId, setProductId] = useState(0);

  const getOrder = async () => {
    //API call
    const token = localStorage.getItem("admintoken");
    const response1 = await fetch(
      `${host}/product/fetchorder/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json1 = await response1.json();
    console.log(json1);
    setOrder(json1);
  };

  const getFarmerList = async () => {
    //API call
    const token = localStorage.getItem("admintoken");
    const response1 = await fetch(
      `${host}/farmerdetails/farmers/fetchallfarmer/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json1 = await response1.json();
    console.log(json1);
    setFarmerConnected(json1);
  };

  const getCartItem = async () => {
    //API call
    const token =
      localStorage.getItem("normaltoken") ||
      localStorage.getItem("consumertoken");
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

  const getUsers = async () => {
    //API call
    const admintoken = localStorage.getItem("admintoken");
    const response1 = await fetch(`${host}/api/allusers/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admintoken}`,
      },
    });

    const json1 = await response1.json();
    console.log(json1);
    setUsers(json1);
  };

  const getUserInfoAdmin = async () => {
    //API call
    const usertoken = localStorage.getItem("admintoken");
    const response1 = await fetch(`${host}/api/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
    });
    const json2 = await response1.json();
    console.log(json2);
    setuserInfo(json2);
  };

  const getBecomeFarmerInfo = async () => {
    const admintoken = localStorage.getItem("admintoken");
    const response1 = await fetch(`${host}/api/becomefarmer/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admintoken}`,
      },
    });
    const json = await response1.json();
    console.log(json);
    setFarmerReq(json);
  };

  const getTestFarmer = async () => {
    const admintoken = localStorage.getItem("admintoken");
    const response1 = await fetch(`${host}/api/farmer/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admintoken}`,
      },
    });
    const json = await response1.json();
    console.log(json);
    setTestFarmer(json);
  };

  const getProducts = async () => {
    const response1 = await fetch(`${host}/product/fetchproduct/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response1.json();
    console.log(json);
    setProducts(json);
  };

  const fetchfarmerproducts = async () => {
    const usertoken = localStorage.getItem("admintoken");
    const response1 = await fetch(`${host}/product/fetchfarmerproduct/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
    });
    const json = await response1.json();
    console.log(json);
    setFarmerProducts(json);
  };

  return (
    <AdminContext.Provider
      value={{
        order,
        getOrder,
        getFarmerList,
        farmerConnected,
        cart,
        getCartItem,
        fetchfarmerproducts,
        farmerProducts,
        productId,
        setProductId,
        getUserInfoAdmin,
        userInfo,
        getBecomeFarmerInfo,
        farmerReq,
        testFarmer,
        users,
        setUsers,
        getUsers,
        clicked,
        setClicked,
        getTestFarmer,
        products,
        getProducts,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
