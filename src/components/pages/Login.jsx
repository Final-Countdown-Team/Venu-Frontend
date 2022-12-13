import React from "react";
import { motion } from "framer-motion";
import { containerVariantPosAbs } from "../animations/containerVariants";
import LoginForm from "../forms/loginForm/LoginForm";
import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";

function Login({ userType }) {
  return (
    <motion.div
      variants={containerVariantPosAbs}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="login-page"
    >
      <div className="login-container">
        <h1>{userType === "venues" ? "Venues" : "Artists"}</h1>
        <LoginForm userType={userType} />
        <ArrowBack userType={userType} className="arrow-back-login" />
      </div>
    </motion.div>
  );
}

export default Login;
