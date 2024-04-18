import React from "react";
import { IoIosWarning } from "react-icons/io";

const Warning = ({ title, content }) => {
  return (
    <div className="pl-8 pr-6 py-6 border-[1px] relative rounded-lg overflow-hidden my-4">
      <div className="h-full w-3 bg-red-500 absolute top-0 left-0"></div>
      <div>
        <div className="flex items-center gap-2 text-red-500 mb-2">
          <IoIosWarning size={30} />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Warning;
