import { Formik, Form } from "formik";
import "../signupForm/_SignupForm.scss";
import "./_EditForm.scss";
import InputHalf from "../formInputs/InputHalf";
import InputFull from "../formInputs/InputFull";
import Textbox from "../formInputs/Textbox";
import DropdownGenre from "../formInputs/DropdownGenre";
import DateSelector from "../formInputs/DateSelector";
import ImageUploader from "../formInputs/ImageUploader";
import ProfileImageUploader from "../formInputs/ProfileImageUploader";
import ChangePasswordForm from "../changePasswordForm/ChangePasswordForm";
import ProfileButton from "../../buttons/ProfileButton";

function EditForm({ userType }) {
  const profileInititalValues = {
    name: "Max",
    email: "max_sommereld@web.de",
    address: {
      street: "Torgauer Straße 50",
      city: "Leipzig",
      zipcode: "04315",
    },
    profileImage: "",
    images: "",
    description: "test",
    genre: "",
    facebookUrl: "",
    instagramTag: "@test",
    twitterTag: "@test",
    websiteUrl: "",
    capacity: "",
    members: "5",
    dates: "",
    password: "test1234",
    passwordConfirm: "test1234",
  };

  return (
    <Formik
      initialValues={profileInititalValues}
      // validationSchema={signUpSchema}
      onSubmit={(values, actions) => console.log(values)}
    >
      <Form noValidate className="signup-form edit-form">
        <div className="form-top-group">
          <div className="form-top-group--inputs">
            <InputHalf
              name="name"
              label="Name"
              placeholder="Enter the name of your venue"
            />
            <InputHalf
              name="email"
              label="Email"
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-top-group--image">
            <ProfileImageUploader />
          </div>
        </div>
        <div className="form-group-bg">
          <p className="form-group-heading">Address:</p>

          <InputFull
            name="address.street"
            label="Street"
            placeholder="Please enter the street your venue is located"
            thin={true}
          />
          <InputFull
            name="address.city"
            label="City"
            placeholder="Please enter the city your venue is located"
            thin={true}
          />
          <InputFull
            name="address.zipcode"
            label="Zipcode"
            placeholder="Please enter zipcode of your city"
            thin={true}
          />
        </div>
        <div className="form-group-transparent">
          <p className="form-group-heading">Description:</p>
          <Textbox
            name="description"
            placeholder="Add a description what your venue offers"
          />
          {userType !== "venues" && <DropdownGenre thin={true} />}
          <InputFull
            name="facebookUrl"
            label="Facebook"
            type="url"
            placeholder="Link to your facebook page"
            thin={true}
          />
          <InputFull
            name="instagramTag"
            label="Instagram Tag"
            placeholder="Pass in your instagram tag like this: @tag"
            thin={true}
          />
          <InputFull
            name="twitterTag"
            label="Twitter Tag"
            placeholder="Pass in your twitter tag like this: @tag"
            thin={true}
          />
          <InputFull
            name="websiteUrl"
            label="Website"
            type="url"
            placeholder="Link to your venue's website"
            thin={true}
          />
          {userType === "venues" ? (
            <InputFull
              label="Capcity"
              name="capacity"
              placeholder="What's the capacity of your venue?"
              thin={true}
            />
          ) : (
            <InputFull
              label="Members"
              name="members"
              placeholder="How many members do you have?"
              thin={true}
            />
          )}
        </div>
        {/* Date Selector Group */}
        <div className="form-group-bg">
          <DateSelector
            label="Available Dates"
            name="dates"
            placeholder="Click to open date picker"
          />
        </div>
        {/* Image Uploader Group */}
        <div className="form-group-transparent">
          <ImageUploader />
        </div>
        <div className="profile-button-container">
          <ProfileButton text="Update" />
        </div>
        {/* Change Password Group */}
        <ChangePasswordForm />
        {/* Delete Group */}
        <div className="form-group-delete">
          <div className="form-group-heading--delete">
            <div className="delete-bar--left"></div>
            <span>Delete Your Account</span>
            <div className="delete-bar--right"></div>
          </div>
          <ProfileButton text="Delete account" purpose="delete" />
        </div>
      </Form>
    </Formik>
  );
}

export default EditForm;
