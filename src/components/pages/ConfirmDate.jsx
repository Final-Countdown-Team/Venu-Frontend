import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariantY, transitionTween } from "../animations/containerVariants";

import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";
import "../modal/forgotPasswordModal/_ForgotPasswordModal.scss";
import ButtonSecondary from "../buttons/ButtonSecondary";
import toast from "react-hot-toast";

function ConfirmDatePage() {
  const { userType, token } = useParams();

  const navigate = useNavigate();

  const confirmDateHandler = async () => {
    try {
      const req = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${userType}/confirmBookedDate/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      if (res.status === "fail") throw new Error(res.message);
      console.log(res);
      toast.success("Successfully confirmed the date!");
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
    navigate("/");
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

export default ConfirmDatePage;
