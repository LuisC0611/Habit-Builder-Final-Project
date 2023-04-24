import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBq4D4E9BZgOKBNII7zWtTHCwoLs2fo6ls",
  authDomain: "geek-final.firebaseapp.com",
  projectId: "geek-final",
  storageBucket: "geek-final.appspot.com",
  messagingSenderId: "662959451735",
  appId: "1:662959451735:web:04bab96b5f5451b05fbd12"
};


const app = initializeApp(firebaseConfig);
// const db = firebase.firestore();
export const auth = getAuth(app);
