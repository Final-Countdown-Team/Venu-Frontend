import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariantY, transitionTween } from "../animations/containerVariants";
import ResetPasswordForm from "../forms/resetPasswordForm/ResetPasswordForm";

import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";
import "../modal/forgotPasswordModal/_ForgotPasswordModal.scss";

function ResetPasswordPage() {
  const { userType, resetToken } = useParams();
  return (
    <motion.div
      variants={containerVariantY}
      transition={transitionTween}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="login-page"
    >
      <div className="login-container">
        <h1>{userType === "venues" ? "Venues" : "Artists"}</h1>
        <p className="padding text-left">
          Please enter and confirm your new password and submit.
          <br />
          You will be redirected to the login page so you can login again 🎉
        </p>
        <ResetPasswordForm userType={userType} resetToken={resetToken} />
        <ArrowBack
          userType={userType}
          className="arrow-back-login"
          to="/signupLogin"
        />
      </div>
    </motion.div>
  );
}

export default ResetPasswordPage;
