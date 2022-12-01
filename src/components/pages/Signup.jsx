import React from "react";
import { NavLink } from "react-router-dom";
import "./_Signup.scss";
import SignupForm from "../signupForm/SignupForm";
import { MdArrowBack } from "react-icons/md";

function Signup({ type }) {
  return (
    <div className="signup-page">
      <div className="signup-heading">
        {type === "venues" ? <h1>Venues</h1> : <h1>Artists</h1>}
        <h2>Sign Up</h2>
      </div>
      <SignupForm type={type} />
      <div className="arrow-container">
        <NavLink to="/" className="arrow-back">
          <MdArrowBack className="arrow-icon" />
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
