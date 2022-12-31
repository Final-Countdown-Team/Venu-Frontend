import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Calendar } from "react-multi-date-picker";
import { motion } from "framer-motion";
import { containerVariantX } from "../animations/containerVariants";
import { Link, useParams } from "react-router-dom";

import "./_UserProfile.scss";

import {
  AiFillFacebook as Facebook,
  AiOutlineInstagram as Instagram,
  AiOutlineTwitter as Twitter,
  AiFillYoutube as Youtube,
} from "react-icons/ai";
import { BsFillPeopleFill, BsGlobe2 as Website } from "react-icons/bs";

import Map from "../map/Map";
import AvailableButton from "../buttons/AvailableButton";
import LazyLoadImageComp from "../utils/LazyLoadImageComp";
import { MainContext } from "../contexts/MainContext";
import ContactForm from "../forms/contactForm/ContactForm";
import ButtonSecondary from "../buttons/ButtonSecondary";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

function UserProfile({ userType, id, editable }) {
  const context = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [dimensions, setDimensions] = useState({ width: window.innerWidth });
  console.log(userType);

  // Get user ID from URL
  const { id: userID } = useParams();
  // If the id is not passed in props, take the id from the URL. id prop is passed when user is logged in and accesses the profile via the /me route
  const currUserID = !id ? userID : id;

  // Load map only if it is visible in viewport for animation
  const { ref } = useInView({ triggerOnce: true });

  // Set global user type for navbar boxshadow
  useEffect(() => {
    context.setGlobalUserType(userType);
  }, [userType, context]);

  // Check changes in screen size for responsiveness of calendar
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    console.log("Renders resize...");
    return (_) => window.removeEventListener("resize", handleResize);
  }, []);

  // Get data from backend
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        console.log(`/${userType}/${currUserID}`);
        const res = await fetch(`/${userType}/${currUserID}`);
        const data = await res.json();
        console.log(data);
        setUser(data.data);
        // Signal end of loading process
        setIsLoading(false);
      } catch (err) {
        console.err(err);
        toast.error("Ups, something went wrong ☹️");
      }
    };
    fetchUser();
    console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Object of Icons for social media icon mapping
  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    website: Website,
  };

  const spinnerOverride = {
    margin: "10rem 20rem",
    transform: "scale(2)",
  };

  // Show loading spinner while fetching from backend
  if (isLoading) {
    return (
      <ScaleLoader
        cssOverride={spinnerOverride}
        color={userType === "artists" ? "#0168b5" : "#b02476"}
        aria-label="Loading Spinner"
      />
    );
  }

  return (
    <motion.div
      variants={containerVariantX}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="margin-container"
    >
      <div className="preview-card-container user-profile-container">
        <div className="padding-group">
          <div className="user-profile-image-container brad-md">
            <LazyLoadImageComp
              className="user-profile-image brad-md"
              src={user?.profileImage}
              alt="profile"
            />
            <div className="available-button--position">
              <AvailableButton available={user?.availability} />
            </div>
            {editable && (
              <Link
                className={`edit-profile-btn bgColor--${userType} brad-md`}
                to={"/me/editProfile"}
              >
                Edit Profile
              </Link>
            )}
          </div>

          <div className="user-heading">
            <h2>{user?.name}</h2>
          </div>

          <div className="user-description-group">
            <p className="genre">
              <span className="bold">Genre: </span>
              {user?.genre}
            </p>
            <p className="description">{user?.description}</p>
          </div>

          <div className="social-media-group">
            {!isLoading &&
              user?.mediaLinks &&
              Object.entries(user.mediaLinks).map((link) => {
                const type = link[0].slice(0, -3);
                const Icon = icons[type];
                return (
                  <a
                    className={`icon ${type}-icon brad-sm`}
                    key={link[0]}
                    href={link[1]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon />
                  </a>
                );
              })}
          </div>
        </div>

        {user?.images?.length > 0 && (
          <div className="image-gallery">
            {user?.images?.map((image) => {
              return (
                <LazyLoadImageComp
                  src={image}
                  alt="gallery"
                  wrapperClassName="image-gallery-lazy-wrapper"
                  className={"image-gallery--image"}
                />
              );
            })}
          </div>
        )}

        <div className="dates-group brad-lg">
          <h3>Available Dates:</h3>
          <Calendar
            numberOfMonths={
              dimensions.width >= 1150 ? 3 : dimensions.width >= 700 ? 2 : 1
            }
            multiple={true}
            minDate={Date.now()}
            mapDays={({ today, date, isSameDate }) => {
              let props = {};
              if (isSameDate(date, today))
                props.style = {
                  backgroundColor: "#666",
                };
              return props;
            }}
            className="calendar"
            value={user?.dates?.sort()}
            readOnly={true}
          />
        </div>

        <div className="padding-group members-group">
          <h3>{userType === "artists" ? "Members:" : "Capacity:"}</h3>
          <div className="member-count">
            {userType === "artists" ? user?.members : user?.capacity}
            <BsFillPeopleFill className="members-icon" />
          </div>
        </div>

        <div className="location-group">
          <h3>Location:</h3>
          <p className="location-address">{`${user?.address?.street}, ${user?.address?.city} ${user?.address?.zipcode}`}</p>
          {!isLoading && <div ref={ref}>{/* <Map users={[user]} /> */}</div>}
        </div>

        <div className="padding-group contact-group">
          <h3>{!editable && "Contact:"}</h3>
          {!editable ? (
            <ContactForm userType={userType} />
          ) : (
            <ButtonSecondary
              userType={userType}
              text="Edit Profile"
              redirectTo={"/me/editProfile"}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default UserProfile;
