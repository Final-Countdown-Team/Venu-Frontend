import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useInView } from "react-intersection-observer";
import { Calendar } from "react-multi-date-picker";
import { motion } from "framer-motion";
import { containerVariantX } from "../animations/containerVariants";
import { useParams } from "react-router-dom";

import "react-multi-date-picker/styles/colors/green.css";
import "./_UserProfile.scss";

import {
  AiFillFacebook as Facebook,
  AiOutlineInstagram as Instagram,
  AiOutlineTwitter as Twitter,
  AiFillYoutube as Youtube,
} from "react-icons/ai";
import { BsFillPeopleFill, BsGlobe2 as Website } from "react-icons/bs";

import InputHalf from "../forms/formInputs/InputHalf";
import Textbox from "../forms/formInputs/Textbox";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Map from "../map/Map";
import AvailableButton from "../buttons/AvailableButton";

function UserProfile({ userType }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [dimensions, setDimensions] = useState({ width: window.innerWidth });

  // Get user ID from URL
  const { id: userID } = useParams();
  console.log(user);
  // Load map only if it is visible in viewport for animation
  const { ref } = useInView();

  // Check changes in screen size for responsiveness of calendar
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    return (_) => window.removeEventListener("resize", handleResize);
  });

  // Get data from backend
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/${userType}/${userID}`);
      const data = await res.json();
      setUser(data.data);
      setIsLoading(false);
    };
    fetchUser();
  }, [userType, userID]);

  // Show loading spinner while fetching from backend
  if (isLoading) {
    return null;
  }

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
      className="margin-container"
    >
      <div className="preview-card-container user-profile-container">
        <div className="padding-group">
          <div className="user-profile-image-container">
            <img
              className="user-profile-image"
              src={user?.profileImage}
              alt="profile"
            />
            <div className="available-button--position">
              <AvailableButton available={user?.availability} />
            </div>
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
              user.mediaLinks &&
              Object.entries(user.mediaLinks).map((link) => {
                const type = link[0].slice(0, -3);
                const Icon = icons[type];
                return (
                  <a
                    className={`icon ${type}-icon`}
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

        {user.images.length > 0 && (
          <div className="image-gallery">
            {user?.images?.map((image) => {
              return <img src={image} alt="gallery" />;
            })}
          </div>
        )}

        <div className="dates-group">
          <h3>Available Dates:</h3>
          <Calendar
            numberOfMonths={
              dimensions.width >= 1150 ? 3 : dimensions.width >= 700 ? 2 : 1
            }
            multiple={true}
            minDate={Date.now()}
            mapDays={({ today, date, currentMonth, isSameDate }) => {
              let props = {};
              if (isSameDate(date, today))
                props.style = {
                  backgroundColor: "#666",
                };
              return props;
            }}
            className="calendar"
            value={user?.dates.sort()}
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
          {!isLoading && <div ref={ref}>{/* <Map user={user} /> */}</div>}
        </div>

        <div className="padding-group contact-group">
          <h3>Contact:</h3>
          <Formik>
            <Form>
              <div className="input-row">
                <InputHalf name="name" label="Name" placeholder="Enter your name" />
                <InputHalf
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              </div>
              <Textbox
                name="message"
                placeholder="Write me a message :)"
                label="Your message:"
                customClass="textbox-user-profile"
              />
              <ButtonSecondary
                text="Send your message"
                submit={true}
                userType={userType}
              />
            </Form>
          </Formik>
        </div>
      </div>
    </motion.div>
  );
}

export default UserProfile;
