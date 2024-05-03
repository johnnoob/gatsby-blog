import React from "react";

const AreaBlock = ({
  area,
  label,
  options,
  targetOptions,
  notFoundOptions,
  handleAreaSelect,
}) => {
  return (
    <>
      <div
        className={`flex flex-col justify-start items-start ${
          area === label ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {options
            .filter((option) => {
              return !notFoundOptions.includes(option);
            })
            .map((option, index) => (
              <button
                key={index}
                value={option}
                onClick={handleAreaSelect}
                className={`px-2 py-1 rounded-2xl ${
                  targetOptions.includes(option)
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
        </div>
        <div className={`w-full ${notFoundOptions.length === 0 && "hidden"}`}>
          <div className="relative">
            <div className="my-2 px-4 py-1 bg-white text-gray-500 w-fit mx-auto">
              無相符內容
            </div>
            <hr className="absolute top-1/2 w-full h-[px] bg-slate-300 -z-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {notFoundOptions.map((notFoundOption, index) => (
              <button
                key={index}
                value={notFoundOption}
                onClick={handleAreaSelect}
                className={`px-2 py-1 rounded-2xl bg-gray-200  ${
                  targetOptions.includes(notFoundOption)
                    ? "bg-red-200 text-red-500 opacity-90"
                    : "bg-gray-200 opacity-40"
                }`}
              >
                {notFoundOption}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AreaBlock;
