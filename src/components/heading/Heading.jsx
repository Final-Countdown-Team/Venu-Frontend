import React from "react";
import "./_Heading.scss";
import venu from "../../img/venu.png";

function Heading() {
  return (
    <div className="header">
      <img src={venu} alt="venu-header" width="150" height="50" />
    </div>
  );
}

export default Heading;
