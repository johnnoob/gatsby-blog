import React from "react";

const Select = ({ options, handleSelect, defaultValue }) => {
  return (
    <select onChange={handleSelect} defaultValue={defaultValue}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
