import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { navlinks } from "../constants/link";
import Button from "./Button";
import { BsEnvelope, BsList } from "react-icons/bs";

const Navbar = () => {
  return (
    <header className="padding-x py-6 absolute z-10 w-full bg">
      <nav className="flex justify-between items-center">
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
            label="訂閱"
            icon={<BsEnvelope size={20} />}
            isIconRight={true}
          />
        </div>
        <div className="lg:hidden">
          <button>
            <BsList size={35} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
