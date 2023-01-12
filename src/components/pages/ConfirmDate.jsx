import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariantY, transitionTween } from "../animations/containerVariants";

import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";
import "../modal/forgotPasswordModal/_ForgotPasswordModal.scss";
import ButtonSecondary from "../buttons/ButtonSecondary";

function ResetPasswordPage() {
  const { userType, token } = useParams();

  const confirmDateHandler = async () => {
    try {
      const req = await fetch(`/${userType}/confirmBookedDate/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!req.status) throw new Error("Something, went wrong confirming the date");
      const res = await req.json();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      variants={containerVariantY}
      transition={transitionTween}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="login-page"
    >
      <div className="login-container login-container--confirmDate">
        <h1>save the date</h1>
        <p className="text-left date-confirm-text">
          Congratulations, you're just one last click away to complete the booking
          process 🎉
        </p>
        <ButtonSecondary
          onClick={confirmDateHandler}
          text="Confirm Date"
          userType={userType}
        />
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
