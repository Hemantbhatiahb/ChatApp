// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhSQSqgMQy_XOvWcs8XmWdB-INKFY3r8A",
  authDomain: "chat-webapp-3136f.firebaseapp.com",
  projectId: "chat-webapp-3136f",
  storageBucket: "chat-webapp-3136f.appspot.com",
  messagingSenderId: "813946558955",
  appId: "1:813946558955:web:a3c464d30ad1aa96a0a1ae",
  measurementId: "G-9F8FG3TPDF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth =  getAuth(firebaseApp);
export const storage=  getStorage(firebaseApp);
export const db =  getFirestore(firebaseApp);


export default firebaseApp;