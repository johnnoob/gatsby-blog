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
  const categoryToSubcategoryToTagsMap = useMemo(
    () =>
      initialPosts.reduce(
        (accumulator, currentPost) => {
          const {
            category: currentPostCategory,
            subcategory: currentPostSubcategory,
            tags: currentPostTags,
          } = currentPost;
          accumulator["numOfPosts"] += 1;
          if (!accumulator["categories"].hasOwnProperty(currentPostCategory)) {
            accumulator["categories"][currentPostCategory] = {
              numOfPosts: 1,
              tags: currentPostTags,
              subcategories: {
                [currentPostSubcategory]: {
                  numOfPosts: 1,
                  tags: currentPostTags,
                },
              },
            };
          } else {
            accumulator["categories"][currentPostCategory]["tags"] = [
              ...new Set([
                ...accumulator["categories"][currentPostCategory]["tags"],
                ...currentPostTags,
              ]),
            ];
            if (
              !accumulator["categories"][currentPostCategory][
                "subcategories"
              ].hasOwnProperty(currentPostSubcategory)
            ) {
              accumulator["categories"][currentPostCategory]["subcategories"][
                currentPostSubcategory
              ] = {
                numOfPosts: 1,
                tags: currentPostTags,
              };
            } else {
              accumulator["categories"][currentPostCategory]["subcategories"][
                currentPostSubcategory
              ]["numOfPosts"] += 1;
              accumulator["categories"][currentPostCategory]["subcategories"][
                currentPostSubcategory
              ]["tags"] = [
                ...new Set([
                  ...accumulator["categories"][currentPostCategory][
                    "subcategories"
                  ][currentPostSubcategory]["tags"],
                  ...currentPostTags,
                ]),
              ];
            }
            accumulator["categories"][currentPostCategory]["numOfPosts"] += 1;
          }
          return accumulator;
        },
        { numOfPosts: 0, categories: {} }
      ),
    [initialPosts]
  );
  console.log(categoryToSubcategoryToTagsMap);

  const categoriesMap = {};
  for (let key in categoryToSubcategoryToTagsMap["categories"]) {
    categoriesMap[key] = categoryToSubcategoryToTagsMap["categories"][key];
  }

  const subcategoriesMap = {};
  for (let key in categoryToSubcategoryToTagsMap["categories"]) {
    for (let subkey in categoryToSubcategoryToTagsMap["categories"][key][
      "subcategories"
    ]) {
      subcategoriesMap[subkey] =
        categoryToSubcategoryToTagsMap["categories"][key]["subcategories"][
          subkey
        ];
    }
  }
  console.log(subcategoriesMap);

  let allTags = [];
  for (let key in categoryToSubcategoryToTagsMap["categories"]) {
    allTags.push(...categoryToSubcategoryToTagsMap["categories"][key]["tags"]);
  }
  allTags = [...new Set(allTags)];

  const [posts, setPosts] = useState(initialPosts);
  const [isDateAscending, setIsDateAscending] = useState(false);
  const [targetCategory, setTargetCategory] = useState("易經推演宇宙");
  const [targetSubcategory, setTargetSubcategory] = useState("推導人生");
  const [targetTags, setTargetTags] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState(
    Object.keys(categoriesMap)
  );
  const [subcategoryOptions, setSubcategoryOptions] = useState(
    Object.keys(subcategoriesMap)
  );
  const [tagOptions, setTagOptions] = useState(allTags);
  const [area, setArea] = useState("category");

  useEffect(() => {
    setSubcategoryOptions(
      Object.keys(
        categoryToSubcategoryToTagsMap["categories"][targetCategory][
          "subcategories"
        ]
      )
    );
  }, [categoryToSubcategoryToTagsMap, targetCategory]);

  useEffect(() => {
    if (
      !categoryToSubcategoryToTagsMap["categories"][targetCategory][
        "subcategories"
      ].hasOwnProperty(targetSubcategory)
    )
      return;
    setTagOptions(
      categoryToSubcategoryToTagsMap["categories"][targetCategory][
        "subcategories"
      ][targetSubcategory]["tags"]
    );
  }, [categoryToSubcategoryToTagsMap, targetCategory, targetSubcategory]);

  const handleDateSortSelect = (e) => {
    setIsDateAscending(e.target.value === "true");
  };
  const handleCategoryClick = (e) => {
    setTargetCategory(e.target.value);
  };
  const handleSubcategoryClick = (e) => {
    setTargetSubcategory(e.target.value);
  };
  const handleSelectedTags = (e) => {
    const targetTag = e.target.value;
    if (targetTags.includes(targetTag)) {
      setTargetTags((prevTargetTags) =>
        prevTargetTags.filter((tag) => tag !== targetTag)
      );
    } else {
      setTargetTags((prevTargetTags) => [...prevTargetTags, targetTag]);
    }
  };

  useEffect(() => {
    const selectedTag = location?.state?.selectedTag;
    if (selectedTag !== undefined) {
      setTargetTags([selectedTag]);
    }
  }, [location]);

  useEffect(() => {
    const isArraySubset = (subset, superset) => {
      return subset.every((element) => superset.includes(element));
    };
    let filteredPosts;
    if (targetCategory === "all") {
      filteredPosts = initialPosts;
    } else {
      filteredPosts = initialPosts.filter((post) => {
        const {
          tags: postTags,
          category: postCategory,
          subcategory: postSubcategory,
        } = post;
        const isSelectedTagsInPost = isArraySubset(targetTags, postTags);
        return (
          isSelectedTagsInPost &&
          postCategory === targetCategory &&
          postSubcategory === targetSubcategory
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
  }, [
    targetCategory,
    targetSubcategory,
    isDateAscending,
    initialPosts,
    targetTags,
  ]);

  const isTagSelected = (tag) => targetTags.includes(tag);

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
                  {targetTags.length > 0 && targetTags.length}
                </span>
              </button>
            </div>
            <div
              className={`flex flex-col justify-start items-start ${
                area === "category" ? "block" : "hidden"
              }`}
            >
              {Object.keys(categoryToSubcategoryToTagsMap["categories"]).map(
                (category) => (
                  <button
                    key={category}
                    value={category}
                    onClick={handleCategoryClick}
                  >
                    {category}
                    <span>
                      {
                        categoryToSubcategoryToTagsMap["categories"][category][
                          "numOfPosts"
                        ]
                      }
                    </span>
                  </button>
                )
              )}
            </div>
            <div
              className={`flex flex-col justify-start items-start ${
                area === "subcategory" ? "block" : "hidden"
              }`}
            >
              {subcategoryOptions.map((subcategory) => (
                <button
                  key={subcategory}
                  value={subcategory}
                  onClick={handleSubcategoryClick}
                >
                  {subcategory}
                  <span>
                    {
                      categoryToSubcategoryToTagsMap["categories"][
                        targetCategory
                      ]["subcategories"]?.[subcategory]?.["numOfPosts"]
                    }
                  </span>
                </button>
              ))}
            </div>
            <div
              className={`flex flex-wrap gap-1 ${
                area === "tags" ? "block" : "hidden"
              }`}
            >
              {/* {categoryToTagsMap[category].map((tag) => (
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
              ))} */}
            </div>
            <hr />
            <div>
              {targetCategory}
              {targetSubcategory}
              <div className={`flex flex-wrap gap-1`}>
                {/* {targetTags.map((tag) => (
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
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
