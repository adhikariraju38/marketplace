import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import AdminContext from "../context/AdminContext";
import Main from "../Main/Main";
import raju from "../../../images/raju.jpg"

const FarmerList = () => {
  const navigate = useNavigate();
  const context = useContext(AdminContext);
  const { clicked, setClicked,order,getOrder,testFarmer,getBecomeFarmerInfo,getUserInfoAdmin,userInfo } = context

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(
    () => {
      if (localStorage.getItem("admintoken")) {
        getOrder()
        getUserInfoAdmin()
        getBecomeFarmerInfo()
        navigate('/farmerlist')
      } else {
        navigate("/adminlogin");
      }
    }, // eslint-disable-next-line
    []
  );
  const ReverseArray=[];
    const length=order.length;
    for (let index = length-1; index >=0; index--) {
      ReverseArray.push(order[index]);   
    }
  // const dateExtract = (date) => {
  //   const updatedAt = date;
  //   const dateObj = new Date(updatedAt);
  //   const year = dateObj.getFullYear();
  //   const month = dateObj.getMonth() + 1;
  //   const day = dateObj.getDate();
  //   const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
  //     day < 10 ? "0" + day : day
  //   }`;
  //   return formattedDate;
  // };
  const imageurl = (url) => {
    const image = `http://localhost:8000${url}`;
    return image;
  };
  function getDetailsByCreatedBy(createdBy) {
    const filteredDetails = testFarmer.filter(item => {
      return item.name === createdBy;
    });
    return filteredDetails[0].profile_image;
  }

  const groupedOrders = order.reduce((acc, order) => {
    const { ordered_by, order_item, order_quantity } = order;
    const group = acc.find((g) => g.ordered_by === ordered_by);
    if (!group) {
      acc.push({
        ordered_by,
        items: [{ item: order_item, quantity: order_quantity }]
      });
    } else {
      group.items.push({ item: order_item, quantity: order_quantity });
    }
    return acc;
  }, []);
  
  const concatenatedOrders = groupedOrders.map((group) => {
    const items = group.items.map((item) => `${item.item}(${item.quantity}kg)`).join(", ");
    return {
      ordered_by: group.ordered_by,
      items
    };
  });
  
  return (
    <>
      <Sidebar />
      <div>
      </div>
      <section id="content" style={{ marginTop: "-5rem" }}>
        {/* <!-- NAVBAR --> */}
        <nav>
          <i className="bx bx-menu" onClick={handleClick}></i>

          <form action="/">
            <div className="form-input">
              <input type="text" placeholder="Search" name="search" />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <div className="profile">
            <img src={raju} alt="profile"/>
          </div>
          <span>Hello, <b>{userInfo.name}!!</b></span>
        </nav>
        <Main />
      </section>
      <section id="content" style={{ marginTop: "-9%" }}>
        <main className="admin">
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Consumers</h3>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Order</th>
                  </tr>
                </thead>
                <tbody>
                  {concatenatedOrders.map((row,index) => (    
                      <tr key={index}>
                        <td style={{marginRight:"9rem"}}>
                        <img
                          src={imageurl(getDetailsByCreatedBy(row.ordered_by))}
                          alt={row.ordered_by}
                        />
                          <p>{row.ordered_by}</p>
                        </td>
                        <td><p><b>Name of Items: </b></p>{row.items}</td>
                      </tr>  
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default FarmerList;
