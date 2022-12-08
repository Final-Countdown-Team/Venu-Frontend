import { Routes, Route, useLocation } from "react-router-dom";
import { MainContext } from "./components/contexts/MainContext";
import { useContext } from "react";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.scss";

import Signup from "./components/pages/Signup";
import NavbarLayout from "./components/navbar/NavbarLayout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ProfileEdit from "./components/pages/ProfileEdit";
import About from "./components/pages/About";
import ContactForm from "./components/contactForm/ContactForm";
import Overview from "./components/pages/Overview";

function App() {
  const { showSidebar } = useContext(MainContext);

  const location = useLocation();

  useEffect(() => {
    showSidebar
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showSidebar]);

  return (
    <AnimatePresence mode={"wait"}>
      <div
        className="wrapper"
        style={{ overflow: showSidebar ? "hidden" : "" }}
      >
        <Routes location={location} key={location.pathname}>
          {/* Routes with classic navbar and footer layout */}
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} key="home" />
            <Route path="/about" element={<About />} />
            <Route
              path="/venues"
              element={<Overview key={"venues"} userType={"venues"} />}
            />
            <Route
              path="/artists"
              element={<Overview key={"artists"} userType={"artists"} />}
            />
            <Route path="/me/profile" element={<ProfileEdit />} />
          </Route>

          {/* Routes without navbar and footer */}
          <Route path="/venues/login" element={<Login userType={"venues"} />} />
          <Route
            path="/venues/signup"
            element={<Signup userType={"venues"} />}
          />
          <Route
            path="/artists/login"
            element={<Login userType={"artists"} />}
          />
          <Route
            path="/artists/signup"
            element={<Signup userType={"artists"} />}
          />
          <Route path="/preview" element={<ContactForm />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
