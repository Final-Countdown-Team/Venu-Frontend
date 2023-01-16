import { Formik, Form } from "formik";
import * as yup from "yup";
import React, { useContext, useRef } from "react";
import "./_ForgotPasswordModal.scss";
import { MainContext } from "../../contexts/MainContext";
import HandleClickOutside from "../../utils/HandleClickOutside";
import { useState } from "react";

import ModalComponent from "../ModalComponent";

function ForgotPasswordModal({ setShowModal }) {
  const { globalUserType } = useContext(MainContext);
  const ref = useRef(null);
  const [isPending, setIsPending] = useState(false);

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
          setIsPending(true);
          console.log(values);
          const req = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/${globalUserType}/forgotPassword`,
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
          if (res.status === "fail" || res.status === "error")
            throw new Error(res.message);

          setIsPending(false);
          actions.resetForm();
          setShowModal(false);
        } catch (err) {
          console.error(err);
          actions.setErrors({ email: err.message });
          setIsPending(false);
        }
      }}
    >
      <Form
        noValidate
        ref={ref}
        className={`forgot-password-modal ${
          globalUserType === "artists" ? "modal-artists" : "modal-venues"
        }`}
      >
        <ModalComponent onClick={() => setShowModal(false)} isPending={isPending} />
      </Form>
    </Formik>
  );
}

export default ForgotPasswordModal;
