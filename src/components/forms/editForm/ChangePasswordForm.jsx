import { useContext, useState } from "react";
import { MainContext } from "../../contexts/MainContext";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";

import ProfileButton from "../../buttons/ProfileButton";
import InputFull from "../formInputs/InputFull";
import { schemaBuilder } from "../signupForm/signUpSchema";
import { ScaleLoader } from "react-spinners";

function ChangePasswordForm() {
  const {
    loggedInUser: { type: userType },
    isPending,
    setIsPending,
  } = useContext(MainContext);
  // const [isPending, setIsPending] = useState(false);
  return (
    <Formik
      initialValues={{
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={schemaBuilder("changePassword", userType)}
      onSubmit={async (values, actions) => {
        console.log(values);
        try {
          setIsPending(true);
          const req = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/${userType}/user/updateMyPassword`,
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
          // console.log(res);
          if (res.status === "fail" || res.status === "error") {
            const error = res;
            error.isOperational = res.error.isOperational;
            throw error;
          }
          toast.success("Your password has been updated");
          setIsPending(false);
        } catch (err) {
          setIsPending(false);
          console.error(err.message);
          toast.error("Ups, something went wrong 💥");
          if (err.isOperational) actions.setErrors({ passwordCurrent: err.message });
        }
      }}
    >
      <Form className="form-group-bg edit-form-group-password">
        <p className="form-group-heading">Password:</p>
        <InputFull
          name="passwordCurrent"
          type="password"
          label="Current Password"
          placeholder="Your password needs to be min. 8 characters long"
          thin={true}
        />
        <InputFull
          type="password"
          name="password"
          label="New Password"
          placeholder="Please confirm your password"
          thin={true}
          canBeDisabled={true}
        />
        <InputFull
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          placeholder="Please confirm your password"
          thin={true}
          canBeDisabled={true}
        />
        <div className="profile-button-container--password">
          {isPending ? (
            <ScaleLoader
              color={"#347d39"}
              cssOverride={{
                padding: ".83rem 2.5rem",
                transform: "scale(1.5)",
              }}
              aria-label="Loading Spinner"
            />
          ) : (
            <ProfileButton text="Change Password" />
          )}
        </div>
      </Form>
    </Formik>
  );
}

export default ChangePasswordForm;
