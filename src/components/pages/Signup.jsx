import React from "react";
import { motion } from "framer-motion";
import { containerVariantY } from "../animations/containerVariants";

import "./_Signup.scss";
import SignupForm from "../forms/signupForm/SignupForm";
import ArrowBack from "../utils/ArrowBack";
import ScrollUpButton from "../buttons/ScrollUpButton";

function Signup({ userType }) {
  return (
    <motion.div
      variants={containerVariantY}
      initial="exit"
      animate="visible"
      exit="hidden"
      className="signup-page"
    >
      <div className="signup-heading">
        {userType === "venues" ? <h1>Venues</h1> : <h1>Artists</h1>}
        <h2>Sign Up</h2>
      </div>
      <SignupForm userType={userType} />
      <div className="arrow-wrapper">
        <ArrowBack userType={userType} />
      </div>
      <ScrollUpButton />
    </motion.div>
  );
}

export default Signup;
