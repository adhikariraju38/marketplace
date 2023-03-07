import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminContext from "../context/AdminContext";
import Main from "../Main/Main";
import { useNavigate } from "react-router-dom";
import raju from "../../../images/raju.jpg";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");
const ApproveFarmer = () => {
  const host = "http://localhost:8000";
  const context = useContext(AdminContext);
  const {
    clicked,
    setClicked,
    getBecomeFarmerInfo,
    farmerReq,
    getUserInfoAdmin,
    userInfo,
  } = context;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const handleClick = () => {
    setClicked(!clicked);
  };

  const openModal = (event) => {
    const target = event.target.getBoundingClientRect();
    const modalWidth = 400;
    const modalHeight = 300;
    const leftPosition = target.left + target.width / 2 - modalWidth / 2;
    const topPosition = target.top + window.scrollY - modalHeight - 10;
    setModalPosition({ top: topPosition, left: leftPosition });
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(
    () => {
      if (localStorage.getItem("admintoken")) {
        getBecomeFarmerInfo();
        getUserInfoAdmin();
        navigate("/approvefarmer");
      } else {
        navigate("/adminlogin");
      }
    }, // eslint-disable-next-line
    []
  );
  const handleStatusNo = () => {
    setIsOpen(false);
  };
 const handleYesClick =async(id)=>{
  const usertoken = localStorage.getItem("admintoken");
  const response1 = await fetch(`${host}/api/updateadmin/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usertoken}`,
    },
  });
  const json2 = await response1.json();
  if (json2.message==="User Status was updated"){
    toast.success("User Status Updated Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
    });
  }
  else {
    toast.error("Status Updating Failed",{
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
      })
  }
  localStorage.removeItem("normaltoken")
  navigate('/approvefarmer')
  setIsOpen(false);
}
  return (
    <>
    <ToastContainer/>
      <Sidebar />
      {/* <!-- CONTENT --> */}
      <section id="content" style={{ marginTop: "-5rem" }}>
        {/* <!-- NAVBAR --> */}
        <nav>
          <i className="bx bx-menu" onClick={handleClick}></i>
          <form action="/"></form>
          <div className="profile">
            <img src={raju} alt="profile" />
          </div>
          <span>
            Hello, <b>{userInfo.name}!!</b>
          </span>
        </nav>
        <Main />
      </section>
      <section id="content" style={{ marginTop: "-9%" }}>
        <main className="admin">
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Become a Consumer Request</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {farmerReq.map((row) =>
                    row.status === "inactive" && row.phone_number !== "" ? (
                      <tr key={row.id}>
                        <td>
                          <img src={raju} alt={row.name} />
                          <p>{row.name}</p>
                        </td>
                        <td>
                          <span
                            className="status pending"
                            style={{ cursor: "pointer" }}
                            onClick={openModal}
                          >
                            {row.status}
                          </span>
                          <div className="App">
                            <Modal
                              isOpen={isOpen}
                              onRequestClose={closeModal}
                              className="modal center"
                              overlayClassName="overlay"
                            >
                              <div className="close-icon" onClick={closeModal}>
                                <button
                                  style={{
                                    backgroundColor: "#4ca771",
                                    fontSize: "15px",
                                    height: "16px",
                                    width: "15px",
                                    color: "white",
                                    cursor: "pointer",
                                  }}
                                >
                                  X
                                </button>
                              </div>
                              <span>
                                Are You Sure You Want To Approve this user as a
                                Farmer?
                              </span>
                              <div style={{ display: "flex", marginTop: "2%" }}>
                                <div style={{ marginRight: "2%" }}>
                                  <button
                                    className="detailbutton"
                                    style={{ marginTop: "2%" }}
                                    onClick={() => handleYesClick(row.id)}
                                  >
                                    Yes
                                  </button>
                                </div>
                                <div>
                                  <button
                                    className="detailbutton"
                                    style={{ marginTop: "2%" }}
                                    onClick={handleStatusNo}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ApproveFarmer;
