import { ErrorMessage, Field, useField } from "formik";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";
import "../formInputs/_FormInputs.scss";

function Textbox(props) {
  const [field, meta] = useField(props);
  const { name, placeholder, label, customClass } = props;
  const { globalUserType } = useContext(MainContext);

  return (
    <div className="form-input-full textbox-group textbox-group-contact">
      {label && <label htmlFor="message">{label}</label>}
      <Field
        {...field}
        as="textarea"
        className={`brad-sm textbox ${customClass} input-focus-${globalUserType} ${
          meta.error && meta.touched ? "input-error" : ""
        }`}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}

export default Textbox;
