import React from "react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const PostCard = ({ imageUrl }) => {
  return (
    <div
      className={`post-card-transition hover:cursor-pointer rounded-xl hover:post-card-shadow hover:-translate-y-2 max-sm:flex max-sm:items-center max-sm:justify-start max-sm:gap-2`}
    >
      <div className="relative">
        <GatsbyImage
          image={imageUrl}
          alt={""}
          className="aspect-[16/9] rounded-xl max-sm:aspect-square max-sm:max-h-[250px]"
        />
        <h3 className="absolute text-white top-4  bg-black pl-2 pr-3 py-1 rounded-r-md max-sm:text-xs">
          {"Python"}
        </h3>
      </div>
      <div className="px-6 py-4 max-sm:px-0">
        <div className="flex flex-col gap-5">
          <div className="min-h-[165px] flex flex-col gap-1 max-sm:min-h-[100px]">
            <div className="flex justify-start items-center gap-2 max-sm:gap-3">
              <div className="flex items-center gap-1 text-gray-600">
                <BsCalendar4Week />
                <p className="text-sm">March 29, 2024</p>
              </div>
              <div className="flex gap-1 items-center sm:hidden">
                <StaticImage
                  src="../images/person1.png"
                  className="rounded-full w-7 h-7"
                />
                <h5 className="font-medium">陳彥樺</h5>
              </div>
            </div>
            <h4 className="text-lg font-semibold line-clamp-3 max-sm:line-clamp-3 max-sm:text-base">
              多模態詠唱外掛模型，輕量靈活有效，IP-Adapter by Hu & Jun et alter
              by Hu & Jun et alAdapter by Hu & Jun et alter
            </h4>
            <p className="line-clamp-2 text-gray-p max-sm:hidden">
              多模態詠唱外掛模型，輕量靈活有效，IP-Adapter by Hu & Jun et
              alasddapter by Hu & Jun et alasd
            </p>
          </div>
          <div className="flex gap-3 items-center max-sm:hidden">
            <StaticImage
              src="../images/person1.png"
              className="rounded-full w-10 h-10"
            />
            <div>
              <p className="text-sm text-gray-600">作者</p>
              <h5 className="font-medium">陳彥樺</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
