import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const IndexPage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <section>Category</section>
      <section>Post</section>
      <section>Footer</section>
    </main>
  );
};

export default IndexPage;
