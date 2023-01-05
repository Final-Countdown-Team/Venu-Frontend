import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../contexts/MainContext";

import CustomDropdown from "./CustomDropdown";
import "./_CustomDropdown.scss";

import "./_SearchBar.scss";

import ButtonSecondary from "../buttons/ButtonSecondary";
import {
  sortOptions,
  radiusOptions,
  dateOptions,
  genreOptions,
} from "./dropdownOptions";
import AutocompleteLocation from "./AutocompleteLocation";

export default function SearchBar() {
  const { globalUserType, getSearchResults } = useContext(MainContext);

  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState("");
  const [dates, setDates] = useState("");
  const [genre, setGenre] = useState("");
  const [latLng, setLatLng] = useState("");

  const dateHandler = (days) => {
    if (!days) return setDates("");
    const date = new Date();
    date.setDate(date.getDate() + days);
    setDates(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Creat query string for fetching previews
    const URL = `/${globalUserType}?name=${searchText}&city=${city}&fields=name,description,profileImage,location,address,availability,dates,genre&sort=${sort}&dates=${dates}&genre=${genre}&distance=${radius}&center=${latLng}`;
    const res = await fetch(URL);
    const data = await res.json();
    getSearchResults(data);
  };

  useEffect(() => {
    // Get user position based on geolocation API
    const getPosition = function () {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    // Get lat and lng from user position
    const getUserLocation = async () => {
      try {
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;
        setLatLng(`${lat},${lng}`);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUserLocation();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        className={`brad-md searchbar--input ${
          globalUserType === "venues" ? "input-focus-venues" : "input-focus-artists"
        }`}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        value={searchText}
        placeholder={`Search for ${globalUserType}`}
      />
      <div className="dropdown-group">
        <CustomDropdown
          state={sort}
          onChange={setSort}
          options={sortOptions}
          type="Sort"
        />
        <CustomDropdown
          state={dates}
          onChange={dateHandler}
          options={dateOptions}
          type="Available"
        />
        {globalUserType === "artists" && (
          <CustomDropdown
            state={genre}
            onChange={setGenre}
            options={genreOptions}
            type="Genre"
          />
        )}
        <CustomDropdown
          state={radius}
          onChange={setRadius}
          options={radiusOptions}
          type="Radius"
        />
        <AutocompleteLocation
          state={"city"}
          onChange={setCity}
          setLatLng={setLatLng}
        />
        <div className="search-btn-group">
          <ButtonSecondary
            text="Search"
            purpose="search"
            userType={globalUserType}
          />
        </div>
      </div>
    </form>
  );
}
