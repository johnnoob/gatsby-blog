import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { Card, Select } from "../../components/blogPage/index";
import { dateAscendingOptions } from "../../constants/selections";

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
  const [posts, setPosts] = useState(initialPosts);
  const [isDateAscending, setIsDateAscending] = useState(false);
  const handleDateSortSelect = (e) => {
    setIsDateAscending(e.target.value === "true");
  };
  const [category, setCategory] = useState("全部");
  const categories = [
    ...new Set(initialPosts.map((post) => post.category)),
    "全部",
  ];

  const handleCategoryClick = (e) => {
    setCategory(e.target.value);
  };

  const categoryToNumOfPostsMap = initialPosts.reduce(
    (accumulator, currentPost) => {
      const { category: currentPostCategory } = currentPost;
      accumulator.全部 += 1;
      if (!accumulator.hasOwnProperty(currentPostCategory)) {
        accumulator[currentPostCategory] = 1;
      } else {
        accumulator[currentPostCategory] += 1;
      }
      return accumulator;
    },
    { 全部: 0 }
  );

  const categoryToTagsMap = initialPosts.reduce(
    (accumulator, currentPost) => {
      const { tags: currentPostTags, category: currentPostCategory } =
        currentPost;
      if (!accumulator.hasOwnProperty(currentPostCategory)) {
        accumulator[currentPostCategory] = currentPostTags;
      } else {
        accumulator[currentPostCategory] = [
          ...new Set([...accumulator[currentPostCategory], ...currentPostTags]),
        ];
      }
      accumulator.全部 = [
        ...new Set([...accumulator["全部"], ...currentPostTags]),
      ];
      return accumulator;
    },
    { 全部: [] }
  );
  console.log(categoryToTagsMap);

  useEffect(() => {
    let filteredPosts;
    if (category === "全部") {
      filteredPosts = initialPosts;
    } else {
      filteredPosts = initialPosts.filter((post) => post.category === category);
    }

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (isDateAscending) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setPosts(sortedPosts);
  }, [category, isDateAscending]);

  return (
    <Layout isBlogPost={false}>
      <section className="padding-x pt-32">
        <div>
          <Select
            options={dateAscendingOptions}
            handleSelect={handleDateSortSelect}
            defaultValue={isDateAscending}
          />
        </div>
        <div className="flex flex-center items-start">
          <main className="flex flex-col justify-start gap-5">
            {posts.map((post) => {
              return <Card key={post.slug} {...post} />;
            })}
          </main>
          <div>
            <div className="flex flex-wrap justify-start items-center">
              {categories.map((category) => (
                <button
                  key={category}
                  value={category}
                  onClick={handleCategoryClick}
                >
                  {category}
                  <span>{categoryToNumOfPostsMap[category]}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap">
              {/* {categoryToTagsMap[category].map((tag) => (
                <button>{tag}</button>
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
