import "./_ProfileButton.scss";

function ProfileButton({ text, purpose }) {
  const purposeClass =
    purpose === "delete" ? "profile-button--delete" : "profile-button--update";

  return (
    <button type="submit" className={`brad-sm profile-button ${purposeClass}`}>
      {text}
    </button>
  );
}

export default ProfileButton;
