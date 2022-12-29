import React from "react";
import { Formik, Form } from "formik";
import InputHalf from "../formInputs/InputHalf";
import Textbox from "../formInputs/Textbox";
import ButtonSecondary from "../../buttons/ButtonSecondary";

function ContactForm({ userType }) {
  return (
    <>
      <Formik>
        <Form>
          <div className="input-row">
            <InputHalf name="name" label="Name" placeholder="Enter your name" />
            <InputHalf name="email" label="Email" placeholder="Enter your email" />
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
      </Formik>
    </>
  );
}

export default ContactForm;
