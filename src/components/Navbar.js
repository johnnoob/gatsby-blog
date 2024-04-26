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
  const [h1BreakpointInfos, setH1BreakpointInfos] = useState([]);
  const [isOpenSideBar, setIsOpenSidebar] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({
    x: 0,
    widthRatio: 0,
    width: 0,
  });
  const [isTouch, setIstouch] = useState(false);

  useEffect(() => {
    if (!isBlogPost) return;
    const handleScroll = () => {
      const navbarWidth = navbarRef.current.offsetWidth;
      const article = document.querySelector("article");
      const articleTop = article.offsetTop;
      const scrollY = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      if (scrollY >= articleTop - 200) {
        setIsShowProgress(true);
      } else {
        setIsShowProgress(false);
      }
      const scrollProgressRatio =
        Math.round(((scrollY + windowHeight) / pageHeight) * 10000) / 10000;
      const scrollProgressWidth = navbarWidth * scrollProgressRatio;
      setProgressWidth(scrollProgressWidth);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogPost]);

  useEffect(() => {
    if (!isBlogPost) return;
    const getH1Infos = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const h1Nodes = [...document.querySelectorAll("article h1")];
      const h1Infos = h1Nodes.map((h1Node) => {
        const h1TopToPageRatio =
          Math.round(
            ((h1Node.offsetTop + windowHeight - h1Node.offsetHeight) /
              pageHeight) *
              10000
          ) / 10000;
        return {
          text: h1Node.innerText,
          id: h1Node.id,
          topRatio: h1TopToPageRatio,
          isBreakpointColliding: false,
        };
      });
      setH1BreakpointInfos(h1Infos);
    };
    getH1Infos();
    window.addEventListener("resize", getH1Infos);
    return () => window.removeEventListener("resize", getH1Infos);
  }, [isBlogPost]);

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
      const h1BreakpointInfosCopy = h1BreakpointInfos.map((breakpointInfo) => {
        return { ...breakpointInfo, isBreakpointColliding: false };
      });
      breakpointsRef.current.forEach((breakpoint) => {
        const breakpointId = breakpoint.id;
        const targetH1Index = h1BreakpointInfosCopy.findIndex((h1) => {
          return h1.id === breakpointId;
        });
        h1BreakpointInfosCopy[targetH1Index] = {
          ...h1BreakpointInfosCopy[targetH1Index],
          isBreakpointColliding: isColliding(pointerRef.current, breakpoint),
        };
      });
      setH1BreakpointInfos(h1BreakpointInfosCopy);
    };

    const setPosition = (e) => {
      const widthRatio =
        Math.round((e.clientX / navProgressRef.current.offsetWidth) * 10000) /
        10000;
      setPointerPosition({ x: e.clientX, widthRatio: widthRatio });
    };

    const movePointer = (e) => {
      setPosition(e);
      detectColliding(navPointerRef, navBreakpointsRef);
    };

    const handlePointerDown = (e) => {
      navProgressRef.current.setPointerCapture(e.pointerId);
      setIstouch(true);
      setPosition(e);
      setTimeout(() => {
        detectColliding(navPointerRef, navBreakpointsRef);
      }, 100);
      navProgressRef.current.addEventListener("pointermove", movePointer);
      navProgressRef.current.addEventListener(
        "pointerup",
        (e) => {
          setIstouch(false);
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
          setTimeout(() => {
            const h1BreakpointInfosCleared = h1BreakpointInfos.map(
              (breakpointInfo) => {
                return { ...breakpointInfo, isBreakpointColliding: false };
              }
            );
            setH1BreakpointInfos(h1BreakpointInfosCleared);
          }, 0);
          navProgressRef.current.removeEventListener(
            "pointermove",
            movePointer
          );
        },
        { once: true }
      );
    };
    const navProgressRefValue = navProgressRef.current;
    navProgressRefValue.addEventListener("pointerdown", handlePointerDown);
    return () =>
      navProgressRefValue.removeEventListener("pointerdown", handlePointerDown);
  }, [h1BreakpointInfos, isTouch]);

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
          <nav
            className={`flex justify-between items-center py-3 padding-x mx-auto`}
          >
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
          className={`relative touch-none transition-all ease-linear ${
            isShowProgress ? "bg-blue-300" : "bg-transparent"
          } ${isTouch ? "h-4" : "h-1"}`}
        >
          <div
            className={`z-10 transition-all ease-linear ${
              isShowProgress ? "bg-blue-600" : "bg-transparent"
            } ${isTouch ? "h-4" : "h-1"}`}
            style={{ width: progressWidth }}
          />
          <div
            ref={navPointerRef}
            className={`absolute top-0 w-6 h-6 bg-blue-800 rounded-full -translate-x-1/2  -translate-y-[4px] z-20 ${
              isTouch ? "block" : "hidden"
            }`}
            style={{ left: pointerPosition.x }}
          />
          <ul>
            {h1BreakpointInfos.map(
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
                    className="absolute w-1 h-4"
                    style={{ top: 0, left: `${topRatio * 100}%` }}
                  >
                    <div
                      className={`bg-white w-1 h-4 mb-5 -translate-x-1/2 ${
                        isTouch ? "block" : "hidden"
                      }`}
                    />
                    <p
                      className={`w-max rounded-lg bg-blue-600 shadow-md -translate-x-1/2 px-3 py-2 text-white before:w-0 before:h-0 before:border-l-[10px] before:border-b-[12px] before:border-r-[10px]  before:border-l-transparent before:border-b-blue-600 before:border-r-transparent before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 ${
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
          <div className=" h-5 bg-transparent"></div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
