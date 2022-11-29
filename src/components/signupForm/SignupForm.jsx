import React from "react";
import "./_SignupForm.scss";
import defaultUser from "../../img/default_user_small.png";
import InputHalf from "../formInputs/InputHalf";
import InputFull from "../formInputs/InputFull";
import Textbox from "../formInputs/Textbox";
import DropdownGenre from "../formInputs/DropdownGenre";
import DateSelector from "../formInputs/DateSelector";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useState } from "react";

function SignupForm({ type }) {
  const [dates, setDates] = useState([]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSignupSubmit} className="signup-form">
      <div className="form-top-group">
        <div className="form-top-group--inputs">
          <InputHalf
            name="Name"
            placeholder="Enter the name of your venue"
            required={true}
          />
          <InputHalf
            name="Email"
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
          name="Street"
          placeholder="Please enter the street your venue is located"
          required={true}
          thin={true}
        />
        <InputFull
          name="City"
          placeholder="Please enter the city your venue is located"
          required={true}
          thin={true}
        />
        <InputFull
          name="Zipcode"
          placeholder="Please enter zipcode of your city"
          required={true}
          thin={true}
        />
      </div>
      <div className="form-group-transparent">
        <p className="form-group-heading">Description:</p>
        <Textbox placeholder="Add a description what your venue offers" />
        {type === "artists" && <DropdownGenre thin={true} />}
        <InputFull
          name="Facebook"
          placeholder="Link to your facebook page"
          thin={true}
        />
        <InputFull
          name="Instagram Tag"
          placeholder="Pass in your instagram tag like this: @tag"
          thin={true}
        />
        <InputFull
          name="Twitter Tag"
          placeholder="Pass in your twitter tag like this: @tag"
          thin={true}
        />
        <InputFull
          name="Website"
          placeholder="Link to your venue's website"
          thin={true}
        />
        {type === "venues" ? (
          <InputFull
            name="Capcity"
            placeholder="What's the capacity of your venue?"
            thin={true}
          />
        ) : (
          <InputFull
            name="Members"
            placeholder="How many members do you have?"
            thin={true}
          />
        )}
      </div>
      <div className="form-group-bg">
        <DateSelector
          name="Available Dates"
          placeholder="Click to open date picker"
          dates={dates}
          setDates={setDates}
        />
      </div>
      <div className="form-group-transparent form-group-password">
        <InputFull
          type="password"
          name="Password"
          placeholder="Your passwords needs to be min. 8 characters long"
          required={true}
        />
        <InputFull
          type="password"
          name="Password Confirm"
          placeholder="Please confirm your password"
          required={true}
        />
        <div className="form-group-button">
          <ButtonSecondary text="Sign Up" submit={true} type={type} />
        </div>
      </div>
      <div className="form-group-transparent">
        <p className="form-info-text">
          You can complete your profile once you’ve registered. Please add
          images and and a custom profile image. A complete profile helps you to
          find the perfect match for your event.
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
