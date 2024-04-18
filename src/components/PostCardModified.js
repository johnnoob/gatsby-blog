import React from "react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const PostCard = ({ imageUrl }) => {
  return (
    <div
      className={`post-card-transition hover:post-card-shadow hover:-translate-y-3`}
    >
      <div className="relative">
        <GatsbyImage image={imageUrl} alt={""} className="aspect-[16/9]" />
        <h3 className="absolute text-white top-4  bg-black pl-2 pr-3 py-1 rounded-r-md">
          {"Python"}
        </h3>
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-start items-center gap-2">
            <div className="flex items-center gap-1 text-gray-600">
              <BsCalendar4Week />
              <p className="text-sm">March 29, 2024</p>
            </div>
          </div>
          <h4 className="font-semibold text-lg line-clamp-2">
            多模態詠唱外掛模型，輕量靈活有效，IP-Adapter by Hu & Jun et al
          </h4>
          <div className="flex gap-3 items-center">
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
