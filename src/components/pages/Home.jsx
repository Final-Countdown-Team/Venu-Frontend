import { useContext, useEffect, useRef } from "react";
import { MainContext } from "../contexts/MainContext";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { containerVariantX, transitionTween } from "../animations/containerVariants";
import { ScaleLoader } from "react-spinners";
import Heading from "../heading/Heading";

import "./_Home.scss";
import Map from "../map/Map";
import ReuseButton from "../buttons/Reusable_BB";

function Home() {
  const { isLoading, setIsLoading, setGlobalUserType, getLocations } =
    useContext(MainContext);

  const { ref } = useInView();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    // console.log("Home is Mounted! IsLoading: ", isLoading);
    setIsLoading(true);
    window.scrollTo(0, 0);
    setGlobalUserType(null);
    getLocations();

    return () => {
      mounted.current = false;
      // console.log("HOME is Not Mounted! State: ", mounted.current);
      setIsLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spinnerOverride = {
    margin: "10rem 20rem",
    transform: "scale(2)",
  };

  return (
    <motion.div
      variants={containerVariantX}
      initial="exit"
      animate="visible"
      exit="hidden"
      transition={transitionTween}
      className="margin-container home-container"
    >
      <Heading />
      <div className="about-text">
        <p className="bold-text" stlye={{ fontSize: "2rem" }}>
          VENU is an innovative and effortless app that makes music happen.
        </p>
        <p>
          We connect musicians and venues, allowing you, the artist to plan your
          upcoming tour in the most uncomplicated way possible. No more juggling
          bookers and promoters. We’re cutting out the middlemen, and putting the
          creative freedom back in your hands. We’re also proud to be supporting
          local venues and beloved independent businesses by giving them the
          opportunity to find and book new and exciting entertainers to present.
        </p>
        <p className="italic-text">
          We love music, and we’re chuffed to help make the magic happen!
        </p>
      </div>
      <p className="slogan">Venu - When you wanna play</p>
      <div className="home-button-container">
        <Link to="/venues" className="button-link">
          <ReuseButton text="Venues" userType="venues" />
        </Link>
        <Link to="/artists" className="button-link">
          <ReuseButton text="Artists" userType="artists" />
        </Link>
      </div>
      <div className="home-map-container">
        {isLoading ? (
          <ScaleLoader
            cssOverride={spinnerOverride}
            color={"#b02476"}
            aria-label="Loading Spinner"
          />
        ) : (
          <div ref={ref}>
            <Map purpose={"home"} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;
