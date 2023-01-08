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

function Overview({ userType }) {
  const { setGlobalUserType, previews, isLoading, setIsLoading, getPreviews } =
    useContext(MainContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setGlobalUserType(userType);
    getPreviews(userType, signal);

    return () => {
      setIsLoading(true);
      console.log("Previews is NOT mounted! IsLoading: ", isLoading);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const renderFetchedPreviews = previews.data?.map((preview) => (
    <PreviewCard
      userType={userType}
      key={preview._id}
      id={preview._id}
      description={preview.description}
      availability={preview.availability}
      name={preview.name}
      img={preview.profileImage}
    />
  ));

  const spinnerOverride = {
    margin: "10rem 20rem",
    transform: "scale(2)",
  };

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
        <ScaleLoader
          cssOverride={spinnerOverride}
          color={userType === "artists" ? "#0168b5" : "#b02476"}
          aria-label="Loading Spinner"
        />
      ) : renderFetchedPreviews?.length >= 1 ? (
        <motion.div
          variants={containerVariantY}
          initial="exit"
          animate="visible"
          className="preview-card-container"
          transition={transitionTween}
        >
          {renderFetchedPreviews}
          <div className={`double-arrow-down double-arrow--${userType}`}>
            <RxDoubleArrowDown />
          </div>
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
