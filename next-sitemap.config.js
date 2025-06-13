/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  additionalPaths: async () => [
    { loc: "/" },
    { loc: "/about" },
    { loc: "/account" },
    { loc: "/cart" },
    { loc: "/checkout" },
    { loc: "/contact" },
    { loc: "/shop" },
  ],
};

module.exports = config;
