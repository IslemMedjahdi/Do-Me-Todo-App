module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Josefin Sans', sans-serif",
      },
    },
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("tailwind-scrollbar-hide"),
  ],
};
