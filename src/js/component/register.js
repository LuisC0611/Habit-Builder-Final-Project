import { useState } from "react";
import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import "../../styles/App.css";
import { auth } from "./firebase-config";
import { Link } from 'react-router-dom';

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const db = getFirestore();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);

      // Add name field to user object and set it in Firestore
      const userRef = doc(db, "users", user.user.uid);
      await setDoc(userRef, {
        name: registerName,
        email: user.user.email,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <h3> Register User </h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            onChange={(event) => {
              setRegisterName(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" onClick={register}>
          Create User
        </Button>
        <Link to="/landing" className="btn btn-primary btn-block">
            Home
        </Link>
      </Form>
    </div>
  );
}

export default Register;
