import React, { useContext, useState } from "react";
import AvailableButton from "../buttons/AvailableButton";
import { CardButton } from "../buttons/CardButton";
import { MainContext } from "../contexts/MainContext";
import LazyLoadImageComp from "../utils/LazyLoadImageComp";
import { BsCalendarDate } from "react-icons/bs";

import "./_Preview-card.scss";

function PreviewCard({
  img,
  name,
  description,
  userType,
  id,
  availability,
  bookedDates = [],
}) {
  const { isLoggedIn } = useContext(MainContext);
  const [showBooked, setShowBooked] = useState(false);

  const showBookedHandler = () => {
    setShowBooked(!showBooked);
  };
  return (
    <div className="card-container brad-lg">
      <div className="userImage-container">
        <LazyLoadImageComp
          src={img}
          alt="profile preview"
          className="brad-md preview-userImage"
        />

        {bookedDates.length !== 0 && (
          <>
            <div
              onClick={showBookedHandler}
              className={`brad-md preview-date-icon ${
                userType === "artists" ? "color--artists" : "color--venues"
              }`}
            >
              <BsCalendarDate />
            </div>

            <div
              className={`brad-md show-booked-dates ${
                showBooked && "show-booked-active"
              }`}
            >
              <ul>
                {bookedDates.slice(0, 5)?.map((obj, i) => {
                  const booked =
                    userType === "artists" ? obj.venue.name : obj.artist.name;
                  const recentDate = obj.bookedDates.sort();
                  return (
                    <li key={`${obj._id}-${i}`}>
                      {booked} - {recentDate[0].substring(0, 10)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}

        <div className="preview-available-button--position">
          <AvailableButton available={availability} />
        </div>
      </div>
      <div className="card-text-content">
        <div className="card-title">{name}</div>
        <div className="card-desc">{description}</div>
        <div className="card-profile-button">
          <CardButton
            userType={userType}
            link={isLoggedIn ? `/${userType}/profile/${id}` : "/signupLogin"}
            text={isLoggedIn ? "Visit Profile" : "Log in to see profile"}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;
