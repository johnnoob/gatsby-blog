import React from "react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const PostCard = ({ imageUrl }) => {
  return (
    <div className="max-md:flex max-md:gap-1 max-md:items-center">
      <div className="relative rounded-2xl overflow-hidden w-full h-60 max-md:max-h-[80px] max-md:max-w-28">
        <GatsbyImage
          image={imageUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="post card image"
        />
        <h3 className="absolute text-white text-lg top-4 bg-orange-500 pl-2 pr-3 py-1 rounded-r-xl max-md:text-xs max-md:top-2 max-md:pr-2 max-md:pl-1">
          Python
        </h3>
      </div>
      <div>
        <div className="p-2">
          <div className="flex justify-start items-center mb-2 gap-2">
            <div className="flex items-center gap-1 text-gray-600">
              <BsCalendar4Week className="text-lg max-md:hidden" />
              <p className="text-sm">03/29</p>
            </div>
            <div className="flex gap-1 items-center md:hidden">
              <div className="rounded-full w-6 h-6 overflow-hidden">
                <StaticImage src="../images/person1.png" />
              </div>
              <div>
                <h5 className="font-bold text-sm">David Vanguard</h5>
              </div>
            </div>
          </div>
          <h4 className="mt-1 font-bold text-2xl max-md:text-lg max-md:mt-0">
            科技日新月異，新知層出不窮科技日系列手機機...
          </h4>
          <p className="mt-2 max-md:hidden">
            蘋果於 2024 年 3 月 8 日推出全新 iPhone 15
            系列手機，搭載A17仿生晶片、6.1 吋。
          </p>
        </div>
        <div className="flex gap-3 mt-3 max-md:hidden">
          <div className="rounded-full w-11 h-11 overflow-hidden">
            <StaticImage src="../images/person1.png" />
          </div>
          <div>
            <p className=" text-gray-500">作者</p>
            <h5 className="font-bold">陳彥樺</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
