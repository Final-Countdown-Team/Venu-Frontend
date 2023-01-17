import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariantY, transitionTween } from "../animations/containerVariants";

import ArrowBack from "../utils/ArrowBack";
import "./_Login.scss";
import "../modal/forgotPasswordModal/_ForgotPasswordModal.scss";
import ButtonSecondary from "../buttons/ButtonSecondary";
import toast from "react-hot-toast";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { ScaleLoader } from "react-spinners";

function ConfirmDatePage() {
  const { isPending, setIsPending } = useContext(MainContext);
  const { userType, token } = useParams();

  const navigate = useNavigate();

  const confirmDateHandler = async () => {
    try {
      setIsPending(true);
      const req = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${userType}/confirmBookedDate/${token}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND_URL,
          },
        }
      );
      const res = await req.json();
      if (res.status === "fail") throw new Error(res.message);
      console.log(res);
      toast.success("Successfully confirmed the date!");
      setIsPending(false);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
      setIsPending(false);
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
        <div style={{ height: "6.5rem" }}>
          {isPending ? (
            <ScaleLoader
              color={userType === "artists" ? "#0168b5" : "#b02476"}
              cssOverride={{
                // padding: "0 2.25rem",
                paddingTop: "1rem",
                transform: "scale(1.5)",
              }}
              aria-label="Loading Spinner"
            />
          ) : (
            <ButtonSecondary
              onClick={confirmDateHandler}
              text="Confirm Date"
              userType={userType}
            />
          )}
        </div>
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
