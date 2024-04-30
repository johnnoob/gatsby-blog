import React, { useState, useEffect } from "react";
import Layout from "../../components/layout.js";
import Seo from "../../components/Seo.js";
import { graphql, Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXProviderComponents } from "../../components/MDXProviderComponents.js";
import { FaBookmark } from "react-icons/fa6";
import { BsCalendar4Week } from "react-icons/bs";
import { NavBarLg, NavBarSm } from "../../components/postPage/index.js";

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
      <section className="pt-[80px] padding-x">
        <div className="mx-auto max-w-[740px]">
          <h1 className="text-4xl text-center font-bold leading-normal">
            {pageTitle}
          </h1>
          <div className="my-4 flex flex-col gap-5">
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
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <Link
                  to={`/blog`}
                  state={{ selectedTag: tag }}
                  className="px-3 py-1 font-light text-sm bg-slate-200 capitalize rounded-3xl border-[1px] hover:border-black"
                >
                  {`#${tag}`}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div className="max-w-[1440px] mx-auto">
            <NavBarLg contents={contents} />
            <article className="max-w-[740px] mx-auto">
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
        <NavBarSm
          contents={contents}
          isOpenSideBar={isOpenSideBar}
          handleOpenSideBar={handleOpenSideBar}
        />
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
