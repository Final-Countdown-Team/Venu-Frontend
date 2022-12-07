import ProfileButton from "../../buttons/ProfileButton";
import InputFull from "../formInputs/InputFull";

function ChangePasswordForm() {
  return (
    <div className="form-group-bg edit-form-group-password">
      <p className="form-group-heading">Password:</p>
      <InputFull
        name="currentPassword"
        type="password"
        label="Current Password"
        placeholder="Your password needs to be min. 8 characters long"
        thin={true}
      />
      <InputFull
        type="password"
        name="password"
        label="New Password"
        placeholder="Please confirm your password"
        thin={true}
        canBeDisabled={true}
      />
      <InputFull
        type="password"
        name="passwordConfirm"
        label="Confirm Password"
        placeholder="Please confirm your password"
        thin={true}
        canBeDisabled={true}
      />
      <div className="profile-button-container--password">
        <ProfileButton text="Change Password" />
      </div>
    </div>
  );
}

export default ChangePasswordForm;
