import React from "react";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/17119475/pexels-photo-17119475/free-photo-of-man-selling-fresh-fruit-at-a-market.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Hello there!</p>
        <img src="https://images.pexels.com/photos/18093186/pexels-photo-18093186/free-photo-of-woman-in-shawl-standing-with-child-in-orchard.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
      </div>
    </div>
  );
};

export default Message;
