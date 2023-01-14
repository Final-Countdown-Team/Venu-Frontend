import React, { useContext, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { MainContext } from "../contexts/MainContext";
import UserProfile from "../userProfile/UserProfile";
import { spinnerOverrideBig } from "../utils/spinnerOverride";

function WatchUserProfilePage() {
  const { setIsLoading, isLoading, getMe, loggedInUser } = useContext(MainContext);

  useEffect(() => {
    // console.log("UserProfile is mounted");
    getMe();
    setIsLoading(false);

    return () => {
      // console.log("UserProfile is unmounted");
      setIsLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <ScaleLoader
          cssOverride={spinnerOverrideBig}
          color={loggedInUser.type === "artists" ? "#0168b5" : "#b02476"}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  if (!isLoading) return <UserProfile editable={true} />;
}

export default WatchUserProfilePage;
