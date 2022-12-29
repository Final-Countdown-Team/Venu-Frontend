import { MdEdit } from "react-icons/md";
import { useFormikContext } from "formik";
import { useState } from "react";
import defaultUser from "../../../img/default_user_small.png";

function ProfileImageUploader(props) {
  const formikContext = useFormikContext(props);

  const [curProfileImage, setCurProfileImage] = useState(defaultUser);

  const showNewProfileImage = (e) => {
    const profileImage = e.currentTarget.files[0];
    Object.assign(profileImage, {
      preview: URL.createObjectURL(profileImage),
    });
    setCurProfileImage(profileImage.preview);
    formikContext.setFieldValue("profileImage", profileImage);
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
          name="profileImage"
          accept="image/*"
          onChange={(e) => showNewProfileImage(e)}
        />
      </div>
    </>
  );
}

export default ProfileImageUploader;
