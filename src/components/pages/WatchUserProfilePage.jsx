import React, { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import UserProfile from "../userProfile/UserProfile";

function WatchUserProfilePage() {
  const { setIsLoading, isLoading } = useContext(MainContext);

  useEffect(() => {
    setIsLoading(false);
    console.log("UserProfile is mounted");

    return () => {
      console.log("UserProfile is unmounted");
      setIsLoading(true);
    };
  }, []);
  if (!isLoading) return <UserProfile editable={true} />;
}

export default WatchUserProfilePage;
