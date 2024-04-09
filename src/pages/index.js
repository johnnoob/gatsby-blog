import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import RecentPosts from "../components/RecentPosts";
import Footer from "../components/Footer";
import Layout from "../components/layout";
import Seo from "../components/Seo";

const IndexPage = () => {
  console.log(__dirname);
  return (
    <Layout>
      <section>
        <Introduction />
      </section>
      {/* <section className="padding-x">
        <Hero />
      </section> */}
      <section className="padding-x py-6 max-container">
        <RecentPosts />
      </section>
    </Layout>
  );
};

export const Head = () => <Seo title="首頁" />;

export default IndexPage;
