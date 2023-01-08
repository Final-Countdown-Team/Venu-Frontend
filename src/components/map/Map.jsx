import React, { useRef, useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MainContext } from "../contexts/MainContext";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHJ1Y2ttYXgiLCJhIjoiY2xia253Z25iMDA2YTNxbW1vaTVoa3hyeiJ9.mqCHJuNW2TYEN4HPM7_7zA";

const Map = ({ purpose }) => {
  const { mapLocations, watchUser, loggedInUser, isLoading } =
    useContext(MainContext);
  const mapContainerRef = useRef(null);
  // Set users or user based on purpose
  const users = purpose === "home" ? mapLocations : [];
  const user = purpose === "watchUser" ? watchUser : loggedInUser;
  const mounted = useRef(false);

  // Helper function for creating markers
  const createMarker = (user, map, bounds) => {
    let color =
      user.type === "artists"
        ? "#0168b5"
        : user.type === "venues"
        ? "#b02476"
        : "#000";
    if (!user.location.coordinates) {
      return;
    } else {
      const coords = user.location.coordinates;
      new mapboxgl.Marker({ color }).setLngLat(coords).addTo(map);
      bounds.extend(coords);
    }
  };

  // Initialize map when component mounts
  useEffect(() => {
    mounted.current = true;
    console.log("Map is Mounted! Is loading:", isLoading);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/druckmax/clablcs6w002315ls0sly3qct",
      center: [13.405, 52.52],
      scrollZoom: false,
      zoom: 10,
      maxZoom: 10,
    });
    const bounds = new mapboxgl.LngLatBounds();
    // Create default markers, map through them for mapLocations, else set marker for single user
    if (users.length !== 0 || Object.keys(user).length !== 0) {
      if (purpose === "home" && users.length !== 0) {
        users.forEach((user) => {
          createMarker(user, map, bounds);
        });
      } else if (Object.keys(user).length !== 0) {
        createMarker(user, map, bounds);
      } else {
        return;
      }

      map.fitBounds(bounds, {
        padding: {
          top: 50,
          bottom: 50,
        },
      });
    }

    // Clean up on unmount
    return () => {
      mounted.current = false;
      console.log("Map is Not Mounted! Is loading: ", isLoading);
      map.remove();
    };
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

Map.defaultProps = {};

export default Map;
