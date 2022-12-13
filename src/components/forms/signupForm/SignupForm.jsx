import { Formik, Form } from "formik";

import "./_SignupForm.scss";
import { signUpSchema, signupInitialValues } from "./signUpSchema";
import defaultUser from "../../../img/default_user_small.png";
import InputHalf from "../formInputs/InputHalf";
import InputFull from "../formInputs/InputFull";
import Textbox from "../formInputs/Textbox";
import DropdownGenre from "../formInputs/DropdownGenre";
import DateSelector from "../formInputs/DateSelector";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { signupOnSubmit } from "./signupOnSubmit";

function SignupForm({ userType }) {
  return (
    <Formik
      initialValues={signupInitialValues}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        signupOnSubmit(values, actions, userType);
      }}
    >
      <Form noValidate className="signup-form">
        <div className="form-top-group">
          <div className="form-top-group--inputs">
            <InputHalf
              name="name"
              label="Name"
              placeholder="Enter the name of your venue"
              required={true}
            />
            <InputHalf
              name="email"
              label="Email"
              placeholder="Enter your email address"
              required={true}
            />
          </div>

          <div className="form-top-group--image">
            <img src={defaultUser} alt="default user profileImage" />
          </div>
        </div>
        <div className="form-group-bg">
          <p className="form-group-heading">Address:</p>

          <InputFull
            name="address.street"
            label="Street"
            placeholder="Please enter the street your venue is located"
            required={true}
            thin={true}
          />
          <InputFull
            name="address.city"
            label="City"
            placeholder="Please enter the city your venue is located"
            required={true}
            thin={true}
          />
          <InputFull
            name="address.zipcode"
            label="Zipcode"
            placeholder="Please enter zipcode of your city"
            required={true}
            thin={true}
          />
        </div>
        <div className="form-group-transparent">
          <p className="form-group-heading">Description:</p>
          <Textbox
            name="description"
            placeholder="Add a description what your venue offers"
          />
          {userType === "artists" && <DropdownGenre thin={true} />}
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
        <div className="form-group-bg">
          <DateSelector
            label="Available Dates"
            name="dates"
            placeholder="Click to open date picker"
          />
        </div>
        <div className="form-group-transparent signup-form-group-password">
          <InputFull
            name="password"
            type="password"
            label="Password"
            placeholder="Your password needs to be min. 8 characters long"
            required={true}
          />
          <InputFull
            type="password"
            name="passwordConfirm"
            label="Password Confirm"
            placeholder="Please confirm your password"
            required={true}
          />
          <div className="form-group-button">
            <ButtonSecondary text="Sign Up" submit={true} userType={userType} />
          </div>
        </div>

        <div className="form-group-transparent">
          <p className="form-info-text">
            You can complete your profile once you’ve registered. Please add images
            and and a custom profile image. A complete profile helps you to find the
            perfect match for your event.
          </p>
        </div>
      </Form>
    </Formik>
  );
}

export default SignupForm;
