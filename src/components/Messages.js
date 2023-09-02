import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import ChatContext from "../store/chat-context";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const chatCtx = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats", chatCtx.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unsub();
      };
    };
    chatCtx.chatId && getChats();
  }, [chatCtx.chatId]);

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
