import React from "react";
import LoginForm from "../loginForm/LoginForm";
import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";

function Login({ type }) {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>{type === "venues" ? "Venues" : "Artists"}</h1>
        <LoginForm type={type} />
        <ArrowBack type={type} className="arrow-back-login" />
      </div>
    </div>
  );
}

export default Login;
