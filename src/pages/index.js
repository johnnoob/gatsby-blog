import React from "react";
import Introduction from "../components/Introduction";
import TopPosts from "../components/TopPostsModified";
import RecentPosts from "../components/RecentPosts";
import Layout from "../components/layout";
import Seo from "../components/Seo";

const IndexPage = () => {
  return (
    <Layout isBlogPost={false}>
      <section>
        <Introduction />
      </section>
      <section className="max-container padding-x py-6">
        <TopPosts />
      </section>
      <section className="max-container padding-x py-6 ">
        <RecentPosts />
      </section>
    </Layout>
  );
};

export const Head = () => <Seo title="首頁" />;

export default IndexPage;
