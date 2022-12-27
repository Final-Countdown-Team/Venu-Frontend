import { createContext, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  // Navbar
  const [showSidebar, setShowSidebar] = useState(false);
  // Form Inputs
  const [isDisabled, setIsDisabled] = useState(true);
  // Fetched venues or artists previews overview
  const [fetchedPreviews, setFetchedPreviews] = useState({});

  // Sets current global userType
  const [userType, setUserType] = useState(null);

  // Use custom hook to get or set information about login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  console.log(isLoggedIn);

  return (
    <MainContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        isDisabled,
        setIsDisabled,
        fetchedPreviews,
        setFetchedPreviews,
        userType,
        setUserType,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
