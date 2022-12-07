import React from "react";
import "./_Heading.scss";
// import venu from "../../img/venu.png";
import VenueHeadingComponent from "./svg/VenueHeadingComponent";

function Heading() {
  return (
    <div className="styled-heading">
      <h1>Venu</h1>
      <VenueHeadingComponent />
    </div>
  );
}

export default Heading;
