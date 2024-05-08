import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import {
  Card,
  Select,
  FilterSidebar,
  FilterSidebarSm,
  SearchInput,
  EmptyBlock,
  useFilterSelect,
  useNotFoundItems,
  useFilteredAndSortedPosts,
} from "../../components/blogPage/index";
import { dateAscendingOptions } from "../../constants/selections";
import { FaFilter, FaBook } from "react-icons/fa6";

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
  const [searchInput, setSearchInput] = useState("");
  const posts = useFilteredAndSortedPosts(
    allPosts,
    targetCategories,
    targetSubcategories,
    targetTags,
    isDateAscending,
    searchInput
  );

  const { notFoundCategories, notFoundSubcategories, notFoundTags } =
    useNotFoundItems(
      allPosts,
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
  const [categoryOptions, setCategoryOptions] = useState(allCategories);
  const [subcategoryOptions, setSubcategoryOptions] =
    useState(allSubcategories);
  const [tagOptions, setTagOptions] = useState(allTags);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
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
  const handleReset = (area) => {
    switch (area) {
      case "category":
        setTargetCategories([]);
        break;
      case "subcategory":
        setTargetSubcategories([]);
        break;
      case "tags":
        setTargetTags([]);
        break;
      default:
        break;
    }
  };

  const handleAreaOptionsByInput = (e, area) => {
    const searchInput = e.target.value;
    switch (area) {
      case "category":
        setCategoryOptions(
          allCategories.filter((category) =>
            category.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
        break;
      case "subcategory":
        setSubcategoryOptions(
          allSubcategories.filter((subcategory) =>
            subcategory.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
        break;
      case "tags":
        setTagOptions(
          allTags.filter((tag) =>
            tag.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
        break;
      default:
        break;
    }
  };
  const handleFilterSidebarOpen = () => setIsFilterSidebarOpen((prev) => !prev);

  const handleSearchPostByInput = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <Layout isBlogPost={false}>
      <section className="max-container padding-x pt-32">
        <div className="my-5 flex items-center gap-2">
          <Select
            options={dateAscendingOptions}
            handleSelect={handleDateSortSelect}
            defaultValue={isDateAscending}
          />
          <button
            className="flex gap-1 items-center px-2 py-1 rounded-lg border-[1px] lg:hidden shrink-0 text-sm"
            onClick={handleFilterSidebarOpen}
          >
            <FaFilter />
            <p>篩選內容</p>
          </button>
          <SearchInput
            label="PO文"
            handleChange={(e) => handleSearchPostByInput(e)}
          >
            <FaBook />
          </SearchInput>
        </div>
        <div className="flex flex-center items-start gap-5">
          <main className="flex flex-col justify-start gap-4 w-full">
            {posts.length === 0 ? (
              <EmptyBlock />
            ) : (
              posts.map((post) => {
                return (
                  <Card
                    key={post.slug}
                    author_image={authorToImageMap[post.author]}
                    {...post}
                  />
                );
              })
            )}
          </main>
          <FilterSidebar
            area={area}
            targetCategories={targetCategories}
            targetSubcategories={targetSubcategories}
            targetTags={targetTags}
            handleFilterArea={handleFilterArea}
            handleReset={handleReset}
            handleAreaOptionsByInput={handleAreaOptionsByInput}
            notFoundCategories={notFoundCategories}
            notFoundSubcategories={notFoundSubcategories}
            notFoundTags={notFoundTags}
            categoryOptions={categoryOptions}
            subcategoryOptions={subcategoryOptions}
            tagOptions={tagOptions}
            handleCategorySelect={handleCategorySelect}
            handleSubcategorySelect={handleSubcategorySelect}
            handleTagSelect={handleTagSelect}
          />
          <FilterSidebarSm
            area={area}
            targetCategories={targetCategories}
            targetSubcategories={targetSubcategories}
            targetTags={targetTags}
            handleFilterArea={handleFilterArea}
            handleReset={handleReset}
            handleAreaOptionsByInput={handleAreaOptionsByInput}
            notFoundCategories={notFoundCategories}
            notFoundSubcategories={notFoundSubcategories}
            notFoundTags={notFoundTags}
            categoryOptions={categoryOptions}
            subcategoryOptions={subcategoryOptions}
            tagOptions={tagOptions}
            handleCategorySelect={handleCategorySelect}
            handleSubcategorySelect={handleSubcategorySelect}
            handleTagSelect={handleTagSelect}
            isFilterSidebarOpen={isFilterSidebarOpen}
            handleFilterSidebarOpen={handleFilterSidebarOpen}
          />
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
