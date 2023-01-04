import { MdEdit } from "react-icons/md";
import { useState } from "react";
import defaultUser from "../../../img/default_user_small.png";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";
import { useEffect } from "react";

function ProfileImageUploader({ setImageFiles, ...props }) {
  const { loggedInUser, isLoggedIn } = useContext(MainContext);
  const [curProfileImage, setCurProfileImage] = useState(defaultUser);

  useEffect(() => {
    if (isLoggedIn) setCurProfileImage(loggedInUser.profileImage);
  }, [isLoggedIn, loggedInUser]);

  const showNewProfileImage = (e) => {
    const profileImage = e.currentTarget.files[0];
    Object.assign(profileImage, {
      preview: URL.createObjectURL(profileImage),
    });
    setCurProfileImage(profileImage.preview);
    delete profileImage.preview;
    setImageFiles((prev) => ({ ...prev, profileImage }));
  };

  return (
    <>
      <img src={curProfileImage} alt="default user profileImage" />
      <div className="brad-sm edit-button">
        <MdEdit className="edit-icon" />
        Edit
        <input
          className="edit-input"
          type="file"
          accept="image/*"
          onChange={(e) => showNewProfileImage(e)}
        />
      </div>
    </>
  );
}

export default ProfileImageUploader;
