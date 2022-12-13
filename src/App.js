import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { MainContext } from "./components/contexts/MainContext";
import { useContext } from "react";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.scss";

import Signup from "./components/pages/Signup";
import NavbarLayout from "./components/utils/outlets/NavbarLayout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ProfileEdit from "./components/pages/ProfileEdit";
import About from "./components/pages/About";
import ContactForm from "./components/contactForm/ContactForm";
import { FourOhFour } from "./components/pages/FourOhFour";
import Overview from "./components/pages/Overview";
import SignupLogin from "./components/pages/SignupLogin";
import UserProfile from "./components/pages/UserProfile";

import Calendar from "./components/calendar/Calendar";

function App() {
  const { showSidebar } = useContext(MainContext);

  const location = useLocation();

  useEffect(() => {
    showSidebar ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "unset");
  }, [showSidebar]);

  return (
    <AnimatePresence mode={"wait"}>
      <div className="wrapper" style={{ overflow: showSidebar ? "hidden" : "" }}>
        <Routes location={location} key={location.pathname}>
          {/* Routes with classic navbar and footer layout */}
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} key="home" />
            <Route path="/about" element={<About />} />

            <Route path="/venues" element={<Outlet />}>
              <Route index element={<Overview key={"venues"} userType={"venues"} />} />
              <Route path="profile/:id" element={<UserProfile userType="venues" />} />
            </Route>

            <Route path="/artists" element={<Outlet />}>
              <Route index element={<Overview key={"artists"} userType={"artists"} />} />
              <Route path="profile/:id" element={<UserProfile userType="artists" />} />
            </Route>

            <Route path="/me/profile" element={<ProfileEdit />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Route>

          {/* Routes without navbar and footer */}
          <Route path="/signup" element={<SignupLogin />} />
          <Route path="/venues/login" element={<Login userType={"venues"} />} />
          <Route path="/venues/signup" element={<Signup userType={"venues"} />} />
          <Route path="/artists/login" element={<Login userType={"artists"} />} />
          <Route path="/artists/signup" element={<Signup userType={"artists"} />} />
          <Route path="/preview" element={<ContactForm />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
