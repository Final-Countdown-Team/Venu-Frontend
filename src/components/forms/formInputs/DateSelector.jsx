import { useFormikContext } from "formik";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { MdChevronRight } from "react-icons/md";

function DateSelector(props) {
  const { name, label, placeholder } = props;

  const formikContext = useFormikContext(props);

  const handelDatePicker = (val) => {
    const convertDateString = val.join(",").split(",");
    const dateObjects = convertDateString.map((date) => new Date(date));
    // context.getValues("_", "dates", dateObjects);
    formikContext.setFieldValue("dates", dateObjects);
  };

  return (
    <div className="form-input-full">
      <div className="required-label">
        <label htmlFor={name}>{label}:</label>
      </div>
      <div className="datepicker-group">
        <DatePicker
          multiple
          name={name}
          minDate={Date.now()}
          className="datepicker"
          inputClass="input datepicker-input"
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
