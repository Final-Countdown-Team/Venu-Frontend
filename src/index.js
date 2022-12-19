import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { MainContextProvider } from "./components/contexts/MainContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const spinnerOverride = {
  margin: "10rem 20rem",
  transform: "scale(2)",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainContextProvider>
      <Router>
        <Suspense
          fallback={
            <div className="wrapper">
              <div className="loading-wrapper">
                <ScaleLoader
                  cssOverride={spinnerOverride}
                  color={"#b02476"}
                  aria-label="Loading Spinner"
                />
              </div>
            </div>
          }
        >
          <App />
        </Suspense>
      </Router>
    </MainContextProvider>
  </React.StrictMode>
);
