// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider}  from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_URL,
  authDomain: "loginlms-911e8.firebaseapp.com",
  projectId: "loginlms-911e8",
  storageBucket: "loginlms-911e8.firebasestorage.app",
  messagingSenderId: "118754384322",
  appId: "1:118754384322:web:b034ccba2c30ad949b9e5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




 const  auth = getAuth(app)

 const provider  = new GoogleAuthProvider()

 export {auth , provider}