import React from "react";

const Button = ({ label, icon, isIconRight }) => {
  return (
    <button
      type="button"
      className={`px-3 py-2 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 shadow-md ${
        isIconRight ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;
