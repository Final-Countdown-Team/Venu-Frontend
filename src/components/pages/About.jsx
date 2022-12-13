import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import "./_About.scss";

function About() {
  const context = useContext(MainContext);
  context.setUserType(null);

  return (
    <div className="about-desc">
      <div className="about-h2">{/* <h2>ABOUT US</h2> */}</div>

      <div className="about-para">
        <p>
          VENU is an innovative and effortless app that makes music happen. We
          connect musicians and venues, allowing you, the artist to plan your
          upcoming tour in the most uncomplicated way possible. No more juggling
          bookers and promoters. We’re cutting out the middlemen, and putting the
          creative freedom back in your hands. We’re also proud to be supporting
          local venues and beloved independent businesses by giving them the
          opportunity to find and book new and exciting entertainers to present. We
          love music, and we’re chuffed to help make the magic happen!
          <br />
          Venu. When you wanna play!
        </p>
      </div>
    </div>
  );
}

export default About;
