import React from "react";
import Add from "../img/addAvatar.png";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useInput from "../hooks/use-input";
import { RotatingLines } from "react-loader-spinner";
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPasswordLength5 = (value) => value.trim().length > 5;

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const {
    value: nameInput,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPasswordLength5);

  let formIsValid = false;

  if (nameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].type.startsWith("image/")
    ) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(selectedFile);
    if (!formIsValid || !selectedFile?.type.startsWith("image/")) {
      alert("please enter all the details! (HINT : select avatar)");
      return;
    }
    setIsLoading(true);
    const enteredName = nameInput;
    const enteredEmail = emailInput;
    const enteredPassword = passwordInput;

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
          setIsLoading(false);
          return;
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
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    resetPassword();
    resetEmail();
    resetName();
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
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={nameInput}
            required
          />
          {nameHasError && (
            <p className="error-text">Name should not be empty</p>
          )}
          <input
            type="email"
            placeholder="email"
            value={emailInput}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            required
          />
          {emailHasError && <p className="error-text">Email is not valid</p>}
          <input
            type="password"
            placeholder="password"
            value={passwordInput}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            required
          />
          {passwordHasError && (
            <p className="error-text">Password is too short</p>
          )}
          <div className="imageContainer">
            <label htmlFor="file">
              <img src={Add} alt="add" />
              <span>Add an avatar</span>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="file"
              onChange={handleFileChange}
              required
            />
            {selectedFile && (
              <img src={URL.createObjectURL(selectedFile)} alt="" />
            )}
          </div>
          <button type="submit">Sign up</button>
        </form>
        <p>
          You have an account? <Link to="/login">Login</Link>
        </p>
        {error && <span>{error.message}</span>}
        {
          <RotatingLines
            strokeColor="#7b96ec"
            visible={loading}
            strokeWidth="4"
            color="blue"
            width={50}
          />
        }
      </div>
    </div>
  );
};

export default Register;
