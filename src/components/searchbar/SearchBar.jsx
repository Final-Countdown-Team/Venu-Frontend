import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../contexts/MainContext";

import CustomDropdown from "./CustomDropdown";
import "./_CustomDropdown.scss";

import "./_SearchBar.scss";

import ButtonSecondary from "../buttons/ButtonSecondary";
import {
  radiusOptions,
  dateOptions,
  genreOptions,
  sortOptionsArtists,
  sortOptionsVenues,
} from "./dropdownOptions";
import AutocompleteLocation from "./AutocompleteLocation";

export default function SearchBar() {
  const { globalUserType, getSearchResults } = useContext(MainContext);

  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [radius, setRadius] = useState("10");
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
    // Create query string for fetching previews
    const URL = `${process.env.REACT_APP_BACKEND_URL}/${globalUserType}?name=${searchText}&fields=name,description,profileImage,location,address,availability,dates,bookedDates,genre&sort=${sort}&dates=${dates}&genre=${genre}&distance=${radius}&center=${latLng}`;
    const res = await fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND_URL,
      },
    });
    const data = await res.json();
    await getSearchResults(data);
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
    if (latLng === "") {
      setRadius("");
      getUserLocation();
      return;
    } else {
      return;
    }
  }, [latLng]);

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        className={`brad-md searchbar--input input-focus-${globalUserType}
        }`}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        value={searchText}
        placeholder={`Search for ${globalUserType}`}
      />
      <div className="dropdown-group">
        <CustomDropdown
          onChange={setSort}
          options={
            globalUserType === "artists" ? sortOptionsArtists : sortOptionsVenues
          }
          type="Sort"
        />
        <CustomDropdown
          onChange={dateHandler}
          options={dateOptions}
          type="Available"
        />
        {globalUserType === "artists" && (
          <CustomDropdown onChange={setGenre} options={genreOptions} type="Genre" />
        )}
        <CustomDropdown
          onChange={setRadius}
          options={radiusOptions}
          type="Radius"
          radius={radius}
        />
        <AutocompleteLocation setLatLng={setLatLng} setRadius={setRadius} />
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
