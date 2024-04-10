import React from "react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const PostCard = ({ imageUrl, bgColor, isImageLeft }) => {
  return (
    <div
      className={`flex gap-2 ${
        isImageLeft ? "justify-start items-center " : "flex-col"
      } relative group max-lg:flex-col`}
    >
      <div
        className={`relative rounded-lg overflow-hidden max-lg:h-[200px] ${
          isImageLeft
            ? "h-[215px] w-[220px] bg-slate-400 max-lg:w-auto"
            : "h-[280px]  bg-slate-400"
        }`}
      >
        <GatsbyImage
          image={imageUrl}
          className="w-full h-full"
          alt="post card image"
        />
        <h3 className="absolute text-white text-lg top-4 opacity-80  bg-black pl-2 pr-3 py-1 rounded-r-lg max-lg:text-xs max-lg:top-2 max-lg:pr-2 max-lg:pl-1">
          Python
        </h3>
      </div>
      <div className="flex-1">
        <div className="py-2 max-lg:pl-1 max-lg:py-0">
          <div className="flex justify-start items-center gap-2">
            <div className="flex items-center gap-1 text-gray-600">
              <BsCalendar4Week className="text-lg max-md:hidden" />
              <p className="text-sm">March 29, 2024</p>
            </div>
            <div className="rounded-full w-6 h-6 overflow-hidden lg:hidden">
              <StaticImage src="../images/person1.png" />
            </div>
          </div>
          <h4 className="mt-1 font-semibold text-lg max-lg:text-base max-lg:mt-0">
            多模態詠唱外掛模型，輕量靈活有效，IP-Adapter by Hu & Jun et al
          </h4>
          <p className="mt-1">
            蘋果於 2024 年 3 月 8 日推出全新 iPhone 15
            系列手機，搭載A17仿生晶片、6.1 吋。
          </p>
        </div>
        <div className="flex gap-3 mt-0 bg-orange-400 max-lg:hidden">
          <div className="rounded-full w-11 h-11 overflow-hidden">
            <StaticImage src="../images/person1.png" />
          </div>
          <div>
            <p className=" text-gray-500">作者</p>
            <h5 className=" font-medium">陳彥樺</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
