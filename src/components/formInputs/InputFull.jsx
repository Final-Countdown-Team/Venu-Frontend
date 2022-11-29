import React from "react";

function InputFull({ name, placeholder, required, thin, type }) {
  return (
    <div className="form-input-full">
      <div className="required-label">
        <label className={thin && "label-thin"} htmlFor={name}>
          {name}:
        </label>
        {required && (
          <label className="required-flag" htmlFor={name}>
            *required
          </label>
        )}
      </div>
      <input
        className="input"
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputFull;
