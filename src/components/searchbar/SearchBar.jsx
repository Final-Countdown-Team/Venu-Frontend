import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../contexts/MainContext";

// import "@geoapify/geocoder-autocomplete/styles/round-borders.css";

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

export default function SearchBar({ userType }) {
  const context = useContext(MainContext);

  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  // const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState("");
  const [dates, setDates] = useState("");
  const [genre, setGenre] = useState("");
  const [latLng, setLatLng] = useState("");

  console.log(latLng);
  console.log(city);

  const dateHandler = (days) => {
    if (!days) return setDates("");
    const date = new Date();
    date.setDate(date.getDate() + days);
    setDates(date);
  };

  // const validateZipcode = (e) => {
  //   e.target.value = e.target.value
  //     .replace(/[^0-9.]/g, "")
  //     .replace(/(\..*?)\..*/g, "$1");
  //   setZipcode(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Creat query string for fetching previews
    const URL = `/${userType}?name=${searchText}&city=${city}&fields=name,description,profileImage,location,address,availability,dates,genre&sort=${sort}&dates=${dates}&genre=${genre}&distance=${radius}&center=${latLng}`;
    const res = await fetch(URL);
    const data = await res.json();
    context.setFetchedPreviews(data);
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
      const pos = await getPosition();
      const { latitude: lat, longitude: lng } = pos.coords;
      setLatLng(`${lat},${lng}`);
    };
    getUserLocation();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        className={`searchbar--input ${
          userType === "venues" ? "input-focus-venues" : "input-focus-artists"
        }`}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        value={searchText}
        placeholder={`Search for ${userType}`}
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
        {userType === "artists" && (
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
        {/* <input
          onChange={(e) => validateZipcode(e)}
          maxLength="5"
          className="dropdown--input search-input-zipcode"
          name="zipcode"
          placeholder="Zipcode"
        /> */}
        <div className="search-btn-group">
          <ButtonSecondary text="Search" purpose="search" userType={userType} />
        </div>
      </div>
    </form>
  );
}
