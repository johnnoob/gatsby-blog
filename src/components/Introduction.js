import React from "react";
import Button from "./Button";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

const Introduction = () => {
  return (
    <section
      id="introduction"
      className="max-container bg-slate-300 flex justify-center"
    >
      <div className="flex flex-col gap-14">
        <div className="flex flex-col justify-center items-start">
          <div>
            <span>最新文章</span> | March 29, 2022
          </div>
          <div>
            <h1>Javascript科技新知你知不知，很好玩喔！</h1>
            <p>
              JavaScript
              是一種腳本，也能稱它為程式語言，可以讓你在網頁中實現出複雜的功能。當網頁不只呈現靜態的內容，另外提供了像是：內容即時更新、地圖交動...
            </p>
          </div>
          <Button label="閱讀更多" />
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <StaticImage src="../images/person1.png" alt="writer" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-600">Written by</p>
            <h4 className="">陳彥樺</h4>
          </div>
        </div>
      </div>
      <div>
        <StaticImage src="../images/1.jpg" alt="latest" />
      </div>
    </section>
  );
};

export default Introduction;
