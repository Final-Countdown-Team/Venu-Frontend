import ProfileButton from "../../buttons/ProfileButton";
import "../signupForm/_SignupForm.scss";
import "./_EditForm.scss";

function DeleteAccount() {
  return (
    <div className="form-group-delete">
      <div className="form-group-heading--delete">
        <div className="delete-bar--left"></div>
        <span>Delete Your Account</span>
        <div className="delete-bar--right"></div>
      </div>
      <ProfileButton text="Delete account" purpose="delete" />
    </div>
  );
}

export default DeleteAccount;
