import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <MainContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </MainContext.Provider>
  );
};
