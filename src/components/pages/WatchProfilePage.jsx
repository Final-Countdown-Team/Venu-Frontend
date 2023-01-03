import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { useParams } from "react-router-dom";

import { ScaleLoader } from "react-spinners";
import UserProfile from "../userProfile/UserProfile";

function WatchProfilePage({ userType, curUser, editable }) {
  const { getWatchUser, watchUser, setGlobalUserType } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);
  // Get user ID from URL
  const { id: userID } = useParams();
  // Get data from backend
  useEffect(() => {
    // const fetchUser = async () => {
    //   setIsLoading(true);
    //   try {
    //     console.log(`/${userType}/${currUserID}`);
    //     const res = await fetch(`/${userType}/${currUserID}`);
    //     const data = await res.json();
    //     console.log(data);
    //     setUser(data.data);
    //     // Signal end of loading process
    //     setIsLoading(false);
    //   } catch (err) {
    //     console.err(err);
    //     toast.error("Ups, something went wrong ☹️");
    //   }
    // };
    // fetchUser();
    // console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!curUser) {
      setIsLoading(true);
      setGlobalUserType(userType);
      getWatchUser(userID, userType);
      setIsLoading(false);
    }
  }, []);
  const spinnerOverride = {
    margin: "10rem 20rem",
    transform: "scale(2)",
  };
  // Show loading spinner while fetching from backend
  if (isLoading) {
    return (
      <ScaleLoader
        cssOverride={spinnerOverride}
        color={userType === "artists" ? "#0168b5" : "#b02476"}
        aria-label="Loading Spinner"
      />
    );
  }
  return <UserProfile user={watchUser} editable={true} />;
}

export default WatchProfilePage;
