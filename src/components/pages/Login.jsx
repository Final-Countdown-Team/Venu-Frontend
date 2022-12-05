import React from "react";
import LoginForm from "../forms/loginForm/LoginForm";
import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";

function Login({ userType }) {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{userType === "venues" ? "Venues" : "Artists"}</h1>
        <LoginForm userType={userType} />
        <ArrowBack userType={userType} className="arrow-back-login" />
      </div>
    </div>
  );
}

export default Login;
