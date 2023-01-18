import React, { useState } from "react";
import { useEffect } from "react";
import CustomDropdown from "./CustomDropdown";

function AutocompleteLocation({ setLatLng, setRadius }) {
  const [userInput, setUserInput] = useState("");
  const [finalQuery, setFinalQuery] = useState("");
  const [autoSuggestions, setAutoSuggestions] = useState([]);

  // Delaying the user input to not trigger fetch on every onChange
  useEffect(() => {
    if (userInput === "") {
      setLatLng("");
      setRadius((prev) => (prev = ""));
      return;
    }
    const timeoutID = setTimeout(() => setFinalQuery(userInput), 1000);
    return () => clearTimeout(timeoutID);
  }, [userInput, setLatLng, setRadius]);

  // Fetch the data from geoapify, set the data to autoSuggestions and signal that data is received to dataReceived
  useEffect(() => {
    const autocompleteHandler = () => {
      const fetchAutocomplete = async () => {
        try {
          const res = await fetch(
            //Sets queries for API, and sets radius (filter) to most of europa, via a radius (https://www.calcmaps.com/de/map-radius/)
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${finalQuery}&type=locality&lang=en&limit=3&format=json&filter=circle:-0.51641,50.81340,1692697&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`
          );
          if (!res.ok) throw new Error(res);
          const data = await res.json();
          // Map through data and create options object for dropdown
          const options = data.results.map((item) => {
            return {
              coordinates: `${item.lat},${item.lon}`,
              value: item.city,
              label: `${item.formatted}`,
            };
          });
          // Set autoSuggestions state from options
          setAutoSuggestions(options);
        } catch (err) {
          console.error(err.message);
        }
      };
      fetchAutocomplete();
    };
    // If no input return function before fetching
    if (finalQuery === "") return;
    autocompleteHandler();
  }, [finalQuery]);

  return (
    <CustomDropdown
      autocomplete={true}
      userInput={userInput}
      finalQuery={finalQuery}
      setUserInput={setUserInput}
      options={autoSuggestions}
      setLatLng={setLatLng}
      setRadius={setRadius}
    />
  );
}

export default AutocompleteLocation;
