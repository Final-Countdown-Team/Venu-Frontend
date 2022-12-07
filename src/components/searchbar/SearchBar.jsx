import React, { useState } from "react";
import "./_SearchBar.scss";
import ButtonSecondary from "../buttons/ButtonSecondary";

export default function SearchBar({ userType }) {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [radius, setRadius] = useState("");
  const [dates, setDates] = useState("");

  const handleSearch = (e) => setSearchText(e.target.value);
  const handleSort = (e) => setSort(e.target.value);
  const handleRadius = (e) => setRadius(e.target.value);
  const handleDates = (e) => setDates(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        className="searchbar--input"
        onChange={handleSearch}
        type="search"
        value={searchText}
        placeholder={`Search for ${userType}`}
      />
      <div className="dropdown-group">
        <select
          onChange={handleSort}
          defaultValue=""
          className="dropdown--input"
          name="sort"
        >
          <option value="">Sort</option>
          <option value="name">Name: A-Z</option>
          <option value="name">Name: Z-A</option>
          <option value="newest">Newest</option>
          <option value="capacity">Capacity</option>
        </select>
        <select
          onChange={handleRadius}
          defaultValue=""
          className="dropdown--input"
          name="radius"
        >
          <option value="">Radius</option>
          <option value="5km">5km</option>
          <option value="10km">10km</option>
          <option value="20km">20km</option>
          <option value="50km">50km</option>
          <option value="100km">100km</option>
        </select>
        <select
          onChange={handleDates}
          defaultValue=""
          className="dropdown--input"
          name="dates"
        >
          <option value="">Dates</option>
          <option value="name">Today</option>
          <option value="name">Within one week</option>
          <option value="name">Within two weeks</option>
          <option value="name">Within a month</option>
          <option value="name">Within a quartal</option>
          <option value="name">Within a half a year</option>
          <option value="name">Within a year</option>
        </select>
        <div className="search-btn-group">
          <ButtonSecondary text="Search" purpose="search" userType={userType} />
        </div>
      </div>
    </form>
  );
}
