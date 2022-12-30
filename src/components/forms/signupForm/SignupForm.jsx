import { useContext, useState } from "react";
import { Formik, Form } from "formik";

import "./_SignupForm.scss";
import { signUpSchema, signupInitialValues } from "./signUpSchema";
import defaultUser from "../../../img/default_user_small.png";
import InputFull from "../formInputs/InputFull";
import Textbox from "../formInputs/Textbox";
import DropdownGenre from "../formInputs/DropdownGenre";
import DateSelector from "../formInputs/DateSelector";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { signupOnSubmit } from "./signupOnSubmit";
import ScrollDownAnimation from "../../animations/ScrollDownAnimation";
import { MainContext } from "../../contexts/MainContext";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

function SignupForm({ userType }) {
  const { setIsLoggedIn } = useContext(MainContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={signupInitialValues}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        signupOnSubmit(
          values,
          actions,
          userType,
          setIsPending,
          setIsLoggedIn,
          navigate
        );
      }}
    >
      <Form noValidate className="brad-lg signup-form">
        <div className="form-top-group">
          <div className="form-top-group--inputs">
            <InputFull
              name="name"
              label="Name"
              placeholder="Enter the name of your venue"
              required={true}
            />
            <InputFull
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
          <div
            className="brad-lg from-group-dropdown"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <ScrollDownAnimation showDropdown={showDropdown} />
          </div>
        </div>

        {showDropdown && (
          <>
            <div className="form-group-transparent">
              <div className="form-group-heading">
                <p>Description:</p>
              </div>

              <div className="dropdown-collapse">
                <Textbox
                  name="description"
                  placeholder="Add a description what your venue offers"
                />
                {userType === "artists" && (
                  <DropdownGenre name={"genre"} thin={true} />
                )}
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
                      label="Capcity"
                      name="capacity"
                      placeholder="What's the capacity of your venue?"
                      thin={true}
                    />
                  </>
                ) : (
                  <>
                    <InputFull
                      label="Members"
                      name="members"
                      placeholder="How many members do you have?"
                      thin={true}
                    />
                    <InputFull
                      name="mediaLinks.youtubeUrl"
                      label="Youtube"
                      type="url"
                      placeholder="Link to your youtube account"
                      thin={true}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="form-group-bg">
              <DateSelector
                label="Available Dates"
                name="dates"
                placeholder="Click to open date picker"
              />
            </div>
          </>
        )}
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
            {!isPending ? (
              <ButtonSecondary text="Sign Up" submit={true} userType={userType} />
            ) : (
              <ScaleLoader
                color={userType === "artists" ? "#0168b5" : "#b02476"}
                cssOverride={{
                  transform: "scale(1.5)",
                }}
                aria-label="Loading Spinner"
              />
            )}
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
