import React, { useState } from "react";
import { motion } from "framer-motion";
import { containerVariantPosAbs } from "../animations/containerVariants";
import LoginForm from "../forms/loginForm/LoginForm";
import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";
import ForgotPasswordModal from "../forms/forgotPasswordModal/ForgotPasswordModal";

function Login({ userType }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      variants={containerVariantPosAbs}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="login-page"
    >
      <div className="login-container" style={{ filter: showModal && "blur(5px)" }}>
        <h1>{userType === "venues" ? "Venues" : "Artists"}</h1>
        <LoginForm userType={userType} setShowModal={setShowModal} />
        <ArrowBack userType={userType} className="arrow-back-login" />
      </div>
      {showModal && <ForgotPasswordModal setShowModal={setShowModal} />}
    </motion.div>
  );
}

export default Login;
