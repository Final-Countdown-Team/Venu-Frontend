import { useEffect, useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import "./_Overview.scss";
import SearchBar from "../searchbar/SearchBar";
import PreviewCard from "../cards/PreviewCard";
import ArrowBack from "../utils/ArrowBack";
import { RxDoubleArrowDown } from "react-icons/rx";
import NoResults from "../../img/no-results.gif";
import { motion } from "framer-motion";

function Overview({ userType }) {
  const context = useContext(MainContext);

  useEffect(() => {
    const fetchPreviews = async () => {
      const URL = `/${userType}?fields=name,description,profileImage`;
      const res = await fetch(URL);
      const data = await res.json();
      context.setFetchedPreviews(data);
    };
    fetchPreviews();
  }, []);

  const renderFetchedPreviews = context?.fetchedPreviews.data?.map((preview) => (
    <PreviewCard
      userType={userType}
      key={preview._id}
      id={preview._id}
      description={preview.description}
      name={preview.name}
      img={preview.profileImage}
    />
  ));

  return (
    <>
      <div className={`navbar-box-shadow box-shadow--${userType}`} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // transition={{ duration: 0.7 }}
      >
        <div className="margin-container">
          <SearchBar userType={userType} />
          {renderFetchedPreviews?.length >= 1 ? (
            <div className="preview-card-container">
              {renderFetchedPreviews}
              <div className={`double-arrow-down double-arrow--${userType}`}>
                <RxDoubleArrowDown />
              </div>
            </div>
          ) : (
            <div className="preview-card-container no-results-container">
              <img className="no-results-gif" src={NoResults} alt="no results animation" />
              <p className="no-results-text">Sorry, we couldn't find what you are looking for...</p>
            </div>
          )}

          <div className="overview-arrow-wrapper">
            <ArrowBack userType={userType} />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Overview;
