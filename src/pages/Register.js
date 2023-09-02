import React from "react";
import Add from "../img/addAvatar.png";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(selectedFile);
    const enteredName = userName;
    const enteredEmail = emailInput;
    const enteredPassword = passwordInput;
    if (
      emailInput.trim().length === 0 ||
      !emailInput.includes("@") ||
      passwordInput.trim().length === 0 ||
      passwordInput.length < 4
    ) {
      alert("email not valid  or password length to low");
      return;
    }

    try {
      // create user
      const response = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      const user = response.user;
      console.log(user);

      // store image of user in firebase storage
      const storageUserNameFileRef = ref(storage, enteredName);

      const uploadTask = uploadBytesResumable(
        storageUserNameFileRef,
        selectedFile
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            // file upload completed -> update user profile 
            await updateProfile(user, {
              displayName: enteredName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: enteredName,
              email: enteredEmail,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="display name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <label htmlFor="file">
            <img src={Add} alt="add" />
            <span>Add an avatar</span>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <button type="submit">Sign up</button>
        </form>
        <p>You have an account? <Link to="/login">Login</Link></p>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default RegisterPage;
