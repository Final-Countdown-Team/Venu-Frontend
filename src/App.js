import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainContext } from "./components/contexts/MainContext";
import { useContext } from "react";
import { useEffect } from "react";

import "./App.scss";

import Signup from "./components/pages/Signup";
import NavbarLayout from "./components/navbar/NavbarLayout";
import Home from "./components/pages/Home";
import VenuesOverview from "./components/pages/VenuesOverview";
import ArtistsOverview from "./components/pages/ArtistsOverview";
import Login from "./components/pages/Login";
import ProfileEdit from "./components/pages/ProfileEdit";
import About from "./components/pages/About";
import ContactForm from "./components/contactForm/ContactForm";
import ArtistsOverview from "./components/pages/ArtistsOverview";

function App() {
  const { showSidebar } = useContext(MainContext);

  useEffect(() => {
    showSidebar
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showSidebar]);

  return (
    <Router>
      <div
        className="wrapper"
        style={{ overflow: showSidebar ? "hidden" : "" }}
      >
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/venues" element={<VenuesOverview />} />
            <Route path="/artists" element={<ArtistsOverview />} />
            <Route path="/me/profile" element={<ProfileEdit />} />
          </Route>
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
      {/* <ReuseButton /> */}
    </Router>
  );
}

export default App;
