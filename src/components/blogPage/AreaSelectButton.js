import React from "react";

const AreaSelectButton = ({
  area,
  label,
  labelName,
  targetOptions,
  handleFilterArea,
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-1 px-2 py-1 rounded-lg ${
        area === label ? "text-white bg-black" : "text-black bg-gray-200"
      }`}
      onClick={() => handleFilterArea(label)}
    >
      <div>{labelName}</div>
      <span
        className={`rounded-full block w-5 h-5 text-sm ${
          area === label ? "text-black bg-white" : "text-white bg-black"
        }`}
      >
        {targetOptions.length > 0 ? targetOptions.length : 0}
      </span>
    </button>
  );
};

export default AreaSelectButton;
