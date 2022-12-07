import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <MainContext.Provider
      value={{ showSidebar, setShowSidebar, isDisabled, setIsDisabled }}
    >
      {children}
    </MainContext.Provider>
  );
};
