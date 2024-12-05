/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        betterworks: ["Betterworks", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2e524a",
        secondary: "#fda043",
        "body-dark": "#132420",
      },
    },
  },
  plugins: [],
};
