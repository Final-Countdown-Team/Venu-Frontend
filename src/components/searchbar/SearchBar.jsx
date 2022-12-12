import React, { useState } from "react";
import "./_SearchBar.scss";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useEffect } from "react";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export default function SearchBar({ userType }) {
  const context = useContext(MainContext);

  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [radius, setRadius] = useState("");
  const [dates, setDates] = useState("");
  const [latLng, setLatLng] = useState("");

  // console.log(typeof new Date(dates));

  const handleSearch = (e) => setSearchText(e.target.value);
  const handleSort = (e) => setSort(e.target.value);
  const handleRadius = (e) => setRadius(e.target.value);
  const handleDates = (e) => setDates(e.target.value);
  const validateZipcode = (e) => {
    console.log(e.target.value.length);
    return (e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Creat query string for fetching previews

    const URL = `/${userType}?name=${searchText}&fields=name,description,profileImage&sort=${sort}&dates=${dates}&distance=${radius}&center=${latLng}`;
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

  const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
  };

  const today = new Date();

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        className={`searchbar--input ${
          userType === "venues" ? "input-focus-venues" : "input-focus-artists"
        }`}
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
          <option value="-name">Name: Z-A</option>
          <option value="-createdAt">Newest</option>
          <option value="capacity">Capacity asc.</option>
          <option value="-capacity">Capacity desc.</option>
        </select>
        <select
          onChange={handleRadius}
          defaultValue=""
          className="dropdown--input"
          name="radius"
        >
          <option value="">Radius</option>
          <option value="5">5km</option>
          <option value="10">10km</option>
          <option value="20">20km</option>
          <option value="50">50km</option>
          <option value="100">100km</option>
          <option value="200">200km</option>
          <option value="500">500km</option>
        </select>
        <select
          onChange={handleDates}
          defaultValue=""
          className="dropdown--input"
          name="dates"
        >
          <option value="">Dates</option>
          <option value={today}>Today</option>
          <option value={addDays(new Date(), 7)}>Within one week</option>
          <option value={addDays(new Date(), 14)}>Within two weeks</option>
          <option value={addDays(new Date(), 31)}>Within a month</option>
          <option value={addDays(new Date(), 91)}>Within a quarter</option>
          <option value={addDays(new Date(), 182.5)}>
            Within a half a year
          </option>
          <option value={addDays(new Date(), 365)}>Within a year</option>
        </select>
        <input
          onChange={(e) => validateZipcode(e)}
          maxLength="5"
          className="dropdown--input search-input-zipcode"
          name="zipcode"
          placeholder="Zipcode"
        />
        <div className="search-btn-group">
          <ButtonSecondary text="Search" purpose="search" userType={userType} />
        </div>
      </div>
    </form>
  );
}
