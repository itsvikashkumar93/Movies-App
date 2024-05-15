import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="select flex overflow-hidden rounded-sm bg-[#27272a] relative w-32 h-10 sm:w-[15vw] sm:h-[6.8vh]">
      <select defaultValue="0" name="format" id="format" onChange={func}>
        <option className="h-5 w-full" value="0" disabled>
          {title}
        </option>
        {options.map((option, i) => (
          <option className="h-5 w-full" value={option} key={i}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
