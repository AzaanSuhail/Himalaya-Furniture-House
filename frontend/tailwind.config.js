/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // ✅ Roboto
        dancing: ["Dancing Script", "cursive"], // ✅ Dancing Script
      },
    },
  },
  plugins: [],
};
