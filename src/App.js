import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";



import Signup from "./components/pages/Signup";
import NavbarLayout from "./components/navbar/NavbarLayout";
import Home from "./components/pages/Home";
import VenuesOverview from "./components/pages/VenuesOverview";
import Login from "./components/pages/Login";
import ProfileEdit from "./components/pages/ProfileEdit";
import { MainContext } from "./components/contexts/MainContext";
import { useContext } from "react";
import { useEffect } from "react";

import Heading from "./components/heading/Heading.jsx";

import ReuseButton from "./components/buttons/Reusable_BB";
import About from "./components/pages/About";
import Footer from "./components/footer/Footer";

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
						<Route path="/artists" element={<VenuesOverview />} />
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
				</Routes>

				<Heading />
			</div>

			{/* <ReuseButton /> */}

			<Footer />
		</Router>
	);
}

export default App;
