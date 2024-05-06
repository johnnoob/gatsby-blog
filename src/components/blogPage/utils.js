import { useState, useEffect, useCallback } from "react";

const isArraySubset = (subset, superset) => {
  return subset.some((element) => superset.includes(element));
};

export const useFilterSelect = (initialValue) => {
  const [targetFilters, setTargetFilters] = useState(initialValue);
  const handleFilterSelect = (e) => {
    const targetFilter = e.target.value;
    if (targetFilters.includes(targetFilter)) {
      setTargetFilters((prevTargetFilters) =>
        prevTargetFilters.filter((filter) => filter !== targetFilter)
      );
    } else {
      setTargetFilters((prevTargetFilters) => [
        ...prevTargetFilters,
        targetFilter,
      ]);
    }
  };
  return [targetFilters, setTargetFilters, handleFilterSelect];
};

export const useNotFoundItems = (
  posts,
  targetCategories,
  targetSubcategories,
  targetTags,
  allTags,
  allPosts,
  categoryToNumOfPostsMap,
  subcategoryToNumOfPostsMap
) => {
  const generateFilteredPostsObject = (filteredPosts) => {
    return filteredPosts.reduce(
      (acc, post) => {
        acc.categories.add(post.category);
        acc.subcategories.add(post.subcategory);
        acc.tags.push(...post.tags);
        return acc;
      },
      {
        categories: new Set(),
        subcategories: new Set(),
        tags: [],
      }
    );
  };

  const notFoundGenerator = useCallback(
    (filterType) => {
      let filteredPostsTest;
      if (filterType === "tags") {
        filteredPostsTest = allPosts.filter((post) => {
          if (targetCategories.length === 0) return true;
          return targetCategories.includes(post.category);
        });
        filteredPostsTest = filteredPostsTest.filter((post) => {
          if (targetSubcategories.length === 0) return true;
          return targetSubcategories.includes(post.subcategory);
        });
        const filteredPostsObject =
          generateFilteredPostsObject(filteredPostsTest);
        return allTags.filter((tag) => !filteredPostsObject.tags.includes(tag));
      } else if (filterType === "categories") {
        filteredPostsTest = allPosts.filter((post) => {
          if (targetSubcategories.length === 0) return true;
          return targetSubcategories.includes(post.subcategory);
        });
        filteredPostsTest = filteredPostsTest.filter((post) => {
          if (targetTags.length === 0) return true;
          return isArraySubset(targetTags, post.tags);
        });
        const filteredPostsObject =
          generateFilteredPostsObject(filteredPostsTest);
        return Object.keys(categoryToNumOfPostsMap).filter(
          (category) => !filteredPostsObject.categories.has(category)
        );
      } else {
        filteredPostsTest = allPosts.filter((post) => {
          if (targetCategories.length === 0) return true;
          return targetCategories.includes(post.category);
        });
        filteredPostsTest = filteredPostsTest.filter((post) => {
          if (targetTags.length === 0) return true;
          return isArraySubset(targetTags, post.tags);
        });
        const filteredPostsObject =
          generateFilteredPostsObject(filteredPostsTest);
        return Object.keys(subcategoryToNumOfPostsMap).filter(
          (subcategory) => !filteredPostsObject.subcategories.has(subcategory)
        );
      }
    },
    [
      allPosts,
      allTags,
      targetCategories,
      targetSubcategories,
      targetTags,
      categoryToNumOfPostsMap,
      subcategoryToNumOfPostsMap,
    ]
  );

  const [notFoundCategories, setNotFoundCategories] = useState([]);
  const [notFoundSubcategories, setNotFoundSubcategories] = useState([]);
  const [notFoundTags, setNotFoundTags] = useState([]);

  useEffect(() => {
    setNotFoundCategories(notFoundGenerator("categories"));
    setNotFoundSubcategories(notFoundGenerator("subcategories"));
    setNotFoundTags(notFoundGenerator("tags"));
  }, [
    posts,
    targetCategories,
    targetSubcategories,
    targetTags,
    allPosts,
    allTags,
    categoryToNumOfPostsMap,
    subcategoryToNumOfPostsMap,
    notFoundGenerator,
  ]);

  return { notFoundCategories, notFoundSubcategories, notFoundTags };
};

export const useFilteredAndSortedPosts = (
  allPosts,
  targetCategories,
  targetSubcategories,
  targetTags,
  isDateAscending,
  searchInput
) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let filteredPosts = allPosts.filter((post) => {
      if (targetCategories.length === 0) return true;
      return targetCategories.includes(post.category);
    });

    filteredPosts = filteredPosts.filter((post) => {
      if (targetSubcategories.length === 0) return true;
      return targetSubcategories.includes(post.subcategory);
    });

    filteredPosts = filteredPosts.filter((post) => {
      if (targetTags.length === 0) return true;
      return isArraySubset(targetTags, post.tags);
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (isDateAscending) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    const searchedPosts = sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setPosts(searchedPosts);
  }, [
    allPosts,
    targetCategories,
    targetSubcategories,
    targetTags,
    isDateAscending,
    searchInput,
  ]);

  return posts;
};
