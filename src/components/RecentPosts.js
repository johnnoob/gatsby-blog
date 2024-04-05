import React from "react";
import Button from "./Button";
import PostCard from "./PostCard";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const RecentPosts = () => {
  let list = [];
  for (let i = 0; i < 8; i++) {
    list.push(<PostCard key={i} />);
  }
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
  console.log(data.allImageSharp.edges);
  const images = data.allImageSharp.edges.map((edge) => getImage(edge.node));
  console.log(images);
  const postCards = images.map((imageUrl) => (
    <PostCard key={imageUrl.backgroundColor} imageUrl={imageUrl} />
  ));
  return (
    <section className="section">
      <div className="section-container">
        <div className="flex justify-between items-center mb-2">
          <h1 className="section-title">近期文章</h1>
          <Button label="觀看全部" isMaxMdHidden={true} />
        </div>
        <hr className=" border-b-1 mb-4 max-md:hidden" />
        <div className="grid grid-cols-3  gap-8 max-md:grid-cols-1 max-md:gap-1">
          {postCards}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
