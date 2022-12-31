import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

import "./_ProfileEdit.scss";

import EditForm from "../forms/editForm/EditForm";
import ArrowBack from "../utils/ArrowBack";
import { containerVariantY } from "../animations/containerVariants";

function ProfileEdit() {
  const {
    isLoggedIn: { userType, id },
    setGlobalUserType,
  } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  // Set global user type for navbar boxshadow
  useEffect(() => {
    setGlobalUserType(userType);
  }, [userType, setGlobalUserType]);

  useEffect(() => {
    const fetchInitialValues = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/${userType}/${id}`);
        const data = await res.json();
        setUser(data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Ups, something went wrong ☹️");
      }
    };
    fetchInitialValues();
  }, [id, userType]);

  const spinnerOverride = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "scale(2)",
  };

  return (
    <div className="profile-edit-page" key="profile-edit">
      <motion.div
        variants={containerVariantY}
        initial="exit"
        animate="visible"
        exit="hidden"
      >
        {isLoading ? (
          <ScaleLoader
            cssOverride={spinnerOverride}
            color={userType === "artists" ? "#0168b5" : "#b02476"}
            aria-label="Loading Spinner"
          />
        ) : (
          <>
            <div className="profile-edit-page--heading">
              <h1>{`Welcome${user ? `, ${user.name}` : null}`}</h1>
              <div className="astronaut-welcome" />
            </div>
            {user ? <EditForm user={user} /> : null}
            <div className="arrow-wrapper">
              <ArrowBack userType={userType} to={"/me"} />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default ProfileEdit;
