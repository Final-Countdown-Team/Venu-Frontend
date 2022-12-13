import React from "react";
import ReuseButton from "../../components/buttons/Reusable_BB";
import ArrowBack from "../utils/ArrowBack";
import "./_SignupLogin.scss";

function SignupLogin({ userType }) {
  return (
    <div className="signup-container">
      <ArrowBack userType={userType} className="arrow-back-login" />
      <div className="userType-container">
        <h2>Venues</h2>
        <div className="button-container">
          <ReuseButton text="Sign Up" purpose="link to signup" userType="venues"></ReuseButton>
          <ReuseButton text="Log In" purpose="link to login" userType="venues"></ReuseButton>
        </div>
      </div>
      <div className="userType-container">
        <h2>Artists</h2>
        <div className="button-container">
          <ReuseButton text="Sign Up" purpose="link to signup" userType="artists"></ReuseButton>
          <ReuseButton text="Log In" purpose="link to login" userType="artists"></ReuseButton>
        </div>
      </div>
    </div>
  );
}

export default SignupLogin;
