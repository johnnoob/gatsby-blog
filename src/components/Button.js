import React from "react";

const Button = ({
  label,
  icon,
  isIconRight,
  isMaxMdHidden,
  isBlack,
  children,
}) => {
  return (
    <button
      type="button"
      className={`px-3 py-2 flex justify-center items-center gap-2 rounded-full hover:bg-slate-300 shadow-md ${
        isIconRight ? "flex-row" : "flex-row-reverse"
      } ${isMaxMdHidden ? "max-lg:hidden" : ""} ${
        isBlack
          ? "bg-black text-white hover:bg-slate-600"
          : "bg-white text-black hover:bg-slate-300"
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
