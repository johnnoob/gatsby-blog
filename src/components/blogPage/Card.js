import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

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
          className="aspect-[16/9] shrink-0 w-[350px] rounded-xl"
        />
        <div className="flex flex-col items-start">
          <div className="px-2 py-1 text-sm text-white rounded-md bg-gray-500">
            {category}
          </div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p>{excerpt}</p>
          <div className="flex justify-start items-center">
            <h3>{date}</h3>
            <div>
              <p>{author}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
