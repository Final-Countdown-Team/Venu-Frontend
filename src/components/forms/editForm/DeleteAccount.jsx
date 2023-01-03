import { useContext, useState } from "react";
import { MainContext } from "../../contexts/MainContext";
import { useNavigate } from "react-router-dom";

import ProfileButton from "../../buttons/ProfileButton";
import ConfirmModal from "./ConfirmModal";
import "../signupForm/_SignupForm.scss";
import "./_EditForm.scss";
import "./_ConfirmModal.scss";

function DeleteAccount({ userType }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { logoutUser } = useContext(MainContext);
  const navigate = useNavigate();

  const hideModal = () => {
    setShowConfirm(false);
  };

  const deleteAccount = async () => {
    try {
      setShowConfirm(false);
      await fetch(`/${userType}/user/deleteMe`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetch(`/${userType}/logout`);
      logoutUser(navigate, "Your account was deleted");
    } catch (err) {}
  };

  return (
    <>
      <div className="form-group-delete">
        <div className="form-group-heading--delete">
          <div className="delete-bar--left"></div>
          <span>Delete Your Account</span>
          <div className="delete-bar--right"></div>
        </div>
        <ProfileButton
          text="Delete account"
          purpose="delete"
          onClick={() => setShowConfirm(true)}
        />
        {showConfirm && (
          <ConfirmModal hideModal={hideModal} deleteAccount={deleteAccount} />
        )}
      </div>
    </>
  );
}

export default DeleteAccount;
