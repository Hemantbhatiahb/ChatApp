import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import {RotatingLines} from "react-loader-spinner";

const isEmail = (value) => value.includes("@");
const isPasswordLength5 = (value) => value.trim().length > 5;

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      alert("email is not valid or password is too short!");
      return;
    }
    setError(null);
    setIsLoading(true);
    const enteredEmail = emailInput;
    const enteredPassword = passwordInput;

    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    resetEmail();
    resetPassword();
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={formSubmitHandler}>
          <input
            type="email"
            placeholder="email"
            value={emailInput}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p className="error-text">Email is not valid</p>}
          <input
            type="password"
            placeholder="password"
            value={passwordInput}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <input style={{ display: "none" }} type="file" id="file" />
          {passwordHasError && <p className="error-text">Password is short</p>}
          <button type="submit">Sign in</button>
          {error && <span>{error}</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
        {<RotatingLines strokeColor='#7b96ec' visible={loading} strokeWidth="4" color='blue'  width={50} />}
      </div>
    </div>
  );
};

export default Login;
