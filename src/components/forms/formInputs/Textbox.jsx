import { Field } from "formik";

function Textbox(props) {
  const { name, placeholder, label, customClass } = props;

  return (
    <div className="textbox-group">
      {label && <label htmlFor="message">{label}</label>}
      <Field
        as="textarea"
        className={`textbox ${customClass}`}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Textbox;
