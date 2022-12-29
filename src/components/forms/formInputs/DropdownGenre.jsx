import { useFormikContext } from "formik";
import React from "react";

function DropdownGenre(props) {
  const formikContext = useFormikContext(props);
  const handleChange = (e) => {
    formikContext.setFieldValue("genre", e.target.value);
  };

  return (
    <div className="form-input-full">
      <div className="required-label">
        <label className={props.thin && "label-thin"} htmlFor="genre">
          Genre:
        </label>
      </div>
      <select
        onChange={(e) => handleChange(e)}
        className="brad-sm input dropdown"
        name="genre"
        defaultValue={"DEFAULT"}
      >
        <option value="" disabled>
          Select one of the following genres:
        </option>
        <option value="Alternative">Alternative</option>
        <option value="Classic">Classic</option>
        <option value="Country">Country</option>
        <option value="Electronic">Electronic</option>
        <option value="Experimental">Experimental</option>
        <option value="Folk">Folk</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Jazz">Jazz</option>
        <option value="Metal">Metal</option>
        <option value="Rock">Rock</option>
        <option value="Schlager">Schlager</option>
        <option value="Singer-Songwriter">Singer-Songwriter</option>
      </select>
    </div>
  );
}

export default DropdownGenre;
