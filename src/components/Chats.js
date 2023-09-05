import React from "react";
import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { db } from "../firebase";
import ChatContext from "../store/chat-context";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);

  // console.log("chats", chats);
  useEffect(() => {
    const getUserChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data()); // returns an object need to convert to an array to show data
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getUserChats();
  }, [currentUser?.uid]);

  // change user's chat to selected person chat
  const selectChatHandler = (user) => {
    chatCtx.changeUser(user);
  };

  return (
    <div className="chats">
      {/* converting chats to array and mapping through user's chats */}
      {chats && Object.keys(chats).length !== 0 && Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => selectChatHandler(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" loading="lazy" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
