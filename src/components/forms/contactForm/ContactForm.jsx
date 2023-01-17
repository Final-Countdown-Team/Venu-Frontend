import React, { useContext } from "react";
import { Formik, Form } from "formik";
import InputFull from "../formInputs/InputFull";
import CustomDropdown from "../../searchbar/CustomDropdown";
import Textbox from "../formInputs/Textbox";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { MainContext } from "../../contexts/MainContext";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

function ContactForm({ userType }) {
  const { watchUser, isPending, setIsPending } = useContext(MainContext);

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
            setIsPending(true);
            const req = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/${watchUser.type}/contactUser/${watchUser._id}`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND_URL,
                },
                body: JSON.stringify(values),
              }
            );
            const res = await req.json();
            console.log(res);
            toast.success("Successfully sent your message 🎉");
            setIsPending(false);
          } catch (err) {
            toast.error("Sorry, something went wrong ☹️");
            console.error(err);
            setIsPending(false);
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
                className={`input--contact`}
              />
              {watchUser?.dates?.length !== 0 && (
                <div className={`form-input-full`}>
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
            <div style={{ height: "6rem" }}>
              {isPending ? (
                <ScaleLoader
                  color={userType === "artists" ? "#0168b5" : "#b02476"}
                  cssOverride={{
                    paddingTop: "1rem",
                    transform: "scale(1.5)",
                  }}
                  aria-label="Loading Spinner"
                />
              ) : (
                <ButtonSecondary
                  text="Send your message"
                  submit={true}
                  userType={userType}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ContactForm;
