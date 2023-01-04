import { useFormikContext } from "formik";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { MdChevronRight } from "react-icons/md";

function DateSelector(props) {
  const { name, label, placeholder } = props;
  const formikContext = useFormikContext(props);

  const handelDatePicker = (e) => {
    const dateObjectsArray = e.map((date) => new Date(date));
    const dateStringsArr = dateObjectsArray.flat();
    formikContext.setFieldValue("dates", dateStringsArr);
  };

  return (
    <div className="form-input-full">
      <div className="required-label">
        <label htmlFor={name}>{label}:</label>
      </div>
      <div className="datepicker-group">
        <DatePicker
          multiple
          value={formikContext.values[name]}
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
