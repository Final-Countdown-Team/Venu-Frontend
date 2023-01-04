import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import { motion } from "framer-motion";

import "./_ProfileEdit.scss";

import ArrowBack from "../utils/ArrowBack";
import { containerVariantY, transitionTween } from "../animations/containerVariants";
import ChangePasswordForm from "../forms/editForm/ChangePasswordForm";
import DeleteAccount from "../forms/editForm/DeleteAccount";
import EditFormFormikWrapper from "../forms/editForm/EditFormFormikWrapper";

function ProfileEdit() {
  const { loggedInUser } = useContext(MainContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          {loggedInUser ? (
            <h1>{`Welcome${loggedInUser.name}`}</h1>
          ) : (
            <h1>Hey, I think you got lost here 😬</h1>
          )}
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
          <>
            <EditFormFormikWrapper />
            <ChangePasswordForm />
            <DeleteAccount />
          </>
        </div>
        <div className="arrow-wrapper">
          <ArrowBack userType={loggedInUser.type} to={"/me"} />
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileEdit;
