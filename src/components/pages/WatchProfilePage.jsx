import { useContext, useEffect, useRef } from "react";
import { MainContext } from "../contexts/MainContext";
import { useNavigate, useParams } from "react-router-dom";

import { ScaleLoader } from "react-spinners";
import UserProfile from "../userProfile/UserProfile";
import { spinnerOverrideBig } from "../utils/spinnerOverride";

function WatchProfilePage({ userType }) {
  const { getWatchUser, setIsLoading, setGlobalUserType, isLoading, loggedInUser } =
    useContext(MainContext);
  // Get user ID from URL
  const { id: userID } = useParams();
  const navigate = useNavigate();
  const mounted = useRef(false);

  // Get data from backend
  useEffect(() => {
    mounted.current = true;
    // console.log("WatchUserProfile is Mounted! State: ", mounted.current);
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    setGlobalUserType(userType);
    getWatchUser(userID, userType, signal);

    return () => {
      mounted.current = false;
      // console.log("WatchUserProfile is NOT Mounted! State: ", mounted.current);
      controller.abort();
      setIsLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userID === loggedInUser._id) navigate("/me");
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show loading spinner while fetching from backend
  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <ScaleLoader
          cssOverride={spinnerOverrideBig}
          color={userType === "artists" ? "#0168b5" : "#b02476"}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }
  return <UserProfile purpose={"watchUser"} />;
}

export default WatchProfilePage;
