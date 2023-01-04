import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHJ1Y2ttYXgiLCJhIjoiY2xia253Z25iMDA2YTNxbW1vaTVoa3hyeiJ9.mqCHJuNW2TYEN4HPM7_7zA";

const Map = ({ users }) => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/druckmax/clablcs6w002315ls0sly3qct",
      center: [13.405, 52.52],
      scrollZoom: false,
      zoom: 10,
      maxZoom: 10,
    });
    const bounds = new mapboxgl.LngLatBounds();
    // Create default markers

    if (!users) return;
    users?.forEach((user) => {
      let color =
        user.type === "artists"
          ? "#0168b5"
          : user.type === "venues"
          ? "#b02476"
          : "#000";
      const coords = user.location.coordinates;
      new mapboxgl.Marker({ color }).setLngLat(coords).addTo(map);
      bounds.extend(coords);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 50,
        bottom: 50,
      },
    });

    // Clean up on unmount
    return () => map.remove();
  }, [users]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
