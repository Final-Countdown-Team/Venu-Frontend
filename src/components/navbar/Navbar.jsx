import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../navbar/Sidebar";
import "./_Navbar.scss";
import venuLogo from "../../img/venu-logo.png";
// import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
      // icon: faHome
    },
    {
      name: "artists",
      path: "/artists",
    },
    {
      name: "Venues",
      path: "/venues",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: "login",
      path: "/login",
    },
    {
      name: "sign up",
      path: "/signup",
    },
  ];

  function closeSidebar() {
    setShowSidebar(false);
  }

  return (
    <>
      <div className="navbar navbar-container">
        <Link to="/" className="logo">
          <img
            src={venuLogo}
            alt=""
            width="50"
            height="50"
            boarder-radius="50"
          />
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              className={location.pathname === link.path ? "active" : ""}
              to={link.path}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div
          onClick={() => setShowSidebar(true)}
          className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSidebar && <Sidebar close={closeSidebar} links={links} />}
    </>
  );
}
