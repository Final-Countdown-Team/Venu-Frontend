import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../footer/Footer";
import "../../App.scss";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

function NavbarLayout() {
  const { showSidebar } = useContext(MainContext);

  return (
    <div>
      <Navbar />
      <div
        className={`content-container ${
          showSidebar ? "blur-wrapper" : "false"
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default NavbarLayout;
