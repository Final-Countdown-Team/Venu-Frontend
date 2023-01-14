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
import toast from "react-hot-toast";

function EditFormFormikWrapper() {
  const [imageFiles, setImageFiles] = useState({
    profileImage: null,
    images: null,
  });
  const {
    loggedInUser: { type: userType },
    editFormSubmitData,
    editFormSubmitImages,
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

        editFormSubmitData(values, actions);
        editFormSubmitImages(imageFiles);
        toast.success("Your profile has been updated 🥳");
        // setTimeout(() => navigate("/me"), 1000);
      }}
    >
      <EditForm initialValues={initialValues} setImageFiles={setImageFiles} />
    </Formik>
  );
}

export default EditFormFormikWrapper;
