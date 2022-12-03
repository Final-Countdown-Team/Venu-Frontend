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

function SignupForm({ type }) {
  return (
    <Formik
      initialValues={signupInitialValues}
      validationSchema={signUpSchema}
      onSubmit={async (values, actions) => {
        try {
          // const { street, city, zipcode } = values.address;
          // // Fetching address data from geoApify
          // const geoRes = await fetch(
          //   `https://api.geoapify.com/v1/geocode/search?street=${street}&postcode=${zipcode}&city=${city}&format=json&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`
          // );

          // if (!geoRes.ok)
          //   throw new Error(
          //     "Something went wrong validating your address. Please check if you entered a valid address."
          //   );
          // const geoData = await geoRes.json();
          // // Destructuring coordinates
          // const [{ lat, lon }] = geoData.results;
          // console.log(lat, lon);

          // const newValues = {
          //   ...values,
          //   location: { coordinates: [lon, lat] },
          // };

          const newValues = {
            ...values,
            location: { coordinates: [12.75597, 51.372651] },
          };
          console.log(newValues);
          // Sending POST request to backend
          const req = await fetch(`/${type}/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newValues),
          });
          const res = await req.json();
          // Throw error when failed
          if (res.status === "fail") {
            const error = new Error(res.message);
            error.code = res.code;
            throw error;
          }
        } catch (err) {
          console.error(err);
          if (err.code === 11000) {
            const [name, message] = err.message.split(":");
            actions.setFieldError(name, message);
          }
        }
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
          {type === "artists" && <DropdownGenre thin={true} />}
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
          {type === "venues" ? (
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
        <div className="form-group-transparent form-group-password">
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
            <ButtonSecondary text="Sign Up" submit={true} type={type} />
          </div>
        </div>

        <div className="form-group-transparent">
          <p className="form-info-text">
            You can complete your profile once you’ve registered. Please add
            images and and a custom profile image. A complete profile helps you
            to find the perfect match for your event.
          </p>
        </div>
      </Form>
    </Formik>
  );
}

export default SignupForm;
