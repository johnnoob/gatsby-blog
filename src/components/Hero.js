import React from "react";
import Button from "./Button";
import { BsArrowRightCircleFill, BsCalendar4Week } from "react-icons/bs";
import { StaticImage } from "gatsby-plugin-image";

const Hero = () => {
  return (
    <section id="hero" className="section mt-14 max-md:mt-6 ">
      <div className="hero-section-container">
        <div className="relative shadow-md max-md:shadow-none bg-orange-100 flex justify-between rounded-lg gap-3  max-md:flex-col-reverse max-md:justify-center max-md:w-full max-md:pb-3 max-md:rounded-none">
          <div className="rounded-xl w-3/5 px-8 md:py-8 max-md:w-full max-md:px-3">
            <div className="my-2 flex items-center gap-3 max-md:my-1">
              <div className="py-2 px-3 bg-orange-300 rounded-md font-semibold">
                Javascript
              </div>
              <div className="flex justify-center items-center gap-1">
                <BsCalendar4Week className="text-gray-600 text-lg" />
                <p className="text-gray-600 text-md">
                  March 29, 2022 | 最新文章
                </p>
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-normal max-md:text-xl">
              Javascript科技新知你知不知，很好玩喔！
            </h1>
            <p className="text-lg leading-normal text-ornage-600 mt-3 max-md:mt-2 max-md:text-base">
              JavaScript
              是一種腳本，也能稱它為程式語言，可以讓你在網頁中實現出複雜的功能。當網頁不只呈現靜態的內容，另外提供了像是：內容即時更新、地圖交動...
            </p>
            <div className="max-md:flex max-md:my-4 my-5">
              <Button
                label="閱讀更多"
                icon={<BsArrowRightCircleFill size={20} isIconRight={false} />}
              />
            </div>
          </div>
          <div className="overflow-hidden md:translate-y-[-50px] md:translate-x-[-30px] md:rounded-lg md:shadow-md max-md:w-full">
            <StaticImage
              src="../images/travel.jpg"
              className="h-full w-[300px] max-md:h-[200px] max-md:w-full"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
