import { createContext, useState } from "react";

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
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
