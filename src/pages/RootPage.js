import React from "react";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";

const RootPage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <React.Fragment>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootPage;
