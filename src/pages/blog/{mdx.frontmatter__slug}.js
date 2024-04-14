import React, { useRef, useEffect } from "react";
import Layout from "../../components/layout.js";
import Seo from "../../components/Seo.js";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BsListTask, BsFillTagFill } from "react-icons/bs";
import { useState } from "react";
import { MDXProviderComponents } from "../../components/MDXProviderComponents.js";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import Button from "../../components/Button.js";

const BlogPost = ({ data, children }) => {
  const { date, slug, tags, hero_image } = data.mdx.frontmatter;
  // const { items: contents } = data.mdx.tableOfContents;
  const heroImage = getImage(hero_image.childrenImageSharp[0]);
  const { items: contents } = data.mdx.tableOfContents;

  let initialIsOpenMap = {};
  contents.forEach((_, index) => {
    initialIsOpenMap[index] = false;
  });

  const [isOpenMap, setIsOpenMap] = useState(initialIsOpenMap);
  // const [current]
  const handleH1Open = (index) => {
    setIsOpenMap((isOpenMap) => ({ ...isOpenMap, [index]: !isOpenMap[index] }));
  };

  const contentsRef = useRef(null);
  function getMap() {
    if (!contentsRef.current) {
      // Initialize the Map on first usage.
      contentsRef.current = new Map();
    }
    return contentsRef.current;
  }
  // function scrollToId(itemId) {
  //   const map = getMap();
  //   const node = map.get(itemId);
  //   node.scrollIntoView({
  //     behavior: "smooth",
  //     block: "nearest",
  //     inline: "center",
  //   });
  // }
  console.log(contentsRef);

  return (
    <Layout>
      <section className="pt-40 post-max-container">
        <section className="padding-r flex justify-start items-start gap-10 max-lg:flex-col max-lg:padding-l">
          <aside className="flex flex-col items-start gap-3 text-base sticky max-lg:relative top-0 basis-[300px]">
            <div className={`text-base`}>
              <div className="relative flex justify-center mb-4">
                <div className="flex justify-center items-center px-[20px] gap-1 bg-white">
                  <BsListTask size={20} />
                  <h4 className=" tracking-wider">目錄</h4>
                </div>
                <div className="absolute top-1/2 h-[2px] w-full bg-black -translate-y-1/2 -z-10"></div>
              </div>
              <ul className="flex flex-col text-gray-500">
                {contents.map((content, index) => {
                  const { title: h1, url: h1Url, items: h2s = [] } = content;
                  return (
                    <li key={h1} className="border-gray-300 py-1">
                      <div className="flex justify-start items-center gap-2 pb-1">
                        {h2s && (
                          <button onClick={() => handleH1Open(index)}>
                            {isOpenMap[index] ? (
                              <FaAngleDown size={15} />
                            ) : (
                              <FaAngleRight size={15} />
                            )}
                          </button>
                        )}
                        <a
                          href={h1Url}
                          ref={(node) => {
                            const map = getMap();
                            if (node) {
                              map.set(index, node);
                            } else {
                              map.delete(index);
                            }
                          }}
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
                                } ml-[7px] pl-[16px] py-[2px] border-l-[1px] border-slate-300 hover:border-black hover:text-black`}
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
                <Link to="/" className="px-3 py-1 bg-slate-200 rounded-md">
                  AI
                </Link>
                <Link className="px-3 py-1 bg-slate-200 rounded-md">
                  Python
                </Link>
                <Link className="px-3 py-1 bg-slate-200 rounded-md">
                  Javascript
                </Link>
                <Link className="px-3 py-1 bg-slate-200 rounded-md">旅遊</Link>
                <Link to="/" className="px-3 py-1 bg-slate-200 rounded-md">
                  AI
                </Link>
                <Link className="px-3 py-1 bg-slate-200 rounded-md">
                  asasddasda
                </Link>
                <Link className="px-3 py-1 bg-slate-200 rounded-md">zxczx</Link>
                <Link className="px-3 py-1 bg-slate-200 rounded-md">asd</Link>
                <Link className="px-3 py-1 bg-slate-200 rounded-md">
                  asdasdasda
                </Link>
              </div>
            </div>
          </aside>
          <article className="flex-1">
            <MDXProvider components={MDXProviderComponents}>
              {children}
            </MDXProvider>
          </article>
        </section>
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
        tags
      }
    }
  }
`;

export const Head = () => <Seo title="Blog Post" />;

export default BlogPost;
