import React from "react";
import Layout from "../../components/layout.js";
import Seo from "../../components/Seo.js";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { FaListUl } from "react-icons/fa6";
import { useState } from "react";

const h1 = (props) => <h1 className=" text-2xl leading-normal" {...props} />;
const p = (props) => (
  <p className=" leading-relaxed font-light text-lg" {...props} />
);

const components = {
  h1: h1,
  p: p,
};

const BlogPost = ({ data, children }) => {
  const [isExpand, setIsExpand] = useState(true);
  const handleExpandClick = () => {
    setIsExpand(!isExpand);
    console.log("Hello World");
  };
  return (
    <Layout>
      <section className="pt-32">
        <section className="flex justify-center items-start max-md:flex-col text-gray-500">
          <aside className="flex flex-col items-start gap-3 px-5 text-base py-2 bg-white text-gray-700 sticky top-0">
            <button
              className="flex gap-[5px] px-3 py-2 hover:bg-gray-100 rounded-xl"
              onClick={handleExpandClick}
            >
              <FaListUl className="text-lg mt-1" />
              <div>目錄</div>
            </button>
            <div
              className={`w-72 pl-[20px] text-base ${isExpand ? "" : "hidden"}`}
            >
              <ul className="flex flex-col text-gray-500">
                <li className="pl-[14px] border-l-[1px] border-gray-300 hover:border-orange-500 hover:text-orange-500 py-2">
                  <div className>
                    SORA引起translate-SORA引起translate-SORA引起translate-
                    SORA引起translate- SORA引起translate- SORA引起translate-
                    SORA引起translate- SORA引起translate- SORA引起translate-
                  </div>
                </li>
                <li className="pl-[14px] border-l-[1px] border-gray-300 hover:border-orange-500 hover:text-orange-500 py-2">
                  <div className>SORA引起translate</div>
                </li>
                <li className="pl-[14px] border-l-[1px] border-gray-300 hover:border-orange-500 hover:text-orange-500 py-2">
                  <div className>SORA引起translate</div>
                </li>
              </ul>
            </div>
          </aside>
          <article className="flex-1 max-w-4xl">
            <MDXProvider components={components}>{children}</MDXProvider>
          </article>
        </section>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date
        title
      }
    }
  }
`;

export const Head = () => <Seo title="Blog Post" />;

export default BlogPost;
