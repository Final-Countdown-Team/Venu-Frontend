import React from "react";

function DropdownGenre({ thin }) {
  return (
    <div className="form-input-full">
      <div className="required-label">
        <label className={thin && "label-thin"} htmlFor="genre">
          Genre:
        </label>
      </div>
      <select className="input dropdown" name="genre">
        <option value="" disabled selected>
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
