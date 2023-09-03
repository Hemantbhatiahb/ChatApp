import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import AuthContext from "../store/AuthContext";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      {!currentUser ? (
        <Navigate to="/login" />
      ) : (
        <div className="home">
          <div className="container">
            <Sidebar />
            <Chat />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default HomePage;
