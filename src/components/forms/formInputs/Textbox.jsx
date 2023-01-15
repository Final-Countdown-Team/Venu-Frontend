import { Field } from "formik";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";

function Textbox(props) {
  const { name, placeholder, label, customClass } = props;
  const { globalUserType } = useContext(MainContext);

  return (
    <div className="form-input-full textbox-group textbox-group-contact">
      {label && <label htmlFor="message">{label}</label>}
      <Field
        as="textarea"
        className={`brad-sm textbox ${customClass} input-focus-${globalUserType}`}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Textbox;
