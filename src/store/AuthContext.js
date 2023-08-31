import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext({
  currentUser: {},
  // login:(user)=>{},
  // logout:()=>{}
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  //   const loginHandler =(user)=>{
  //     setUser(user)
  //   }

  //   const logoutHandler =()=>{
  //     setUser({})
  //   }
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user signed in
        setUser(user);
      } else {
        //user signed out
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
