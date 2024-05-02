import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import {
  Card,
  Select,
  useFilterSelect,
  useNotFoundItems,
  useFilteredAndSortedPosts,
} from "../../components/blogPage/index";
import { dateAscendingOptions } from "../../constants/selections";

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
  const allPosts = useMemo(
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
      allPosts.reduce(
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
    [allPosts]
  );
  // console.log(categoryToSubcategoryToTagsMap);

  const { categories } = categoryToSubcategoryToTagsMap;
  const categoryToNumOfPostsMap = useMemo(() => {
    return Object.fromEntries(
      Object.entries(categories).map(([key, value]) => [key, value.numOfPosts])
    );
  }, [categories]);

  const subcategoryToNumOfPostsMap = useMemo(() => {
    const subcategoryMap = {};
    for (const [key, value] of Object.entries(
      categoryToSubcategoryToTagsMap.categories
    )) {
      for (const [subkey, subvalue] of Object.entries(value.subcategories)) {
        subcategoryMap[subkey] = subvalue.numOfPosts;
      }
    }
    return subcategoryMap;
  }, [categoryToSubcategoryToTagsMap.categories]);

  const allTags = useMemo(() => {
    return [
      ...new Set(
        Object.values(categoryToSubcategoryToTagsMap.categories).flatMap(
          (category) => category.tags
        )
      ),
    ];
  }, [categoryToSubcategoryToTagsMap.categories]);
  const [isDateAscending, setIsDateAscending] = useState(false);
  const [targetCategories, setTargetCategories, handleCategorySelect] =
    useFilterSelect([]);
  const [targetSubcategories, setTargetSubcategories, handleSubcategorySelect] =
    useFilterSelect([]);
  const [targetTags, setTargetTags, handleTagSelect] = useFilterSelect([]);
  const posts = useFilteredAndSortedPosts(
    allPosts,
    targetCategories,
    targetSubcategories,
    targetTags,
    isDateAscending
  );
  const { notFoundCategories, notFoundSubcategories, notFoundTags } =
    useNotFoundItems(
      posts,
      targetCategories,
      targetSubcategories,
      targetTags,
      allTags,
      allPosts,
      categoryToNumOfPostsMap,
      subcategoryToNumOfPostsMap
    );
  console.log(notFoundCategories, notFoundSubcategories, notFoundTags);
  const [categoryOptions, setCategoryOptions] = useState(
    Object.keys(categoryToNumOfPostsMap)
  );
  const [subcategoryOptions, setSubcategoryOptions] = useState(
    Object.keys(subcategoryToNumOfPostsMap)
  );
  const [tagOptions, setTagOptions] = useState(allTags);
  const [area, setArea] = useState("category");
  const handleDateSortSelect = (e) => {
    setIsDateAscending(e.target.value === "true");
  };

  useEffect(() => {
    const selectedTag = location?.state?.selectedTag;
    if (selectedTag !== undefined) {
      setTargetTags([selectedTag]);
    }
  }, [location]);

  const handleFilterArea = (e) => {
    setArea(e.target.value);
  };
  return (
    <Layout isBlogPost={false}>
      <section className="max-container padding-x pt-32">
        <div className="my-5">
          <Select
            options={dateAscendingOptions}
            handleSelect={handleDateSortSelect}
            defaultValue={isDateAscending}
          />
        </div>
        <div className="flex flex-center items-start">
          <main className="flex flex-col justify-start gap-5 w-full">
            {posts.length == 0
              ? "無內容"
              : posts.map((post) => {
                  return <Card key={post.slug} {...post} />;
                })}
          </main>
          <div className="relative shrink-0 w-[300px] p-3 border-[1px]">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <button
                className="flex items-center px-2 py-1 bg-slate-200 rounded-lg text-lg"
                value="category"
                onClick={handleFilterArea}
              >
                類別
              </button>
              <button
                className="flex items-center px-2 py-1 bg-slate-200 rounded-lg text-lg"
                value="subcategory"
                onClick={handleFilterArea}
              >
                子類別
              </button>
              <button
                className="flex items-center"
                value="tags"
                onClick={handleFilterArea}
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
              <div>
                {categoryOptions.map((categoryOption, index) => (
                  <button
                    key={index}
                    value={categoryOption}
                    onClick={handleCategorySelect}
                    className={`${
                      targetCategories.includes(categoryOption)
                        ? "bg-gray-400"
                        : "bg-gray-100"
                    }`}
                  >
                    {categoryOption}
                    <span>{categoryToNumOfPostsMap[categoryOption]}</span>
                  </button>
                ))}
              </div>
              <div>
                <h5>not found category</h5>
                {notFoundCategories.map((notFoundCategory, index) => (
                  <button
                    key={index}
                    value={notFoundCategory}
                    className={`${
                      targetCategories.includes(notFoundCategory)
                        ? "bg-gray-400"
                        : "bg-gray-100"
                    }`}
                  >
                    {notFoundCategory}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`flex flex-col justify-start items-start ${
                area === "subcategory" ? "block" : "hidden"
              }`}
            >
              <div>
                {subcategoryOptions.map((subcategoryOption, index) => (
                  <button
                    key={index}
                    value={subcategoryOption}
                    onClick={handleSubcategorySelect}
                    className={`${
                      targetSubcategories.includes(subcategoryOption)
                        ? "bg-gray-400"
                        : "bg-gray-100"
                    }`}
                  >
                    {subcategoryOption}
                    <span>{subcategoryToNumOfPostsMap[subcategoryOption]}</span>
                  </button>
                ))}
              </div>
              <div>
                <h5>not found subcategory</h5>
                {notFoundSubcategories.map((notFoundSubcategory, index) => (
                  <button
                    key={index}
                    value={notFoundSubcategory}
                    className={`${
                      targetCategories.includes(notFoundSubcategory)
                        ? "bg-gray-400"
                        : "bg-gray-100"
                    }`}
                  >
                    {notFoundSubcategory}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`flex flex-wrap gap-1 ${
                area === "tags" ? "block" : "hidden"
              }`}
            >
              <div>
                {tagOptions.map((tagOption) => (
                  <button
                    key={tagOption}
                    value={tagOption}
                    className={`${
                      targetTags.includes(tagOption)
                        ? "bg-gray-400"
                        : "bg-gray-100"
                    }`}
                    onClick={handleTagSelect}
                  >
                    {`#${tagOption}`}
                  </button>
                ))}
              </div>
              <div>
                <h5>not found tags</h5>
                {notFoundTags.map((notFoundTags, index) => (
                  <button
                    key={index}
                    value={notFoundTags}
                    className={`${
                      targetCategories.includes(notFoundTags)
                        ? "bg-gray-400"
                        : "bg-gray-100"
                    }`}
                  >
                    {notFoundTags}
                  </button>
                ))}
              </div>
            </div>
            <hr />
            <div>
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
