import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/16356463/pexels-photo-16356463/free-photo-of-blonde-woman-in-green-skirt-walking-along-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="user profile"
          loading="lazy"
        />
        <span>Hemant</span>
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
