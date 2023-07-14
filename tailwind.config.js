/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greaTeal: "#2F4D59",
        lightRed: "rgba(217, 48, 48, 0.5)",
        specialGray: "rgba(0, 0, 0, 0.70)",
        background: "#F2E7AE",
      },
      fontFamily: {
        Fredoka: ["Fredoka", "sans-serif"],
        Bangers: ["Bangers", "cursive"],
      },
    },
  },
  plugins: [],
};

