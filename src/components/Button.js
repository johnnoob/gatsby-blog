import React from "react";

const Button = ({ label, icon, isIconRight, isMaxMdHidden }) => {
  console.log(isMaxMdHidden);
  return (
    <button
      type="button"
      className={`px-3 py-2 flex justify-center items-center gap-2 bg-white text-black font-semibold rounded-full hover:bg-slate-300 shadow-md ${
        isIconRight ? "flex-row" : "flex-row-reverse"
      } ${isMaxMdHidden ? "max-md:hidden" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;
