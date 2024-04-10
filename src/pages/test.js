import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const TestPage = () => {
  return (
    <div className="bg-green-100 p-10">
      <StaticImage src="../images/person1.png" />
    </div>
  );
};

export default TestPage;
