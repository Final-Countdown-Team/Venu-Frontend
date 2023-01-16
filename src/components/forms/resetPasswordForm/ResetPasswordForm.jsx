import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import InputFull from "../formInputs/InputFull";
import ButtonSecondary from "../../buttons/ButtonSecondary";

import "../loginForm/_LoginForm.scss";
import "../formInputs/_FormInputs.scss";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

function ResetPasswordForm({ userType, resetToken }) {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={yup.object().shape({
        password: yup.string().min(8).required("Required"),
        passwordConfirm: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords do not match")
          .required("This field is required"),
      })}
      onSubmit={async (values, actions) => {
        try {
          setIsPending(true);
          const req = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/${userType}/resetPassword/${resetToken}`,
            {
              method: "PATCH",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND_URL,
              },
              body: JSON.stringify(values),
            }
          );
          const res = await req.json();
          if (res.status === "fail" || res.status === "error")
            throw new Error(res.message);

          setIsPending(false);
          actions.resetForm();
          setTimeout(() => navigate(`/${userType}/login`), 1000);
        } catch (err) {
          console.error(err);
          actions.setErrors({ password: err.message, passwordConfirm: err.message });
          setIsPending(false);
        }
      }}
    >
      <Form noValidate className="login-form">
        <InputFull
          name="password"
          label="Password"
          placeholder="Please enter your new password (min. 8 characters)"
          type="password"
        />
        <InputFull
          name="passwordConfirm"
          label="Confirm Password"
          placeholder="Please confirm your password"
          type="password"
        />
        <div className="login-button">
          {!isPending ? (
            <ButtonSecondary
              text="Reset Password"
              submit={true}
              userType={userType}
            />
          ) : (
            <ScaleLoader
              color={userType === "artists" ? "#0168b5" : "#b02476"}
              aria-label="Loading Spinner"
            />
          )}
        </div>
      </Form>
    </Formik>
  );
}

export default ResetPasswordForm;
