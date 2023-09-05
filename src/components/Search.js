import React, { useEffect } from "react";
import { useState } from "react";
import {
  collection,
  query,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { db } from "../firebase";
import ChatContext from "../store/chat-context";

const Search = () => {
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [firstRun, setFirstRun] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (firstRun) {
        setError(null);
        setFirstRun(true);
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);

        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push(doc.data());
        });

        searchUser.trim() === ""
          ? setUsers([])
          : setUsers(
              usersData.filter((user) => 
                user.uid !== currentUser.uid &&
                user.displayName
                  .toLowerCase()
                  .includes(searchUser.toLowerCase())
              )
            );
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [currentUser.uid, firstRun, searchUser]);

  const addUserHandler = async (user) => {
    // if user exists take that user , else create new user
    setError(null);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // user doesn't exist , create a chat
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        //for current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        //for friend
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log("update done!");

        // select user's chat
        chatCtx.changeUser(user);
      }
    } catch (error) {
      setError(error.message);
    }

    setUsers([]);
    setSearchUser("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find chat"
          onChange={(e) => setSearchUser(e.target.value)}
          value={searchUser}
        />
      </div>
      {error && <span>{error}</span>}
      {users &&
        users.map((user) => (
          <div
            className="userChat"
            key={user.uid}
            onClick={() => {
              addUserHandler(user);
            }}
          >
            <img src={user.photoURL} alt="" loading="lazy" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
