import "./_LoginForm.scss";
import "../formInputs/_FormInputs.scss";

import { Formik, Form } from "formik";
import * as yup from "yup";
import InputFull from "../formInputs/InputFull";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";

function LoginForm({ userType, setShowModal }) {
  const { setIsLoggedIn } = useContext(MainContext);
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
      onSubmit={async (values, actions) => {
        try {
          const req = await fetch(`/${userType}/login`, {
            method: "POST",
            credentials: "include",
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
          setIsLoggedIn(true);
          setTimeout(() => navigate(`/${userType}/profile/${res.data._id}`), 1000);
        } catch (err) {
          console.error(err);
          actions.setErrors({ email: err.message, password: err.message });
        }
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
          <ButtonSecondary
            purpose="login"
            text="Log In"
            submit={true}
            userType={userType}
          />
        </div>
        <p onClick={() => setShowModal(true)} className="forgot-password-text">
          Forgot your password?
        </p>
      </Form>
    </Formik>
  );
}

export default LoginForm;
