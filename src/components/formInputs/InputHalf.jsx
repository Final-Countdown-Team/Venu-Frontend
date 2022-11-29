import React from "react";

export default function InputHalf({ name, placeholder, required }) {
  return (
    <div className="form-input-half">
      <div className="required-label">
        <label htmlFor="name">{name}:</label>
        {required && (
          <label className="required-flag" htmlFor={name}>
            *required
          </label>
        )}
      </div>
      <input
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
