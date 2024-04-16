import React, { useState, useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { navlinks } from "../constants/link";
import Button from "./Button";
import { BsEnvelope, BsList } from "react-icons/bs";

const Navbar = () => {
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
  const navbarRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState(0);
  useEffect(() => {
    const navbarWidth = navbarRef.current.offsetWidth;
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollRatio =
          Math.round(((scrollY + windowHeight) / pageHeight) * 100) / 100;
        const scrollProgressWidth = navbarWidth * scrollRatio;
        setProgressWidth(scrollProgressWidth);
      },
      []
    );

    // console.log(pageHeight);
  });

  return (
    <section className="fixed w-full z-10 bg-white" ref={navbarRef}>
      {/* <header className={`max-container transition-all ${scrollDirection}`}> */}
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
            <button>
              <BsList size={35} />
            </button>
          </div>
        </nav>
      </header>
      <div className="bg-blue-200">
        <div
          className="bg-blue-500 transition-all z-10"
          style={{ width: progressWidth, height: 4 }}
        ></div>
      </div>
    </section>
  );
};

export default Navbar;
