import React from "react";
import Button from "./Button";
import PostCard from "./PostCardTopPosts";
import { useStaticQuery, graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TopPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp(limit: 3) {
        edges {
          node {
            gatsbyImageData
          }
        }
      }
    }
  `);
  const images = data.allImageSharp.edges.map((edge) => getImage(edge.node));
  const postCards = images.map((imageUrl, index) => {
    if (index === 0) {
      return (
        <PostCard
          key={imageUrl.backgroundColor}
          imageUrl={imageUrl}
          bgColor={imageUrl.backgroundColor}
          isImageLeft={false}
        />
      );
    } else {
      return (
        <PostCard
          key={imageUrl.backgroundColor}
          imageUrl={imageUrl}
          bgColor={imageUrl.backgroundColor}
          isImageLeft={true}
        />
      );
    }
  });
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">精選文章</h1>
          <Button isBlack={true} isMaxMdHidden={true}>
            觀看全部
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden relative">
        <button className="bg-black text-white px-2 py-5 rounded-r-lg opacity-80 absolute top-1/2 z-10 left-0 -translate-y-1/2">
          <BsChevronLeft size={20} />
        </button>
        <button className="bg-black text-white px-2 py-5 rounded-l-lg opacity-80 absolute top-1/2 z-10 right-0 -translate-y-1/2">
          <BsChevronRight size={20} />
        </button>
        <div className=" bg-fuchsia-400 grid grid-cols-2 grid-rows-2 gap-3 max-lg:grid-cols-3 max-lg:grid-rows-1 max-lg:w-[280%]">
          <div className="col-span-1 row-span-2 max-lg:row-span-1 max-lg:col-span-1">
            {postCards[0]}
          </div>
          <div className="bg-green-200 col-span-1 row-span-1 max-lg:row-span-1 max-lg:col-span-1">
            {postCards[1]}
          </div>
          <div className="bg-blue-200 col-span-1 row-span-1 max-lg:row-span-1 max-lg:col-span-1">
            {postCards[2]}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPosts;
