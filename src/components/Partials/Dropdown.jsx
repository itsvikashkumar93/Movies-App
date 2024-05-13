import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="select">
      <select defaultValue="0" name="format" id="format" onChange={func}>
        <option value="0" disabled>
            {title}
        </option>
        {options.map((option, i) => (
          <option value={option} key={i} >
           {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
