import React from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Landing() {
  return (
    <div className="container">
      <h1>Welcome to the Habit Helper!</h1>
      <p>Please sign in or sign up to continue</p>
      <div className="row">
        <div className="col-md-6">
          <Link to="/login" className="btn btn-primary btn-block">
            Sign In
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/register" className="btn btn-primary btn-block">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
