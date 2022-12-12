import React from "react";
import ArrowBack from "../utils/ArrowBack";
import "./_SignupLogin.scss";

function SignupLogin( {userType}) {
  return (
    <div className="signup-container">
      <div className="venues-buttons">
        <h2>{userType === "venues" ? "Venues" : "Artists"}</h2>
        <button></button>
        <button></button>
      </div>

      <ArrowBack userType={userType} className="arrow-back-login" />
    </div>
  );
}

export default SignupLogin;
