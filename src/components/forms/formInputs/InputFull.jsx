import { Field, ErrorMessage, useField, useFormikContext } from "formik";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";

function InputFull(props) {
  const [field, meta] = useField(props);
  const formikContext = useFormikContext(props);
  const context = useContext(MainContext);

  const { name, label, type, required, placeholder, thin, canBeDisabled } = props;

  const focusHandler = (e) => {
    // Prefix URL fields with https:// when focuses field
    if (type === "url") {
      const prefix = "https://";
      formikContext.setFieldValue(name, prefix);
    }
    // Activate new password and confrim password field on focus
    if (name === "passwordCurrent") context.setIsDisabled(false);
    return;
  };

  const changeHandler = (e) => {
    // Prefix the formField input with https://
    if (type === "url") {
      const prefix = "https://";
      const input = e.target.value;
      e.target.value = prefix + input.substr(prefix.length);
    }
    formikContext.setFieldValue(name, e.target.value);
  };

  const blurHandler = (e) => {
    const input = e.target.value;
    // If user leaves URL field and field only contains prefix, delete prefix
    if (type === "url" && input === "https://") {
      e.target.value = "";
      return formikContext.setFieldValue(name, e.target.value);
    }
    field.onBlur(e);
  };

  // Set class to fields that can be disabled
  const ifDisabled = canBeDisabled && context.isDisabled ? "input-disabled" : "";

  return (
    <div className="form-input-full">
      {label && (
        <div className="required-label">
          <label className={thin && "label-thin"} htmlFor={name}>
            {label}:
          </label>
          {required && (
            <label className="required-flag" htmlFor={name}>
              *required
            </label>
          )}
        </div>
      )}
      <Field
        {...field}
        // value={meta.value}
        disabled={canBeDisabled ? context.isDisabled : false}
        className={`brad-sm input ${
          meta.error && meta.touched ? "input-error" : ""
        } ${ifDisabled}`}
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        onFocus={(e) => focusHandler(e)}
        onChange={(e) => changeHandler(e)}
        onBlur={(e) => blurHandler(e)}
      />
      {canBeDisabled && context.isDisabled && (
        <div className="error tip">
          To change this field, please enter your password
        </div>
      )}
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}

export default InputFull;
