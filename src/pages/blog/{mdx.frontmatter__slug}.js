import React, { useEffect, useState } from "react";
import Layout from "../../components/layout.js";
import Seo from "../../components/Seo.js";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BsListTask, BsFillTagFill } from "react-icons/bs";
import { MDXProviderComponents } from "../../components/MDXProviderComponents.js";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { BsCalendar4Week } from "react-icons/bs";
import authors from "../../constants/authors.js";

const BlogPost = ({ data, children }) => {
  const {
    title: pageTitle,
    date,
    slug,
    tags,
    hero_image,
    author: authorName,
  } = data.mdx.frontmatter;
  const authors = data.allContentfulAuthor.nodes;

  const heroImage = getImage(hero_image.childrenImageSharp[0]);
  const { items: contents } = data.mdx.tableOfContents;
  const author = authors.find((author) => author.name === authorName);
  const authorImage = getImage(author.image);

  // title h1的開合功能
  const initialIsOpenMap = {};
  contents.forEach((_, index) => {
    initialIsOpenMap[index] = true;
  });
  const [isOpenMap, setIsOpenMap] = useState(initialIsOpenMap);
  const handleH1Open = (index) => {
    setIsOpenMap((isOpenMap) => ({ ...isOpenMap, [index]: !isOpenMap[index] }));
  };
  // title隨捲動頁面之intersect功能
  const [isIntersectingMap, setIsIntersectingMap] = useState();
  useEffect(() => {
    const titles = document.querySelectorAll("h1, h2");
    const initialIsIntersectingMap = {};
    titles.forEach((title) => {
      let titleId = title.id.toLowerCase();
      initialIsIntersectingMap[`#${titleId}`] = false;
    });
    // setIsIntersectingMap(initialIsIntersectingMap);
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 將id轉為小寫以跟url匹配
        const titleId = `#${entry.target.id.toLowerCase()}`;
        if (entry.isIntersecting) {
          setIsIntersectingMap((prevIsIntersectingMap) => {
            const prevIsIntersectingMapCopy = { ...prevIsIntersectingMap };
            // 將其他title的碰撞情形都設為false，只有最後碰撞到的title才為true
            const isIntersectingMapKeys = Object.keys(
              prevIsIntersectingMapCopy
            );
            isIntersectingMapKeys.forEach((key) => {
              prevIsIntersectingMapCopy[key] = false;
            });
            return { ...prevIsIntersectingMapCopy, [titleId]: true };
          });
        }
      },
      {
        root: null,
        // rootMargin為目標元素(預設為視窗)的上右下左，可用px或%表示
        rootMargin: "0px 0px -80% 0px",
        threshold: 1,
      }
    );
    titles.forEach((title) => {
      observer.observe(title);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout isBlogPost={true}>
      <section className="pt-[80px] post-max-container padding-x">
        <div className="w-full">
          <h1 className="text-4xl text-center font-bold leading-relaxed">
            {pageTitle}
          </h1>
          <div className="flex justify-center items-center py-7 gap-8">
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
            <div className="flex gap-2">
              {tags.map((tag) => (
                <Link
                  to={`/${tag}`}
                  className="px-3 py-1 bg-slate-200 rounded-md"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-start items-start gap-10 max-lg:flex-col max-lg:padding-l">
            <aside className="flex flex-col items-start gap-3 text-base sticky max-lg:relative top-[100px] basis-[250px] max-lg:w-full max-lg:top-0">
              <div className={`w-full`}>
                <div className="relative flex justify-center mb-4">
                  <div className="flex justify-center items-center px-[20px] gap-1 bg-white">
                    <BsListTask size={20} />
                    <h4 className="tracking-wider">目錄</h4>
                  </div>
                  <div className="absolute top-1/2 h-[2px] w-full bg-black -translate-y-1/2 -z-10"></div>
                </div>
                <ul className="flex flex-col text-gray-500">
                  {contents.map((content, index) => {
                    const {
                      title: h1,
                      url: h1Url,
                      items: h2s = null,
                    } = content;
                    return (
                      <li key={h1} className="border-gray-300 py-1">
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
                            <div className="w-[15px]"></div>
                          )}
                          <a
                            href={h1Url}
                            className={
                              isIntersectingMap && isIntersectingMap[h1Url]
                                ? "text-blue-300"
                                : "text-black"
                            }
                          >
                            {h1}
                          </a>
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
                                      ? "text-blue-300"
                                      : "text-black"
                                  } ml-[7px] pl-[16px] py-[2px] border-l-[1px] border-slate-300`}
                                >
                                  <a href={h2Url}>{h2}</a>
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
              <div className="w-full">
                <div className="relative flex justify-center mb-4">
                  <div className="flex justify-center items-center bg-white px-[20px] gap-1">
                    <BsFillTagFill size={20} />
                    <h4 className=" tracking-wider">文章標籤</h4>
                  </div>
                  <div className="absolute top-1/2 h-[2px] w-full bg-black -translate-y-1/2 -z-10"></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Link
                      to={`/${tag}`}
                      className="px-3 py-1 bg-slate-200 rounded-md"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
            <article className="flex-1">
              <MDXProvider components={MDXProviderComponents}>
                {children}
              </MDXProvider>
            </article>
          </div>
        </div>
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
