import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariantX, transitionTween } from "../animations/containerVariants";
import { Calendar } from "react-multi-date-picker";
import { useInView } from "react-intersection-observer";

import AvailableButton from "../buttons/AvailableButton";
import LazyLoadImageComp from "../utils/LazyLoadImageComp";
import ButtonSecondary from "../buttons/ButtonSecondary";
import ContactForm from "../forms/contactForm/ContactForm";

import {
  AiFillFacebook as Facebook,
  AiOutlineInstagram as Instagram,
  AiOutlineTwitter as Twitter,
  AiFillYoutube as Youtube,
} from "react-icons/ai";
import { BsFillPeopleFill, BsGlobe2 as Website } from "react-icons/bs";

import "./_UserProfile.scss";
import { MainContext } from "../contexts/MainContext";

function UserProfile({ user, editable }) {
  const { setGlobalUserType } = useContext(MainContext);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth });
  // Load map only if it is visible in viewport for animation
  const { ref } = useInView({ triggerOnce: true });
  // Check changes in screen size for responsiveness of calendar
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    console.log("Renders resize...");
    return (_) => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setGlobalUserType(user.type);
  }, []);
  // Object of Icons for social media icon mapping
  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    website: Website,
  };
  return (
    <motion.div
      variants={containerVariantX}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={transitionTween}
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
                className={`edit-profile-btn bgColor--${user.type} brad-md`}
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
            {user?.mediaLinks &&
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

        {user?.images?.every((img) => img !== "") && (
          <div className="image-gallery">
            {user?.images?.map((image, i) => {
              if (image === "") return null;
              return (
                <LazyLoadImageComp
                  src={image}
                  key={`${image}-${i}`}
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
          <h3>{user.type === "artists" ? "Members:" : "Capacity:"}</h3>
          <div className="member-count">
            {user.type === "artists" ? user?.members : user?.capacity}
            <BsFillPeopleFill className="members-icon" />
          </div>
        </div>

        <div className="location-group">
          <h3>Location:</h3>
          <p className="location-address">{`${user?.address?.street}, ${user?.address?.city} ${user?.address?.zipcode}`}</p>
          <div ref={ref}>{/* <Map users={[user]} /> */}</div>
        </div>

        <div className="padding-group contact-group">
          <h3>{!editable && "Contact:"}</h3>
          {!editable ? (
            <ContactForm userType={user.type} />
          ) : (
            <ButtonSecondary
              userType={user.type}
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
