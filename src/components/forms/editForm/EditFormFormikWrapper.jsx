import { useContext, useState } from "react";
import { MainContext } from "../../contexts/MainContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import EditForm from "./EditForm";
import {
  schemaBuilder,
  venuesInitialValues,
  artistsInitialValues,
} from "../signupForm/signUpSchema";

function EditFormFormikWrapper() {
  const [imageFiles, setImageFiles] = useState({
    profileImage: null,
    images: null,
  });
  const {
    loggedInUser: { type: userType },
    editFormSubmit,
  } = useContext(MainContext);
  const navigate = useNavigate();

  const initialValues =
    userType === "venues" ? venuesInitialValues : artistsInitialValues;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemaBuilder("edit", userType)}
      onSubmit={(values, actions) => {
        console.log("Submitting...");
        editFormSubmit(values, actions, navigate, imageFiles);
      }}
    >
      <EditForm initialValues={initialValues} setImageFiles={setImageFiles} />
    </Formik>
  );
}

export default EditFormFormikWrapper;
