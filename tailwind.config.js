/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx,mdx}`,
    `./src/components/**/*.{js,jsx,ts,tsx,mdx}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        nt: ["'Noto Sans TC', sans - serif"],
      },
      animation: {
        "loop-scroll-x": "loop-scroll-x 5s linear infinite",
        "loop-scroll-y": "loop-scroll-y 10s linear infinite",
      },
      keyframes: {
        "loop-scroll-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 0.125rem))" },
        },
        "loop-scroll-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
