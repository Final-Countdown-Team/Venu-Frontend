import React, { useContext } from "react";
import { Formik, Form } from "formik";
import InputFull from "../formInputs/InputFull";
import CustomDropdown from "../../searchbar/CustomDropdown";
import Textbox from "../formInputs/Textbox";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { MainContext } from "../../contexts/MainContext";

function ContactForm({ userType }) {
  const { watchUser, loggedInUser } = useContext(MainContext);

  console.log(watchUser);

  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          date: "",
          message: "",
          receiver: watchUser.email,
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          try {
            const req = await fetch(
              `/${watchUser.type}/contactUser/${watchUser._id}`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );
            const res = await req.json();
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(props) => (
          <Form>
            <div className="input-row">
              <InputFull
                name="firstname"
                label="First name"
                placeholder="Enter your first name"
                className="input--contact"
              />
              {watchUser?.dates?.length !== 0 && (
                <div className="form-input-full">
                  <div className="required-label">
                    <label>Availabe Dates:</label>
                  </div>
                  <CustomDropdown
                    options={watchUser.dates}
                    type="Select a Date"
                    contact={true}
                    setFieldValue={props.setFieldValue}
                  />
                </div>
              )}
            </div>
            <Textbox
              name="message"
              placeholder="Write me a message :)"
              label="Your message:"
              customClass="textbox-user-profile"
            />
            <ButtonSecondary
              text="Send your message"
              submit={true}
              userType={userType}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ContactForm;
