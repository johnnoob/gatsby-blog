import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { socialLinks } from "../constants/socialLinks";
import { SiGatsby } from "react-icons/si";

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="bg-black padding-x py-8 w-full mt-8">
      <div className="flex flex-col justify-center items-center gap-4">
        <StaticImage src="../images/quote.png" alt="quote" />
        <ul className="flex items-center justify-center gap-3 text-white">
          {socialLinks.map(({ site, url, icon }) => (
            <li key={site} className="hover:text-slate-300">
              <a href={url}>{icon}</a>
            </li>
          ))}
        </ul>
        <div className="text-white flex flex-col items-center">
          <p>
            Made with Gatsby <SiGatsby className="inline-block" /> in Taiwan
          </p>
          <p>&copy; Hu's Company, Ltd. {year}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
