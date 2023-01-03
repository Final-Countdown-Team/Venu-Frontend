import { Formik, Form } from "formik";
import "../signupForm/_SignupForm.scss";
import "./_EditForm.scss";
import InputFull from "../formInputs/InputFull";
import Textbox from "../formInputs/Textbox";
import DropdownGenre from "../formInputs/DropdownGenre";
import DateSelector from "../formInputs/DateSelector";
import ImageUploader from "../formInputs/ImageUploader";
import ProfileImageUploader from "../formInputs/ProfileImageUploader";
import ProfileButton from "../../buttons/ProfileButton";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { schemaBuilder } from "../signupForm/signUpSchema";
import { MainContext } from "../../contexts/MainContext";

function EditForm() {
  const {
    loggedInUser: user,
    formSubmitEditSignup,
    isPending,
  } = useContext(MainContext);
  const { type: userType } = user;
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={user}
      validationSchema={schemaBuilder("edit", userType)}
      onSubmit={(values, actions) => {
        console.log(values);
        formSubmitEditSignup(values, actions, false, navigate, true);
      }}
    >
      <Form noValidate>
        <div className="form-top-group">
          <div className="form-top-group--inputs">
            <InputFull
              name="name"
              label="Name"
              placeholder="Enter the name of your venue"
            />
            <InputFull
              name="email"
              label="Email"
              placeholder="Enter your email address"
              canBeDisabled={true}
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
            placeholder="Add a description about you and what you can offer"
          />
          {userType !== "venues" && <DropdownGenre name={"genre"} thin={true} />}
          <InputFull
            name="mediaLinks.facebookUrl"
            label="Facebook"
            type="url"
            placeholder="Link to your facebook page"
            thin={true}
          />
          <InputFull
            name="mediaLinks.instagramTag"
            label="Instagram Tag"
            placeholder="Pass in your instagram tag like this: @tag"
            thin={true}
          />
          <InputFull
            name="mediaLinks.twitterTag"
            label="Twitter Tag"
            placeholder="Pass in your twitter tag like this: @tag"
            thin={true}
          />
          {userType === "venues" ? (
            <>
              <InputFull
                name="mediaLinks.websiteUrl"
                label="Website"
                type="url"
                placeholder="Link to your venue's website"
                thin={true}
              />
              <InputFull
                label="Capacity"
                name="capacity"
                placeholder="What's the capacity of your venue?"
                thin={true}
              />
            </>
          ) : (
            <>
              <InputFull
                name="mediaLinks.youtubeUrl"
                label="Youtube"
                type="url"
                placeholder="Link to your youtube account"
                thin={true}
              />
              <InputFull
                label="Members"
                name="members"
                type="number"
                placeholder="How many members do you have?"
                thin={true}
              />
            </>
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
          <ProfileButton text={!isPending ? "Update" : "Is Updating..."} />
        </div>
      </Form>
    </Formik>
  );
}

export default EditForm;
