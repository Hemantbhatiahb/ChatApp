import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
const Navbar = () => {
  const {currentUser}  =  useContext(AuthContext) ;

  const navigate = useNavigate();
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img
          src={currentUser?.photoURL}
          alt="user profile"
          loading="lazy"
        />
        <span>{currentUser?.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
