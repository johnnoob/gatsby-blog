import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import RecentPosts from "../components/RecentPosts";
import Footer from "../components/Footer";

const IndexPage = () => {
  return (
    <main>
      <Navbar />
      <Introduction />
      <Hero />
      <RecentPosts />
      <Footer />
    </main>
  );
};

export default IndexPage;
