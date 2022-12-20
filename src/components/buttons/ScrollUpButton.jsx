import React, { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import "./_ScrollUpButton.scss";

const ScrollUpButton = ({ userType }) => {
  //   const [visible, setVisible] = useState(false);

  // const toggleVisible = () => {
  //   const scrolled = document.documentElement.scrollTop;
  //   if (scrolled > 100) {
  //     setVisible(true);
  //   } else if (scrolled <= 100) {
  //     setVisible(false);
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", toggleVisible);

  //   return () => {
  //     window.removeEventListener("scroll", toggleVisible);
  //   };
  // }, []);

  return (
    <button
      className={`scroll-up-container ${
        userType === "artists" ? "bgColor--artists" : "bgColor--venues"
      }`}
      onClick={scrollToTop}
      // style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <span>
        <MdKeyboardArrowUp />
      </span>
    </button>
  );
};

export default ScrollUpButton;
