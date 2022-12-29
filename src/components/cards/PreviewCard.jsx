import React, { useContext } from "react";
import AvailableButton from "../buttons/AvailableButton";
import { CardButton } from "../buttons/CardButton";
import { MainContext } from "../contexts/MainContext";
import LazyLoadImageComp from "../utils/LazyLoadImageComp";

import "./_Preview-card.scss";

function PreviewCard({ img, name, description, userType, id, availability }) {
  const { isLoggedIn } = useContext(MainContext);
  return (
    <div className="card-container brad-lg">
      <div className="userImage-container">
        <LazyLoadImageComp
          src={img}
          alt="profile preview"
          className="brad-lg preview-userImage"
        />
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
