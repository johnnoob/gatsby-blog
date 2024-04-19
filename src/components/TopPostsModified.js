import React, { useEffect, useState } from "react";
import Button from "./Button";
import PostCardBig from "./TopPostsCardBig";
import PostCardSmall from "./TopPostCardSmall";
import { useStaticQuery, graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TopPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp(limit: 4, skip: 4) {
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
    if (index !== 0) {
      return (
        <PostCardSmall
          key={imageUrl.backgroundColor}
          imageUrl={imageUrl}
          bgColor={imageUrl.backgroundColor}
        />
      );
    }
    return (
      <PostCardBig
        key={imageUrl.backgroundColor}
        imageUrl={imageUrl}
        bgColor={imageUrl.backgroundColor}
      />
    );
  });
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title">精選文章</h1>
        <Button isBlack={true} isMaxMdHidden={false}>
          觀看全部
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-1">
        <div className="bg-blue-100 col-span-2">{postCards[0]}</div>
        <div className="flex flex-col justify-between max-lg:min-h-[350px]">
          <div>{postCards[1]}</div>
          <div>
            <hr />
          </div>
          <div>{postCards[2]}</div>
          <div>
            <hr />
          </div>
          <div>{postCards[3]}</div>
        </div>
      </div>
    </section>
  );
};

export default TopPosts;
