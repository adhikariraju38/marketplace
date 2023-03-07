import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import AdminContext from "../context/AdminContext";
import Main from "../Main/Main";
import Modal from "react-modal";
import raju from "../../../images/raju.jpg";
import AddTransactionForm from "./AddTransactionForm";
import TransactionHistory from "./TransactionHistory";

Modal.setAppElement("#root");
const FarmerConnected = () => {
  const navigate = useNavigate();
  const context = useContext(AdminContext);
  const {
    clicked,
    setClicked,
    farmerConnected,
    getFarmerList,
    getUserInfoAdmin,
    userInfo,
  } = context;

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(
    () => {
      if (localStorage.getItem("admintoken")) {
        getUserInfoAdmin();
        getFarmerList();
        console.log(farmerConnected);
        navigate("/farmerconnected");
      } else {
        navigate("/adminlogin");
      }
    }, // eslint-disable-next-line
    []
  );
  const ReverseArray = [];
  const length = farmerConnected.length;
  for (let index = length - 1; index >= 0; index--) {
    ReverseArray.push(farmerConnected[index]);
  }
  const imageurl = (url) => {
    const image = `http://localhost:8000${url}`;
    return image;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  // eslint-disable-next-line
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const openModal = (event, id) => {
    const target = event.target.getBoundingClientRect();
    const modalWidth = 400;
    const modalHeight = 300;
    const leftPosition = target.left + target.width / 2 - modalWidth / 2;
    const topPosition = target.top + window.scrollY - modalHeight - 10;
    setModalPosition({ top: topPosition, left: leftPosition });
    setIsOpen(true);
    setSelectedProductId(id);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [selectedProductId, setSelectedProductId] = useState(null);
  const openModal1 = (event, id) => {
    const target = event.target.getBoundingClientRect();
    const modalWidth = 400;
    const modalHeight = 300;
    const leftPosition = target.left + target.width / 2 - modalWidth / 2;
    const topPosition = target.top + window.scrollY - modalHeight - 10;
    setModalPosition({ top: topPosition, left: leftPosition });
    setIsOpen1(true);
    setSelectedProductId(id);
  };
  const closeModal1 = () => {
    setIsOpen1(false);
  };

  return (
    <>
      <Sidebar />
      <div></div>
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
                <h3>Farmers</h3>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Farmer</th>
                    <th>Address</th>
                    <th>Add Transaction</th>
                    <th>Statement</th>
                  </tr>
                </thead>
                <tbody>
                  {ReverseArray.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <img
                          src={imageurl(row.profile_image_url)}
                          alt={row.name}
                        />
                        <p>
                          {row.name}({row.age})
                        </p>
                      </td>
                      <td>{row.address}</td>
                      <td>
                        <button
                          onClick={(event) => openModal(event, row.id)}
                          type="submit"
                          style={{
                            height: "30px",
                            width: "70px",
                            fontSize: "10px",
                          }}
                          className="btn solid"
                        >
                          Add
                        </button>
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
                            <AddTransactionForm
                              selectedProductId={selectedProductId}
                            />
                          </Modal>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={(event) => openModal1(event, row.id)}
                          type="submit"
                          style={{
                            height: "30px",
                            width: "70px",
                            fontSize: "10px",
                          }}
                          className="btn solid"
                        >
                          View
                        </button>
                        <div className="App">
                          <Modal
                            isOpen={isOpen1}
                            onRequestClose={closeModal1}
                            className="modal center"
                            overlayClassName="overlay"
                          >
                            <div className="close-icon" onClick={closeModal1}>
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
                            <div
                              style={{
                                maxHeight: "calc(100vh - 200px)",
                                overflowY: "auto",
                              }}
                            >
                              <TransactionHistory
                                selectedProductId={selectedProductId}
                              />
                            </div>
                          </Modal>
                        </div>
                      </td>
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

export default FarmerConnected;
