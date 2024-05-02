import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
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
}) => {
  return (
    <Link to={`/blog/${slug}`}>
      <div className="flex items-start gap-4">
        <GatsbyImage
          image={hero_image}
          alt={title}
          className="aspect-[16/9] shrink-0 w-[300px] rounded-lg"
        />
        <div className="flex flex-col items-start gap-1">
          <div className="px-2 py-1 text-sm text-white rounded-md bg-gray-500">
            {category}
          </div>
          <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
          <p className="text-gray-p line-clamp-2">{excerpt}</p>
          <div className="flex justify-start items-center">
            <div>
              <BsCalendar4Week />
              <p className="text-sm">{date}</p>
            </div>
            <div className="flex">
              <p>{author}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
