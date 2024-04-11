import React, { useState, useEffect } from "react";
import Button from "./Button";
import PostCard from "./PostCard";
import { useStaticQuery, graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const RecentPosts = () => {
  const numOfPagePosts = 3;
  const [page, setPage] = useState(1);
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            gatsbyImageData
          }
        }
      }
    }
  `);
  const posts = data.allImageSharp.edges;
  const numOfPosts = data.allImageSharp.edges.length;
  const numOfPages = Math.ceil(numOfPosts / numOfPagePosts);
  const pagesArray = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const pagePosts = posts.slice(
    numOfPagePosts * (page - 1),
    numOfPagePosts * page
  );
  console.log(pagePosts);
  const handleChangePage = (page) => {
    setPage(page);
  };
  const images = pagePosts.map((edge) => getImage(edge.node));
  const postCards = images.map((imageUrl, index) => (
    <PostCard
      key={index}
      imageUrl={imageUrl}
      bgColor={imageUrl.backgroundColor}
    />
  ));
  console.log(postCards.length);
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">近期文章</h1>
        <Button isBlack={true}>觀看全部</Button>
      </div>
      <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1 max-lg:gap-4">
        {postCards}
      </div>
      <div>
        {pagesArray.map((page, index) => {
          return (
            <>
              <button key={index} onClick={() => handleChangePage(index + 1)}>
                {index + 1}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default RecentPosts;
