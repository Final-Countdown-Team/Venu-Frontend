import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useInView } from "react-intersection-observer";
import { Calendar } from "react-multi-date-picker";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import "react-multi-date-picker/styles/colors/green.css";
import "./_UserProfile.scss";

import {
  AiFillFacebook as Facebook,
  AiOutlineInstagram as Instagram,
  AiOutlineTwitter as Twitter,
  AiFillYoutube as Youtube,
} from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import InputHalf from "../forms/formInputs/InputHalf";
import Textbox from "../forms/formInputs/Textbox";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Map from "../map/Map";

function UserProfile({ userType }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [dimensions, setDimensions] = useState({ width: window.innerWidth });

  const { id: userID } = useParams();
  console.log(user);
  const { ref } = useInView();

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    return (_) => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/${userType}/${userID}`);
      const data = await res.json();
      setUser(data.data);
      setIsLoading(false);
    };
    fetchUser();
  }, [userType, userID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    // website: Website
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100vw" }}
      transition={{ type: "spring", stiffness: 100 }}
      // transition={{ duration: 0.7 }}
    >
      <div className="margin-container">
        <div className="preview-card-container user-profile-container">
          <div className="padding-group">
            <img
              className="user-profile-image"
              src={user?.profileImage}
              alt="profile"
            />
            <div className="user-heading">
              <h2>{user?.name}</h2>
              {/* availability button here */}
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

          <div className="image-gallery">
            {user?.images?.map((image) => {
              return <img src={image} alt="gallery" />;
            })}
          </div>
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
            <h3>Members:</h3>
            <div className="member-count">
              {user?.members}
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
                  <InputHalf
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                  />
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
      </div>
    </motion.div>
  );
}

export default UserProfile;
