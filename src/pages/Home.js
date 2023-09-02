import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import LoginPage from "./Login";

const HomePage = () => {
  // const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      {!localStorage.getItem('user') ? (
        <LoginPage />
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
