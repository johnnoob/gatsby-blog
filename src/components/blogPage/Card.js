import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { BsCalendar4Week } from "react-icons/bs";

const Card = ({
  author,
  category,
  date,
  title,
  tags,
  excerpt,
  slug,
  hero_image,
  author_image,
}) => {
  const topThreeTags = tags.slice(0, 3);
  return (
    <Link
      to={`/blog/${slug}`}
      className="border-[1px] rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <GatsbyImage
          image={hero_image}
          alt={title}
          className="aspect-[16/9] rounded-lg w-1/3"
        />
        <div className="flex flex-col justify-between items-start gap-3 w-2/3">
          <div className="flex flex-col justify-between items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 text-sm text-white rounded-md bg-gray-500">
                {category}
              </div>
              <ul className="flex gap-1 max-sm:hidden">
                {topThreeTags.map((tag, index) => {
                  return (
                    <li
                      className="bg-gray-200 px-2 py-1 rounded-2xl font-thin text-sm"
                      key={index}
                    >
                      #{tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
            <p className="text-gray-p line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-3 w-fit ml-auto ">
        <div className="flex items-center gap-1">
          <BsCalendar4Week />
          <p>{date}•</p>
        </div>
        <div className="flex items-center gap-1">
          <GatsbyImage image={author_image} className="h-6 w-6 rounded-full" />
          <p>{author}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
