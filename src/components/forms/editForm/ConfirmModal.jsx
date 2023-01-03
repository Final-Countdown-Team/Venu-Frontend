import ProfileButton from "../../buttons/ProfileButton";
import "../forgotPasswordModal/_ForgotPasswordModal.scss";
import "./_ConfirmModal.scss";

function ConfirmModal({ deleteAccount, hideModal }) {
  return (
    <div className="forgot-password-modal">
      <div className="confirm-modal">
        <p>Are you sure that you want to delete your account?</p>
        <ProfileButton text="Cancel" purpose="delete" onClick={hideModal} />
        <ProfileButton text="Yes" onClick={deleteAccount} />
      </div>
    </div>
  );
}

export default ConfirmModal;
