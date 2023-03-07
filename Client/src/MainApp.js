import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import Chatbox from './Components/Chatbox/Chatbox';
import AdminLogin from './Components/Screens/Admin/AdminLogin/AdminLogin';
import AdminSIgnup from './Components/Screens/Admin/AdminSIgnup/AdminSIgnup';
import ApproveFarmer from './Components/Screens/Admin/ApproveFarmer/ApproveFarmer';
import AdminState from './Components/Screens/Admin/context/AdminState';
import Dashboard from './Components/Screens/Admin/Dashboard/Dashboard';
import FarmerConnected from './Components/Screens/Admin/FarmerConnected/FarmerConnected';
import FarmerList from './Components/Screens/Admin/Farmers List/FarmerList';
import Store from './Components/Screens/Admin/Store/Store';
import Cart from './Components/Screens/Cart/Cart';
import SignInForm from './Components/Screens/LoginSignUp/SignInForm';
import Seller from './Components/Screens/SellerDetail/Seller';
import ProductDetails from './Components/Screens/Shop/ProductDetails';
import Shop from './Components/Screens/Shop/Shop';
import AddProducts from './Components/Screens/YourDashboard/AddProducts';
import FarmerDashboard from './Components/Screens/YourDashboard/FarmerDashboard';
import UpdateDelete from './Components/Screens/YourDashboard/UpdateDelete';

const MainApp = () => {
  return (
    <>
    <AdminState>
      <Router>
        <Routes>
          <Route exact path="/" element={<App/>} />
          <Route exact path="/login" element={<SignInForm/>} />
          <Route exact path="/becomeaconsumer" element={<Seller/>} />
          <Route exact path="/shop" element={<Shop/>} />
          <Route exact path="/productdetails/:id" element={<ProductDetails/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/admin" element={<Dashboard/>} />
          <Route exact path="/adminlogin" element={<AdminLogin/>} />
          <Route exact path="/adminsignup" element={<AdminSIgnup/>} />
          <Route exact path="/store" element={<Store/>} />
          <Route exact path="/farmerlist" element={<FarmerList/>} />
          <Route exact path="/approvefarmer" element={<ApproveFarmer/>} />
          <Route exact path="/yourdashboard" element={<FarmerDashboard/>} />
          <Route exact path="/addproducts" element={<AddProducts/>} />
          <Route exact path="/updatedeleteproducts" element={<UpdateDelete/>} />
          <Route exact path="/farmerconnected" element={<FarmerConnected/>} />
          <Route exact path="/chatbox" element={<Chatbox/>} />
        </Routes>
      </Router>
      </AdminState>
    </>
  )
}

export default MainApp
