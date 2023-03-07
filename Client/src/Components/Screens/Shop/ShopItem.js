import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/style.css";

const ShopItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const { item } = props;
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const Redirectdetail = (id) => {
    navigate("/productdetails/"+id);
  };
  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      setCount(count + 1);
    }
  };

  const imageurl =(url)=>{
    const image = `http://localhost:8000${url}`;
    return image
  }
  return (
    <>
      <div className="collection">
        <div
          className="products"
          style={{
            width: "24rem",
            marginRight: "15px",
            marginLeft: "15px",
            marginBottom: "5rem",
          }}
        >
          <div className="product">
            <div className="top  d-flex" style={{ height: "25rem" }}>
              <img
              src={imageurl(item.image)}
                // src={item.image}
                onClick={() => {
                  Redirectdetail(item.id);
                }}
                className="shopimagehover"
                style={{ height: "20rem", cursor: "pointer" }}
                alt="alt"
              />
              <div className="icon d-flex">
                <i onClick={handleClick} className="bx bxs-heart">
                  {count}
                </i>
              </div>
            </div>
            <div className="bottom">
              <h4
                onClick={() => {
                  Redirectdetail(item.id);
                }}
                className="shopimagehover"
                style={{ cursor: "pointer",marginBottom:"13px" }}
              >
                {item.title}
              </h4>

              <div className="d-flex">
                {item.category === "Vegetables" ||
                item.category === "Fruits" ? (
                  <div
                    className="price"
                  >
                    {item.price}kg
                  </div>
                ) : item.category === "Machinery" ? (
                  <div
                    className="price"
                  >
                   {item.price}/hour
                  </div>
                ) : (
                  <div
                    className="price"
                  >
                   {item.price}/bottle
                  </div>
                )}

                {/* <div className="price">Rate: {item.price}</div> */}
                <div className="rating">
                  {Array(5)
                    .fill(0)
                    .map((_, index) =>
                      index < Math.floor(item.rating) ? (
                        <i key={index} className="bx bxs-star" />
                      ) : index < item.rating ? (
                        <i key={index} className="bx bxs-star-half" />
                      ) : (
                        <i key={index} className="bx bxs-star-empty" />
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopItem;
