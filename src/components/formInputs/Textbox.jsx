import React from "react";

function Textbox({ placeholder }) {
  return (
    <textarea
      className="textbox"
      name="description"
      placeholder={placeholder}
    ></textarea>
  );
}

export default Textbox;
