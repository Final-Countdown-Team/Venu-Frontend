import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import Signup from "./components/pages/Signup";
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/search/SearchBar";

function App() {
  return (
		<Router>
			<Navbar />
			<div className="wrapper">
				<SearchBar />
				<Routes>
					<Route path="/" />
					<Route path="/venues/signup" element={<Signup type={"venues"} />} />
					<Route path="/artists/signup" element={<Signup type={"artists"} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
