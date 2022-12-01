import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { FormProvider } from "./components/contexts/formContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
);
