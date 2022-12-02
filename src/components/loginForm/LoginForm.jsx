import "./_LoginForm.scss";

import { Formik, Form } from "formik";
import * as yup from "yup";
import InputFull from "../formInputs/InputFull";
import ButtonSecondary from "../buttons/ButtonSecondary";

function LoginForm({ type }) {
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
      onSubmit={(values) => {
        console.log(values);
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
            type={type}
          />
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;
