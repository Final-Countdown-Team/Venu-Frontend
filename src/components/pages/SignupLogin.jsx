import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariantY, transitionTween } from "../animations/containerVariants";
import ReuseButton from "../../components/buttons/Reusable_BB";

import ArrowBack from "../utils/ArrowBack";
import "./_SignupLogin.scss";

function SignupLogin() {
  return (
    <div className="signup-wrapper">
      <motion.div
        variants={containerVariantY}
        initial="exit"
        animate="visible"
        exit="hidden"
        transition={transitionTween}
        className="signup-page"
      >
        <div className="signup-container">
          <div className="userType-container">
            <div className="arrow-position">
              <ArrowBack />
            </div>
            <h2>Venues</h2>
            <div className="button-container">
              <Link to="/venues/signup" className="button-link">
                <ReuseButton
                  text="Sign Up"
                  purpose="link to signup"
                  userType="venues"
                />
              </Link>
              <Link to="/venues/login" className="button-link">
                <ReuseButton
                  text="Log In"
                  purpose="link to login"
                  userType="venues"
                />
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
                <ReuseButton
                  text="Log In"
                  purpose="link to login"
                  userType="artists"
                />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupLogin;
