import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import PostCard from "./PostCardModified";
import Pagination from "./Pagination";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const RecentPosts = () => {
  const [page, setPage] = useState(1);
  const [numOfPagePosts, setNumOfPagePosts] = useState(4);
  const bgNumOfPagePosts = 6;
  const maxMdNumOfPagePosts = 4;
  const isSmallDeviceRef = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      const currentWindowWidth = window.innerWidth;
      if (currentWindowWidth >= 1024) {
        setNumOfPagePosts(bgNumOfPagePosts);
        if (isSmallDeviceRef.current) {
          setPage(1);
        }
        isSmallDeviceRef.current = false;
      } else if (currentWindowWidth < 1024) {
        setNumOfPagePosts(maxMdNumOfPagePosts);
        isSmallDeviceRef.current = true;
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

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
        <h1 className="text-3xl font-bold tracking-wider">近期文章</h1>
        <Button isBlack={true}>觀看全部</Button>
      </div>
      <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:gap-2">
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
