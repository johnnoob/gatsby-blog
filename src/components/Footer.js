import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { socialLinks } from "../constants/socialLinks";
import { SiGatsby } from "react-icons/si";

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();
  return (
    <section className="bg-orange-500 pt-8 pb-5 flex-col justify-center">
      <div className="section-container pt-0">
        <StaticImage src="../images/quote.png" alt="quote" />
        <h1 className="mt-3 text-xl text-white text-center max-md:text-sm">
          - Albert Einstein
        </h1>
        <ul className="mt-5 flex items-center justify-center gap-2">
          {socialLinks.map(({ site, url, image, bgColor, hover }) => (
            <li key={site} className={`${bgColor} ${hover}`}>
              <a href={url}>{image}</a>
            </li>
          ))}
        </ul>
        <div className="text-white text-lg flex flex-col items-center mt-5 max-md:text-sm">
          <p>
            Made with Gatsby <SiGatsby className="inline-block" /> in Taiwan
          </p>
          <p>&copy; John Hu {year}</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
