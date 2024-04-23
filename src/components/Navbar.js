import React, { useState, useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { navlinks } from "../constants/link";
import Button from "./Button";
import { BsEnvelope, BsList } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";

const Navbar = ({ isBlogPost }) => {
  // 自動收合Navbar功能
  // const [scrollDirection, setScrollDirection] = useState("");
  // const [lastScroll, setLastScroll] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScroll = window.scrollY;
  //     if (currentScroll <= 0) {
  //       setScrollDirection(null);
  //       return;
  //     }
  //     const newDirection =
  //       currentScroll > lastScroll ? "scroll-down" : "scroll-up";
  //     if (newDirection !== scrollDirection) {
  //       setScrollDirection(newDirection);
  //     }
  //     setLastScroll(currentScroll);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [scrollDirection, lastScroll]);
  const navbarRef = useRef(null); // 偵測頁面瀏覽進度
  const [progressWidth, setProgressWidth] = useState(0);
  const [isShowProgress, setIsShowProgress] = useState(false);
  const [h1Infos, setH1Infos] = useState([]);

  useEffect(() => {
    if (!isBlogPost) return;
    const navbarWidth = navbarRef.current.offsetWidth;
    const article = document.querySelector("article");
    const articleTop = article.offsetTop;
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        if (scrollY >= articleTop - 200) {
          setIsShowProgress(true);
        } else {
          setIsShowProgress(false);
        }
        const scrollRatio =
          Math.round(((scrollY + windowHeight) / pageHeight) * 100) / 100;
        const scrollProgressWidth = navbarWidth * scrollRatio;
        setProgressWidth(scrollProgressWidth);
      },
      []
    );
  });
  useEffect(() => {
    if (!isBlogPost) return;
    // const article = document.querySelector("article");
    const h1Nodes = document.querySelectorAll("article h1");
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const h1Titles = Array.apply(null, h1Nodes);
    const h1Infos = h1Titles.map((h1) => {
      const h1Top = h1.offsetTop;
      const h1TopRatio =
        Math.round(((h1Top + windowHeight - 80) / pageHeight) * 10000) / 10000;
      const h1Text = h1.innerText;
      const h1Id = h1.id;
      return { text: h1Text, id: h1Id, topRatio: h1TopRatio };
    });
    setH1Infos(h1Infos);
  }, []);

  const [isOpenSideBar, setIsOpenSidebar] = useState(false);
  const handleOpenSideBar = () => {
    setIsOpenSidebar(!isOpenSideBar);
  };

  return (
    <>
      <div
        className={`fixed h-screen w-screen bg-white z-20 transition-all ${
          isOpenSideBar || "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-[5%] right-[10%]"
          onClick={handleOpenSideBar}
        >
          <FaXmark size={40} />
        </button>
        <ul className="absolute w-full top-1/2 left-1/2 padding-x text-xl flex flex-col justify-between items-start gap-1 text-gray-p -translate-y-1/2 -translate-x-1/2">
          {navlinks.map((link) => {
            return (
              <>
                <li
                  key={link.href}
                  className="rounded-md px-3 py-2 hover:bg-gray-200 mx-auto"
                  onClick={handleOpenSideBar}
                >
                  <Link to={link.href}>{link.label}</Link>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <section className="fixed w-full z-10 bg-white shadow-sm" ref={navbarRef}>
        <header className={`max-container transition-all`}>
          <nav className="flex justify-between items-center py-3 padding-x mx-auto">
            <Link to="/">
              <StaticImage
                src="../images/Navbar/blog.png"
                alt="Blog Logo"
                width={100}
              />
            </Link>
            <div className="flex justify-between items-center gap-4 max-lg:hidden">
              <ul className="text-md flex justify-center items-center gap-1 text-gray-800">
                {navlinks.map((link, index) => {
                  return (
                    <>
                      <li
                        key={link.href}
                        className="rounded-md px-3 py-2 hover:bg-gray-200"
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </li>
                      {index === navlinks.length - 1 ? null : (
                        <div className="h-7 border-l-[1px]"></div>
                      )}
                    </>
                  );
                })}
              </ul>
              <Button
                icon={<BsEnvelope size={20} />}
                isIconRight={true}
                isBlack={true}
              >
                訂閱
              </Button>
            </div>
            <div className="lg:hidden">
              <button onClick={handleOpenSideBar}>
                <BsList size={35} />
              </button>
            </div>
          </nav>
        </header>
        <div
          className={`relative transition-all ${
            isShowProgress ? "bg-blue-200" : "bg-transparent"
          }`}
        >
          <div
            className={`${
              isShowProgress ? "bg-blue-500" : "bg-transparent"
            } z-10`}
            style={{ width: progressWidth, height: 4 }}
          ></div>
          <ul>
            {h1Infos.map(({ text, id, topRatio }) => {
              return (
                <li
                  className="absolute group"
                  style={{ top: 0, left: `${topRatio * 100}%` }}
                >
                  <div className="bg-blue-200 w-4 h-4 rounded-full mb-2 "></div>
                  <p className="rounded-lg bg-gray-100 -translate-x-1/2 px-2 py-1 hidden group-hover:block">
                    {text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Navbar;
