import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/AuthContext";
import { ChatProvider } from "./store/chat-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
