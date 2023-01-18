import { useEffect, useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import "./_Overview.scss";
import SearchBar from "../searchbar/SearchBar";
import PreviewCard from "../cards/PreviewCard";
import ArrowBack from "../utils/ArrowBack";
import { RxDoubleArrowDown } from "react-icons/rx";
import NoResults from "../../img/no-results.gif";
import { motion } from "framer-motion";
import {
  containerVariantX,
  containerVariantY,
  transitionTween,
} from "../animations/containerVariants";
import { ScaleLoader } from "react-spinners";
import { spinnerOverrideBig } from "../utils/spinnerOverride";

function Overview({ userType }) {
  const {
    setGlobalUserType,
    previews,
    isLoading,
    setIsLoading,
    getPreviews,
    dispatch,
  } = useContext(MainContext);

  const [nextPage, setNextPage] = useState(1);
  const [URL, setURL] = useState(
    `${process.env.REACT_APP_BACKEND_URL}/${userType}?fields=name,description,profileImage,availability,dates,bookedDates&page=${nextPage}&limit=6`
  );

  useEffect(() => {
    setURL(
      `${process.env.REACT_APP_BACKEND_URL}/${userType}?fields=name,description,profileImage,availability,dates,bookedDates&page=${nextPage}&limit=6`
    );
  }, [userType, nextPage]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setGlobalUserType(userType);
    getPreviews(URL, signal);
    setNextPage((prev) => prev + 1);

    return () => {
      setIsLoading(true);
      // console.log("Previews is NOT mounted! IsLoading: ", isLoading);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const getNextPreviews = async () => {
    try {
      if (previews.length % 6 !== 0) return;
      setNextPage((prev) => prev + 1);
      const res = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND_URL,
        },
      });
      const data = await res.json();
      dispatch({
        type: "GET_PREVIEWS",
        payload: [...previews, ...data.data],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const renderFetchedPreviews = previews.map((preview) => (
    <PreviewCard
      userType={userType}
      key={preview._id}
      id={preview._id}
      description={preview.description}
      availability={preview.availability}
      bookedDates={preview.bookedDates}
      name={preview.name}
      img={preview.profileImage}
    />
  ));

  return (
    <motion.div
      variants={containerVariantX}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transitionTween}
    >
      <SearchBar />
      {isLoading ? (
        <div className="loading-wrapper--overview">
          <ScaleLoader
            cssOverride={spinnerOverrideBig}
            color={userType === "artists" ? "#0168b5" : "#b02476"}
            aria-label="Loading Spinner"
          />
        </div>
      ) : renderFetchedPreviews?.length >= 1 ? (
        <motion.div
          variants={containerVariantY}
          initial="exit"
          animate="visible"
          className="preview-card-container"
          transition={transitionTween}
        >
          {renderFetchedPreviews}
          {previews.length % 6 === 0 && (
            <div className={`double-arrow-down double-arrow--${userType}`}>
              <RxDoubleArrowDown
                onClick={() => getNextPreviews()}
                className="arrow-icon"
              />
            </div>
          )}
        </motion.div>
      ) : (
        <div className="preview-card-container no-results-container">
          <img
            className="no-results-gif"
            src={NoResults}
            alt="no results animation"
          />
          <p className="no-results-text">
            Sorry, we couldn't find what you are looking for...
          </p>
        </div>
      )}
      <div className="overview-arrow-wrapper">
        <ArrowBack userType={userType} />
      </div>
    </motion.div>
  );
}

export default Overview;
