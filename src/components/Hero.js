import React from "react";
import Button from "./Button";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { StaticImage } from "gatsby-plugin-image";

const Hero = () => {
  return (
    <section id="hero" className="pt-40 w-full max-md:pt-24">
      <div className="relative shadow-md mx-auto md:max-w-4xl bg-blue-100 flex justify-between rounded-lg gap-3  max-md:flex-col-reverse max-md:justify-center max-md:w-full">
        <div className="rounded-xl w-3/5 px-8 md:py-2 max-md:w-full">
          <p className="my-2">
            <span className="py-2 px-3 bg-blue-300 rounded-md font-semibold">
              Javascript
            </span>{" "}
            March 29, 2022
          </p>
          <h1 className="text-4xl font-bold leading-normal max-md:text-3xl">
            Javascript科技新知你知不知，很好玩喔！
          </h1>
          <p className="text-lg leading-normal text-gray-600 mt-3 max-md:mt-2 max-md:text-base">
            JavaScript
            是一種腳本，也能稱它為程式語言，可以讓你在網頁中實現出複雜的功能。當網頁不只呈現靜態的內容，另外提供了像是：內容即時更新、地圖交動...
          </p>
          <div className="max-md:flex max-md:justify-center max-md:my-4 my-5">
            <Button
              label="瞭解更多"
              icon={<BsArrowRightCircleFill size={20} isIconRight={false} />}
            />
          </div>
        </div>
        <div className="overflow-hidden md:translate-y-[-50px] md:translate-x-[-30px] md:rounded-lg md:shadow-md max-md:w-full">
          <StaticImage
            src="../images/clifford.jpg"
            className="h-full w-[300px] max-md:h-[200px] max-md:w-full"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
