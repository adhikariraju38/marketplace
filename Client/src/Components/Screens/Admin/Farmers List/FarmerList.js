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
                  {ReverseArray.map((row) => (    
                      <tr key={row.id}>
                        <td style={{marginRight:"9em"}}>
                        <img
                          src={imageurl(getDetailsByCreatedBy(row.ordered_by))}
                          alt={row.ordered_by}
                        />
                          <p>{row.ordered_by}</p>
                        </td>
                        <td>{row.order_message}</td>
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
