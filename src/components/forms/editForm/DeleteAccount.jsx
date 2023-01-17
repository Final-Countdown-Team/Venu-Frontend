import { useContext, useState } from "react";
import { MainContext } from "../../contexts/MainContext";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import ProfileButton from "../../buttons/ProfileButton";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import "../signupForm/_SignupForm.scss";
import "./_EditForm.scss";
import "../../modal/confirmModal/_ConfirmModal.scss";

function DeleteAccount() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteAccount, isPending } = useContext(MainContext);
  const navigate = useNavigate();

  const hideModal = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className="form-group-delete">
        <div className="form-group-heading--delete">
          <div className="delete-bar--left"></div>
          <span>Delete Your Account</span>
          <div className="delete-bar--right"></div>
        </div>
        {isPending ? (
          <ScaleLoader
            color={"#e5534b"}
            cssOverride={{
              padding: "0.5rem 2.25rem",
              transform: "scale(1.5)",
            }}
            aria-label="Loading Spinner"
          />
        ) : (
          <ProfileButton
            text={isPending ? "Is deleting..." : "Delete account"}
            purpose="delete"
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <ConfirmModal
            hideModal={hideModal}
            deleteAccount={() => deleteAccount(setShowConfirm, navigate)}
          />
        )}
      </div>
    </>
  );
}

export default DeleteAccount;
