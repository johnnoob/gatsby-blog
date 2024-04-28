import React from "react";
import Layout from "../../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import PostCard from "../../components/PostCardModified";

const BlogPage = () => {
  const {
    allMdx: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            category
            author
            date(formatString: "YYYY/MM/DD")
            hero_image {
              childImageSharp {
                gatsbyImageData(placeholder: TRACED_SVG)
              }
            }
            slug
            tags
            title
          }
          excerpt
        }
      }
    }
  `);
  const posts = nodes.map((node) => {
    return {
      ...node.frontmatter,
      hero_image: getImage(node.frontmatter.hero_image),
      excerpt: node.excerpt,
    };
  });
  console.log(posts);
  const postCards = posts.map((post) => {
    return <PostCard key={post.slug} {...post} />;
  });

  return (
    <Layout isBlogPost={false}>
      <section className="max-container padding-x pt-32">
        <div>Time</div>
        <div className="flex flex-center items-start">
          <main className="grid grid-cols-3 gap-5">{postCards}</main>
          <div>filter</div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
