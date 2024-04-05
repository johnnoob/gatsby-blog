import React from "react";
import { FaXTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa6";
export const socialLinks = [
  {
    site: "facebook",
    url: "facebook",
    image: <FaFacebook size={30} />,
    bgColor: "text-slate-100",
    hover: "hover:text-slate-600",
  },
  {
    site: "ig",
    url: "ig",
    image: <FaInstagram size={30} />,
    bgColor: "text-slate-100",
    hover: "hover:text-slate-300",
  },
  {
    site: "twitter",
    url: "twitter",
    image: <FaXTwitter size={30} />,
    bgColor: "text-slate-100",
    hover: "hover:text-slate-300",
  },
  {
    site: "github",
    url: "github",
    image: <FaGithub size={30} />,
    bgColor: "text-slate-100",
    hover: "hover:text-blue-300",
  },
];
