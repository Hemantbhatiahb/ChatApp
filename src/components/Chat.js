import React from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import ChatContext from "../store/chat-context";


const Chat = () => {
  const {user} = useContext(ChatContext) ;

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="cam" />
          <img src={Add} alt="Add" />
          <img src={More} alt="More" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
