import React, { useState ,useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Modal.css";
import UpdateForm from "./UpdateForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Admin/Sidebar/Sidebar";
import AdminContext from "../Admin/context/AdminContext";
import raju from "../../images/raju.jpg";

Modal.setAppElement("#root");
const UpdateDelete = () => {
  const host = "http://localhost:8000";
  const productInitial=[]
  const context = useContext(AdminContext);
  const { clicked, setClicked, userInfo,getUserInfoAdmin } = context
  const handleClick = () => {
    setClicked(!clicked);
  };
  const[products,setProducts]=useState(productInitial)
  useEffect(
    () => {
     const fetchfarmerproducts = async (e) => {
       const usertoken = localStorage.getItem("admintoken");
       const response1 = await fetch(`${host}/product/fetchproduct/`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${usertoken}`,
         },
       });
       const json2 = await response1.json();
       setProducts(json2)
     }
    
   fetchfarmerproducts()
   getUserInfoAdmin();}, // eslint-disable-next-line
   []
 );

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  // eslint-disable-next-line
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const openModal = (event,id) => {
    const target = event.target.getBoundingClientRect();
    const modalWidth = 400;
    const modalHeight = 300;
    const leftPosition = target.left + target.width / 2 - modalWidth / 2;
    const topPosition = target.top + window.scrollY - modalHeight - 10;
    setModalPosition({ top: topPosition, left: leftPosition });
    setIsOpen(true);
    setSelectedProductId(id)
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [selectedProductId,setSelectedProductId]=useState(null)
    const openModal1 = (event,id) => {
    const target = event.target.getBoundingClientRect();
    const modalWidth = 400;
    const modalHeight = 300;
    const leftPosition = target.left + target.width / 2 - modalWidth / 2;
    const topPosition = target.top + window.scrollY - modalHeight - 10;
    setModalPosition({ top: topPosition, left: leftPosition });
    setIsOpen1(true);
    setSelectedProductId(id)
  };

 
  const closeModal1 = () => {
    setIsOpen1(false);
  };

  const handlebutton = () => {
    navigate("/yourdashboard");
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setSearchResults(
      products.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  const ReverseArray=[];
      const length=products.length;
      for (let index = length-1; index >=0; index--) {
        ReverseArray.push(products[index]);   
      }
  const navigate = useNavigate();
  useEffect(
    () => {
      const fetchuser = async (e) => {
        if (localStorage.getItem("admintoken"))
        {
          navigate("/updatedeleteproducts")
        }
        else{
          toast.error("Not Authorized!", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
          });
        }
      };
      fetchuser();
    }, // eslint-disable-next-line
    []
  );
  function getPureDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month index starts from 0, so add 1 to get the actual month number
    const day = date.getDate();
  
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  const handleDeleteNoClick =()=>{
    setIsOpen1(false);
  }

  const handleDeleteYesClick=async(id)=>{
    const usertoken = localStorage.getItem("admintoken");
    const response1 = await fetch(`${host}/product/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usertoken}`,
      },
    });
    const json2 = await response1.json();
    if (json2.message==="Product deleted successfully."){
      toast.success("Product Deleted Successful!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
    }
    else {
      toast.error("Product Deletion Failed",{
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
        })
    }
    const newProducts = products.filter((product) => {
      return product.id !== id
    });
    setIsOpen1(false);
    setProducts(newProducts)
  }
  const imageurl =(url)=>{
    const image = `http://localhost:8000${url}`;
    return image
  }
  return (
    <>
    <ToastContainer/>
    <Sidebar />
      <div>
      </div>
      <section id="content" style={{ marginTop: "-5rem" }}>
        {/* <!-- NAVBAR --> */}
        <nav>
          <i className="bx bx-menu" onClick={handleClick}></i>

          <form action="/">
            {/* <div className="form-input">
              <input type="text" placeholder="Search" name="search" />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div> */}
          </form>
          <div className="profile">
            <img src={raju} alt="profile"/>
          </div>
          <span>Hello, <b>{userInfo.name}!!</b></span>
        </nav>
      </section>
      <section id="content" style={{ marginTop: "-9%" }}>
        <main className="admin">
      <div className="container3">
        <div className="title" style={{ marginLeft: "48%" }}>
          <span>Search Your Item</span>
        </div>
        <div
          className="input-field1"
          style={{ marginLeft: "40%", marginBottom: "2%" }}
        >
          <i className="bx bxs-search" style={{ color: "#c0e6ba" }}></i>
          <input
            type="text"
            placeholder="Search"
            name="search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="row2 product">
          {searchTerm === ""
            ? ReverseArray.map((product) => {
                return (
                  <React.Fragment key={product.id}>
                  <div className="col-md-5">
                    <div className="product">
                      <div className="top">
                        <img
                          src={imageurl(product.image)}
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "5%",
                          }}
                          alt="alt"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="product" style={{ padding: "5%" }}>
                      <h1 style={{ marginLeft: "5%", fontSize: "100%" }}>
                        <b>Title: </b>
                        {product.title}
                      </h1>
                      <hr className="horizontal-line"></hr>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginLeft: "5%" }}>
                          <b>Quantity Available: </b>
                          {product.quantity}
                        </div>
                        <div style={{ marginLeft: "5%" }}>
                          <b>Category: </b>
                          {product.category}
                        </div>
                        <div style={{ marginLeft: "5%" }}>
                          <b>Published Date: </b>
                          {getPureDate(product.created_at)}
                        </div>
                      </div>
                      <hr className="horizontal-line"></hr>
                      {product.category === "Vegetables" ||
                      product.category === "Fruits" ? (
                        <div
                          className="price"
                          style={{
                            marginLeft: "15%",
                            fontSize: "100%",
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
                            fontSize: "100%",
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
                            fontSize: "100%",
                            color: "#4ca771",
                          }}
                        >
                          Rate. {product.price}/bottle
                        </div>
                      )}
                      <div
                        style={{
                          marginLeft: "13%",
                          marginTop: "2%",
                          marginBottom: "2%",
                        }}
                      >
                        <span>
                          <b>Description: </b>
                          {product.description}{" "}
                        </span>
                      </div>
                      <div
                        className="row2 "
                        style={{ marginLeft: "13%" }}
                      ></div>
                      <div
                        className="row2 "
                        style={{ display: "flex", marginLeft: "13%" }}
                      >
                        <div className="col-md-6 detail" onClick={(event) => openModal(event,product.id)}>
                          Update
                        </div>
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
                                  cursor:"pointer"
                                }}
                              >
                                X
                              </button>
                            </div>
                            <UpdateForm selectedProductId={selectedProductId} />
                          </Modal>
                        </div>

                        <div className="col-md-6 detail"  onClick={(event) => openModal1(event,product.id)}>
                          Delete
                        </div>
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
                                }}
                              >
                                X
                              </button>
                            </div>
                            <span>Are You Sure You Want To Delete?</span>
                            <div style={{ display: "flex", marginTop:"2%"}}>
                              <div style={{marginRight:"2%"}}>
                                <button onClick={() => handleDeleteYesClick(selectedProductId)}
                                  className="detailbutton"
                                  style={{ marginTop: "2%" }}
                                >
                                  Yes
                                </button>
                              </div>
                              <div>
                                <button onClick={handleDeleteNoClick}
                                  className="detailbutton"
                                  style={{ marginTop: "2%" }}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
                );
              })
            : searchResults.map((product) => {
                return (
                  <React.Fragment key={product.id}>
                    <div className="col-md-5">
                      <div className="product">
                        <div className="top">
                          <img
                            src={imageurl(product.image)}
                            style={{
                              width: "50%",
                              height: "auto",
                              padding: "5%",
                            }}
                            alt="alt"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="product" style={{ padding: "5%" }}>
                        <h1 style={{ marginLeft: "5%", fontSize: "100%" }}>
                          <b>Title: </b>
                          {product.title}
                        </h1>
                        <hr className="horizontal-line"></hr>
                        <div style={{ display: "flex" }}>
                          <div style={{ marginLeft: "5%" }}>
                            <b>Quantity Available: </b>
                            {product.quantity}
                          </div>
                          <div style={{ marginLeft: "5%" }}>
                            <b>Category: </b>
                            {product.category}
                          </div>
                          <div style={{ marginLeft: "5%" }}>
                            <b>Published Date: </b>
                            {getPureDate(product.created_at)}
                          </div>
                        </div>
                        <hr className="horizontal-line"></hr>
                        {product.category === "Vegetables" ||
                        product.category === "Fruits" ? (
                          <div
                            className="price"
                            style={{
                              marginLeft: "15%",
                              fontSize: "100%",
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
                              fontSize: "100%",
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
                              fontSize: "100%",
                              color: "#4ca771",
                            }}
                          >
                            Rate. {product.price}/bottle
                          </div>
                        )}
                        <div
                          style={{
                            marginLeft: "13%",
                            marginTop: "2%",
                            marginBottom: "2%",
                          }}
                        >
                          <span>
                            <b>Description: </b>
                            {product.description}{" "}
                          </span>
                        </div>
                        <div
                          className="row2 "
                          style={{ marginLeft: "13%" }}
                        ></div>
                        <div
                          className="row2 "
                          style={{ display: "flex", marginLeft: "13%" }}
                        >
                          <div className="col-md-6 detail" onClick={openModal}>
                            Update
                          </div>
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
                                    cursor:"pointer"
                                  }}
                                >
                                  X
                                </button>
                              </div>
                              <UpdateForm productId={product.id} />
                            </Modal>
                          </div>

                          <div className="col-md-6 detail" onClick={openModal1}>
                            Delete
                          </div>
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
                                  }}
                                >
                                  X
                                </button>
                              </div>
                              <span>Are You Sure You Want To Delete?</span>
                              <div style={{ display: "flex", marginTop:"2%"}}>
                                <div style={{marginRight:"2%"}}>
                                  <button onClick={() => handleDeleteYesClick(product.id)}
                                    className="detailbutton"
                                    style={{ marginTop: "2%" }}
                                  >
                                    Yes
                                  </button>
                                </div>
                                <div>
                                  <button onClick={handleDeleteNoClick}
                                    className="detailbutton"
                                    style={{ marginTop: "2%" }}
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          <button
            className="detailbutton"
            onClick={handlebutton}
            style={{ marginTop: "2%" }}
            type="submit"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
            </main>
            </section>
    </>
  );
};

export default UpdateDelete;
