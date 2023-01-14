import React, { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";
import Login from "./Login";

function ReactivateAccount() {
  const { setIsLoading, isLoading, reactivateAccount } = useContext(MainContext);
  const { userType, id } = useParams();

  useEffect(() => {
    reactivateAccount(userType, id);
    return () => {
      setIsLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoading) return <Login userType={userType} />;
}

export default ReactivateAccount;
