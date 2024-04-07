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
    },
  },
  plugins: [],
};
