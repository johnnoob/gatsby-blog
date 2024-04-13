import React, { useState, useEffect } from "react";
import Button from "./Button";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { useStaticQuery, graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const RecentPosts = () => {
  const [page, setPage] = useState(1);
  const [numOfPagePosts, setNumOfPagePosts] = useState(4);
  const bgNumOfPagePosts = 6;
  const smNumOfPagePosts = 4;

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setPage(1);
      if (width >= 1024) {
        setNumOfPagePosts(bgNumOfPagePosts);
      } else {
        setNumOfPagePosts(smNumOfPagePosts);
      }
      return () => {
        window.removeEventListener("resize");
      };
    });
  });

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
  const pagePosts = posts.slice(
    numOfPagePosts * (page - 1),
    numOfPagePosts * page
  );
  const images = pagePosts.map((edge) => getImage(edge.node));
  const postCards = images.map((imageUrl, index) => (
    <PostCard
      key={index}
      imageUrl={imageUrl}
      bgColor={imageUrl.backgroundColor}
    />
  ));
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">近期文章</h1>
        <Button isBlack={true}>觀看全部</Button>
      </div>
      <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1 max-lg:gap-4">
        {postCards}
      </div>
      <hr className="mt-6" />
      <Pagination
        posts={posts}
        page={page}
        setPage={setPage}
        numOfPagePosts={numOfPagePosts}
      />
    </div>
  );
};

export default RecentPosts;
