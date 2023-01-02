import { useContext, useState } from "react";
import ProfileButton from "../../buttons/ProfileButton";
import "../signupForm/_SignupForm.scss";
import "./_EditForm.scss";
import "./_ConfirmModal.scss";
import ConfirmModal from "./ConfirmModal";
import { MainContext } from "../../contexts/MainContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DeleteAccount({ userType }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { setIsLoggedIn } = useContext(MainContext);
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
      toast.success("Your account was deleted");
      setIsLoggedIn(false);
      navigate("/");
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
