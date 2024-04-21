import React from "react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const PostCard = ({ imageUrl }) => {
  return (
    <div>
      <div className={`relative`}>
        <GatsbyImage
          image={imageUrl}
          alt="post card image"
          className={`aspect-[16/9]`}
        />
        <h3 className="absolute text-white top-[5%] bg-black pl-2 pr-3 py-1 rounded-r-md max-sm:text-xs">
          {"Python"}
        </h3>
        <div className="w-full bg-white opacity-90 absolute bottom-0 px-6 py-5">
          <div className="w-3/4 flex flex-col gap-1 max-sm:w-full">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-600">
                <BsCalendar4Week />
                <p className="text-sm">March 29, 2024</p>
              </div>
            </div>
            <h4 className="text-lg font-semibold line-clamp-3 max-sm:line-clamp-2">
              多模態詠唱外掛模型，輕量靈活有效，IP-Adapter by Hu & Jun et alter
              by Hu & Jun et alAdapter by Hu & Jun et alter
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
