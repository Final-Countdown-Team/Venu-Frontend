import { Field } from "formik";

function Textbox(props) {
  const { name, placeholder } = props;

  return (
    <Field
      as="textarea"
      className="textbox"
      name={name}
      placeholder={placeholder}
    />
  );
}

export default Textbox;
