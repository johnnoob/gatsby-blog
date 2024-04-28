import React from "react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const PostCard = ({
  author,
  category,
  date,
  title,
  tags,
  excerpt,
  slug,
  hero_image,
}) => {
  return (
    <div
      className={`post-card-transition hover:cursor-pointer rounded-xl hover:post-card-shadow hover:-translate-y-2 max-sm:flex max-sm:items-center max-sm:justify-start max-sm:gap-2`}
    >
      <div className="relative">
        <GatsbyImage
          image={hero_image}
          alt={title}
          className="aspect-[16/9] rounded-xl max-sm:aspect-square max-sm:max-h-[250px]"
        />
        <h3 className="absolute text-white top-[10%] bg-black pl-2 pr-3 py-1 rounded-r-md max-sm:text-xs">
          {category}
        </h3>
      </div>
      <div className="px-6 py-4 max-sm:px-0">
        <div className="flex flex-col gap-5">
          <div className="min-h-[165px] flex flex-col gap-1 max-sm:min-h-[100px]">
            <div className="flex justify-start items-center gap-2 max-sm:gap-3">
              <div className="flex items-center gap-1 text-gray-600">
                <BsCalendar4Week />
                <p className="text-sm">{date}</p>
              </div>
              <div className="flex gap-1 items-center sm:hidden">
                <StaticImage
                  src="../images/person1.png"
                  className="rounded-full w-7 h-7"
                />
                <h5 className="font-medium">{author}</h5>
              </div>
            </div>
            <h4 className="text-lg font-semibold line-clamp-3 max-sm:line-clamp-3 max-sm:text-base">
              {title}
            </h4>
            <p className="line-clamp-2 text-gray-p max-sm:hidden">{excerpt}</p>
          </div>
          <div className="flex gap-3 items-center max-sm:hidden">
            <StaticImage
              src="../images/person1.png"
              className="rounded-full w-10 h-10"
            />
            <div>
              <p className="text-sm text-gray-600">作者</p>
              <h5 className="font-medium">{author}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
