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
        betterworks: ["Betterworks", "sans-serif"],
        youngSerif: ["YoungSerif", "serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2e524a",
        secondary: "#fda043",
        "body-dark": "#132420",
        accent: "#BAC9AC",
        "accent-second": "#EBDBCB",
        "white-transparent": "#FFFFFFCC",
        "warm-beige": "#f7f1ea",
        white60: "#FFFFFF99",
      },
    },
  },
  plugins: [],
};
