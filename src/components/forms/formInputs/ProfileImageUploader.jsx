import { MdEdit } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { useState } from "react";
import defaultUser from "../../../img/default_user_small.png";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

function ProfileImageUploader({ setImageFiles, ...props }) {
  const { loggedInUser, isLoggedIn } = useContext(MainContext);
  const [curProfileImage, setCurProfileImage] = useState(defaultUser);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    if (isLoggedIn) setCurProfileImage(loggedInUser.profileImage);
  }, [isLoggedIn, loggedInUser]);

  const validateFileSize = (file) => {
    console.log(file.size);
    if (file.size >= 500000) {
      toast.error("This file is too big");
      return true;
    }
    return false;
  };

  const showNewProfileImage = (e) => {
    const profileImage = e.currentTarget.files[0];
    if (validateFileSize(profileImage)) return;
    setShowReset(true);
    Object.assign(profileImage, {
      preview: URL.createObjectURL(profileImage),
    });
    setCurProfileImage(profileImage.preview);
    delete profileImage.preview;
    setImageFiles((prev) => ({ ...prev, profileImage }));
  };

  const resetProfileImage = () => {
    setShowReset(false);
    setCurProfileImage(loggedInUser.profileImage);
    setImageFiles((prev) => ({ ...prev, profileImage: null }));
  };

  return (
    <>
      <img src={curProfileImage} alt="default user profileImage" />
      <div className="brad-md edit-button">
        <MdEdit className="edit-icon" />
        Edit
        <input
          className="edit-input"
          type="file"
          accept="image/*"
          onChange={(e) => showNewProfileImage(e)}
        />
      </div>
      {showReset && (
        <div
          onClick={resetProfileImage}
          className="brad-md edit-button reset-button"
        >
          <RxReset className="edit-icon" />
        </div>
      )}
    </>
  );
}

export default ProfileImageUploader;
