import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";

import "./_ProfileEdit.scss";

import EditForm from "../forms/editForm/EditForm";
import ArrowBack from "../utils/ArrowBack";
import { containerVariantY, transitionTween } from "../animations/containerVariants";
import ChangePasswordForm from "../forms/editForm/ChangePasswordForm";
import DeleteAccount from "../forms/editForm/DeleteAccount";

function ProfileEdit() {
  const { isLoading, loggedInUser, isLoggedIn } = useContext(MainContext);

  const spinnerOverride = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "scale(2)",
  };

  return (
    <div className="profile-edit-page">
      <motion.div
        variants={containerVariantY}
        initial="exit"
        animate="visible"
        exit="hidden"
        transition={transitionTween}
      >
        <div className="profile-edit-page--heading">
          <h1>{`Welcome${loggedInUser ? `, ${loggedInUser.name}` : null}`}</h1>
          <motion.div
            initial={{ x: "-100vw", rotate: 0 }}
            animate={{ x: 0, rotate: 740 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 2.5,
            }}
            className="astronaut-welcome"
          />
        </div>
        <div className="brad-lg signup-form edit-form">
          {/* {isLoggedIn ? ( */}
          <>
            <EditForm />
            <ChangePasswordForm userType={loggedInUser.type} />
            <DeleteAccount userType={loggedInUser.type} />
          </>
          {/* ) : null} */}
        </div>
        <div className="arrow-wrapper">
          <ArrowBack userType={loggedInUser.type} to={"/me"} />
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileEdit;
