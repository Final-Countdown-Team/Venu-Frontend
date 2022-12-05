import React from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../navbar/Sidebar";
import "./_Navbar.scss";
import venuLogo from "../../img/venu-logo.png";
import { MainContext } from "../contexts/MainContext";

export default function Navbar() {
  const { showSidebar, setShowSidebar } = useContext(MainContext);

  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
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
      <div className="navbar">
        <Link to="/" className={`logo ${showSidebar && "logo-active"}`}>
          <img
            src={venuLogo}
            alt="company logo"
            width="50"
            height="50"
            boarder-radius="50"
          />
          <span>Venu</span>
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
          onClick={() => setShowSidebar(!showSidebar)}
          className={`sidebar-btn ${showSidebar && "active"}`}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <Sidebar close={closeSidebar} links={links} />
    </>
  );
}
