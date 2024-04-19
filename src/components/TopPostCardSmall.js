import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const TopPostCardSmall = ({ imageUrl }) => {
  return (
    <div className="flex gap-4 relative">
      <GatsbyImage
        image={imageUrl}
        alt="post card image"
        className={`aspect-[16/11] w-[700px] max-lg:w-[130px] max-lg:flex-shrink-0`}
      />
      <h3 className="absolute text-white top-4  bg-black pl-2 pr-3 py-1 rounded-r-md text-xs">
        {"Python"}
      </h3>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center gap-2 text-gray-600">
          <BsCalendar4Week />
          <p className="text-sm">March 29, 2024</p>
        </div>
        <h4 className="text-sm font-semibold line-clamp-3">
          多模態詠唱外掛模型，輕量靈活有效，IP-Adapter by Hu & Jun et alter by
          Hu & Jun et alAdapter by Hu & Jun et alter
        </h4>
      </div>
    </div>
  );
};

export default TopPostCardSmall;
