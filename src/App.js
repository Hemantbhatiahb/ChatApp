import "./style.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
