import React, { useState } from "react";
// import "./_SearchBar.scss";

export default function SearchBar(props) {
	const { onSearch } = props;

	const [searchText, setSearchText] = useState("");

	const handleSearch = (e) => {
		const text = e.target.value;
		setSearchText(text);
	};

	const handleSubmit = (e) => {
		if (e.key === "Enter") {
			onSearch(searchText);
		}
    };
    
    const inputStyle = {
			width: "40%",
			height: "40px",
			borderRadius: "20px",
			// border: "1px solid #ccc",
			position: "relative",
			zIndex: "1",
			padding: "0 20px",
			marginTop: "20px",
		};

	return (
		<div className="searchBar">
			<input
				onChange={handleSearch}
				onKeyPress={handleSubmit}
				type="text"
				value={searchText}
				placeholder="Search for artist"
				style={inputStyle}
			/>
		</div>
	);
}
