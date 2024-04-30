import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { Card, Select } from "../../components/blogPage/index";
import { dateAscendingOptions } from "../../constants/selections";
import { set } from "date-fns";

const BlogPage = ({ location }) => {
  const {
    allMdx: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            category
            subcategory
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
  const initialPosts = useMemo(
    () =>
      nodes.map((node) => {
        return {
          ...node.frontmatter,
          hero_image: getImage(node.frontmatter.hero_image),
          excerpt: node.excerpt,
        };
      }),
    [nodes]
  );
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

  const subcategories = [
    ...new Set(initialPosts.map((post) => post.subcategory)),
  ];
  const [subcategory, setSubcategory] = useState("");
  const categoryToSubcategoryMap = initialPosts.reduce(
    (accumulator, currentPost) => {
      const { subcategory: currentPostSubcategory } = currentPost;
      accumulator.全部 += 1;
      if (!accumulator.hasOwnProperty(currentPostSubcategory)) {
        accumulator[currentPostSubcategory] = 1;
      } else {
        accumulator[currentPostSubcategory] += 1;
      }
      return accumulator;
    },
    { 全部: 0 }
  );

  const subcategoryToNumOfPostsMap = initialPosts.reduce(
    (accumulator, currentPost) => {
      const { subcategory: currentPostSubcategory } = currentPost;
      accumulator.全部 += 1;
      if (!accumulator.hasOwnProperty(currentPostSubcategory)) {
        accumulator[currentPostSubcategory] = 1;
      } else {
        accumulator[currentPostSubcategory] += 1;
      }
      return accumulator;
    },
    { 全部: 0 }
  );
  const handleSubcategoryClick = (e) => {
    setSubcategory(e.target.value);
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

  const [selectedTags, setSelectedTags] = useState([]);
  const handleSelectedTags = (e) => {
    const targetTag = e.target.value;
    if (selectedTags.includes(targetTag)) {
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.filter((tag) => tag !== targetTag)
      );
    } else {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, targetTag]);
    }
  };

  useEffect(() => {
    const selectedTag = location?.state?.selectedTag;
    if (selectedTag !== undefined) {
      setSelectedTags([selectedTag]);
    }
  }, [location]);

  useEffect(() => {
    const isArraySubset = (subset, superset) => {
      return subset.every((element) => superset.includes(element));
    };
    let filteredPosts;
    if (category === "全部") {
      filteredPosts = initialPosts.filter((post) => {
        const { tags: postTags } = post;
        return isArraySubset(selectedTags, postTags);
      });
    } else {
      filteredPosts = initialPosts.filter((post) => {
        const {
          tags: postTags,
          category: postCategory,
          subcategory: postSubcategory,
        } = post;
        const isSelectedTagsInPost = isArraySubset(selectedTags, postTags);
        return (
          isSelectedTagsInPost &&
          postCategory === category &&
          postSubcategory === subcategory
        );
      });
    }

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (isDateAscending) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setPosts(sortedPosts);
  }, [category, subcategory, isDateAscending, initialPosts, selectedTags]);

  const isTagSelected = (tag) => selectedTags.includes(tag);

  const [area, setArea] = useState("category");
  const handleArea = (e) => {
    setArea(e.target.value);
  };

  return (
    <Layout isBlogPost={false}>
      <section className="max-w-[1440px] padding-x pt-32">
        <div className="my-5">
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
          <div className="relative shrink-0 w-[300px] p-3 border-[1px]">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <button
                className="flex items-center px-2 py-1 bg-slate-200 rounded-lg text-lg"
                value="category"
                onClick={handleArea}
              >
                類別
              </button>
              <button
                className="flex items-center px-2 py-1 bg-slate-200 rounded-lg text-lg"
                value="subcategory"
                onClick={handleArea}
              >
                子類別
              </button>
              <button
                className="flex items-center"
                value="tags"
                onClick={handleArea}
              >
                標籤
                <span className="rounded-full inline-block w-6 h-6 bg-red-200">
                  {selectedTags.length > 0 && selectedTags.length}
                </span>
              </button>
            </div>
            <div
              className={`flex flex-col justify-start items-start ${
                area === "category" ? "block" : "hidden"
              }`}
            >
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
            <div
              className={`flex flex-col justify-start items-start ${
                area === "subcategory" ? "block" : "hidden"
              }`}
            >
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  value={subcategory}
                  onClick={handleSubcategoryClick}
                >
                  {subcategory}
                  <span>{subcategoryToNumOfPostsMap[subcategory]}</span>
                </button>
              ))}
            </div>
            <div
              className={`flex flex-wrap gap-1 ${
                area === "tags" ? "block" : "hidden"
              }`}
            >
              {categoryToTagsMap[category].map((tag) => (
                <button
                  key={tag}
                  value={tag}
                  className={`p-2 rounded-3xl text-sm font-light ${
                    isTagSelected(tag)
                      ? "bg-slate-500 text-white"
                      : "bg-slate-200"
                  }`}
                  onClick={handleSelectedTags}
                >
                  {`#${tag}`}
                </button>
              ))}
            </div>
            <hr />
            <div>
              {category}
              {subcategory}
              <div className={`flex flex-wrap gap-1`}>
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    value={tag}
                    className={`p-2 rounded-3xl text-sm font-light ${
                      isTagSelected(tag)
                        ? "bg-slate-500 text-white"
                        : "bg-slate-200"
                    }`}
                    onClick={handleSelectedTags}
                  >
                    {`#${tag}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
