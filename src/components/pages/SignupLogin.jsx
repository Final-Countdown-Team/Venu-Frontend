import React from "react";
import ReuseButton from "../../components/buttons/Reusable_BB";
import ArrowBack from "../utils/ArrowBack";
import "./_SignupLogin.scss";


function SignupLogin({ userType }) {
  return (
    <div className="signup-container">
      <ArrowBack userType={userType} className="arrow-back-login" />
      <div className="venues-container">
        <h2>Venues</h2>
        <div className="button-container">
          <div className="button-reuse--venue">
            <ReuseButton
              text="Sign Up"
              purpose="link to signup"
              userType="venues"
            ></ReuseButton>
          </div>
          <div className="button-reuse--venue">
            <ReuseButton
              text="Log In"
              purpose="link to login"
              userType="venues"
            ></ReuseButton>
          </div>
        </div>
      </div>
      <div className="artist-container">
        <h2>Artists</h2>
        <div className="button-container">
          <div className="button-reuse--artist">
            <ReuseButton
              text="Sign Up"
              purpose="link to signup"
              userType="artists"
            ></ReuseButton>
          </div>
          <div className="button-reuse--artist">
            <ReuseButton
              text="Log In"
              purpose="link to login"
              userType="artists"
            ></ReuseButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupLogin;
