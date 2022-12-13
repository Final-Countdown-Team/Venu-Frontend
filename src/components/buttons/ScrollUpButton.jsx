import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./_ScrollUpButton.scss"

// ScrollUpButton component
// Create a scroll up button that appears at the bottom of the page when the user scrolls down. Button automatically leads user to the top of page and disappears when user is at the top of the page.

export const ScrollUpButton = () => {
    const [visible, setVisible] = useState(false);
    
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
        setVisible(true);
        } else if (scrolled <= 300) {
        setVisible(false);
        }
    };
    
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    };
    
    window.addEventListener("scroll", toggleVisible);
    
    return (
        <div className="scroll-to-top">
        {visible && (
            <div onClick={scrollToTop}>
            <FaArrowCircleUp />
            </div>
        )}
        </div>
    );
    }

