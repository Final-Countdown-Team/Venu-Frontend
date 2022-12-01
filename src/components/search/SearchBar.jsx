import React, { useState } from "react";

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

	return (
		<div className="saerchBar">
			<input
				onChange={handleSearch}
				onKeyPress={handleSubmit}
				type="search"
				value={searchText}
				placeholder="Search for artist"
			/>
		</div>
	);
}
