import React from "react";
import Button from "./Button";
import PostCard from "./PostCard";
import { useStaticQuery, graphql, Link } from "gatsby";
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
    <PostCard
      key={imageUrl.backgroundColor}
      imageUrl={imageUrl}
      bgColor={imageUrl.backgroundColor}
    />
  ));
  return (
    <section className="section">
      <div className="section-container">
        <div className="flex justify-between items-center mb-2">
          <h1 className="section-title">近期文章</h1>
          <Link to="/all-posts" className="text-orange-600 md:text-lg">
            顯示全部
          </Link>
        </div>
        <hr className=" border-b-1 mb-8 max-md:hidden" />
        <div className="grid grid-cols-3  gap-8 max-md:grid-cols-1 max-md:gap-2">
          {postCards}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
