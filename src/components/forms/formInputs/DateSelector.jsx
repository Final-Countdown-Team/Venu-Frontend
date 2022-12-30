import { useFormikContext } from "formik";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { MdChevronRight } from "react-icons/md";

function DateSelector(props) {
  const { name, label, placeholder } = props;

  const formikContext = useFormikContext(props);
  const values = formikContext.values[name];

  const handelDatePicker = (e) => {
    console.log(e);
    const convertDateStrings = e.map((val) => val.join(",").split(","));
    const dateObjects = convertDateStrings.map((date) => new Date(date));
    // context.getValues("_", "dates", dateObjects);
    formikContext.setFieldValue("dates", [...values, dateObjects]);
  };

  return (
    <div className="form-input-full">
      <div className="required-label">
        <label htmlFor={name}>{label}:</label>
      </div>
      <div className="datepicker-group">
        <DatePicker
          multiple
          value={values}
          name={name}
          minDate={Date.now()}
          format="MMMM/DD/YY"
          className="datepicker"
          inputClass="brad-sm input datepicker-input"
          containerClassName="datepicker-container"
          placeholder={placeholder}
          onChange={(e) => handelDatePicker(e)}
        />
        <MdChevronRight className="datepicker-icon" />
      </div>
    </div>
  );
}

export default DateSelector;
