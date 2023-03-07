import React,{useState,useEffect} from "react";

const TransactionHistory = ({ selectedProductId }) => {
  const host = "http://localhost:8000";
  const transactionHistoryInitial = [];
  const [transactionHistory, setTransactionHistory] = useState(
    transactionHistoryInitial
  );
  const ReverseArray=[];
      const length=transactionHistory.length;
      for (let index = length-1; index >=0; index--) {
        ReverseArray.push(transactionHistory[index]);   
      }
  useEffect(
    () => {
      const getTransaction = async () => {
        //API call
        const token = localStorage.getItem("admintoken");
        const response1 = await fetch(
          `${host}/farmerdetails/farmer/${selectedProductId}/farmingdetails/`,
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
        setTransactionHistory(json1);
      };
      getTransaction();
    }, // eslint-disable-next-line
    []
  );
  function getPureDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month index starts from 0, so add 1 to get the actual month number
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <>
      <div className="collection section">
        <div className="title">
          <span style={{ marginRight: "2rem" }}>Statement</span>
        </div>
      </div>
      {ReverseArray.map((item, index) => {
        return (
          <div className="container-cart" key={index}>
            <div className="cart-cart">
              <div className="products-cart" style={{ margin: "0 auto" }}>
                <div className="product-cart">
                  {/* <img src={imageurl(item.image)} alt={item.title} /> */}
                  <div className="product-info-cart">
                    <h3 className="product-name-cart">
                      <b>Product Received: </b>
                      {item.product_received}
                    </h3>
                    <h4 className="product-price-cart" style={{marginTop:"1%"}}>
                      <b>Payment Done: </b>
                      {item.payment_done}
                    </h4>
                    <p className="product-quantity-cart" style={{marginTop:"1%"}}>
                      <b>Product Sold: </b>
                      {item.product_sold}
                    </p>
                    <p className="product-quantity-cart" style={{marginTop:"1%"}}>
                      <b>Product Remaining: </b>
                      {item.product_remaining}
                    </p>
                    <p className="product-quantity-cart" style={{marginTop:"1%"}}>
                      <b>Date of Transaction: </b>
                      {getPureDate(item.added_on)}
                    </p>
                    {/* <p className="product-remove-cart">
                      <i className="bx bxs-trash" aria-hidden="true"></i>
                      <span
                        className="remove-cart"
                        onClick={() => handleDeleteYesClick(item.cartItemId)}
                      >
                        Remove
                      </span>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TransactionHistory;
