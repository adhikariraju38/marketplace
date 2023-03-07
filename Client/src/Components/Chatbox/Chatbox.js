import React, { useState } from "react";
import "./Chatbox.css";

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isGreetingSent, setIsGreetingSent] = useState(false);
  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !isGreetingSent) {
      const today = new Date();
      const autoReplyMessage = {
        text: "Place your order for tomorrow?",
        time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
        sent: false,
      };
      setMessages((prevMessages) => [...prevMessages, autoReplyMessage]);
      setIsGreetingSent(true);
    }
  };

  const handleSubmit =async(e)=> {
  e.preventDefault();
  if (text.trim().length > 0) {
    const today = new Date();
    let newMessage = null;
    // if (!isOrderPlaced) {
    //   // if this is not the first message and order is not placed, ask for order for tomorrow
    //   newMessage = {
    //     text: "Please place your order for tomorrow",
    //     time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
    //     sent: false,
    //   };
    //   setIsOrderPlaced(true);
    // }
    if (isGreetingSent) {
      // if this is not the first message and order is placed, process the order
      newMessage = {
        text: `Order: ${text.trim().replace(/\n/g, "<br>\n")}`,
        time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
        sent: true,
      };
      
      const thankYouMessage = {
        text: "Thank you for your order!",
        time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
        sent: false,
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, thankYouMessage]);
      }, 1000);
    }
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    const token =
    localStorage.getItem("consumertoken");
    const formData = new FormData();
    formData.append("order_message",text);
    // setLoading(true);
    const response1 = await fetch(`http://127.0.0.1:8000/product/order/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json1 = await response1.json();
    // setLoading(false);
    console.log(json1)
    setText("");   
  }
}


  return (
    <div className="chatbox-wrapper">
      <div className="chatbox-toggle" onClick={handleToggleClick}>
        <i className="bx bxs-chat" style={{ color: "blue" }}></i>
      </div>
      {isOpen && (
        <div className="chatbox-message-wrapper">
          <div className="chatbox-message-header">
            <div className="chatbox-message-profile">
              <img
                src="https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8="
                alt=""
                className="chatbox-message-image"
              />
              <div>
                <h4 className="chatbox-message-name">Nepali Harvest</h4>
                <p className="chatbox-message-status">Recently Seen</p>
              </div>
            </div>
          </div>
          <div className="chatbox-message-content">
            {messages.length === 0 && (
              <h4 className="chatbox-message-no-message">
                You don't have message yet!
              </h4>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbox-message-item ${
                  message.sent ? "sent" : "received"
                }`}
              >
                <p className="chatbox-message-item-text">{message.text}</p>
                <span className="chatbox-message-item-time float-right">
                  {message.time}
                </span>
              </div>
            ))}
          </div>
          <div className="chatbox-message-bottom">
            <form className="chatbox-message-form" onSubmit={handleSubmit}>
              <textarea
                placeholder="Type message..."
                className="chatbox-message-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" className="chatbox-message-submit">
                <i className="bx bxs-send"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbox;
