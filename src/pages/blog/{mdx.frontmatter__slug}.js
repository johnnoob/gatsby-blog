import React, { useState, useEffect } from "react";
import Layout from "../../components/layout.js";
import Seo from "../../components/Seo.js";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXProviderComponents } from "../../components/MDXProviderComponents.js";
import {
  FaAngleRight,
  FaAngleDown,
  FaBookmark,
  FaXmark,
} from "react-icons/fa6";
import { BsCalendar4Week } from "react-icons/bs";
import useScrollIntersect from "../../customHooks.js/useScrollIntersect.js";

const BlogPost = ({ data, children }) => {
  const {
    title: pageTitle,
    date,
    slug,
    tags,
    author: authorName,
  } = data.mdx.frontmatter;
  const authors = data.allContentfulAuthor.nodes;
  const { items: contents } = data.mdx.tableOfContents;
  const author = authors.find((author) => author.name === authorName);
  const authorImage = getImage(author.image);
  const { isOpenMap, isIntersectingMap, handleH1Open } =
    useScrollIntersect(contents);

  const handleScrolltoTitle = (url) => {
    const scrollToTitle = (url) => {
      const title = document.querySelector(`article ${url}`);
      if (title) {
        window.scrollTo({
          top: title.offsetTop - title.offsetHeight - 10,
          behavior: "smooth",
        });
      }
    };
    scrollToTitle(url);
  };

  // 收合bookmark功能
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScroll, setLastScroll] = useState(0);
  const [isOpenSideBar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        setScrollDirection(null);
        return;
      }
      const newDirection =
        currentScroll > lastScroll ? "scroll-down" : "scroll-up";
      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, scrollDirection]);

  const handleOpenSideBar = () => {
    setIsOpenSidebar(!isOpenSideBar);
  };

  return (
    <Layout isBlogPost={true}>
      <section className="pt-[80px] post-max-container padding-x">
        <div className="mx-auto max-w-[700px]">
          <h1 className="text-4xl text-center font-bold leading-normal">
            {pageTitle}
          </h1>
          <div className="flex justify-center items-center py-7 gap-8 max-lg:flex-col max-lg:justify-start max-lg:items-center max-lg:gap-2">
            <div className="flex justify-center gap-5">
              <div className="flex items-center gap-2">
                <GatsbyImage
                  image={authorImage}
                  className="w-[35px] h-[35px] rounded-full"
                />
                <p>{author.name}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <BsCalendar4Week size={20} />
                <p>{date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Link
                  to={`/${tag}`}
                  className="px-3 py-1 font-light text-sm bg-slate-200 capitalize rounded-3xl border-[1px] hover:border-black"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-start items-start gap-14 max-lg:flex-col max-lg:gap-1">
            {/* 大螢幕版sidebar */}
            <aside className="sticky flex-shrink-0 top-[100px] basis-[250px] max-lg:w-full max-lg:relative max-lg:top-0 max-lg:basis-auto max-lg:hidden">
              <div>
                <div className="flex mb-4">
                  <div className="flex justify-start items-center gap-2 bg-white">
                    <FaBookmark size={18} />
                    <h4 className="font-bold text-lg">內容目錄</h4>
                  </div>
                </div>
                <ul className="flex flex-col">
                  {contents.map((content, index) => {
                    const {
                      title: h1,
                      url: h1Url,
                      items: h2s = null,
                    } = content;
                    return (
                      <li key={h1} className="py-1">
                        <div className="flex justify-start items-center gap-2 pb-1">
                          {h2s ? (
                            <button onClick={() => handleH1Open(index)}>
                              {isOpenMap[index] ? (
                                <FaAngleDown size={15} />
                              ) : (
                                <FaAngleRight size={15} />
                              )}
                            </button>
                          ) : (
                            <div className="w-[15px] h-[15px] flex-shrink-0"></div>
                          )}
                          <button
                            className={`${
                              isIntersectingMap && isIntersectingMap[h1Url]
                                ? "text-blue-300"
                                : "text-black"
                            }`}
                            onClick={() => handleScrolltoTitle(h1Url)}
                          >
                            {h1}
                          </button>
                        </div>
                        {h2s && (
                          <ul className="">
                            {h2s.map(({ title: h2, url: h2Url }) => {
                              return (
                                <li
                                  key={h2}
                                  className={`${
                                    isOpenMap[index] ? "" : "hidden"
                                  } ${
                                    isIntersectingMap &&
                                    isIntersectingMap[h2Url]
                                      ? "text-blue-300 border-blue-300"
                                      : "text-gray-p border-slate-300"
                                  } ml-[7px] pl-[16px] py-[2px] border-l-[1px] `}
                                >
                                  <button
                                    href={h2Url}
                                    onClick={() => handleScrolltoTitle(h2Url)}
                                  >
                                    {h2}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
            <article className="w-full">
              <MDXProvider components={MDXProviderComponents}>
                {children}
              </MDXProvider>
            </article>
          </div>
          <button
            className={`fixed transition-all w-10 h-10 top-[90%] left-[50%] rounded-full -translate-x-1/2 bg-black lg:hidden ${scrollDirection}`}
            onClick={handleOpenSideBar}
          >
            <FaBookmark size={18} className="mx-auto text-white" />
          </button>
        </div>
        {/* 小螢幕版sidebar */}
        <aside
          className={`fixed top-0 left-0 w-screen h-screen bg-white z-10 transition-all ${
            isOpenSideBar || "translate-y-full"
          }`}
        >
          <button
            className="absolute top-[5%] right-[10%]"
            onClick={handleOpenSideBar}
          >
            <FaXmark size={40} />
          </button>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3">
            <div className="flex justify-start items-center gap-2 bg-white">
              <FaBookmark size={25} />
              <h4 className="font-bold text-2xl">內容目錄</h4>
            </div>
            <ul className="flex flex-col text-lg">
              {contents.map((content, index) => {
                const { title: h1, url: h1Url, items: h2s = null } = content;
                return (
                  <li key={h1} className="py-1">
                    <div className="flex justify-start items-center gap-2 pb-1">
                      {h2s ? (
                        <button onClick={() => handleH1Open(index)}>
                          {isOpenMap[index] ? (
                            <FaAngleDown size={15} />
                          ) : (
                            <FaAngleRight size={15} />
                          )}
                        </button>
                      ) : (
                        <div className="w-[15px] h-[15px] flex-shrink-0"></div>
                      )}
                      <button
                        className={`${
                          isIntersectingMap && isIntersectingMap[h1Url]
                            ? "text-blue-300"
                            : "text-black"
                        }`}
                        onClick={() => {
                          handleScrolltoTitle(h1Url);
                          handleOpenSideBar();
                        }}
                      >
                        {h1}
                      </button>
                    </div>
                    {h2s && (
                      <ul className="">
                        {h2s.map(({ title: h2, url: h2Url }) => {
                          return (
                            <li
                              key={h2}
                              className={`${isOpenMap[index] ? "" : "hidden"} ${
                                isIntersectingMap && isIntersectingMap[h2Url]
                                  ? "text-blue-300 border-blue-300"
                                  : "text-gray-p border-slate-300"
                              } ml-[7px] pl-[16px] py-[2px] border-l-[1px] `}
                            >
                              <button
                                onClick={() => {
                                  handleScrolltoTitle(h2Url);
                                  handleOpenSideBar();
                                }}
                              >
                                {h2}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      tableOfContents(maxDepth: 2)
      frontmatter {
        date(formatString: "MMMM D, Y")
        slug
        hero_image {
          childrenImageSharp {
            gatsbyImageData
          }
        }
        author
        title
        tags
      }
    }
    allContentfulAuthor {
      nodes {
        name
        description {
          description
        }
        image {
          gatsbyImageData
        }
      }
    }
  }
`;

export const Head = () => <Seo title="Blog Post" />;

export default BlogPost;
