import React, { useContext } from "react";
import Login from "../components/Login";
import AuthContext from "../store/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      {currentUser ? <Navigate to="/" /> : <Login />}
    </React.Fragment>
  );
};

export default LoginPage;
