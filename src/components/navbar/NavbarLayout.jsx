import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../../App.scss";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

function NavbarLayout() {
  const { showSidebar } = useContext(MainContext);

  return (
    <div>
      <Navbar />
      <div className={showSidebar && "blur-wrapper"}>
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarLayout;
