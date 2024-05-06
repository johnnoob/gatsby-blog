import React from "react";

const SearchInput = ({ children, label, handleChange }) => {
  return (
    <div className="relative text-sm w-full max-w-[160px] max-lg:max-w-none">
      <div className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-300">
        {children}
      </div>
      <input
        type="text"
        className="focus:outline-none ring-0 bg-transparent pl-6 pr-2 border-[1px] rounded-full py-1 w-full"
        onChange={handleChange}
        placeholder={`以名稱過濾${label}`}
      />
    </div>
  );
};

export default SearchInput;
