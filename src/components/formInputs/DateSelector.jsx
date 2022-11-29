import React from "react";
import DatePicker from "react-multi-date-picker";
import { MdChevronRight } from "react-icons/md";

function DateSelector({ name, placeholder, dates, setDates }) {
  return (
    <div className="form-input-full">
      <div className="required-label">
        <label htmlFor={name}>{name}:</label>
      </div>
      <div className="datepicker-group">
        <DatePicker
          inputClass="input datepicker-input"
          containerClassName="datepicker-container"
          value={dates}
          onChange={setDates}
          placeholder={placeholder}
          multiple
          sort
          format="MM-DD-YY"
        />
        <MdChevronRight className="datepicker-icon" />
      </div>
    </div>
  );
}

export default DateSelector;
