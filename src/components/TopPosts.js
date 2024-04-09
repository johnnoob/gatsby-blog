import React from "react";
import Button from "./Button";
import PostCard from "./PostCardTopPosts";
import { useStaticQuery, graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

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
      <div className="grid grid-cols-10 gap-4 max-lg:flex max-lg:items-start max-lg:w-[2000px] bg-fuchsia-400">
        <div className="bg-red-200 col-span-5 max-lg:col-span-1 grid">
          {postCards[0]}
        </div>
        <div className="col-span-5 grid grid-rows-2 gap-4 max-lg:col-span-2 max-lg:grid-cols-2">
          <div className="bg-green-200">{postCards[1]}</div>
          <div className="bg-blue-200">{postCards[2]}</div>
        </div>
      </div>
    </>
  );
};

export default TopPosts;
