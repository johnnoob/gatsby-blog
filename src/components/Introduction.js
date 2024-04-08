import React from "react";
import Button from "./Button";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

const Introduction = () => {
  return (
    <section
      id="introduction"
      className=" bg-black text-white flex justify-between items-center max-lg:flex-col-reverse gap-4"
    >
      <div className="flex flex-col justify-center gap-14 padding-y padding-l max-lg:padding-r">
        <div className="flex flex-col justify-center items-start">
          <div className="mb-2">
            <span>最新文章</span> | March 29, 2022
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-semibold mb-3">
              Javascript科技新知你知不知，很好玩喔！
            </h1>
            <p className="text-gray-300">
              JavaScript
              是一種腳本，也能稱它為程式語言，可以讓你在網頁中實現出複雜的功能。當網頁不只呈現靜態的內容，另外提供了像是：內容即時更新、地圖交動...
            </p>
          </div>
          <Button label="閱讀更多" />
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <StaticImage src="../images/person1.png" alt="writer" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">Written by</p>
            <h4 className="text-sm">David Vanguard</h4>
          </div>
        </div>
      </div>
      <div className=" h-[300px] bg-red-500">
        <StaticImage
          src="../images/me.jpg"
          alt="latest"
          style={{ objectFit: "cover" }}
          width={300}
        />
      </div>
    </section>
  );
};

export default Introduction;
