import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./_ScrollUpButton.scss";

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
    } else if (scrolled <= 100) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  window.addEventListener("scroll", toggleVisible);

  return (
    <button className='scroll-up-container" onClick={scrollToTop} style={{ display: visible ? "inline" : "none" }}>
      <FaArrowCircleUp />
    </button>
  );
};

export default ScrollUpButton;
