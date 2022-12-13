import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHJ1Y2ttYXgiLCJhIjoiY2xia253Z25iMDA2YTNxbW1vaTVoa3hyeiJ9.mqCHJuNW2TYEN4HPM7_7zA";

const Map = ({ user }) => {
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
    const coords = user.location.coordinates;
    new mapboxgl.Marker().setLngLat(coords).addTo(map);
    bounds.extend(coords);
    map.fitBounds(bounds, {
      padding: {
        top: 50,
        bottom: 50,
      },
    });
    // Clean up on unmount
    return () => map.remove();
  }, [user]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
