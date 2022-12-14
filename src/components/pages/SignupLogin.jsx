import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariantPosAbs } from "../animations/containerVariants";
import ReuseButton from "../../components/buttons/Reusable_BB";

import ArrowBack from "../utils/ArrowBack";
import "./_SignupLogin.scss";

function SignupLogin() {
  return (
    <motion.div
      variants={containerVariantPosAbs}
      initial="exit"
      animate="visible"
      exit="hidden"
      className="signup-container"
    >
      <div className="arrow-position">
        <ArrowBack />
      </div>
      <div className="userType-container">
        <h2>Venues</h2>
        <div className="button-container">
          <Link to="/venues/signup" className="button-link">
            <ReuseButton text="Sign Up" purpose="link to signup" userType="venues" />
          </Link>
          <Link to="/venues/login" className="button-link">
            <ReuseButton text="Log In" purpose="link to login" userType="venues" />
          </Link>
        </div>
      </div>
      <div className="userType-container">
        <h2>Artists</h2>
        <div className="button-container">
          <Link to="/artists/signup" className="button-link">
            <ReuseButton
              text="Sign Up"
              purpose="link to signup"
              userType="artists"
            />
          </Link>
          <Link to="/artists/login" className="button-link">
            <ReuseButton text="Log In" purpose="link to login" userType="artists" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default SignupLogin;
