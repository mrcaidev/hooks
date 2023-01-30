/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "src/{components,layouts,pages}/**/*.astro",
    "src/plugins/autolink-headings-options.ts",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-radix-colors"),
  ],
};
