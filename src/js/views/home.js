import React from "react";
import "../../styles/home.css";
import Login from "../component/login.js";
import Register from "../component/register.js";
import Landing from "../component/landing";


export const Home = () => (
	<div className="text-center mt-5">
		<Landing/>
		{/* <Login/> */}
		{/* <Register/> */}
	</div>
);
