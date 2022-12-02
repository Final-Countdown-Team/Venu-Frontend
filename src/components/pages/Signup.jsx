import React from "react";

import "./_Signup.scss";
import SignupForm from "../signupForm/SignupForm";
import ArrowBack from "../utils/ArrowBack";

function Signup({ type }) {
  return (
    <div className="signup-page">
      <div className="signup-heading">
        {type === "venues" ? <h1>Venues</h1> : <h1>Artists</h1>}
        <h2>Sign Up</h2>
      </div>
      <SignupForm type={type} />
      <ArrowBack />
    </div>
  );
}

export default Signup;
