import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import {
  Card,
  Select,
  AreaSelectButton,
  AreaBlock,
  useFilterSelect,
  useNotFoundItems,
  useFilteredAndSortedPosts,
} from "../../components/blogPage/index";
import { dateAscendingOptions } from "../../constants/selections";
import { FaArrowRotateRight, FaMagnifyingGlass } from "react-icons/fa6";

const BlogPage = ({ location }) => {
  const {
    allMdx: { nodes },
    allContentfulAuthor: { nodes: authors },
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
                gatsbyImageData(placeholder: BLURRED, width: 300)
              }
            }
            slug
            tags
            title
          }
          excerpt
        }
      }
      allContentfulAuthor {
        nodes {
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
          name
        }
      }
    }
  `);
  const authorToImageMap = Object.fromEntries(
    authors.map((author) => {
      return [author.name, getImage(author.image)];
    })
  );
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

  const { categories } = categoryToSubcategoryToTagsMap;
  const categoryToNumOfPostsMap = useMemo(() => {
    return Object.fromEntries(
      Object.entries(categories).map(([key, value]) => [key, value.numOfPosts])
    );
  }, [categories]);

  const subcategoryToNumOfPostsMap = useMemo(() => {
    const subcategoryMap = {};
    for (const value of Object.values(
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

  const allCategories = Object.keys(categoryToNumOfPostsMap);
  const allSubcategories = Object.keys(subcategoryToNumOfPostsMap);

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

  const handleFilterArea = (area) => {
    setArea(area);
  };
  const handleReset = (area) => {};
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
        <div className="flex flex-center items-start gap-5">
          <main className="flex flex-col justify-start gap-4 w-full">
            {posts.length === 0
              ? "無內容"
              : posts.map((post) => {
                  return (
                    <Card
                      key={post.slug}
                      author_image={authorToImageMap[post.author]}
                      {...post}
                    />
                  );
                })}
          </main>
          <aside className="shrink-0 w-[300px] p-3 border-[1px] rounded-lg max-xl:hidden">
            <h2 className="text-lg font-semibold mb-2">篩選內容</h2>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <AreaSelectButton
                area={area}
                label="category"
                labelName="類別"
                targetOptions={targetCategories}
                handleFilterArea={handleFilterArea}
              />
              <AreaSelectButton
                area={area}
                label="subcategory"
                labelName="子類別"
                targetOptions={targetSubcategories}
                handleFilterArea={handleFilterArea}
              />
              <AreaSelectButton
                area={area}
                label="tags"
                labelName="標籤"
                targetOptions={targetTags}
                handleFilterArea={handleFilterArea}
              />
            </div>
            <hr className="mb-3" />
            <div className="mb-3 flex items-center gap-2">
              <button
                className="bg-gray-200 flex justify-center items-center gap-2 px-2 py-1 rounded-2xl text-sm shrink-0"
                onClick={handleReset}
              >
                <FaArrowRotateRight />
                <p>重置條件</p>
              </button>
              <div className="relative text-sm">
                <FaMagnifyingGlass className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  className="focus:outline-none ring-0 bg-transparent pl-6 pr-2 border-[1px] rounded-full py-1 max-w-[160px]"
                  placeholder={"以名稱過濾條件"}
                />
              </div>
            </div>
            <hr className="mb-3" />
            <AreaBlock
              area={area}
              label="category"
              targetOptions={targetCategories}
              options={allCategories}
              notFoundOptions={notFoundCategories}
              handleAreaSelect={handleCategorySelect}
            />
            <AreaBlock
              area={area}
              label="subcategory"
              targetOptions={targetSubcategories}
              options={allSubcategories}
              notFoundOptions={notFoundSubcategories}
              handleAreaSelect={handleSubcategorySelect}
            />
            <AreaBlock
              area={area}
              label="tags"
              targetOptions={targetTags}
              options={allTags}
              notFoundOptions={notFoundTags}
              handleAreaSelect={handleTagSelect}
            />
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
