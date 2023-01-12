import { useContext } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import "./_LoginForm.scss";
import "../formInputs/_FormInputs.scss";

import InputFull from "../formInputs/InputFull";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { MainContext } from "../../contexts/MainContext";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function LoginForm({ userType, setShowModal }) {
  const { getLoggedInUser, isPending } = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email("Please enter a valid email address")
          .required("Required"),
        password: yup.string().required("Required"),
      })}
      onSubmit={(formValues, formActions) => {
        getLoggedInUser(formValues, formActions, userType, navigate);
      }}
    >
      <Form noValidate className="login-form">
        <InputFull
          name="email"
          label="Email"
          placeholder="Pleaser enter your email address"
        />
        <InputFull
          name="password"
          label="Password"
          placeholder="Please enter your password"
          type="password"
        />
        <div className="login-button">
          {!isPending ? (
            <ButtonSecondary
              purpose="login"
              text="Log In"
              submit={true}
              userType={userType}
            />
          ) : (
            <ScaleLoader
              color={userType === "artists" ? "#0168b5" : "#b02476"}
              cssOverride={{
                padding: "2.25rem",
                transform: "scale(1.5)",
              }}
              aria-label="Loading Spinner"
            />
          )}
        </div>
        <p onClick={() => setShowModal(true)} className="forgot-password-text">
          Forgot your password?
        </p>
      </Form>
    </Formik>
  );
}

export default LoginForm;
