import { useState, useEffect } from "react";
import React from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "../../styles/App.css"; 
import { auth } from "./firebase-config";
import Tasks from "../component/tasks";
import { Link } from 'react-router-dom';

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="inputEmail">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={loginEmail}
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={login}
                >
                  Login
                </button>
              </form>
              <Link to="/landing" className="btn btn-primary btn-block">
            Home
        </Link>
            </div>
          </div>
          {user && (
            <div className="card mt-3">
              <div className="card-body">
                <h4 className="card-title">Logged In User:</h4>
                <p className="card-text">Email: {user.email}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={logout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
          {user && <Tasks />}
        </div>
      </div>
    </div>
  );
}

export default Login;










// import { useState, useEffect} from "react";
// import React from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import {
//   collection,
//   addDoc,
//   getFirestore,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import "./App.css";
// import { auth } from "./firebase-config";
// import Tasks from "../component/tasks";

// function Login() {
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [registerName, setRegisterName] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [user, setUser] = useState({});

  
//   const db = getFirestore();

//   useEffect(() => {
//     onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   const register = async () => {
//     try {
//       const user = await createUserWithEmailAndPassword(
//         auth,
//         registerEmail,
//         registerPassword
//       );
//       console.log(user);

//       // Add name field to user object and set it in Firestore
//       const userRef = doc(db, "users", user.user.uid);
//       await setDoc(userRef, {
//         name: registerName,
//         email: user.user.email,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const login = async () => {
//     try {
//       const user = await signInWithEmailAndPassword(
//         auth,
//         loginEmail,
//         loginPassword
//       );
//       console.log(user);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   return (
//     <div className="App">
//       {!user && (
//         <div>
//           <h3> Register User </h3>
//           <input
//             placeholder="Email..."
//             onChange={(event) => {
//               setRegisterEmail(event.target.value);
//             }}
//           />
//           <input
//             placeholder="Full Name..."
//             onChange={(event) => {
//               setRegisterName(event.target.value);
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password..."
//             onChange={(event) => {
//               setRegisterPassword(event.target.value);
//             }}
//           />

//           <button onClick={register}> Create User</button>
//         </div>
//       )}

//       {!user && (
//         <div>
//           <h3> Login </h3>
//           <input
//             placeholder="Email..."
//             onChange={(event) => {
//               setLoginEmail(event.target.value);
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password..."
//             onChange={(event) => {
//               setLoginPassword(event.target.value);
//             }}
//           />

//           <button onClick={login}> Login</button>
//         </div>
//       )}

//       {user && (
//         <div>
//           <h4> Logged In User: </h4>
//           <p>Name: {user.registerName}</p>
//           <p>Email: {user.email}</p>

//           <button onClick={logout}> Sign Out </button>
//         </div>
//       )}
//       {user && <Tasks/>}
//     </div>
//   );
// }

// export default Login;