import React, { useState } from "react";
import Button from "./Button";
import PostCard from "./PostCardTopPosts";
import { useStaticQuery, graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TopPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp(limit: 3, skip: 3) {
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
    let isImageLeft = false;
    if (index !== 0) {
      isImageLeft = true;
    }
    return (
      <PostCard
        key={imageUrl.backgroundColor}
        imageUrl={imageUrl}
        bgColor={imageUrl.backgroundColor}
        isImageLeft={isImageLeft}
      />
    );
  });
  const [cardIndex, setCardIndex] = useState(0);
  const handleNextCard = () => {
    if (cardIndex < postCards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };
  const handlePrevCard = () => {
    if (cardIndex === 0) {
      setCardIndex(postCards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
  };
  return (
    <section>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">精選文章</h1>
          <Button isBlack={true} isMaxMdHidden={true}>
            觀看全部
          </Button>
        </div>
      </div>
      <div className="w-full relative overflow-hidden">
        <button
          className="bg-black text-white px-2 py-5 rounded-r-lg opacity-80 absolute top-1/2 z-10 left-0 -translate-y-1/2 lg:hidden"
          onClick={handlePrevCard}
        >
          <BsChevronLeft size={20} />
        </button>
        <button
          className="bg-black text-white px-2 py-5 rounded-l-lg opacity-80 absolute top-1/2 z-10 right-0 -translate-y-1/2 lg:hidden"
          onClick={handleNextCard}
        >
          <BsChevronRight size={20} />
        </button>
        <div
          className={`grid grid-cols-2 grid-rows-2 gap-3 max-lg:grid-cols-3 max-lg:gap-0 max-lg:grid-rows-1 max-lg:w-[300%] max-lg:-translate-x-${(
            1 * cardIndex
          ).toString()}/3 max-lg:transition-all`}
          style={{}}
        >
          <div className="col-span-1 row-span-2 max-lg:row-span-1 max-lg:col-span-1">
            {postCards[0]}
          </div>
          <div className=" col-span-1 row-span-1 max-lg:row-span-1 max-lg:col-span-1">
            {postCards[1]}
          </div>
          <div className=" col-span-1 row-span-1 max-lg:row-span-1 max-lg:col-span-1">
            {postCards[2]}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPosts;
