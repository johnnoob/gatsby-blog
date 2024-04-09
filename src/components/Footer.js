import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { socialLinks } from "../constants/socialLinks";
import { SiGatsby } from "react-icons/si";

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="bg-black padding-x p-8 w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <StaticImage src="../images/quote.png" alt="quote" />
        <ul className="flex items-center justify-center gap-2 text-slate-200">
          {socialLinks.map(({ site, url, icon }) => (
            <li key={site} className="hover:text-slate-600">
              <a href={url}>{icon}</a>
            </li>
          ))}
        </ul>

        <div className="text-white text-lg flex flex-col items-center max-md:text-sm">
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
