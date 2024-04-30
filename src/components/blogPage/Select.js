import React from "react";
import { FaAngleDown } from "react-icons/fa6";

const Select = ({ options, handleSelect, defaultValue }) => {
  return (
    <div className="relative w-[100px]">
      <select
        className="py-1 pl-2 pr-6 border-2 text-gray-p rounded-lg appearance-none focus:outline-none"
        onChange={handleSelect}
        defaultValue={defaultValue}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute top-1/2 right-1 -translate-y-1/2 pointer-events-none">
        <FaAngleDown />
      </div>
    </div>
  );
};

export default Select;
