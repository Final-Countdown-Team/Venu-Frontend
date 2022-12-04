import "./_ProfileEdit.scss";
import EditForm from "../forms/editForm/EditForm";
import ArrowBack from "../utils/ArrowBack";

function ProfileEdit({ userType }) {
  // const [userType, setUserType] = useState("venues");

  return (
    <div className="profile-edit-page">
      <div className="profile-edit-page--heading">
        <h1>Welcome, Max</h1>
        <div className="astronaut-welcome" />
      </div>
      <EditForm userType={userType} />
      <div className="arrow-wrapper">
        <ArrowBack userType={userType} />
      </div>
    </div>
  );
}

export default ProfileEdit;
