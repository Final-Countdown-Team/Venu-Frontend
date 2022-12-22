import { Formik, Form } from "formik";
import * as yup from "yup";
import React, { useContext, useRef } from "react";
import InputFull from "../formInputs/InputFull";
import "./_ForgotPasswordModal.scss";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { MdClose } from "react-icons/md";
import { MainContext } from "../../contexts/MainContext";
import HandleClickOutside from "../../utils/HandleClickOutside";

function ForgotPasswordModal({ setShowModal }) {
  const context = useContext(MainContext);
  const userType = context.userType;
  const ref = useRef(null);

  HandleClickOutside(ref, setShowModal);

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email("Please enter a valid email address")
          .required("Required"),
      })}
      onSubmit={async (values, actions) => {
        try {
          console.log(values);
          const req = await fetch(`/${userType}/forgotPassword`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const res = await req.json();
          console.log(res);
          if (res.status === "fail" || res.status === "error")
            throw new Error(res.message);

          actions.resetForm();
          setShowModal(false);
        } catch (err) {
          console.error(err);
          actions.setErrors({ email: err.message });
        }
      }}
    >
      <Form
        noValidate
        ref={ref}
        className={`forgot-password-modal ${
          userType === "artists" ? "modal-artists" : "modal-venues"
        }`}
      >
        <div className="login-form">
          <div onClick={() => setShowModal(false)} className="close-icon">
            <MdClose />
          </div>
          <h2>
            You forgot your password<span>?</span>
          </h2>
          <p className="padding">
            No problem, we got you. Please enter your email address and we will send
            you a link to reset your password ☺️
          </p>
          <InputFull name="email" placeholder={"Please enter your email"} />
          <div className="padding">
            <ButtonSecondary submit={true} text={"Send reset link"} />
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default ForgotPasswordModal;
