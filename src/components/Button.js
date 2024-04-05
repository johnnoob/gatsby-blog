import React from "react";

const Button = ({ label, icon, isIconRight, isMaxMdHidden }) => {
  console.log(isMaxMdHidden);
  return (
    <button
      type="button"
      className={`px-3 py-2 flex justify-center items-center gap-2 bg-orange-600 text-white rounded-md hover:bg-orange-800 shadow-md ${
        isIconRight ? "flex-row" : "flex-row-reverse"
      } ${isMaxMdHidden ? "max-md:hidden" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;
