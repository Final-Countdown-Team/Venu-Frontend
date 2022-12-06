import { Field, ErrorMessage, useField } from "formik";

export default function InputHalf(props) {
  const [field, meta] = useField(props);

  const { name, label, required, placeholder } = props;

  return (
    <div className="form-input-half">
      <div className="required-label">
        <label htmlFor="name">{label}:</label>
        {required && (
          <label className="required-flag" htmlFor={name}>
            *required
          </label>
        )}
      </div>
      <Field
        {...field}
        className={`input ${meta.error && meta.touched ? "input-error" : ""}`}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}
