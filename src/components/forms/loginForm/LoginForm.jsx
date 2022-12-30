import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import "./_LoginForm.scss";
import "../formInputs/_FormInputs.scss";

import InputFull from "../formInputs/InputFull";
import ButtonSecondary from "../../buttons/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../contexts/MainContext";
import { ScaleLoader } from "react-spinners";

function LoginForm({ userType, setShowModal }) {
  const { setIsLoggedIn } = useContext(MainContext);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

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
          setIsPending(true);
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
          // Throw manual error if request fails
          if (res.status === "fail" || res.status === "error")
            throw new Error(res.message || "Ups, something went wrong");
          // Show success notification when data is sucessfully fetched
          toast.success("Successfully logged in 🎉");
          setIsPending(false);
          actions.resetForm();
          // Save data to localStorage state
          setIsLoggedIn({
            status: true,
            userType: res.data.type,
            id: res.data._id,
          });
          // Redirect to home
          setTimeout(() => navigate("/"), 1000);
        } catch (err) {
          setIsPending(false);
          console.error(err);
          toast.error("Ups, something went wrong");
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
