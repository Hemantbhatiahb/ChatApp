import React, { useContext } from "react";
import Register from "../components/Register";
import AuthContext from "../store/AuthContext";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      {currentUser ? <Navigate to="/" /> : <Register />}
    </React.Fragment>
  );
};

export default RegisterPage;
