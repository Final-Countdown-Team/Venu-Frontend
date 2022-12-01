import { Field, ErrorMessage, useField, useFormikContext } from "formik";

function InputFull(props) {
  const [field, meta] = useField(props);
  const formikContext = useFormikContext(props);

  const { name, label, type, required, placeholder, thin } = props;

  const blurHandler = async (e) => {
    const val = e.target.value;
    if (type === "url") {
      if (val.startsWith("https://")) return field.onBlur(e);
      if (!val || val === "https://")
        return formikContext.setFieldValue(name, "");
      if (!val.startsWith("https://")) {
        formikContext.setFieldValue(name, "https://" + val);
      }
    } else {
      field.onBlur(e);
    }
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
        onBlur={(e) => blurHandler(e)}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}

export default InputFull;
