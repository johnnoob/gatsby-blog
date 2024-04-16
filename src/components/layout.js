import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, isBlogPost }) => {
  return (
    <>
      <Navbar isBlogPost={isBlogPost} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
