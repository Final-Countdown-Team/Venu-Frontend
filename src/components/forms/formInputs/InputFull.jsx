import { Field, ErrorMessage, useField, useFormikContext } from "formik";

function InputFull(props) {
  const [field, meta] = useField(props);
  const formikContext = useFormikContext(props);

  const { name, label, type, required, placeholder, thin } = props;

  const focusHandler = (e) => {
    if (type === "url") {
      const prefix = "https://";
      formikContext.setFieldValue(name, prefix);
    }
    return;
  };

  const changeHandler = (e) => {
    if (type === "url") {
      const prefix = "https://";
      const input = e.target.value;
      e.target.value = prefix + input.substr(prefix.length);
    }
    formikContext.setFieldValue(name, e.target.value);
  };

  const blurHandler = (e) => {
    const input = e.target.value;
    if (type === "url" && input === "https://") {
      e.target.value = "";
      return formikContext.setFieldValue(name, e.target.value);
    }
    field.onBlur(e);
  };

  return (
    <div className="form-input-full">
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
      <Field
        {...field}
        className={`input ${meta.error && meta.touched ? "input-error" : ""}`}
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        onFocus={(e) => focusHandler(e)}
        onChange={(e) => changeHandler(e)}
        onBlur={(e) => blurHandler(e)}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}

export default InputFull;
