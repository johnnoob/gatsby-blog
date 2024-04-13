import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { navlinks } from "../constants/link";
import Button from "./Button";
import { BsEnvelope, BsList } from "react-icons/bs";

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState("");
  const [lastScroll, setLastScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        setScrollDirection(null);
        return;
      }
      const newDirection =
        currentScroll > lastScroll ? "scroll-down" : "scroll-up";
      if (newDirection !== scrollDirection) {
        setScrollDirection(newDirection);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection, lastScroll]);
  return (
    <section className="fixed w-full z-10">
      <header className={`max-container transition-all ${scrollDirection}`}>
        <nav className="flex justify-between items-center py-3 padding-x bg-white mx-auto border-[1px] border-t-transparent border-gray-200">
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
    </section>
  );
};

export default Navbar;
