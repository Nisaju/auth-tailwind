// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    mode: "all",
    preserveHtmlElements: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        alegreya: ["Alegreya", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        "1-5xl": "1440px",
        "2xl": "2560px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
