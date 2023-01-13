import { Field } from "formik";

function Textbox(props) {
  const { name, placeholder, label, customClass } = props;

  return (
    <div className="form-input-full textbox-group textbox-group-contact">
      {label && <label htmlFor="message">{label}</label>}
      <Field
        as="textarea"
        className={`brad-sm textbox ${customClass}`}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Textbox;
