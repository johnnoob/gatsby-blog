import React, { useState, useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { navlinks } from "../constants/link";
import Button from "./Button";
import { BsEnvelope, BsList } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";

const Navbar = ({ isBlogPost }) => {
  const navbarRef = useRef(null); // 偵測頁面瀏覽進度
  const navProgressRef = useRef(null); // 進度條監控
  const navBreakpointsRef = useRef([]);
  const navPointerRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isShowProgress, setIsShowProgress] = useState(false);
  const [h1Infos, setH1Infos] = useState([]);
  const [h1ProgressInfos, setH1ProgressInfos] = useState([]);
  const [isOpenSideBar, setIsOpenSidebar] = useState(false);
  const [progress, setProgress] = useState({
    x: 0,
    widthRatio: 0,
    wisdth: 0,
  });

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
          Math.round(((scrollY + windowHeight) / pageHeight) * 10000) / 10000;
        const scrollProgressWidth = navbarWidth * scrollRatio;
        setProgressWidth(scrollProgressWidth);
      },
      []
    );
  });
  useEffect(() => {
    if (!isBlogPost) return;
    const getH1Infos = () => {
      const h1Nodes = document.querySelectorAll("article h1");
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const h1Titles = Array.apply(null, h1Nodes);
      const h1Infos = h1Titles.map((h1) => {
        const h1TopRatio =
          Math.round(
            ((h1.offsetTop + windowHeight - h1.offsetHeight) / pageHeight) *
              10000
          ) / 10000;
        return {
          text: h1.innerText,
          id: h1.id,
          topRatio: h1TopRatio,
          isBreakpointColliding: false,
        };
      });
      setH1Infos(h1Infos);
    };
    getH1Infos();
    window.addEventListener("resize", () => getH1Infos());
    return window.removeEventListener("resize", () => getH1Infos());
  }, []);

  useEffect(() => {
    const isColliding = (elem1, elem2) => {
      const rect1 = elem1.getBoundingClientRect();
      const rect2 = elem2.getBoundingClientRect();
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    };

    const detectColliding = (pointerRef, breakpointsRef) => {
      const h1InfosCopy = h1Infos.slice();
      console.log(h1Infos);

      breakpointsRef.current.forEach((breakpoint) => {
        const breakpointId = breakpoint.id;
        const targetH1Index = h1InfosCopy.findIndex((elem) => {
          return elem.id === breakpointId;
        });
        if (isColliding(pointerRef.current, breakpoint)) {
          // console.log("碰撞", breakpoint);
          h1InfosCopy[targetH1Index] = {
            ...h1InfosCopy[targetH1Index],
            isBreakpointColliding: true,
          };
        } else {
          // console.log("沒碰撞", breakpoint);
          h1InfosCopy[targetH1Index] = {
            ...h1InfosCopy[targetH1Index],
            isBreakpointColliding: false,
          };
        }
      });
      setH1ProgressInfos(h1InfosCopy);
    };

    const setProgressPosition = (e) => {
      if (!e.target) return;
      const widthRatio =
        Math.round((e.clientX / navProgressRef.current.offsetWidth) * 10000) /
        10000;
      setProgress({ x: e.clientX, widthRatio: widthRatio });
    };

    const pointerMoveHandler = (e) => {
      setProgressPosition(e);
      detectColliding(navPointerRef, navBreakpointsRef);
    };

    navProgressRef.current.addEventListener("pointerdown", (e) => {
      navProgressRef.current.setPointerCapture(e.pointerId);
      // setProgressPosition(e);
      // detectColliding(navPointerRef, navBreakpointsRef);
      pointerMoveHandler(e);
      navProgressRef.current.addEventListener(
        "pointermove",
        pointerMoveHandler
      );
      navProgressRef.current.addEventListener(
        "pointerup",
        (e) => {
          const pageHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;
          const widthRatio =
            Math.round(
              (e.clientX / navProgressRef.current.offsetWidth) * 10000
            ) / 10000;
          window.scrollTo({
            top: widthRatio * pageHeight - windowHeight,
            left: 0,
            behavior: "smooth",
          });
          navProgressRef.current.removeEventListener(
            "pointermove",
            pointerMoveHandler
          );
        },
        { once: true }
      );
    });
  }, [navPointerRef, navBreakpointsRef, navProgressRef, h1Infos]);

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
          ref={navProgressRef}
          className={`relative transition-all touch-none ${
            isShowProgress ? "bg-blue-200" : "bg-transparent"
          }`}
          style={{ height: 4 }}
        >
          <div
            className={`${
              isShowProgress ? "bg-blue-500" : "bg-transparent"
            } z-10`}
            style={{ width: progressWidth, height: 4 }}
          ></div>
          <div
            ref={navPointerRef}
            className="absolute top-0 w-5 h-5 bg-blue-500 rounded-full"
            style={{ left: progress.x }}
          ></div>
          <ul>
            {h1ProgressInfos.map(
              ({ text, id, topRatio, isBreakpointColliding }) => {
                return (
                  <li
                    ref={(node) => {
                      if (node) {
                        if (navBreakpointsRef.current.includes(node)) {
                          return;
                        } else {
                          navBreakpointsRef.current.push(node);
                        }
                      }
                    }}
                    id={id}
                    key={id}
                    className="absolute group"
                    style={{ top: 0, left: `${topRatio * 100}%` }}
                  >
                    <div className="bg-blue-200 w-1 h-4  mb-2 "></div>
                    <p
                      className={`rounded-lg bg-gray-100 -translate-x-1/2 px-2 py-1 ${
                        isBreakpointColliding ? "block" : "hidden"
                      }`}
                    >
                      {text}
                    </p>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Navbar;
