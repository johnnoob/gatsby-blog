import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { Card, Select } from "../../components/blogPage/index";

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
                gatsbyImageData(placeholder: BLURRED)
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
  const initialPosts = nodes.map((node) => {
    return {
      ...node.frontmatter,
      hero_image: getImage(node.frontmatter.hero_image),
      excerpt: node.excerpt,
    };
  });
  const [isDateAscending, setIsDateAscending] = useState(false);
  const handleSelectDateSort = (e) => {
    setIsDateAscending(e.target.value === "true");
  };
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    setPosts((prevPosts) => {
      const postsCopy = [...prevPosts];
      postsCopy.sort((a, b) => {
        if (isDateAscending) {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
      return postsCopy;
    });
  }, [isDateAscending]);

  return (
    <Layout isBlogPost={false}>
      <section className="padding-x pt-32">
        <div>
          <Select handleSelect={handleSelectDateSort} />
        </div>
        <div className="flex flex-center items-start">
          <main className="flex flex-col justify-start gap-5">
            {posts.map((post) => {
              return <Card key={post.slug} {...post} />;
            })}
          </main>
          <div>filter</div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
