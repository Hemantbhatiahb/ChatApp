import React from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <React.Fragment>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootPage;
