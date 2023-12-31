import React, { useContext, useEffect, useRef } from "react";
import AuthContext from "../store/AuthContext";
import ChatContext from "../store/chat-context";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      className={`message ${message?.senderId === currentUser?.uid && "owner"}`}
      ref={ref}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser?.uid
              ? currentUser.photoURL
              : chatCtx?.user.photoURL
          }
          alt=""
        />
        <span>{message?.date.toDate().toLocaleTimeString()}</span>
      </div>
      <div className="messageContent">
        {message?.text && <p>{message?.text}</p>}
        {message?.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
