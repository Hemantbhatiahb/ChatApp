import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import AuthContext from "../store/AuthContext";
import ChatContext from "../store/chat-context";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uniqueId } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);

  const addInputImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const sendMessageHandler = async () => {
    if (currentUser && chatCtx.chatId) {
      try {
        // send image
        if (image) {
          const storageRef = ref(storage, uniqueId());

          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  // file uploaded, add it to chat database
                  await updateDoc(doc(db, "chats", chatCtx.chatId), {
                    messages: arrayUnion({
                      id: uniqueId(),
                      img: downloadURL,
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                    }),
                  });
                  console.log("send message completed successfuly!");
                }
              );
            }
          );
        } else {
          //send input message only
          if (text.trim().length === 0 || text === "") {
            return;
          }
          await updateDoc(doc(db, "chats", chatCtx.chatId), {
            messages: arrayUnion({
              id: uniqueId(),
              text: text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
        }

        // add last message at sender and reciever end
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatCtx.chatId + ".lastMessage"]: { text },
          [chatCtx.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", chatCtx.user.uid), {
          [chatCtx.chatId + ".lastMessage"]: { text },
          [chatCtx.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    setText("");
    setImage(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={addInputImage}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
};

export default Input;
