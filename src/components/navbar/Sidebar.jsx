import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export default function Sidebar({ close }) {
  const { showSidebar } = useContext(MainContext);

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
      name: "login",
      path: "#",
    },
    {
      name: "sign up",
      path: "#",
    },
  ];

  return (
    <div
      className="sidebar"
      onClick={close}
      style={
        showSidebar
          ? {
              transform: "translateY(0)",
              visibility: "visible",
              userSelect: "all",
            }
          : {}
      }
    >
      {links.map((link) => (
        <Link
          to={link.path}
          className={
            location.pathname === link.path ? "sidebar-link active" : "sidebar-link"
          }
          key={link.name}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
