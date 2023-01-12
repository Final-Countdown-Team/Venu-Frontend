import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { MainContextProvider } from "./components/contexts/MainContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <MainContextProvider>
    <Router>
      <App />
    </Router>
  </MainContextProvider>
  // </React.StrictMode>
);
