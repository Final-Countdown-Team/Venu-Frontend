import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { containerVariantY, transitionTween } from "../animations/containerVariants";

import "./_Signup.scss";
import SignupForm from "../forms/signupForm/SignupForm";
import ArrowBack from "../utils/ArrowBack";
import ScrollUpButton from "../buttons/ScrollUpButton";
import { MainContext } from "../contexts/MainContext";

function Signup({ userType }) {
  const { setGlobalUserType } = useContext(MainContext);

  useEffect(() => {
    setGlobalUserType(userType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="signup-page">
      <motion.div
        variants={containerVariantY}
        initial="exit"
        animate="visible"
        exit="hidden"
        transition={transitionTween}
      >
        <div className="arrow-wrapper arrow-wrapper-top">
          <ArrowBack userType={userType} />
        </div>
        <div className="signup-heading">
          {userType === "venues" ? <h1>Venues</h1> : <h1>Artists</h1>}
          <h2>Sign Up</h2>
        </div>
        <SignupForm userType={userType} />
        <div className="arrow-wrapper">
          <ArrowBack userType={userType} />
          <ScrollUpButton userType={userType} />
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
