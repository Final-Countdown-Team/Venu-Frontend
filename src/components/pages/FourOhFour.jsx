import React from "react";
import ErrorPage from "../../img/404.gif";
import "./_FourOhFour.scss";

const FourOhFour = () => {
  return (
    <div className="page-error">
      <img className="error" src={ErrorPage} alt="404 error" />
    </div>
  );
};

export default FourOhFour;
