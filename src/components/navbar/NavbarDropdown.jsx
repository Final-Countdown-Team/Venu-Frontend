// Write a hook that when the login link in the navbar is hovered a dropdown should appear which lets you select either artists or venues and links directly to the respective login form. The same should happen when the signup link is hovered. The dropdown should disappear when the mouse leaves the navbar.

import React, { useState } from "react";
import { Link } from "react-router-dom";



const NavbarDropdown = () => {
    const [hover, setHover] = useState(false);
    
    const toggleHover = () => {
        setHover(!hover);
    };
    
    return (
        <div className="navbar-dropdown">
        <div className="navbar-dropdown__login">
            <Link to="/login">Login</Link>
            <div
            className="navbar-dropdown__login__dropdown"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            >
            {hover && (
                <div className="navbar-dropdown__login__dropdown__links">
                <Link to="/artists/login">Artist</Link>
                <Link to="/venues/login">Venue</Link>
                </div>
            )}
            </div>
        </div>
        <div className="navbar-dropdown__signup">
            <Link to="/signup">Signup</Link>
            <div
            className="navbar-dropdown__signup__dropdown"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            >
            {hover && (
                <div className="navbar-dropdown__signup__dropdown__links">
                <Link to="/artists/signup">Artist</Link>
                <Link to="/venues/signup">Venue</Link>
                </div>
            )}
            </div>
        </div>
        </div>
    );
}
    
export default NavbarDropdown;
