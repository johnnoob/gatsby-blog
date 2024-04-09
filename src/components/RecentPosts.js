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
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold">近期文章</h1>
        <Button isBlack={true}>觀看全部</Button>
      </div>
      <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1 max-lg:gap-4">
        {postCards}
      </div>
    </div>
  );
};

export default RecentPosts;
